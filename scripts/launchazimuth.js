function launchAzimuth () {
  const inc = document.querySelector('#inc').value
  const lat = document.querySelector('#lat').value
  const velGround = document.querySelector('#vel_ground').value
  const velTarget = document.querySelector('#vel_target').value
  const radians = Math.PI / 180

  // formula for inertial model

  const inertial =
    Math.asin(Math.cos(inc * radians) / Math.cos(lat * radians))
  const inertialNorth = inertial / radians
  const inertialSouth = 180 - inertialNorth

  // output for inertial model

  if (lat >= 90 || lat <= -90) {
    document.querySelector('#inertial_north').textContent = NaN
    document.querySelector('#inertial_south').textContent = NaN
  } else {
    if (inertialNorth < 0) {
      const inertialNorth1 = 360 + inertialNorth
      document.querySelector('#inertial_north').textContent = inertialNorth1.toFixed(1)
    } else {
      document.querySelector('#inertial_north').textContent = inertialNorth.toFixed(1)
    }
    document.querySelector('#inertial_south').textContent = inertialSouth.toFixed(1)
  }

  // formula for rotational model

  const rotational =
   Math.atan((velTarget * Math.sin(inertial) - velGround) / (velTarget * Math.cos(inertial)))
  const rotationalNorth = rotational / radians
  const rotationalSouth = 180 - rotationalNorth

  // output for rotational model

  if (lat >= 90 || lat <= -90 || velTarget <= 0) {
    document.querySelector('#rotational_north').textContent = NaN
    document.querySelector('#rotational_south').textContent = NaN
  } else {
    if (rotationalNorth < 0) {
      const rotationalNorth1 = 360 + rotationalNorth
      document.querySelector('#rotational_north').textContent = rotationalNorth1.toFixed(1)
    } else {
      document.querySelector('#rotational_north').textContent = rotationalNorth.toFixed(1)
    }
    document.querySelector('#rotational_south').textContent = rotationalSouth.toFixed(1)
  }
}

document.querySelector('#button1').addEventListener('click', launchAzimuth)
