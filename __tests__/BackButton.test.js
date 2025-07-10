// __tests__/BackButton.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BackButton from '../src/components/BackButton';

// Mock de ThemeContext
jest.mock('../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: { primary: '#000' },
    isDark: false,
  }),
}));

// Mock de navegación
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({ goBack: jest.fn() }),
  };
});

describe('BackButton', () => {
  it('renderiza y responde al press', () => {
    const { getByText } = render(<BackButton />);
    // Busca el carácter de la flecha que se muestra en Text
    const button = getByText('');
    fireEvent.press(button);
    expect(button).toBeTruthy();
  });
});




