import React from 'react';
import { render } from '@testing-library/react-native';
import Header from '../src/components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';

describe('Header', () => {
  it('renderiza el componente', () => {
    const { toJSON } = render(
      <SafeAreaProvider>
        <Header title="Mi Título" />
      </SafeAreaProvider>
    );
    expect(toJSON()).toBeTruthy();
  });
});
