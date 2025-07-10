// __tests__/NotificationCard.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NotificationCard from '../src/components/NotificationCard';

// Mock de ThemeContext
jest.mock('../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      background: '#ffffff',
      neutral: '#888888',
      quaternary: '#000000',
    },
    isDark: false,
  }),
}));

describe('NotificationCard', () => {
  it('renderiza título, descripción y responde al press', () => {
    const onPressMock = jest.fn();
    const props = {
      date: '03/07',
      hour: '20:30',
      title: 'Título prueba',
      description: 'Mensaje de prueba',
      onPress: onPressMock,
      animatedValue: { interpolate: jest.fn(() => 0) },
    };

    const { getByText, getByRole } = render(
      <NotificationCard {...props} />
    );

    // Verifica que el título y la descripción se muestren
    expect(getByText('Título prueba')).toBeTruthy();
    expect(getByText('Mensaje de prueba')).toBeTruthy();

    // Presiona la tarjeta usando la accesibilidad de rol 'button'
    const pressable = getByRole('button');
    fireEvent.press(pressable);
    expect(onPressMock).toHaveBeenCalled();
  });
});

