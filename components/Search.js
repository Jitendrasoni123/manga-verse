'use client';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import SearchCard from './SearchCard';
import Loading from './SearchCardLoading';

function MagnifyingGlass({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState([]);
  const [visible, setVisible] = useState(false);
  const searchRef = useRef(null);
  const inputChange = e => {
    setText(e.target.value);
    setLoading(true);
    axios
      .get('/api/search', { params: { title: e.target.value } })
      .then(res => {
        setResults(res?.data?.data);
        setLoading(false);
      })
      .catch(e => console.log(e));
  };

  const handleDocumentClick = event => {
    const searchResults = event.target.closest('.manga-search-results');
    if (searchRef.current && !searchRef.current.contains(event.target) && !searchResults) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div
      ref={searchRef}
      className="w-[400px] relative flex items-center bg-slate-700 rounded-xl py-2 text-color shadow sm:gap-6 px-4 ease-in-out duration-300">
      <MagnifyingGlass className="w-[25px] h-[25px]" />
      <input className="w-full bg-transparent focus:outline-none" onFocus={() => setVisible(true)} value={text} placeholder="Search for a manga..." onChange={inputChange} />
      {visible && results?.length > 0 && text?.length > 0 && (
        <div className="absolute bottom-0 flex flex-col gap-1 overflow-auto right-0 translate-y-[101%] bg-gray-600 min-h-fit max-h-[700px] w-[700px] rounded-xl p-1 manga-search-results">
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                {results?.map((i, index) => (
                  <SearchCard
                    handleClick={() => setVisible(false)}
                    key={index}
                    {...{
                      title: i?.attributes?.title?.en || i?.attributes?.altTitles?.[0]?.[Object.keys(i?.attributes?.altTitles?.[0])?.[0]],
                      author: i.relationships?.find(t => t.type === 'author')?.attributes?.name,
                      imageUrl: i.relationships?.find(t => t.type === 'cover_art')?.attributes?.fileName,
                      id: i.id,
                    }}
                  />
                ))}
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
}

export default Search;
