import { Metadata } from 'next';
import GuidesPage from '@/components/pages/guides-page';

export const metadata: Metadata = {
  title: 'Guides',
  description: 'Explore comprehensive Dark Souls I guides'
};

export default function Guides(): JSX.Element {
  return <GuidesPage />;
}
