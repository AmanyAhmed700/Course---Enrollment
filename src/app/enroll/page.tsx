'use client'; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Student {
  id: number;
  name: string;
  email: string;
}

interface Course {
  id: number;
  title: string;
  instructorName: string;
}
export default function EnrollPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // استخدام مسار نسبي لجلب الطلاب لتجنب تكرار الدومين في Railway
        const studentsRes = await fetch('/api/students'); 
        if (!studentsRes.ok) throw new Error('Failed to fetch students');
        const studentsData = await studentsRes.json();
        setStudents(studentsData);

        // استخدام مسار نسبي لجلب الكورسات
        const coursesRes = await fetch('/api/courses');
        if (!coursesRes.ok) throw new Error('Failed to fetch courses');
        const coursesData = await coursesRes.json();
        setCourses(coursesData);
      } catch (err: unknown) {
        let errorMessage = 'Unknown error';
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setMessage(`Error fetching data: ${errorMessage}`);
        setMessageType('error');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setMessageType(null);
    setLoading(true);

    if (!selectedStudent || !selectedCourse) {
      setMessage('Please select both a student and a course.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      // استخدام مسار نسبي لإرسال بيانات التسجيل
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: parseInt(selectedStudent),
          courseId: parseInt(selectedCourse),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Enrollment successful!');
        setMessageType('success');
        // التوجيه لصفحة الطالب بعد نجاح التسجيل
        router.push(`/students/${selectedStudent}`);
      } else {
        setMessage(data.message || 'Enrollment failed.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Enrollment submission error:', error);
      setMessage('An unexpected error occurred during enrollment.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };
  if (loading && students.length === 0 && courses.length === 0) {
    return (
      <div className="container mx-auto p-6 min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">Loading enrollment options...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-6">Enroll in a Course</h1>

        {message && (
          <div className={`p-4 mb-4 rounded-lg text-center ${
            messageType === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="student" className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
            <select
              id="student"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              disabled={loading || students.length === 0}
            >
              <option value="" disabled>Select a student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.email})
                </option>
              ))}
            </select>
            {students.length === 0 && <p className="text-sm text-red-500 mt-2">No students available. Add students to database first.</p>}
          </div>

          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
            <select
              id="course"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              disabled={loading || courses.length === 0}
            >
              <option value="" disabled>Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title} (by {course.instructorName})
                </option>
              ))}
            </select>
            {courses.length === 0 && <p className="text-sm text-red-500 mt-2">No courses available. Add courses to database first.</p>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !selectedStudent || !selectedCourse}
          >
            {loading ? 'Enrolling...' : 'Enroll Student'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

