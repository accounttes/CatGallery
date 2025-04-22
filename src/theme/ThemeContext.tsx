import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  colors: Theme['colors'];
  toggleTheme: () => void;
}

const lightTheme: Theme = {
  colors: {
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#ffffff',
    text: '#000000',
    error: '#ff3b30',
    success: '#34c759',
    border: '#e0e0e0',
    card: '#f5f5f5',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};

const darkTheme: Theme = {
  colors: {
    primary: '#bb86fc',
    secondary: '#03dac6',
    background: '#121212',
    text: '#ffffff',
    error: '#cf6679',
    success: '#30d158',
    border: '#2c2c2c',
    card: '#1e1e1e',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  colors: lightTheme.colors,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemTheme === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(systemTheme === 'dark' ? darkTheme : lightTheme);
  }, [systemTheme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, colors: theme.colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 