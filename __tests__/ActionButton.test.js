import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ActionButton from '../src/components/ActionButton';
import { NavigationContainer } from '@react-navigation/native';

describe('ActionButton', () => {
  it('renderiza el componente', () => {
    const { toJSON } = render(
      <NavigationContainer>
        <ActionButton btnName="Aceptar" onPress={() => {}} />
      </NavigationContainer>
    );
    expect(toJSON()).toBeTruthy();
  });
});
