import { Metadata } from 'next';
import RegisterPage from '@/components/pages/register-page';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a Dark Souls I Guide account'
};

export default function Register(): JSX.Element {
  return <RegisterPage />;
}
