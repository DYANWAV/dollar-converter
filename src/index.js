import { getDollarInfo, ENPARALELO } from "./services/pydolarvenezuela.js"
import { setLastUpdate } from "./utils/getLastUpdate.js"

const $ = el => document.querySelector(el)
const $bolivaresInput = $("#bolivares")
const $dollarsInput = $("#dollars")
const $selectMonitor = $("#monitors")
const $resetBtn = $("#reset")
const $last_update = $("#last-update")

const getDollarPrice = async (monitor = ENPARALELO) => {
  let dollarInfo
  try {
    dollarInfo = await getDollarInfo()
  } catch (error) {
    console.error(error)
  }
  const { monitors } = dollarInfo

  const price = monitors[monitor].price

  return { monitors, price: price.toFixed(2) }
}

let { monitors, price } = await getDollarPrice()

setLastUpdate(monitors, $selectMonitor.value, $last_update)

$bolivaresInput.value = price
$dollarsInput.value = "1.00"

$bolivaresInput.addEventListener("input", e => {
  let bolivares = e.target.value

  const result = bolivares / price
  $dollarsInput.value = result.toFixed(2)
})

$dollarsInput.addEventListener("input", e => {
  let dollars = e.target.value

  const result = dollars * price
  $bolivaresInput.value = result.toFixed(2)
})

$resetBtn.addEventListener("click", async () => {
  const monitor = $selectMonitor.value
  const { price } = await getDollarPrice(monitor)
  $dollarsInput.value = "1.00"
  $bolivaresInput.value = price
  $dollarsInput.focus()
  setLastUpdate(monitors, monitor, $last_update)
})

$selectMonitor.addEventListener("change", e => {
  const monitor = e.target.value
  price = monitors[monitor].price
  $bolivaresInput.value = price.toFixed(2)
  $dollarsInput.value = "1.00"
  setLastUpdate(monitors, monitor, $last_update)
})
