import { Metadata } from 'next';
import DashboardPage from '@/components/pages/dashboard-page';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Dark Souls I Guide dashboard'
};

export default function Dashboard(): JSX.Element {
  return <DashboardPage />;
}
