import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'teal' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'teal' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const getStored = (): Theme | null => {
    try { return (localStorage.getItem('theme') as Theme) || null; } catch { return null; }
  };
  const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial: Theme = getStored() || 'system';
  const [theme, setTheme] = useState<Theme>(initial);
  const [resolvedTheme, setResolvedTheme] = useState<'teal' | 'dark'>(initial === 'system' ? (prefersDark() ? 'dark' : 'teal') : initial);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      if (theme === 'system') {
        const next = media.matches ? 'dark' : 'teal';
        setResolvedTheme(next);
      }
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') {
      setResolvedTheme(theme);
    } else {
      setResolvedTheme(prefersDark() ? 'dark' : 'teal');
    }
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    if (resolvedTheme === 'dark') root.classList.add('dark');
  }, [resolvedTheme]);

  useEffect(() => {
    try { localStorage.setItem('theme', theme); } catch { /* ignore storage errors */ }
  }, [theme]);

  const toggleTheme = () => {
    // Cycle teal -> dark -> system -> teal
    setTheme(prev => prev === 'teal' ? 'dark' : prev === 'dark' ? 'system' : 'teal');
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}