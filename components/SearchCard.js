'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import image from '../public/default.jpeg';

function SearchCard({ title, handleClick, author, id, imageUrl }) {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <Link href={`/manga/${id}`}>
      <div onClick={handleClick} className={`relative flex bg-gray-800 group h-[100px] text-white p-2 hover:bg-slate-700 rounded-xl`}>
        <div className="aspect-[7/8] object-cover group-hover:brightness-[0.6] relative h-full">
          <Image
            onError={() => setImageLoaded(false)}
            className="pointer-events-none rounded-md select-none object-cover"
            src={imageLoaded ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/covers/${id}/${imageUrl}.256.jpg` : image}
            alt="Cover Image"
            fill
            loading="lazy"
          />
        </div>

        <div className="pl-5 w-full">
          <b className="text-xl break-all line-clamp-1">{title}</b>
          <p className="text-lg text-gray-200 mb-2">Author: {author}</p>
        </div>
      </div>
    </Link>
  );
}

export default SearchCard;
