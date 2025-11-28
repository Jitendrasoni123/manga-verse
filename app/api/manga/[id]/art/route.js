import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const id = params?.id;
  return await axios
    .get(
      `${process.env.MANGA_URL}/cover?order[volume]=asc&manga[]=${id}&limit=100&offset=0`
    )
    .then(res => {
      return NextResponse.json({ data: res?.data?.data || [] }, { status: 200 });
    })
    .catch(() => {
      return NextResponse.json({ data: [] }, { status: 200 });
    });
}
