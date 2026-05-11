import type { Metadata } from 'next';
import ProgressTrackerPage from '@/components/pages/progress-tracker-page';

export const metadata: Metadata = {
  title: 'Progress Tracker',
  description: 'Boss, bonfire, covenant, quest, achievement, and collection tracking'
};

export default function ProgressPage(): JSX.Element {
  return <ProgressTrackerPage />;
}
