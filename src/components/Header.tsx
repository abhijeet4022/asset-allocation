import React, { useContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex justify-between items-center py-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          SIP Rebalancing Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Optimize your investments based on your age bracket
        </p>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
};