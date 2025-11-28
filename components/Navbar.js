import React from 'react';
import Search from './Search';
import Image from 'next/image';
import Icon from '../public/icon.jpeg';
import Link from 'next/link';
import ThemeChanger from './TheamChanger';

function Navbar() {
  return (
    <div className="bg-gray-800 h-[80px] z-[1100] shadow[10px_0px_10px_gray] top-0 px-8 fixed left-0 right-0 flex items-center justify-between text-white">
      <Link href="/" className="flex place-items-center justify-center gap-5 text-2xl select-none cursor-pointer">
        <Image src={Icon} height={50} width={50} alt="MangaVerse" className="pointer-events-none" />
        <span className="hidden md:block ">MangaVerse</span>
      </Link>
      <Search />
      <ThemeChanger />
    </div>
  );
}

export default Navbar;
