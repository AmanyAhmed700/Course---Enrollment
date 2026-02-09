'use client';

import { useEffect, useState } from 'react';
import Header from '../app/components/header/header';
import Link from 'next/link';
import Landing from './components/landing/landing';
import Image from 'next/image';
import WhyUsSection from './components/why/WhyUsSection';

interface Course {
  id: number;
  title: string;
  description: string;
  schedule: string;
  instructorName: string;
  enrolledStudentsCount: number;
  image?: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
  async function fetchCourses() {
    // استخدمي المسار النسبي مباشرة لضمان الاتصال الصحيح بالسيرفر
    const res = await fetch('/api/courses', { cache: 'no-store' });

    if (!res.ok) {
      console.error('Failed to fetch courses');
      return;
    }

    const data = await res.json();
    setCourses(data);
    setFilteredCourses(data);
  }

  fetchCourses();
}, []);

  useEffect(() => {
    const query = search.toLowerCase();
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.instructorName.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
  }, [search, courses]);

  return (
   <>
      <Header onSearch={(value: string) => setSearch(value)} />
      <Landing />

      <div className="container mx-auto p-6 pt-28 bg-gray-50 min-h-screen">
        {filteredCourses.length === 0 ? (
          <p className="text-center text-gray-600 text-xl mt-10">No courses match your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col h-full max-w-sm w-full"
              >
                {/* الجزء العلوي: الصورة تأخذ كامل العرض بارتفاع ثابت متوسط */}
                <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                      className="w-full h-full object-cover object-top"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={true}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 italic bg-gray-200 text-sm">
                      No Image Provided
                    </div>
                  )}
                </div>

                {/* الجزء السفلي: البيانات */}
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {course.description}
                  </p>

                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Instructor:</span> 
                      <span className="ml-1">{course.instructorName}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Image src="/images/user.jpg" alt="user" width={16} height={16} className="w-4 h-4 mr-2" />
                      <span className="font-medium">Enrolled:</span> 
                      <span className="ml-1">{course.enrolledStudentsCount} Students</span>
                    </div>
                  </div>
                </div>

                {/* زر التفاصيل */}
                <div className="bg-gray-50 p-4 border-t border-gray-100">
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-blue-600 hover:text-blue-800 font-bold flex items-center justify-center w-full group transition-colors"
                  >
                    View Full Details
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <WhyUsSection />
    </>
  );
}
