export const getElements = () => {
  const $ = el => document.querySelector(el)
  const bolivaresInput = $('#bolivares')
  const currencyInput = $('#currency')
  const selectMonitor = $('#monitors')
  const resetBtn = $('#reset')
  const last_update = $('#last-update')
  const percent = $('#percent')
  const copyBtns = document.querySelectorAll('#copy-btn')
  const selectCurrency = $('#select-currency')
  const currencySymbol = $('[for="currency"]')

  return {
    bolivaresInput,
    currencyInput,
    selectMonitor,
    resetBtn,
    last_update,
    percent,
    copyBtns,
    selectCurrency,
    currencySymbol,
  }
}
