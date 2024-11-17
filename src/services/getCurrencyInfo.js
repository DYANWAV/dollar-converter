export const CRYPTODOLAR = 'criptodolar'
export const API = `https://pydolarve.org/api/v1/dollar?page=${CRYPTODOLAR}`
export const DOLLAR_INFO_URL =
  'https://pydolarve.org/api/v1/dollar?page=criptodolar&format_date=default'
export const EURO_INFO_URL =
  'https://pydolarve.org/api/v1/euro?page=criptodolar&format_date=default'
export const ENPARALELO = 'enparalelovzla'

export const getCurrencyInfo = async url => {
  const res = await fetch(url)
  const {
    monitors: { enparalelovzla, bcv },
  } = await res.json()

  return { enparalelovzla, bcv }
}
