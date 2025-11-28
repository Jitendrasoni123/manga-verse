import getData from '@/helpers/api';
import Image from 'next/image';
import React from 'react';
import StarIcon from '../../../public/star.png';
import BookmarkIcon from '../../../public/bookmark.png';
import CommentIcon from '../../../public/comment.png';
import formatCount from '@/helpers/number-formatter';
import { genereColor } from '@/config/default';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import ChapterView from './chapterView';
import ArtView from './artView';

async function Manga({ params: { id }, searchParams: { tab = 'chapter' } }) {
  const detail = await getData(`api/manga/${id}`);
  const statics = await getData(`api/statistics?manga[]=${id}`);
  const chapters = await getData(`api/chapters?id=${id}`);
  const art = await getData(`api/manga/${id}/art`);
  const imageUrl = detail.relationships?.find(t => t.type === 'cover_art')?.attributes?.fileName;
  const author = detail.relationships?.find(t => t.type === 'author')?.attributes?.name;
  const artist = detail.relationships?.find(t => t.type === 'artist')?.attributes?.name;
  return (
    <section>
      <div className="relative h-fit flex flex-col lg:flex-row p-5 gap-11">
        <Image
          className="pointer-events-none select-none object-cover object-[25%_25%] opacity-10"
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/covers/${id}/${imageUrl}`}
          alt="Cover Image"
          fill
          loading="lazy"
        />
        <div className="aspect-[3/4] max-w-[300px] relative object-cover h-[400px] rounded-xl">
          <Image
            className="pointer-events-none select-none object-cover rounded-xl"
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/covers/${id}/${imageUrl}`}
            alt="Cover Image"
            fill
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="font-bold text-6xl text-white">
            {detail?.attributes?.title?.en || detail?.attributes?.altTitles?.[0]?.[Object.keys(detail?.attributes?.altTitles?.[0])?.[0]]}
          </div>
          <div className="font-bold text-3xl text-white">
            {detail?.attributes?.altTitles?.find(obj => detail?.attributes?.originalLanguage in obj)?.[detail?.attributes?.originalLanguage]}
          </div>
          <div className="font-bold text-xl text-white">
            {author ? `Author: ${author}` : ''}
            {author !== artist && artist ? `, Artist: ${artist}` : ''}
          </div>
          <div className="flex flex-wrap gap-1">
            {detail.attributes.tags
              .map(tag => tag.attributes.name.en)
              ?.map(g => (
                <div
                  className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3  py-1 rounded-full ${genereColor[g.toLowerCase()] || genereColor.default}`}
                  key={g}>
                  {g}
                </div>
              ))}
          </div>
          <div className="font-bold text-lg text-white flex gap-5">
            <div className="flex place-items-center">
              <Image alt="rating" src={StarIcon} className="w-6 h-6" />
              <span>{Number(statics?.[id]?.rating?.average)?.toFixed(2)}</span>
            </div>
            <div className="flex place-items-center">
              <Image alt="follows" src={BookmarkIcon} className="w-6 h-6" />
              <span>{formatCount(statics?.[id]?.follows)}</span>
            </div>
            <div className="flex place-items-center">
              <Image alt="comment" src={CommentIcon} className="w-6 h-6" />
              <span>{formatCount(statics?.[id]?.comments?.repliesCount)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="m-10 flex flex-col gap-5">
        <div className="flex flex-col gap-5 ">
          <div className="text-2xl text-white md-wrapper">
            <Markdown>{detail?.attributes?.description?.en || ''}</Markdown>
          </div>
        </div>
        <div className="w-full min-h-fit">
          <div className="flex w-full p-1 gap-1 text-xl">
            <Link href="?tab=chapter" scroll={false} className={`p-2 text-white cursor-pointer ${tab === 'chapter' ? 'border-solid border-b-2 border-slate-400' : ''}`}>
              Chapters
            </Link>
            <Link href="?tab=art" scroll={false} className={`p-2 text-white cursor-pointer ${tab === 'art' ? 'border-solid border-b-2 border-slate-400' : ''}`}>
              Art
            </Link>
          </div>
          <div className="text-white">{tab === 'chapter' ? <ChapterView data={chapters} /> : <ArtView art={art} id={id} />}</div>
        </div>
      </div>
    </section>
  );
}

export default Manga;
