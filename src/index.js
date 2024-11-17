import {
  DOLLAR_INFO_URL,
  EURO_INFO_URL,
  getCurrencyInfo,
} from './services/getCurrencyInfo.js'
import { copyToClipboard } from './utils/copyToClipboard.js'
import { setLastUpdate } from './utils/getLastUpdate.js'

const $ = el => document.querySelector(el)
const $bolivaresInput = $('#bolivares')
const $currencyInput = $('#currency')
const $selectMonitor = $('#monitors')
const $resetBtn = $('#reset')
const $last_update = $('#last-update')
const $percent = $('#percent')
const $copyBtns = document.querySelectorAll('#copy-btn')
const $selectCurrency = $('#select-currency')
const $currencySymbol = $('[for="currency"]')

const getPrice = async currency => {
  const url = {
    dollar: DOLLAR_INFO_URL,
    euro: EURO_INFO_URL,
  }

  try {
    const monitors = await getCurrencyInfo(url[currency])
    const { price, percent, symbol } = monitors.enparalelovzla
    return { monitors, price, percent, symbol }
  } catch (error) {
    console.log(error)
  }
}

let { monitors, price, percent, symbol } = await getPrice($selectCurrency.value)

const updateHTML = () => {
  $bolivaresInput.value = price
  $currencyInput.value = '1.00'
  $currencySymbol.textContent = $selectCurrency.value === 'euro' ? '€' : '$'
  $percent.textContent = `${symbol} ${percent}%`
  $percent.classList.remove('text-green-500', 'text-red-500')
  $percent.classList.add(symbol === '▼' ? 'text-red-500' : 'text-green-500')
  setLastUpdate(monitors, $selectMonitor.value, $last_update)
}

updateHTML()

$selectCurrency.addEventListener('change', async e => {
  const { monitors: newMonitors } = await getPrice(e.target.value)
  monitors = newMonitors
  const monitor = $selectMonitor.value
  const {
    price: newPrice,
    percent: newPercent,
    symbol: newSymbol,
  } = monitors[monitor]
  price = newPrice
  percent = newPercent
  symbol = newSymbol
  updateHTML()
})

$bolivaresInput.addEventListener('input', e => {
  let bolivares = e.target.value

  const result = bolivares / price
  $currencyInput.value = result.toFixed(2)
})

$currencyInput.addEventListener('input', e => {
  let dollars = e.target.value

  const result = dollars * price
  $bolivaresInput.value = result.toFixed(2)
})

$resetBtn.addEventListener('click', async () => updateHTML())

$selectMonitor.addEventListener('change', e => {
  const monitor = e.target.value
  const {
    price: newPrice,
    symbol: newSymbol,
    percent: newPercent,
  } = monitors[monitor]

  price = newPrice
  percent = newPercent
  symbol = newSymbol

  updateHTML()
})

$copyBtns.forEach(copyBtn =>
  copyBtn.addEventListener('click', () => copyToClipboard(copyBtn))
)
