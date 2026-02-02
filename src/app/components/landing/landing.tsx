'use client';

import Link from 'next/link';
import './marquee.css'; 
export default function Landing() {
  return (
    <section className="mt-21 bg-gradient-to-br from-blue-200 via-blue-100 to-purple-400 min-h-[70vh] flex items-center justify-center px-6 text-center">
      <div className="max-w-3xl">
          <div className="marquee-wrapper mb-6">
          <h1 className="marquee-text text-5xl md:text-6xl font-extrabold text-blue-800 leading-tight">
            Welcome to <span className="text-purple-800">Academix</span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Learn, grow, and enroll in top-notch courses crafted by expert instructors. Start your journey today!
        </p>

        <Link
          href="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition duration-300"
        >
          Begin Your Journey
        </Link>
      </div>
    </section>
  );
}
