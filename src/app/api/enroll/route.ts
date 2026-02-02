import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { studentId, courseId } = await req.json();

    if (!studentId || !courseId) {
      return NextResponse.json({ message: 'Student ID and Course ID are required.' }, { status: 400 });
    }

    
    const studentExists = await prisma.user.findUnique({
      where: { id: studentId },
    });

    const courseExists = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!studentExists || studentExists.role !== 'student') {
      return NextResponse.json({ message: 'Invalid student.' }, { status: 404 });
    }

    if (!courseExists) {
      return NextResponse.json({ message: 'Course not found.' }, { status: 404 });
    }

  
    const alreadyEnrolled = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });

    if (alreadyEnrolled) {
      return NextResponse.json({ message: 'Student already enrolled in this course.' }, { status: 409 });
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    });

    return NextResponse.json(enrollment, { status: 201 });
  } catch (err) {
    console.error('Error enrolling student:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
