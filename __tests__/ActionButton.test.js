// __tests__/ActionButton.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ActionButton from '../src/components/ActionButton';
import { useNavigation } from '@react-navigation/native';

// Mock ThemeContext
jest.mock('../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      secondary: '#000',
      terciary: '#fff',
    },
    isDark: false,
  }),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('ActionButton', () => {
  it('renderiza y navega al presionar', () => {
    const navigateMock = jest.fn();
    useNavigation.mockReturnValue({ navigate: navigateMock });

    const { getByText } = render(
      <ActionButton
        btnName="Ir a Home"
        btnIcon="home"
        screen="Home"
      />
    );

    const btn = getByText('Ir a Home');
    fireEvent.press(btn);
    expect(navigateMock).toHaveBeenCalledWith('Home');
  });
});

