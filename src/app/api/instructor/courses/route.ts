import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getInstructorIdFromSession } from '../../../lib/auth';

// جلب الكورسات الخاصة بالمحاضر المسجل فقط
export async function GET() {
  try {
    const instructorId = await getInstructorIdFromSession();

    if (instructorId === null) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const courses = await prisma.course.findMany({
      where: {
        instructorId: instructorId, // فلترة الكورسات حسب معرف المحاضر
      },
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
    });

    const formattedCourses = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      schedule: course.schedule,
      image: course.image,
      enrolledStudentsCount: course._count.enrollments,
    }));

    return NextResponse.json(formattedCourses, { status: 200 });
  } catch (error) {
    console.error('[INSTRUCTOR_COURSE_GET_ERROR]', error);
    return NextResponse.json({ message: 'Failed to fetch courses.' }, { status: 500 });
  }
}

// إضافة كورس جديد وربطه بالمحاضر الحالي
export async function POST(req: Request) {
  try {
    const instructorId = await getInstructorIdFromSession();
    const body = await req.json();
    const { title, description, schedule, image } = body;

    if (!title || !description || !schedule) {
      return NextResponse.json({ message: 'All fields required' }, { status: 400 });
    }

    if (instructorId === null) {
      return NextResponse.json({ message: 'Instructor not authenticated' }, { status: 401 });
    }

    const newCourse = await prisma.course.create({
      data: { 
        title, 
        description, 
        schedule, 
        image, 
        instructorId // ربط الكورس بالمحاضر صاحب الجلسة
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error('[INSTRUCTOR_COURSE_POST_ERROR]', error);
    return NextResponse.json({ message: 'Failed to create course.' }, { status: 500 });
  }
}