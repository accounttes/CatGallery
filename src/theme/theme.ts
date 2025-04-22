import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#FFFFFF',
    card: '#F8F9FA',
    text: '#212529',
    border: '#DEE2E6',
    notification: '#FF6B6B',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#2C2C2C',
    notification: '#FF6B6B',
  },
};

export type Theme = typeof lightTheme; 