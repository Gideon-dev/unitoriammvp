import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/authOptions';
import apiClient from '@/app/lib/apiClient';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
    }

    //external API to fetch total completed lessons
    const res = await apiClient.get(`/total-completed-lesson/${userId}`)

    const data: { total_completed: number } = res.data;
    
   
    return NextResponse.json({ total_completed: data.total_completed });
  } catch (err) {
    console.error('GET /total-completed error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
