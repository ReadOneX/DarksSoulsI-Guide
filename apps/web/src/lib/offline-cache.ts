'use client';

const DB_NAME = 'dark-souls-guide-cache';
const DB_VERSION = 1;
const STORE_NAME = 'entries';

interface CacheEntry<T> {
  key: string;
  value: T;
  updatedAt: string;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveOfflineEntry<T>(key: string, value: T): Promise<void> {
  if (typeof indexedDB === 'undefined') return;

  const database = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put({ key, value, updatedAt: new Date().toISOString() } satisfies CacheEntry<T>);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
}

export async function readOfflineEntry<T>(key: string): Promise<CacheEntry<T> | null> {
  if (typeof indexedDB === 'undefined') return null;

  const database = await openDatabase();
  const entry = await new Promise<CacheEntry<T> | null>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => resolve((request.result as CacheEntry<T> | undefined) ?? null);
    request.onerror = () => reject(request.error);
  });
  database.close();
  return entry;
}

export async function listOfflineEntries<T>(): Promise<CacheEntry<T>[]> {
  if (typeof indexedDB === 'undefined') return [];

  const database = await openDatabase();
  const entries = await new Promise<CacheEntry<T>[]>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as CacheEntry<T>[]);
    request.onerror = () => reject(request.error);
  });
  database.close();
  return entries;
}
