import Link from 'next/link';

interface StudentProfile {
  id: number;
  name: string;
  email: string;
  enrolledCourses: Array<{
    id: number;
    title: string;
    description: string;
    schedule: string;
    instructorName: string;
    enrolledAt: string;
  }>;
}

// /app/students/[id]/page.tsx

async function getStudentProfile(id: string) {
  // 1. تحديد الرابط الكامل للموقع (استخدمي رابط Railway الخاص بكِ)
  const domain = "https://course-enrollment-production.up.railway.app";
  
  // 2. استخدام الرابط الكامل في الـ fetch
  const res = await fetch(`${domain}/api/students/${id}`, { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    if (res.status === 404) throw new Error('Student not found');
    throw new Error('Failed to fetch student profile');
  }
  return res.json();
}
export default async function StudentProfilePage(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  let student: StudentProfile | null = null;
  let error: string | null = null;

  try {
    student = await getStudentProfile(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = 'An unknown error occurred';
    }
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-red-200">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-xl text-gray-700">{error}</p>
          <Link
            href="/"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition duration-300"
          >
            Go Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="container mx-auto p-6 min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">Loading student profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen mt-30">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Student Profile</h1>

        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
          <p className="text-gray-800 text-xl font-semibold mb-2">
            <span className="font-bold text-blue-800">Name:</span> {student.name}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-bold text-blue-800">Email:</span> {student.email}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Enrolled Courses</h2>
          {student.enrolledCourses.length === 0 ? (
            <p className="text-gray-600">This student is not enrolled in any courses yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {student.enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="w-full bg-blue-50 rounded-xl shadow-sm p-5 border border-blue-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-700 mb-2 line-clamp-2">{course.description}</p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Instructor:</span> {course.instructorName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Enrolled On:</span>{' '}
                    {new Date(course.enrolledAt).toLocaleDateString()}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
                    >
                      View Course
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-5 rounded-lg transition duration-300"
          >
            Back to Home
          </Link>
          <Link
            href="/enroll"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition duration-300"
          >
            Enroll in a New Course
          </Link>
        </div>
      </div>
    </div>
  );
}
