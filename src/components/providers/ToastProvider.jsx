'use client';

import { Toaster } from 'react-hot-toast';
import { useTheme } from 'next-themes';

export default function ToastProvider() {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <Toaster
      position="top-rightr"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        removeDelay: 1000,
        style: {
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f9fafb' : '#111827',
          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: isDark ? '#1f2937' : '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: isDark ? '#1f2937' : '#ffffff',
          },
        },
      }}
    />
  );
}
