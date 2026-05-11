import type { Metadata } from 'next';
import ItemDatabasePage from '@/components/pages/item-database-page';

export const metadata: Metadata = {
  title: 'Item Database',
  description: 'Weapons, armor, spells, consumables, and hidden item locations'
};

export default function ItemsPage(): JSX.Element {
  return <ItemDatabasePage />;
}
