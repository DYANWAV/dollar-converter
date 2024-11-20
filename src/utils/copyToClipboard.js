import { updateIcons } from './updateIcons.js'

export const copyToClipboard = copyBtn => {
  const input = copyBtn.previousElementSibling
  navigator.clipboard.writeText(input.value)

  updateIcons(copyBtn)

  const timeOutID = setTimeout(() => {
    updateIcons(copyBtn, true)

    clearTimeout(timeOutID)
  }, 3000)
}
