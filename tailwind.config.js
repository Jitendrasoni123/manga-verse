/** @type {import('tailwindcss').Config} */
const genereColor = {
  default: 'bg-gray-200 text-gray-800',
  romance: 'bg-pink-300 text-pink-800',
  comedy: 'bg-yellow-300 text-yellow-800',
  'slice of life': 'bg-neutral-300 text-neutral-800',
  drama: 'bg-red-700 text-red-100',
  action: 'bg-red-500 text-white',
  adventure: 'bg-orange-400 text-orange-800',
  fantasy: 'bg-purple-300 text-purple-800',
  isekai: 'bg-indigo-300 text-indigo-800',
  "girls' love": 'bg-pink-400 text-pink-800',
  sports: 'bg-green-500 text-green-50',
  crime: 'bg-gray-600 text-gray-100',
  psychological: 'bg-stone-400 text-stone-800',
  horror: 'bg-red-100 text-red-500',
  'sci-fi': 'bg-sky-600 text-sky-100',
  historical: 'bg-amber-700 text-amber-100',
  thriller: 'bg-violet-700 text-violet-100',
  superhero: 'bg-blue-600 text-blue-100',
};

export const content = ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'];

export const theme = {
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      'custom-gradient': 'linear-gradient(180deg, transparent, rgba(0,0,0,.8))',
    },
  },
};
export const safelist = Object.values(genereColor).flatMap(color => color.split(' '));
export const plugins = [];
