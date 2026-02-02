import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import type { NextRequest } from 'next/server';

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;
  const courseId = parseInt(id);

  if (isNaN(courseId)) {
    return NextResponse.json({ message: "Invalid Course ID." }, { status: 400 });
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        instructor: {
          select: {
            name: true,
            email: true,
          },
        },
        enrollments: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ message: "Course not found." }, { status: 404 });
    }

    const enrolledStudents = course.enrollments.map(enrollment => enrollment.student);

    // التعديل هنا: إضافة حقل image للـ formattedCourse
    const formattedCourse = {
      id: course.id,
      title: course.title,
      description: course.description,
      schedule: course.schedule,
      image: course.image, // <-- هذا السطر هو الذي سيجعل الصورة تظهر
      instructor: course.instructor,
      enrolledStudents: enrolledStudents,
    };

    return NextResponse.json(formattedCourse, { status: 200 });
  } catch (error) {
    console.error(`Error fetching course with ID ${courseId}:`, error);
    return NextResponse.json({ message: "Failed to fetch course details." }, { status: 500 });
  }
}