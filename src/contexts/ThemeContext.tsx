// src/context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

const lightTheme = {
  mode: 'light',
  primary: '#1226A9', //Azul Primario
  secondary: '#2D43B3', //Azul Secundario
  terciary: '#F3F4F8', // Blanco
  quaternary: '#212121', //Negro
  background: '#F3F4F8', //Fondo de screens
  neutral: '#666' //Gris
};

const darkTheme = {
  mode: 'dark',
  primary: '#4A6AFF',      // Azul vibrante para resaltar botones, links, íconos
  secondary: '#3A55D1',    // Azul más oscuro y suave, para estados secundarios o hover
  terciary: '#F3F4F8',     // Blanco
  quaternary: '#F2F2F2',   // Blanco, para títulos y textos destacados
  background: '#1C1C1E', //Fondo de screens
  neutral: '#888888',      // Gris medio, para bordes, texto secundario y placeholders
};


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const isDark = theme.mode === 'dark';

  const toggleTheme = () => {
    setTheme((prev) => (prev.mode === 'light' ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


// Hook personalizado para consumir el tema
export const useTheme = () => useContext(ThemeContext);

