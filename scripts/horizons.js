function downloadScn () {
  /* error messages */
  function errMessage (txt = 'コピーする範囲を間違えています。') {
    window.alert(txt)
  }
  /* coordinate origin */
  const centerBody = document.getElementById('centerbody').value
  if (centerBody.length === 0) {
    errMessage('中心天体の名前を入力してください。')
    return
  } else if (centerBody.charCodeAt(0) >= 256) {
    errMessage('英語で入力してください。')
    return
  }
  const centerTitle =
    centerBody.substr(0, 1).toUpperCase() +
    centerBody.substr(1).toLowerCase()
  /* input (textarea) */
  const inputData = document.getElementById('input_horizons').value
  if (inputData === '') {
    errMessage('入力欄が空白です。')
    return
  } else if (inputData.includes('=') === false) {
    errMessage()
    return
  }
  const textArray = inputData.split('=')
  if (textArray.length < 8) {
    errMessage()
    return
  }
  /* MJD */
  const regJD = /\d{7}\.\d{9}/
  const JDString = textArray[0].toString()
  const JD = Number(JDString.match(regJD))
  const MJD = JD - 2400000.5
  /* Date */
  const dateObj = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  }
  const regDate = /\d{4}-[a-zA-Z]{3}-\d{2}/
  const regMonth = /[a-zA-Z]{3}/
  const regTime = /\d{2}:\d{2}:\d{2}/
  const dateString = textArray[1].toString()
  const dateValue = dateString.match(regDate).toString()
  const monthValue = dateValue.match(regMonth).toString()
  const monthNumber = dateObj[monthValue]
  const dateHyphen = dateValue.replace(monthValue, monthNumber)
  const Date = dateHyphen.replace(/-/g, '')
  const Time = dateString.match(regTime).toString()
  /* state vector */
  function component (x) {
    const regDecimal = /-?\d+\.\d+/
    const regExp = /E(\+|-)\d{2}/
    const textString = textArray[x].toString()
    const Decimal = Number(textString.match(regDecimal))
    const ExpArray = textString.match(regExp)
    if (ExpArray == null) {
      errMessage()
    }
    const ExpString = ExpArray.toString()
    const ExpNumber = Number(ExpString.match(/-?\d{2}/))
    const Exp = 10 ** (3 + ExpNumber)
    return Decimal * Exp
  }
  const posX = component('2')
  const posY = component('4')
  const posZ = component('3')
  const velX = component('5')
  const velY = component('7')
  const velZ = component('6')
  /* scenario data */
  const scnData = `BEGIN_DESC
State vector from JPL Horizons.


Date: ${dateHyphen} ${Time}
END_DESC

BEGIN_ENVIRONMENT
  System Sol
  Date MJD ${MJD}
END_ENVIRONMENT

BEGIN_FOCUS
  Ship GL-01
END_FOCUS

BEGIN_CAMERA
  TARGET GL-01
  MODE Cockpit
  FOV 50.00
END_CAMERA

BEGIN_HUD
  TYPE Orbit
  REF AUTO
END_HUD

BEGIN_SHIPS
GL-01:DeltaGlider
  STATUS Orbiting ${centerTitle}
  RPOS ${posX} ${posY} ${posZ}
  RVEL ${velX} ${velY} ${velZ}
  RCSMODE 1
  PRPLEVEL 0:0.995000 1:1.000000
  NAVFREQ 94 524 84 114
  XPDR 0
END
END_SHIPS
`
  /* file name (optional) */
  const nameInput = document.getElementById('filename').value
  function optionalName (a) {
    if (a === '') {
      a = 'horizons'
      return a
    } else {
      return a
    }
  }
  /* blob for scn file */
  const blob = new Blob([scnData], { type: 'text/plain' })
  const scnURL = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  const fileName = optionalName(nameInput) + '_' + Date + '.scn'
  link.download = fileName
  link.href = scnURL
  /* stop execution when JD is not a number */
  if (isNaN(JD)) {
    errMessage()
  } else if (JDString.match(regJD) == null) {
    errMessage()
  } else {
    link.click()
  }
  /* revoke URL when execution is over */
  URL.revokeObjectURL(link.href)
}

document.getElementById('button1').addEventListener('click', downloadScn)
