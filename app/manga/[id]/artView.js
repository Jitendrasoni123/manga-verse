'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import image from '../../../public/default.jpeg';

function ArtView({ art, id }) {
  return (
    <div className="flex flex-wrap gap-5 p-5">
      {art?.map(i => (
        <div className="aspect-[3/5] relative object-cover group/art w-[200px] rounded-xl" key={i?.id}>
          <ImageDisplay id={id} file={i?.attributes?.fileName} />
          <div className="absolute bottom-0 rounded-xl left-0 right-0 text-xl bg-custom-gradient text-center p-2">Volume {i?.attributes?.volume}</div>
        </div>
      ))}
    </div>
  );
}

function ImageDisplay({ file, id }) {
  const [imageLoaded, setImageLoaded] = useState(true);
  return (
    <Image
      onError={() => setImageLoaded(false)}
      className="pointer-events-none select-none group-hover/art:brightness-50 shadow-md object-cover rounded-xl"
      src={imageLoaded ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/covers/${id}/${file}.256.jpg` : image}
      alt="Cover Image"
      fill
      loading="lazy"
    />
  );
}

export default ArtView;
