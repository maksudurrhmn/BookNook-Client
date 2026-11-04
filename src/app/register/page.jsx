import RegisterForm from '@/components/auth/RegisterForm';
import { Suspense } from 'react';

export const metadata = {
  title: 'Create Account',
};

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
