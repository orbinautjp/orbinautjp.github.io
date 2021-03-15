function getNumber (id) {
  return parseInt(document.getElementById(id).value)
}
function getInput (id, targetFunction) {
  document.getElementById(id).addEventListener('input', targetFunction)
}

// utc to mjd converter

function mjdConverter () {
  const year1 = getNumber('year')
  const month1 = getNumber('month')
  const day = getNumber('day')
  const year = (month1 < 3) ? year1 - 1 : year1
  const month = (month1 < 3) ? 12 + month1 : month1

  // formula for mjd conversion

  const mjd =
    Math.floor(365.25 * year) +
    Math.floor(year / 400) -
    Math.floor(year / 100) +
    Math.floor(30.59 * (month - 2)) +
    day - 678912

  // output for mjd conversion

  document.getElementById('mjd').value = mjd
}

getInput('year', mjdConverter)
getInput('month', mjdConverter)
getInput('day', mjdConverter)

// mjd to utc converter

function utcConverter () {
  const mjd = getNumber('mjd')

  // formula for utc conversion

  const a = Math.floor(mjd + 2468570)
  const b = Math.floor(a / 36524.25)
  const c = a - Math.floor(36524.25 * b + 0.75)
  const e = Math.floor((c + 1) / 365.25025)
  const f = c - Math.floor(365.25 * e) + 31
  const g = Math.floor(f / 30.59)
  const h = Math.floor(g / 11)

  const day = f - Math.floor(30.59 * g)
  const month = g - 12 * h + 2
  const year = 100 * (b - 49) + e + h

  // output for utc conversion

  document.getElementById('day').value = day
  document.getElementById('month').value = month
  document.getElementById('year').value = year
}

getInput('mjd', utcConverter)
