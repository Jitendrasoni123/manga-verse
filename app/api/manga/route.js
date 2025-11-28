import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit') || 15; 
  const offset = searchParams.get('offset') || 0;

  return await axios
    .get(
      `${process.env.MANGA_URL}/manga?limit=${limit}&offset=${offset}&includes[]=cover_art&includes[]=author&order[latestUploadedChapter]=desc&hasAvailableChapters=true`
    )
    .then(res => {
      return NextResponse.json({ data: res?.data?.data || [] }, { status: 200 });
    })
    .catch(() => {
      return NextResponse.json({ data: [] }, { status: 200 });
    });
}
