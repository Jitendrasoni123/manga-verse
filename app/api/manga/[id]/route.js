import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const id = params?.id;
  return await axios
    .get(`${process.env.MANGA_URL}/manga/${id}?includes[]=artist&includes[]=author&includes[]=cover_art`)
    .then(res => {
      return NextResponse.json({ data: res?.data?.data || [] }, { status: 200 });
    })
    .catch(() => {
      return NextResponse.json({ data: [] }, { status: 200 });
    });
}
