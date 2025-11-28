import Card from '@/components/MainCards';
import React from 'react';
import Crousel from '@/components/Crousel';
import getData from '@/helpers/api';
import Link from 'next/link';

async function Home() {
  const popularData = await getData('api/most-popular');
  const seasonalData = await getData('api/seasonal-updates');
  const recentlyUdated = await getData('api/latest-updated');
  const recentlyAdded = await getData('api/recently-added');

  return (
    <section className="px-4">
      {/* --------------- Recently Added ---------------------- */}
      <div className="relative pb-8 group">
        <div className="flex px-4 flex-wrap justify-between place-items-center my-2">
          <h3 className="md:text-3xl font-bold text-white ">Recently Added</h3>
          <Link href="/recently-added" className="text-white select-none cursor-pointer text-xl hidden group-hover:block hover:text-cyan-400">
            show more &gt;
          </Link>
        </div>
        <Crousel autoPlay showDots keyBoardControl renderDotsOutside>
          {recentlyAdded.map(i => (
            <Card
              key={i.id}
              {...{
                title:
                  i?.attributes?.title?.en ||
                  i?.attributes?.altTitles?.[0]?.[Object.keys(i?.attributes?.altTitles?.[0])?.[0]],
                desc: i?.attributes?.description?.en,
                genere: i.attributes.tags.filter(tag => tag.attributes.group === 'genre').map(tag => tag.attributes.name.en),
                author: i.relationships?.find(t => t.type === 'author')?.attributes?.name,
                imageUrl: i.relationships?.find(t => t.type === 'cover_art')?.attributes?.fileName,
                id: i.id,
              }}
            />
          ))}
        </Crousel>
      </div>
      
      {/* --------------- Most Popular ---------------------- */}
      <div className="relative pb-8 group">
        <div className="flex px-4 flex-wrap justify-between place-items-center my-2">
          <h3 className="md:text-3xl font-bold text-white ">Most Popular</h3>
          <Link href="/most-popular" className="text-white select-none cursor-pointer text-xl hidden group-hover:block hover:text-cyan-400">
            show more &gt;
          </Link>
        </div>
        <Crousel autoPlay showDots keyBoardControl renderDotsOutside>
          {popularData.map(i => (
            <Card
              key={i.id}
              {...{
                title:
                  i?.attributes?.title?.en ||
                  i?.attributes?.title[Object.keys(popularData?.[0]?.attributes?.title)?.[0]] ||
                  i?.attributes?.altTitles?.[0]?.[Object.keys(i?.attributes?.altTitles?.[0])?.[0]],
                desc: i?.attributes?.description?.en,
                genere: i.attributes.tags.filter(tag => tag.attributes.group === 'genre').map(tag => tag.attributes.name.en),
                author: i.relationships?.find(t => t.type === 'author')?.attributes?.name,
                imageUrl: i.relationships?.find(t => t.type === 'cover_art')?.attributes?.fileName,
                id: i.id,
              }}
            />
          ))}
        </Crousel>
      </div>

      {/* --------------- Latest Updeted ---------------------- */}
      <div className="relative pb-8 group">
        <div className="flex px-4 flex-wrap align-middle justify-between place-items-center mb-2 mt-20">
          <h3 className="md:text-3xl font-bold text-white ">Latest Updeted</h3>
          <Link href="/latest-updated" className="text-white select-none cursor-pointer text-xl hidden group-hover:block hover:text-cyan-400">
            show more &gt;
          </Link>
        </div>
        <Crousel autoPlay showDots keyBoardControl renderDotsOutside>
          {recentlyUdated.map(i => (
            <Card
              key={i}
              {...{
                title:
                  i?.attributes?.title?.en ||
                  i?.attributes?.title[Object.keys(popularData?.[0]?.attributes?.title)?.[0]] ||
                  i?.attributes?.altTitles?.[0]?.[Object.keys(i?.attributes?.altTitles?.[0])?.[0]],
                desc: i?.attributes?.description?.en,
                genere: i.attributes.tags.filter(tag => tag.attributes.group === 'genre').map(tag => tag.attributes.name.en),
                author: i.relationships?.find(t => t.type === 'author')?.attributes?.name,
                imageUrl: i.relationships?.find(t => t.type === 'cover_art')?.attributes?.fileName,
                id: i.id,
                time: i.attributes?.updatedAt,
                volume: i?.attributes?.lastVolume,
                chapter: i?.attributes?.lastChapter,
              }}
            />
          ))}
        </Crousel>
      </div>

      {/* --------------- Seasonal ---------------------- */}
      <div className="relative pb-8 group">
        <div className="flex px-4 flex-wrap align-middle justify-between place-items-center mb-2 mt-20">
          <h3 className="md:text-3xl font-bold text-white">Seasonal Updates</h3>
          <Link href="/seasonal-updates" className="text-white select-none cursor-pointer text-xl hidden group-hover:block hover:text-cyan-400">
            show more &gt;
          </Link>
        </div>
        <Crousel autoPlay showDots keyBoardControl renderDotsOutside>
          {seasonalData.map(i => (
            <Card
              key={i}
              {...{
                title:
                  i?.attributes?.title?.en ||
                  i?.attributes?.title[Object.keys(popularData?.[0]?.attributes?.title)?.[0]] ||
                  i?.attributes?.altTitles?.[0]?.[Object.keys(i?.attributes?.altTitles?.[0])?.[0]],
                desc: i?.attributes?.description?.en,
                genere: i.attributes.tags.filter(tag => tag.attributes.group === 'genre').map(tag => tag.attributes.name.en),
                author: i.relationships?.find(t => t.type === 'author')?.attributes?.name,
                imageUrl: i.relationships?.find(t => t.type === 'cover_art')?.attributes?.fileName,
                id: i.id,
                imageMinWidth: '100px',
              }}
            />
          ))}
        </Crousel>
      </div>
    </section>
  );
}

export default Home;
