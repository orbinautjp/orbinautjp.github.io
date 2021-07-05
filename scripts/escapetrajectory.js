function createApplet (URL) {
  const parameter = {
    scaleContainerClass: 'ggbapplet',
    appName: 'classic',
    enableRightClick: false,
    enableLabelDrags: false,
    showtoolbar: false,
    showZoomButtons: true,
    showFullscreenButton: true
  }
  const param = Object.assign({ filename: URL }, parameter)
  const applet = new GGBApplet(param, true)
  return applet
}

window.addEventListener('load', function () {
  createApplet('/resources/geogebra/EscapeTrajectory.ggb').inject('applet_container1')
  createApplet('/resources/geogebra/PlanetRotation.ggb').inject('applet_container2')
})
