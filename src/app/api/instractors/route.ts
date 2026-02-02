import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const instructor = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: 'instructor', 
      },
    });

    return NextResponse.json(instructor, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating instructor:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: string }).code === 'P2002') {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: 'Failed to create instructor' },
      { status: 500 }
    );
  }
}
