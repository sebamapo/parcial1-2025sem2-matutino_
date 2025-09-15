/*
# Ejercicio 03.

La función `showRandomDigit` está asociada al click en el display. Al ejecutarse
debe definir un valor aleatorio entre 0 y 9 y mostrar el dígito correspondiente.
*/
//son los segmentos necesarios para encender cada dígito del 0 al 9.

const digitSegments = {
  0: ['seg-a', 'seg-b', 'seg-c', 'seg-d', 'seg-e', 'seg-f'],
  1: ['seg-b', 'seg-c'],
  2: ['seg-a', 'seg-b', 'seg-g', 'seg-e', 'seg-d'],
  3: ['seg-a', 'seg-b', 'seg-g', 'seg-c', 'seg-d'],
  4: ['seg-f', 'seg-g', 'seg-b', 'seg-c'],
  5: ['seg-a', 'seg-f', 'seg-g', 'seg-c', 'seg-d'],
  6: ['seg-a', 'seg-f', 'seg-g', 'seg-c', 'seg-d', 'seg-e'],
  7: ['seg-a', 'seg-b', 'seg-c'],
  8: ['seg-a', 'seg-b', 'seg-c', 'seg-d', 'seg-e', 'seg-f', 'seg-g'],
  9: ['seg-a', 'seg-b', 'seg-c', 'seg-d', 'seg-f', 'seg-g']
};

function showRandomDigit() {
  const randomDigit = Math.floor(Math.random() * 10);

  document.querySelectorAll('.segment').forEach(segment => {
    segment.style.background = '#030303'; // Color apagado
  });
  digitSegments[randomDigit].forEach(segmentId => {
    document.getElementById(segmentId).style.background = '#e0e000';
  });
}
