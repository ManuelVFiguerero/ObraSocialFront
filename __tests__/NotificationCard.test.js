import React from 'react';
import { render } from '@testing-library/react-native';

// Si el componente NotificationCard espera props diferentes, ajusta aquí:
import NotificationCard from '../src/components/NotificationCard';

describe('NotificationCard', () => {
  it('renderiza el componente', () => {
    const noti = { title: 'Turno confirmado', body: 'Tu turno fue confirmado', date: '2025-07-06' };
    const { toJSON } = render(<NotificationCard notification={noti} />);
    expect(toJSON()).toBeTruthy();
  });
});
