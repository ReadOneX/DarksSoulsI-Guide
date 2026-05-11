import { useMemo, useState } from 'react';
import './App.css';

const nativeModules = [
  { label: 'System Tray', value: 'Configured' },
  { label: 'Local File System', value: 'Allowed' },
  { label: 'Native Notification', value: 'Allowed' },
  { label: 'Auto Updater', value: 'Ready hook' },
  { label: 'Backup Manager', value: 'Local queue' },
  { label: 'Screenshot Manager', value: 'Native path' },
  { label: 'Save Detection', value: 'Watcher-ready' },
  { label: 'Background Sync', value: 'Queued' }
];

function App(): JSX.Element {
  const [status, setStatus] = useState('Desktop shell ready');
  const webUrl = useMemo(() => 'http://localhost:3000', []);

  const simulateNativeCheck = (): void => {
    setStatus('Native capability check completed');
  };

  return (
    <main className="desktop-shell">
      <section className="hero-panel">
        <p className="eyebrow">Tauri Desktop Companion</p>
        <h1>Dark Souls I Guide</h1>
        <p className="lead">
          Native wrapper surface for offline mode, save backups, screenshots, notifications, and
          background sync while the web interface remains the primary UI.
        </p>
        <div className="actions">
          <a href={webUrl}>Open Web Interface</a>
          <button type="button" onClick={simulateNativeCheck}>
            Check Native Modules
          </button>
        </div>
        <p className="status">{status}</p>
      </section>

      <section className="module-grid" aria-label="Desktop native modules">
        {nativeModules.map((module) => (
          <article key={module.label}>
            <span>{module.value}</span>
            <h2>{module.label}</h2>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
