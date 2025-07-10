// __tests__/Login.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginForm from '../src/components/LoginForm';

// Mock de ThemeContext
jest.mock('../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      card: '#fff',
      background: '#fff',
      input: '#fff',
      text: '#000',
      border: '#ccc',
      placeholder: '#aaa',
      primary: '#007bff',
      buttonText: '#fff',
    },
    isDark: false,
  }),
}));

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
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

// ✅ Mock de Toast
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

import Toast from 'react-native-toast-message';

describe('LoginForm', () => {
  it('renderiza los inputs y el botón', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <LoginForm />
      </NavigationContainer>
    );

    expect(getByPlaceholderText('Usuario*')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña*')).toBeTruthy();
    expect(getByText('Iniciar sesión')).toBeTruthy();
  });

  it('muestra TOAST si los campos están vacíos', () => {
    const { getByText } = render(
      <NavigationContainer>
        <LoginForm />
      </NavigationContainer>
    );

    fireEvent.press(getByText('Iniciar sesión'));

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text1: 'Campos requeridos',
      })
    );
  });
});
