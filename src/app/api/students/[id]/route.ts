import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import type { NextRequest } from 'next/server';

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const studentId = parseInt(id);

  if (isNaN(studentId)) {
    return NextResponse.json({ message: "Invalid Student ID." }, { status: 400 });
  }

  try {
    const student = await prisma.user.findUnique({
      where: { id: studentId },
      include: {
        studentEnrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                description: true,
                schedule: true,
                instructor: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
    });

    if (!student || student.role !== 'student') {
      return NextResponse.json({ message: "Student not found." }, { status: 404 });
    }

    const enrolledCourses = student.studentEnrollments.map((enrollment) => ({
      id: enrollment.course.id,
      title: enrollment.course.title,
      description: enrollment.course.description,
      schedule: enrollment.course.schedule,
      instructorName: enrollment.course.instructor.name,
      enrolledAt: enrollment.enrolledAt,
    }));

    const formattedStudent = {
      id: student.id,
      name: student.name,
      email: student.email,
      enrolledCourses,
    };

    return NextResponse.json(formattedStudent, { status: 200 });
  } catch (error) {
    console.error(`Error fetching student with ID ${studentId}:`, error);
    return NextResponse.json({ message: "Failed to fetch student profile." }, { status: 500 });
  }
}
