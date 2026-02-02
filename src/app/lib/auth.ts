import { cookies } from 'next/headers';

export async function getInstructorIdFromSession(): Promise<number | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  const role = cookieStore.get('role')?.value;

  if (role !== 'instructor' || !userId) {
    return null;
  }

  return parseInt(userId, 10);
}
