export const CRYPTODOLAR = "criptodolar"
export const API = `https://pydolarve.org/api/v1/dollar?page=${CRYPTODOLAR}`
export const ENPARALELO = "enparalelovzla"

export const getDollarInfo = async monitor => {
  const url = monitor ? `${API}&monitor=${monitor}` : API
  const response = await fetch(url)
  const data = await response.json()
  return data
}
