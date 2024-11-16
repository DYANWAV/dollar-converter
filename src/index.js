import { getDollarInfo, ENPARALELO } from "./services/getCurrencyInfo.js"
import { setLastUpdate } from "./utils/getLastUpdate.js"

const $ = el => document.querySelector(el)
const $bolivaresInput = $("#bolivares")
const $dollarsInput = $("#dollars")
const $selectMonitor = $("#monitors")
const $resetBtn = $("#reset")
const $last_update = $("#last-update")
const $percent = $("#percent")
const $copyBtns = document.querySelectorAll("#copy-btn")

const getDollarPrice = async (monitor = ENPARALELO) => {
  let dollarInfo
  try {
    dollarInfo = await getDollarInfo()
  } catch (error) {
    console.error(error)
  }
  const { monitors } = dollarInfo

  const price = monitors[monitor].price
  const { percent, symbol } = monitors[monitor]

  return { monitors, price: price.toFixed(2), percent, symbol }
}

let { monitors, price, percent, symbol } = await getDollarPrice()

setLastUpdate(monitors, $selectMonitor.value, $last_update)

$bolivaresInput.value = price
$dollarsInput.value = "1.00"
$percent.textContent = `${symbol} ${percent}%`
$percent.classList.add(symbol === "▼" ? "text-red-500" : "text-green-500")

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
  const { percent, symbol } = monitors[monitor]
  $bolivaresInput.value = price.toFixed(2)
  $dollarsInput.value = "1.00"
  $percent.textContent = `${symbol} ${percent}%`
  $percent.classList.remove("text-green-500", "text-red-500")
  $percent.classList.add(symbol === "▼" ? "text-red-500" : "text-green-500")
  setLastUpdate(monitors, monitor, $last_update)
})

$copyBtns.forEach(copyBtn => {
  copyBtn.addEventListener("click", () => {
    const input = copyBtn.previousElementSibling
    const checkIcon = copyBtn.querySelector(".icon-tabler-check")
    const copyIcon = copyBtn.querySelector(".copy-icon")
    checkIcon.classList.remove("hidden")
    copyIcon.classList.add("hidden")

    input.select()
    navigator.clipboard.writeText(input.value)

    const tooltipText = copyBtn.querySelector("span")
    tooltipText.textContent = "copied"

    const timeOutID = setTimeout(() => {
      checkIcon.classList.add("hidden")
      copyIcon.classList.remove("hidden")

      tooltipText.textContent = "copy"
      clearTimeout(timeOutID)
    }, 3000)
  })
})
