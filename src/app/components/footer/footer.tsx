'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer bg-gray-200 text-black py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
    
        <div>
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Academix
          </Link>
          <p className="mt-3 text-sm text-black">
            Your trusted platform for modern, accessible, and powerful learning experiences.
          </p>
        </div>

     
        <div>
          <h3 className="text-lg font-semibold mb-2 text-black">Subscribe</h3>
          <p className="text-sm mb-4 text-black">
            Ready to learn something new? Join a course today.
          </p>
   
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-2 text-black">Legal</h3>
          <ul className="space-y-2 text-sm text-black">
            <li><Link href="/terms" className="hover:text-gray-700">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link></li>
          </ul>
        </div>

   
        <div>
          <h3 className="text-lg font-semibold mb-2 text-black">Contact</h3>
          <p className="text-sm text-black">
            Academix Tec.<br />
            Giza,<br />
            Cairo, Egypt<br />
            youremail@gmail.com.com
          </p>
        </div>
      </div>
      <hr className='mt-15 text-gray-400'/>
      <div className="mt-10 text-center text-sm text-black">
        &copy; {new Date().getFullYear()} Amany Ahmed. All rights reserved.
      </div>
    </footer>
  );
}
