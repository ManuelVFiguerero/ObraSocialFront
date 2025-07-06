import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import BackButton from '../src/components/BackButton';

describe('BackButton', () => {
  it('renderiza el componente', () => {
    const { toJSON } = render(
      <NavigationContainer>
        <BackButton onPress={() => {}} />
      </NavigationContainer>
    );
    expect(toJSON()).toBeTruthy();
  });
});
