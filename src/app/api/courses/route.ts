import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma'; 
import type { NextRequest } from 'next/server';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: { select: { name: true } },
        _count: { select: { enrollments: true } },
      },
    });

    const formattedCourses = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      schedule: course.schedule,
      image: course.image, // تأكد من وجود هذا السطر لإرسال الصورة للطلاب
      instructorName: course.instructor.name,
      enrolledStudentsCount: course._count.enrollments,
    }));

    return NextResponse.json(formattedCourses, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Failed to fetch courses.' }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, schedule, instructorId } = body;

    if (!title || !description || !schedule || !instructorId) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        schedule,
        instructor: {
          connect: { id: instructorId },
        },
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error: unknown) {
    console.error('[COURSE_POST_ERROR]', error);

    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: string }).code === 'P2025') {
      return NextResponse.json({ message: 'Instructor not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Failed to create course.' }, { status: 500 });
  }
}
