import React from 'react';
import { render } from '@testing-library/react-native';
import MyAppointments from '../src/components/MyAppointments';

describe('MyAppointments', () => {
  it('muestra mensaje si no hay turnos', () => {
    const { getByText } = render(<MyAppointments />);
    expect(getByText('No hay turnos próximos')).toBeTruthy();
  });
});
