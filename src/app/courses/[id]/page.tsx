import Link from 'next/link';
import Image from 'next/image'; 

interface CourseDetails {
  id: number;
  title: string;
  description: string;
  schedule: string;
  image?: string; 
  instructor: {
    name: string;
    email: string;
  };
  enrolledStudents: Array<{
    id: number;
    name: string;
    email: string;
  }>;
}

async function getCourseDetails(id: string): Promise<CourseDetails> {
  // نستخدم مساراً نسبياً يبدأ بـ / لكي يفهم المتصفح والسيرفر أن الرابط يتبع نفس الموقع
  const res = await fetch(`/api/courses/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    if (res.status === 404) throw new Error('Course not found');
    throw new Error('Failed to fetch course details');
  }
  return res.json();
}

export default async function CourseDetailsPage(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  let course: CourseDetails | null = null;
  let error: string | null = null;

  try {
    course = await getCourseDetails(id);
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : 'An unexpected error occurred';
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-red-200">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-xl text-gray-700">{error}</p>
          <Link href="/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-5 rounded-lg">Go Back</Link>
        </div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen mt-20">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">Course Details</h1>

      {/* الكارت بحجم متوسط (max-w-2xl) ليناسب أبعاد الشاشة */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 max-w-2xl mx-auto">
        
        {/* قسم الصورة: تم إزالة الـ Padding واستخدام object-top لمنع "تآكل" الجزء العلوي */}
        <div className="w-full h-64 md:h-80 relative">
          {course.image ? (
            <Image
              src={course.image}
              alt={course.title}
              fill
              // التعديل السحري هنا: object-cover تجعلها بعرض الكارت، و object-top تحمي الجزء العلوي من القص
              className="object-cover object-top" 
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 bg-gray-200 w-full italic">
              No Image Available
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-gray-600 text-base mb-8 leading-relaxed">
            {course.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* بطاقة المحاضر */}
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                Instructor
              </h2>
              <div className="space-y-1">
                <p className="text-gray-800 text-sm"><span className="font-semibold text-blue-900">Name:</span> {course.instructor.name}</p>
                <p className="text-gray-800 text-sm truncate"><span className="font-semibold text-blue-900">Email:</span> {course.instructor.email}</p>
              </div>
            </div>

            {/* بطاقة المواعيد */}
            <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
              <h2 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                Schedule
              </h2>
              <p className="text-gray-800 text-sm font-medium">{course.schedule}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-gray-700 font-bold text-sm transition-colors">
              ← Back to List
            </Link>
            <Link
              href="/enroll"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-xl shadow-md transition duration-300 text-sm"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}