import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightTheme = {
  mode: 'light',
  background: '#F3F4F8',
  card: '#fff',
  text: '#222',
  primary: '#2D43B3',
  secondary: '#3A7BFF',
  input: '#fff',
  border: '#ddd',
  placeholder: '#888',
  button: '#2D43B3',
  buttonText: '#fff',
};

const darkTheme = {
  mode: 'dark',
  background: '#181A20',
  card: '#23262F',
  text: '#F3F4F8',
  primary: '#3A7BFF',
  secondary: '#2D43B3',
  input: '#23262F',
  border: '#333',
  placeholder: '#aaa',
  button: '#3A7BFF',
  buttonText: '#fff',
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('theme');
      if (saved === 'dark') {
        setIsDark(true);
        setTheme(darkTheme);
      } else if (saved === 'light') {
        setIsDark(false);
        setTheme(lightTheme);
      } else {
        // Detecta el sistema
        const colorScheme = Appearance.getColorScheme();
        if (colorScheme === 'dark') {
          setIsDark(true);
          setTheme(darkTheme);
        }
      }
    })();
  }, []);

  const toggleTheme = async () => {
    if (isDark) {
      setIsDark(false);
      setTheme(lightTheme);
      await AsyncStorage.setItem('theme', 'light');
    } else {
      setIsDark(true);
      setTheme(darkTheme);
      await AsyncStorage.setItem('theme', 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
