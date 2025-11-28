import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { NextResponse } from 'next/server';

dayjs.extend(utc);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit') || 15;  
  const offset = searchParams.get('offset') || 0;
  const date = dayjs().subtract(1, 'M').utc().format('YYYY-MM-DDTHH:mm:ss');

  return await axios
    .get(
      `${process.env.MANGA_URL}/manga?limit=${limit}&offset=${offset}&contentRating[]=safe&updatedAtSince=${date}&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&includes[]=author&order[latestUploadedChapter]=desc&hasAvailableChapters=true`
    )
    .then(res => {
      return NextResponse.json({ data: res?.data?.data || [] }, { status: 200 });
    })
    .catch(() => {
      return NextResponse.json({ data: [] }, { status: 200 });
    });
}
