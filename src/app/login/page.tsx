'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(formData: FormData) {
    setError('');

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (res.ok) {
      if (result.role === 'student') {
        router.push('/');
      } else if (result.role === 'instructor') {
        router.push('/dashboard/instructor');
      } else {
        setError('Unknown role');
      }
    } else {
      setError(result.message || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">

      
        <div className="flex flex-col justify-center px-8 py-12">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
              Log in to your account
            </h2>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <form action={handleLogin} className="space-y-4">
              <label className="block">
                <span className="text-sm text-gray-700">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Password</span>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer"
              >
                Log In
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline cursor-pointer">
                Register
              </a>
            </p>
          </div>
        </div>


        <div className="hidden md:flex items-center justify-center bg-blue-50 p-4">
          <Image
            src="/images/login.jpg"
            alt="Login Illustration"
            className="max-w-[250px] w-full h-auto object-contain"
               width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
