// Test simple para función de formateo de fecha (puedes mover la función real si la tienes en otro archivo)

// Formateo manual para evitar problemas de zona horaria
function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '-';
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

test('formatea fecha a DD/MM/YYYY', () => {
  expect(formatDate('2025-07-06')).toBe('06/07/2025');
  expect(formatDate('invalid')).toBe('-');
});
