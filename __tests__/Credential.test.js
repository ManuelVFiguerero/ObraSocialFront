import React from 'react';
import { render } from '@testing-library/react-native';
import Credential from '../src/components/Credential';

describe('Credential', () => {
  it('renderiza el componente', () => {
    const credentialData = {
      fullName: 'Juan Perez',
      organization: 'OSDE',
      memberNumber: '123456',
      dni: '12345678',
      plan: '210',
      expiration: '2025-12-31',
    };
    const { toJSON } = render(<Credential credentialData={credentialData} />);
    expect(toJSON()).toBeTruthy();
  });
});
