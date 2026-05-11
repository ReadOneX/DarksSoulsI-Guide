import type { Metadata } from 'next';
import LoreArchivePage from '@/components/pages/lore-archive-page';

export const metadata: Metadata = {
  title: 'Lore Archive',
  description: 'Dark Souls I lore archive and character storylines'
};

export default function LorePage(): JSX.Element {
  return <LoreArchivePage />;
}
