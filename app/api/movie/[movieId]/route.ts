import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    const { movieId } = params;
    const session = await getServerSession(authOptions);

    // Check for unauthenticated access
    if (!session) {
      return NextResponse.json('Unauthenticated!', { status: 401 });
    }

    // Validate movieId
    if (typeof movieId !== 'string' || !movieId) {
      return NextResponse.json('Invalid movie ID!', { status: 400 });
    }

    // Fetch movie from database
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    // Check if movie exists
    if (!movie) {
      return NextResponse.json('Movie not found!', { status: 404 });
    }
    
    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    // Log error to help with debugging
    console.error('Error fetching movie:', error);

    return NextResponse.json('Internal server error.', { status: 500 });
  }
}
