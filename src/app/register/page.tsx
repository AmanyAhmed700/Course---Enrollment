'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleRegister(formData: FormData) {
    setError('');

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.message || 'Registration failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden mt-15">

        <div className="flex flex-col justify-center px-8 py-12">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
              Create your account
            </h2>

            {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}

            <form action={handleRegister} className="space-y-4">
              <label className="block">
                <span className="text-sm text-gray-700">Name</span>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>

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

              <label className="block">
                <span className="text-sm text-gray-700">Role</span>
                <select
                  name="role"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  defaultValue="student"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </label>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer"
              >
                Register
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline cursor-pointer">
                Log in
              </a>
            </p>
          </div>
        </div>

      
        <div className="hidden md:flex items-center justify-center bg-blue-50 p-4">
          <Image
            src="/images/login.jpg"
            alt="Register Illustration"
            className="max-w-[250px] w-full h-auto object-contain"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
