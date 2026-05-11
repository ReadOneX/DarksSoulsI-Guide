import type { Metadata } from 'next';
import SettingsPageContent from '@/components/pages/settings-page';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Theme, notification, offline cache, and account settings'
};

export default function SettingsRoutePage(): JSX.Element {
  return <SettingsPageContent />;
}
