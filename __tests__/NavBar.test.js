import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from '../src/components/NavBar';

describe('NavBar', () => {
  it('renderiza el componente', () => {
    const { toJSON } = render(
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    );
    expect(toJSON()).toBeTruthy();
  });
});
