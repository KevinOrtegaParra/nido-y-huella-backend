const calcularEdad = (birthDate) => {

  const fechaNacimiento = new Date(birthDate);
  const fechaActual = new Date();

  let años =
    fechaActual.getFullYear() -
    fechaNacimiento.getFullYear();

  let meses =
    fechaActual.getMonth() -
    fechaNacimiento.getMonth();

  let dias =
    fechaActual.getDate() -
    fechaNacimiento.getDate();

  if (dias < 0) {
    meses--;
  }

  if (meses < 0) {
    años--;
    meses += 12;
  }

  if (años > 0) {

    return años === 1
      ? '1 año'
      : `${años} años`;

  }

  if (meses > 0) {

    return meses === 1
      ? '1 mes'
      : `${meses} meses`;

  }

  return dias <= 1
    ? '1 día'
    : `${dias} días`;
};


const formatearFechaNacimiento = (birthDate) => {

  const fecha = new Date(birthDate);

  return fecha.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
};


module.exports = {
  calcularEdad,
  formatearFechaNacimiento
};