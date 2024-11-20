export const getCurrencyInfo = async url => {
  const res = await fetch(url)
  const {
    monitors: { enparalelovzla, bcv },
  } = await res.json()

  const { price, percent, symbol } = enparalelovzla

  return { monitors: { enparalelovzla, bcv }, price, percent, symbol }
}
