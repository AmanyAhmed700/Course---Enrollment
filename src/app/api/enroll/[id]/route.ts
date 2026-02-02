import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; 
import type { NextRequest } from 'next/server';

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid enrollment ID' }, { status: 400 });
  }

  const enrollmentId = parseInt(id);

  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    await prisma.enrollment.delete({
      where: { id: enrollmentId },
    });

    return NextResponse.json({ message: 'Enrollment deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting enrollment with ID ${enrollmentId}:`, error);
    return NextResponse.json({ error: 'Failed to delete enrollment' }, { status: 500 });
  }
}
