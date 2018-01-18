import Logo from './n-logo.js'
import Samai from 'samai'
import css from '../css/index.css'

var resizing = false
var logoEl = document.getElementById('logo')
var body = document.querySelector('body')
var cont = document.getElementById('container')
var info = document.getElementById('info')
var logoSize = getLogoSize(logoEl)
var logo = new Logo('canvas', logoSize)
var samai = new Samai({
  fabric_enabled: true,
  dark_colors: ["#222", "#072", "#000"], 
  light_colors: ["#3A6", "#AAA", "#777"], 
});

samai.getPNG().then(src => {
  body.style.backgroundImage = "url('" + src + "')"
  body.style.backgroundSize = samai.width + "px"
})

bodyHeight()
logo.animate()

cont.onclick = () => window.location.href = "samai/"

setInterval(() => {
  samai.getPNG().then(src => {
    samai.next()
    body.style.backgroundImage = "url('" + src + "')"
    body.style.backgroundSize = samai.width + "px"
  })
}, 5000); 

function bodyHeight() {
  if (cont.clientHeight > window.innerHeight || 
    (window.innerWidth > window.innerHeight && 
    window.innerWidth <= 768)) {
    cont.style.height = 'auto'
    logoEl.style.paddingTop = '50px'
  } else {
    var h = logoEl.clientHeight + info.clientHeight
    cont.style.height = '100vh'
    logoEl.style.paddingTop = (window.innerHeight - h) / 2 + 'px'
  }
}

function getLogoSize(el) {
  var w = window.innerWidth - 20
  var h = window.innerHeight
  var result = (w > h ? h : w) * (window.innerWidth <= 768 ? 0.8 : 0.4)
  el.style.width = el.style.height = result
  return result
}
