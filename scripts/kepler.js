function keplerCalc () {
  const Radians = Math.PI / 180
  const Ecc = parseFloat(document.getElementById('ecc_input').value)
  const M = parseFloat(document.getElementById('mna_input').value) * Radians
  function newtonKepler (a) {
    function f (x) {
      return x - Ecc * Math.sin(x) - M
    }
    function df (x) {
      return 1 - Ecc * Math.cos(x)
    }
    for (let i = 0; i < 100; i++) {
      const b = a - f(a) / df(a)
      if (Math.abs(b - a) < 0.000001) { break }
      a = b
    }
    return a
  }
  const E = newtonKepler(M)
  const TrA =
   Math.atan(
     Math.sqrt((1 + Ecc) / (1 - Ecc)) * Math.tan(E / 2)
   ) * 2
  const TrA1 = (TrA < 0) ? TrA + 2 * Math.PI : TrA
  document.getElementById('eca_output').textContent = (E / Radians).toFixed(2)
  document.getElementById('tra_output').textContent = (TrA1 / Radians).toFixed(2)
}
document.getElementById('button_kepler').addEventListener('click', keplerCalc)
