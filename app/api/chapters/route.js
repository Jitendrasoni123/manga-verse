import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const limit = searchParams.get('limit') || 50;
  const offset = searchParams.get('offset') || 0;

  return await axios
    .get(
      `${process.env.MANGA_URL}/manga/${id}/feed?limit=${limit}&offset=${offset}&includes[]=scanlation_group&includes[]=user&order[volume]=desc&order[chapter]=desc&offset=0&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`
    )
    .then(async res => {
      const data = res?.data?.data?.reduce((acc, item) => {
        const volume = item.attributes.volume ? `Volume ${item.attributes.volume}` : `No Volume`;
        if (!acc[volume]) {
          acc[volume] = [];
        }
        acc[volume].push(item);
        return acc;
      }, {});
      const response = Object.entries(data).map(([key, volume]) => {
        const chapters = volume.reduce((chp, item) => {
          const chapter = item.attributes.chapter || 'One Shot';
          if (!chp[chapter]) {
            chp[chapter] = [];
          }
          chp[chapter].push(item);
          return chp;
        }, {});
        return {
          volume: key,
          chapters: Object.entries(chapters)
            .sort(([key1], [key2]) => (Number(key2) || 0) - (Number(key1) || 0))
            .map(i => ({ chapter: i[0], data: i[1] })),
        };
      }, {});
      return NextResponse.json({ data: response }, { status: 200 });
    })
    .catch(err => {
      console.log(err, 'err');
      return NextResponse.json({ data: [] }, { status: 200 });
    });
}
