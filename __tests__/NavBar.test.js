import React from 'react';
import { render } from '@testing-library/react-native';
import NavBar from '../src/components/NavBar';

// Mock de useTheme
jest.mock('../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      background: '#fff',
      primary: '#000',
      text: '#000',
    },
    isDark: false,
    toggleTheme: jest.fn(),
  }),
}));

// Mock de navegación
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('NavBar', () => {
  it('renderiza el componente', () => {
    const { getByText } = render(<NavBar />);
    expect(getByText('Cerrar sesión')).toBeTruthy();
  });
});

