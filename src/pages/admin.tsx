// ================================================
// ADMIN LOGIN PAGE
// ================================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLoginForm from '@/admin/AdminLoginForm';

export default function AdminLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (token) {
        router.push('/admin/dashboard');
      }
    }
  }, [router]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and user info
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
      }

      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch (error: any) {
      throw new Error(error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return <AdminLoginForm onSubmit={handleLogin} isLoading={isLoading} />;
}
