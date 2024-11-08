import { getDollarInfo, ENPARALELO } from "./services/pydolarvenezuela.js"

const $ = el => document.querySelector(el)
const $bolivaresInput = $("#bolivares")
const $dollarsInput = $("#dollars")
const $selectMonitor = $("#monitors")
const $resetBtn = $("#reset")

// const { monitors } = await getDollarInfo()
// const monitor = $selectMonitor.value
// let price = monitors[monitor].price

const getDollarPrice = async (monitor = ENPARALELO) => {
  const { monitors } = await getDollarInfo()
  const price = monitors[monitor].price

  return { monitors, price: price.toFixed(2) }
}

let { monitors, price } = await getDollarPrice()

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
  const { price } = await getDollarPrice()
  $selectMonitor.value = ENPARALELO
  $dollarsInput.value = "1.00"
  $bolivaresInput.value = price
  $dollarsInput.focus()
})

$selectMonitor.addEventListener("change", e => {
  const monitor = e.target.value
  price = monitors[monitor].price
  $bolivaresInput.value = price.toFixed(2)
  $dollarsInput.value = "1.00"
})
