// Test simple para función de formateo de fecha y hora (puedes mover la función real si la tienes en otro archivo)
function formatFechaHora(fechaIso) {
  if (!fechaIso) return '-';
  const fecha = new Date(fechaIso);
  if (isNaN(fecha.getTime())) return '-';
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();
  const hora = fecha.getHours().toString().padStart(2, '0');
  const min = fecha.getMinutes().toString().padStart(2, '0');
  return `${dia}/${mes}/${anio} ${hora}:${min}hs`;
}

test('formatea fecha y hora correctamente', () => {
  expect(formatFechaHora('2025-07-06T14:30:00Z')).toContain('06/07/2025');
  expect(formatFechaHora('')).toBe('-');
  expect(formatFechaHora('invalid')).toBe('-');
});
