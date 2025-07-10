// __tests__/Credential.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Credential from '../src/components/Credential';

// Mock de ThemeContext
jest.mock('../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      primary: '#000',
      terciary: '#fff',
      secondary: '#ccc',
    },
    isDark: false,
  }),
}));

describe('Credential', () => {
  it('muestra los datos y dispara handleDelete', () => {
    const mockData = {
      fullName: 'Juan Pérez',      // NO se renderiza en el componente
      memberNumber: 123456,
      organization: 'Plan A',
      dateSince: '2023-01-01',
      tipoAfiliado: 'VIP',
    };
    const handleDelete = jest.fn();

    const { getByText } = render(
      <Credential credentialData={mockData} handleDelete={handleDelete} />
    );

    // Sólo estos campos existen en el JSX:
    expect(getByText('Plan A')).toBeTruthy();
    expect(getByText('123456')).toBeTruthy();
    expect(getByText('Alta')).toBeTruthy();
    expect(getByText('2023-01-01')).toBeTruthy();
    expect(getByText('VIP')).toBeTruthy();

    // Botón de eliminar
    const deleteBtn = getByText('Eliminar');
    fireEvent.press(deleteBtn);
    expect(handleDelete).toHaveBeenCalled();
  });
});



