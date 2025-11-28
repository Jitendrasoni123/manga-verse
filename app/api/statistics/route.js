import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const manga = searchParams.getAll('manga[]');
  let query = '';

  manga.forEach((item, index) => {
    if (index === 0) {
      query += `manga[]=${encodeURIComponent(item)}`;
    } else {
      query += `&manga[]=${encodeURIComponent(item)}`;
    }
  });
  return await axios
    .get(`${process.env.MANGA_URL}/statistics/manga?${query}`)
    .then(res => {
      return NextResponse.json({ data: res?.data?.statistics || [] }, { status: 200 });
    })
    .catch(() => {
      return NextResponse.json({ data: [] }, { status: 200 });
    });
}
