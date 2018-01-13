import Logo from './n-logo.js'
import Samai from 'samai'

var resizing = false
var logoEl = document.getElementById('logo')
var body = document.querySelector('body')
var cont = document.getElementById('container')
var info = document.getElementById('info')
var logoSize = getLogoSize(logoEl)
var logo = new Logo('canvas', logoSize)
var samai = new Samai({
  fabric_enabled: false
});

logoEl.style.opacity = 1;
body.style.background = "url('" + samai.data_uri + "')";
body.style.backgroundSize = samai.width + "px";

bodyHeight()
logo.animate()

cont.onclick = () => window.location.href = "samai/"; 

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
