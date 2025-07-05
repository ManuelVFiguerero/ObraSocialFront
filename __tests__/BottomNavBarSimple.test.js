import React from 'react';
import { render } from '@testing-library/react-native';
import BottomNavBar from '../src/components/BottomNavbar';

describe('BottomNavBar', () => {
  it('muestra el texto de Inicio', () => {
    const { getByText } = render(<BottomNavBar />);
    expect(getByText('Inicio')).toBeTruthy();
  });
});
