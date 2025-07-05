import React from 'react';
import { render } from '@testing-library/react-native';
import BottomNavBar from '../src/components/BottomNavbar';

describe('BottomNavBar', () => {
  it('muestra los textos de navegación', () => {
    const { getByText } = render(<BottomNavBar />);
    expect(getByText('Inicio')).toBeTruthy();
    expect(getByText('Mi perfil')).toBeTruthy();
    expect(getByText('Credenciales')).toBeTruthy();
    expect(getByText('Notificaciones')).toBeTruthy();
  });
});
