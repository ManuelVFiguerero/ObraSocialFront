import React from 'react';
import { render } from '@testing-library/react-native';
import UserDetails from '../src/components/UserDetails';

describe('UserDetails', () => {
  it('renderiza el componente', () => {
    const { toJSON } = render(<UserDetails nombre="Lucas" dni="12345678" />);
    expect(toJSON()).toBeTruthy();
  });
});
