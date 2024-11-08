import { getDollarInfo, ENPARALELO_MONITOR } from "./services/pydolarvenezuela.js"

const $ = el => document.querySelector(el)
const $bolivaresInput = $("#bolivares")
const $dollarsInput = $("#dollars")
const $selectMonitor = $("#monitors")
const $resetBtn = $("#reset")

const { monitors } = await getDollarInfo()
const monitor = $selectMonitor.value
let price = monitors[monitor].price

$bolivaresInput.value = price.toFixed(2)
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

$resetBtn.addEventListener("click", () => {
  $selectMonitor.value = ENPARALELO_MONITOR

  $dollarsInput.value = "1.00"
  $bolivaresInput.value = monitors[$selectMonitor.value].price.toFixed(2)
  $dollarsInput.focus()
})

$selectMonitor.addEventListener("change", e => {
  const monitor = e.target.value
  price = monitors[monitor].price
  $bolivaresInput.value = price.toFixed(2)
  $dollarsInput.value = "1.00"
})
