import Logo from './n-logo.js'

var resizing = false
var logoEl = document.getElementById('logo')
var body = document.querySelector('body')
var cont = document.getElementById('container')
var info = document.getElementById('info')
var logoSize = getLogoSize(logoEl)
var logo = new Logo('canvas', logoSize)

bodyHeight()
logo.animate()

window.onresize = () => {
  clearTimeout(resizing)
  resizing = setTimeout(function () {
    logoSize = getLogoSize(logoEl)
    logo.setWidth(logoSize)
    logo._initParams()
    logo.draw()
    bodyHeight()
  }, 500)
}

function bodyHeight () {
  if (cont.clientHeight > window.innerHeight) {
    body.style.height = 'auto'
    logoEl.style.paddingTop = '50px'
  } else {
    var h = logoEl.clientHeight + info.clientHeight
    body.style.height = '100vh'
    logoEl.style.paddingTop = (window.innerHeight - h) / 2 + 'px'
  }
}

function getLogoSize (el) {
  var w = window.innerWidth - 20
  var h = window.innerHeight
  var result = (w > h ? h : w) * (window.innerWidth <= 768 ? 0.8 : 0.4)
  el.style.width = el.style.height = result
  return result
}
