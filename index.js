import { CURRENCIES, URLs } from './src/consts.js'
import { getCurrencyInfo } from './src/services/getCurrencyInfo.js'
import { copyToClipboard } from './src/utils/copyToClipboard.js'
import { setLastUpdate } from './src/utils/getLastUpdate.js'
import { getElements } from './src/utils/getElements.js'

const $ = getElements()

let { monitors, percent, price, symbol } = await getCurrencyInfo(
  URLs[$.selectCurrency.value]
)

updateHTML()

$.selectCurrency.addEventListener('change', async e => {
  const { monitors: newMonitors } = await getCurrencyInfo(URLs[e.target.value])
  monitors = newMonitors
  const monitor = $.selectMonitor.value
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

$.bolivaresInput.addEventListener('input', e => {
  let bolivares = e.target.value

  const result = bolivares / price
  $.currencyInput.value = result.toFixed(2)
})

$.currencyInput.addEventListener('input', e => {
  let dollars = e.target.value

  const result = dollars * price
  $.bolivaresInput.value = result.toFixed(2)
})

$.resetBtn.addEventListener('click', async () => updateHTML())

$.selectMonitor.addEventListener('change', e => {
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

$.copyBtns.forEach(copyBtn =>
  copyBtn.addEventListener('click', () => copyToClipboard(copyBtn))
)

function updateHTML() {
  $.bolivaresInput.value = price
  $.currencyInput.value = '1.00'
  $.currencySymbol.textContent =
    $.selectCurrency.value === CURRENCIES.euro.name
      ? CURRENCIES.euro.symbol
      : CURRENCIES.dollar.symbol
  $.percent.textContent = `${symbol} ${percent}%`
  $.percent.classList.remove('text-green-500', 'text-red-500')
  $.percent.classList.add(symbol === '▼' ? 'text-red-500' : 'text-green-500')
  setLastUpdate(monitors, $.selectMonitor.value, $.last_update)
}
