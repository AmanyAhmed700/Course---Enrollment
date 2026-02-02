import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getInstructorIdFromSession } from '../../../../lib/auth';

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: Request, context: Context) {
  const { id } = await context.params;
  const courseId = parseInt(id);

  const instructorId = await getInstructorIdFromSession();

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course || course.instructorId !== instructorId) {
    return NextResponse.json({ message: 'Unauthorized or course not found' }, { status: 403 });
  }

  
  await prisma.enrollment.deleteMany({
    where: { courseId },
  });

  await prisma.course.delete({ where: { id: courseId } });

  return NextResponse.json({ message: 'Course deleted' }, { status: 200 });
}
