'use client'
import React, { useEffect, useState } from 'react';

function ThemeChanger() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Update the state to match the current theme in localStorage
    const currentTheme = window.localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    // Apply the current theme
    changeTheme(currentTheme);
  }, []);

  const changeTheme = (mode) => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newMode = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newMode);
    changeTheme(newMode);
    setTheme(newMode);
  };

  return (
    <button className="flex items-center gap-[10px]" onClick={toggleTheme}>
      <span className="material-symbols-outlined">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
      <span className="text-[14px] md:text-[17px]">{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
    </button>
  );
}

export default ThemeChanger;
