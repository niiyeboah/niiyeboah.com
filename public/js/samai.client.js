import Logo from './n-logo'
import Samai from 'samai'
import css from '../css/samai.css'

var dateEl = document.getElementById('date')
var dlEl = document.getElementById('download')
var imgEl = document.getElementById('drawing_image')
var dcEl = document.getElementById('drawing_container')
var bodyEl = document.querySelector('body')
var samaEl = document.getElementById('sama_number')
var logoEl = document.getElementById('logo')
var sama = Number.parseInt(samaEl.getAttribute('data-n'))
var samai = new Samai({
  date: dateEl.value,
  fabric_enabled: true,
  n: sama
})

var setImg = (uri) => {
  samai.getPNG().then(src => {
    imgEl.setAttribute('src', src)
    bodyEl.style.backgroundImage = 'url(\'' + src + '\')'
  })
  bodyEl.style.backgroundSize = samai.width + 'px'
  if (sama > 1) samaEl.style.display = 'block'
}
var logo = new Logo('logo', 32)

logo.animate(() => {
  setImg(samai.data_uri)
  dateEl.style.opacity = 1
  dcEl.style.opacity = 1
})

imgEl.addEventListener('click', () => {
  sama++
  samaEl.innerText = sama
  setImg(samai.next())
  var dateSama = samai._getDateString() + '.' + sama
  window.history.pushState(null, dateSama, dateSama)
}, false)

dateEl.addEventListener('change', (e) => {
  var date = dateEl.value.replace(/\/|\./g, '-')
  if (dateEl.getAttribute('data-curr') !== date) {
    var dateArr = date.split('-')
    if (Date.parse(date) && dateArr.length === 3) {
      if (dateArr[0].length < 2) dateArr[0] = '0' + dateArr[0]
      if (dateArr[1].length < 2) dateArr[1] = '0' + dateArr[1]
      date = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2]
      dateEl.value = date
      dateEl.setAttribute('data-curr', date)
      window.history.pushState(null, date, date)
    }
    samai = new Samai({ date, fabricEnabled, n: 1 })
    setImg(samai.data_uri)
    sama = 1
    samaEl.innerText = sama
    samaEl.style.display = 'none'
  }
}, false)

dlEl.addEventListener('click', (e) => {
  samai.download()
  e.stopPropagation()
}, false)

logoEl.addEventListener('click', () => window.location.href = "/", false)
