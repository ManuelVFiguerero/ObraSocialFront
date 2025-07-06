import React from 'react';
import { render } from '@testing-library/react-native';

// Ajusta el test para buscar un texto visible real
import HistoryCard from '../src/components/HistoryCard';

describe('HistoryCard', () => {
  it('renderiza el componente', () => {
    const estudio = { nombre: 'Radiografía', fecha: '2025-07-06', estado: 'Listo' };
    const { toJSON } = render(<HistoryCard estudio={estudio} />);
    expect(toJSON()).toBeTruthy();
  });
});
