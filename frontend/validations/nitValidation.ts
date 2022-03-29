// https://es.wikipedia.org/wiki/N%C3%BAmero_de_Identificaci%C3%B3n_Tributaria#:~:text=El%20N%C3%BAmero%20de%20Identificaci%C3%B3n%20Tributaria,RUT%20(Registro%20%C3%9Anico%20Tributario).

// Cálculo del dígito de verificación
// El algoritmo para calcular el dígito de verificación está definido en la Orden  a dministrativa 4 de 1989 de la DIAN.

// Pseudocódigo para NIT validación

// Nota: Solo cubre NIT en formato XXX.XXX.XXX - Y, aunque existen otros en formatos de 8 o incluso 15 dígitos antes del de verificación .1​

// De izquierda a derecha, todas las cifras se multiplican por una secuencia 41 37 29 23 19 17 13 7 3.
// La suma de todos los productos que se calcula.
// La suma del paso 2 se toma módulo 11.
// Si el resultado de la operación del paso 3 es 0 o 1, este valor es el dígito de verificación
// Si el resultado del paso 3 es mayor que 1, entonces 11 - el valor del paso 3 es el dígito de verificación

export default function nitValidation(nit: number) {
  let v: number;
  v = 41 * nit[1] + 37 * nit[2] + 29 * nit[3];
  v += 23 * nit[4] + 19 * nit[5] + 17 * nit[6];
  v += 13 * nit[7] + 7 * nit[8] + 3 * nit[9];
  v = v % 11;
  if (v >= 2) {
    v = 11 - v;
  }
  /* True si la verificación de dígitos como se esperaba.*/
  return v === nit[10];
}
