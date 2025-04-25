import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Calculator } from './components/Calculator';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Header />
          <main className="mt-8">
            <Calculator />
          </main>
          <footer className="mt-16 mb-8 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} SIP Rebalancing Calculator. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;