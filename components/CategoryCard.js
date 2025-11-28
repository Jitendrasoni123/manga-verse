'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import image from '../public/default.jpeg';
import { genereColor } from '@/config/default';
dayjs.extend(relativeTime);

function Card({ title, desc, author, genere, time, volume, chapter, id, imageUrl }) {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <Link href={`manga/${id}`}>
      <div className={`relative bg-gray-800 h-[400px] aspect-[3/4] overflow-hidden rounded-xl group/card text-white p-3 mx-3`}>
        <div className="w-full absolute top-0 rounded-xl left-0 z-0 h-full ">
          <Image
            onError={() => setImageLoaded(false)}
            className="pointer-events-none select-none brightness-75 object-cover rounded-xl object-[25%_25%]"
            src={imageLoaded ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/covers/${id}/${imageUrl}.256.jpg` : image}
            alt="Cover Image"
            fill
            loading="lazy"
          />
        </div>
        <div className="z-10 w-full left-0 top-0 right-0 bottom-0 bg-black group-hover/card:translate-y-[0%] transition duration-500 delay-10000 opacity-80 rounded-xl p-5 h-full absolute translate-y-[79%]">
          <b className="text-xl break-all line-clamp-1">{title}</b>

          <p className="text-lg text-gray-200 mb-2">Author: {author}</p>

          {(volume || chapter) && (
            <div className="flex gap-2 mb-2">
              {volume && <p className="text-xl text-gray-200">Vol:{volume}</p>}
              {chapter && <p className="text-xl text-gray-200">Chapter:{chapter}</p>}
            </div>
          )}

          <p className="text-xl text-gray-100 mb-2 line-clamp-3 break-word">{desc}</p>

          <div className="flex flex-wrap gap-1 mb-5">
            {genere?.slice(0, 4)?.map(g => (
              <div
                className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3  py-1 rounded-full ${genereColor[g.toLowerCase()] || genereColor.default}`}
                key={g}>
                {g}
              </div>
            ))}
          </div>
        </div>
        {time && <div className="absolute hidden group-hover/card:block z-10 bottom-1 text-gray-300 right-5">Updeted: {dayjs(time).fromNow()}</div>}
      </div>
    </Link>
  );
}

export default Card;
