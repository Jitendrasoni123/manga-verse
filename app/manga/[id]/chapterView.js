import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import ISO6391 from 'iso-639-1';
dayjs.extend(relativeTime);

function ChapterView({ data }) {
  return (
    <div className="px-5 py-6 flex flex-col gap-5">
      {data?.map(i => (
        <div key={i?.volume}>
          <div className="text-2xl text-center mb-3">{i?.volume}</div>
          <div className="flex flex-col gap-5">
            {i?.chapters?.map(chapter => (
              <div key={chapter} className="p-3 bg-slate-800 rounded-xl">
                <div className="mb-3">Chapter: {chapter?.chapter}</div>
                <div className="flex flex-col gap-2">
                  {chapter?.data?.map(i => (
                    <Link href={`/read/${i?.id}`} key={i?.id} className="bg-slate-700 rounded-lg p-3 group/chapter relative">
                      <div className="flex justify-between place-items-center">
                        <span className="group-hover/chapter:text-cyan-400 text-xl">{i?.attributes?.title || `Chapter: ${chapter?.chapter}`}</span>
                        <div>
                          <div>
                            {ISO6391.getName(i?.attributes?.translatedLanguage?.split('-')?.[0])}
                            {i?.attributes?.translatedLanguage?.split('-')?.[1] ? ` (${i?.attributes?.translatedLanguage?.split('-')?.[1]?.toUpperCase()})` : ''}
                          </div>
                          <div className="text-end">{dayjs(i?.attributes?.readableAt).fromNow()}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* {Object.entries(data).map(([key, value]) => {
        return (
          // <div key={key}>
          //   <h1>{key}</h1>
          //   <p>{JSON.stringify(value)}</p>
          // </div>

          // <div className="flex relative pb-12" key={key}>
          //   {key === 161 && console.log(value)}
          //   <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
          //     <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          //   </div>
          //   <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
          //     <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
          //       <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          //     </svg>
          //   </div>
          //   <div className="flex-grow pl-4">
          //     <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Volume - {key}</h2>
          //     {value.map(item => (
          //       <div key={item.id} className="mb-2">
          //         <p>
          //           <span>CH-{item.attributes.chapter || ''}&nbsp;</span>
          //           {item.attributes.title || ''}
          //         </p>
          //       </div>
          //     ))}
          //   </div>
          </div>
        );
      })} */}
    </div>
  );
}

export default ChapterView;
