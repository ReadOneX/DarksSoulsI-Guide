import type { Metadata } from 'next';
import BossDatabasePage from '@/components/pages/boss-database-page';

export const metadata: Metadata = {
  title: 'Boss Database',
  description: 'Dark Souls I boss database with strategies, weaknesses, and rewards'
};

export default function BossesPage(): JSX.Element {
  return <BossDatabasePage />;
}
