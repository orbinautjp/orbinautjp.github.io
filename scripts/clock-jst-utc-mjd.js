function currentTime () {
  const d = new Date()

  // displays jst and utc

  function localClock (id, area) {
    document.getElementById(id).textContent =
    d.toLocaleString('ja-JP', { timeZone: area })
  }
  localClock('jst_clock', 'Asia/Tokyo')
  localClock('utc_clock', 'UTC')

  // variables for mjd conversion formula

  const utcyear = d.getUTCFullYear()
  const utcmonth = d.getUTCMonth()
  const day = d.getUTCDate()
  const year = (utcmonth < 2) ? utcyear - 1 : utcyear
  const month = (utcmonth < 2) ? utcmonth + 13 : utcmonth + 1

  // variables for mjd decimals

  const hour = d.getUTCHours()
  const min = d.getUTCMinutes()
  const sec = d.getUTCSeconds()
  const mjdDecimal =
  Math.floor((hour + (min + (sec / 60)) / 60) / 24 * 10000) / 10000

  // formula for mjd conversion

  const mjd =
   Math.floor(365.25 * year) +
   Math.floor(year / 400) -
   Math.floor(year / 100) +
   Math.floor(30.59 * (month - 2)) +
   day - 678912 +
   mjdDecimal

  document.getElementById('mjd_clock').textContent = mjd.toFixed(4)
}

setInterval(currentTime, 500)
