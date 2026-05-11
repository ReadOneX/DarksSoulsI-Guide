import type { Metadata } from 'next';
import BuildPlannerPage from '@/components/pages/build-planner-page';

export const metadata: Metadata = {
  title: 'Build Planner',
  description: 'Dark Souls I PvE and PvP build recommendations'
};

export default function BuildsPage(): JSX.Element {
  return <BuildPlannerPage />;
}
