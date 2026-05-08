import { Metadata } from 'next';
import LoginPage from '@/components/pages/login-page';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your Dark Souls I Guide account'
};

export default function Login(): JSX.Element {
  return <LoginPage />;
}
