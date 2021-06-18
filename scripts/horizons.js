function downloadScn () {
  /* error messages */
  function errMessage (txt = 'コピーする範囲を間違えています。') {
    window.alert(txt)
  }
  /* coordinate origin */
  const centerBody = document.getElementById('centerbody').value
  const regCenterNumber = /\d+/
  const regCenterAt = /@/
  if (centerBody.length === 0) {
    errMessage('中心天体の名前を入力してください。')
    return
  } else if ((regCenterNumber.test(centerBody) === true) ||
   (regCenterAt.test(centerBody) === true) ||
   (centerBody.charCodeAt(0) >= 256)) {
    errMessage('中心天体の名前を英語で入力してください。 \n @は不要です。')
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
  /* Epoch */
  const monthObj = {
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
  const regEpoch = /\d{4}-[a-zA-Z]{3}-\d{2}/
  const regMonth = /[a-zA-Z]{3}/
  const regTime = /\d{2}:\d{2}:\d{2}/
  const epochArray = textArray[1].toString()
  const epochString = epochArray.match(regEpoch).toString()
  const monthString = epochArray.match(regMonth).toString()
  const monthNumber = monthObj[monthString]
  const epochHyphen = epochString.replace(monthString, monthNumber)
  const Epoch = epochHyphen.replace(/-/g, '')
  const Time = epochArray.match(regTime).toString()
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


Epoch: ${epochHyphen} ${Time}
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
  if (nameInput.charCodeAt(0) >= 256) {
    errMessage('ファイル名は半角英数字で入力してください。')
    return
  }
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
  const fileName = optionalName(nameInput) + '_' + Epoch + '.scn'
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
  window.URL.revokeObjectURL(scnURL)
}

document.getElementById('button1').addEventListener('click', downloadScn)
