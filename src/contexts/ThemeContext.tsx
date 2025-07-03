// src/context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

const lightTheme = {
  mode: 'light',
  primary: '#1226A9',
  secondary: '#2D43B3',
  terciary: '#F3F4F8',
  textalternative: '#000000',
};

const darkTheme = {
  mode: 'dark',
  primary: '#1E88E5',
  secondary: '#90CAF9',
  terciary: '#1E1E1E',
  textalternative: '#F3F4F8',
};


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev.mode === 'light' ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para consumir el tema
export const useTheme = () => useContext(ThemeContext);

