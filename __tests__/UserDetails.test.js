// __tests__/UserDetails.test.js
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import UserDetails from '../src/components/UserDetails';

// Mock ThemeContext
jest.mock('../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      background: '#fff',
      primary: '#000',
      terciary: '#000',
    },
    isDark: false,
  }),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(async key => {
    if (key === 'username') return 'Caluma';
    if (key === 'userId') return '1';
    return null;
  }),
}));

// Mock our API client
jest.mock('../src/api/Client', () => ({
  api: {
    get: jest.fn(url => {
      if (url.includes('/users/get-user-by-username')) {
        return Promise.resolve({ data: { name: 'Lucas', surname: 'Carretto' } });
      }
      if (url.includes('/api/obras-sociales/usuario')) {
        return Promise.resolve({ data: { numeroAfiliado: '987654' } });
      }
      return Promise.resolve({ data: {} });
    }),
  },
}));

describe('UserDetails', () => {
  it('muestra el nombre completo y el número de obra social', async () => {
    const { getByText } = render(<UserDetails />);

    await waitFor(() => {
      // Nombre completo
      expect(getByText('Lucas Carretto')).toBeTruthy();
      // Número de afiliado
      expect(getByText('987654')).toBeTruthy();
    });
  });
});

