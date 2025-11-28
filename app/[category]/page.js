import Card from '@/components/CategoryCard';
import Pagination from '@/components/Pagination';
import getData from '@/helpers/api';
import Link from 'next/link';
import React from 'react';

async function CategoryDisplay({ params }) {
  const data = await getData(`/api/${params?.category}?limit=50`);
  return (
    <div className="px-4">
      <div className="text-white text-4xl relative font-bold mx-5 my-10 flex place-items-center gap-3 justify-center">
        <Link
          href="/"
          className="p-3 bg-slate-600 absolute hover:text-cyan-400 rounded-full flex place-items-center gap-3 h-[40px] w-[40px] overflow-hidden hover:w-auto left-0">
          <span className="text-sm">←</span>
          <span className="text-base px-1">back</span>
        </Link>
        <div className="capitalize">{params?.category?.split('-').join(' ')}</div>
      </div>
      <Pagination />
      <div class="flex justify-center flex-wrap gap-y-7">
        {data.map(i => (
          <Card
            key={i.id}
            {...{
              title: i?.attributes?.title?.en || i?.attributes?.altTitles?.[0]?.[Object.keys(i?.attributes?.altTitles?.[0])?.[0]],
              desc: i?.attributes?.description?.en,
              genere: i.attributes.tags.filter(tag => tag.attributes.group === 'genre').map(tag => tag.attributes.name.en),
              author: i.relationships?.find(t => t.type === 'author')?.attributes?.name,
              imageUrl: i.relationships?.find(t => t.type === 'cover_art')?.attributes?.fileName,
              id: i.id,
              ...(params?.category === 'latest-updated' ? {time: i.attributes?.updatedAt} : {}),
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryDisplay;
