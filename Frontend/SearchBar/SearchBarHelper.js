({
  isValidDni: function (dni) {
    let minDni = 5000000;
    let maxDni = 70000000;
    if (isNaN(dni) == true || dni < minDni || dni > maxDni) {
      alert("No se ha ingresado un DNI valido");
      return false;
    }
    return true;
  },
});
