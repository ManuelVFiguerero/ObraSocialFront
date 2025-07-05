// Prueba unitaria simple de suma
function suma(a, b) {
  return a + b;
}

test('suma 1 + 2 es igual a 3', () => {
  expect(suma(1, 2)).toBe(3);
});
