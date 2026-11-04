import LoginForm from '@/components/auth/LoginForm';
import { Suspense } from 'react';

export const metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
