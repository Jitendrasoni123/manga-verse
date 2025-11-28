import BookView from '@/components/BookView';
import getData from '@/helpers/api';
import React from 'react';

async function MangaRead({ params: { id } }) {
  const detail = await getData(`api/chapters/${id}`);
  return <BookView data={detail} />;
}

export default MangaRead;
