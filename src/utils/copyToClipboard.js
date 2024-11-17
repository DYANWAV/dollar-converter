export const copyToClipboard = copyBtn => {
  const input = copyBtn.previousElementSibling
  const checkIcon = copyBtn.querySelector('.icon-tabler-check')
  const copyIcon = copyBtn.querySelector('.copy-icon')
  checkIcon.classList.remove('hidden')
  copyIcon.classList.add('hidden')

  navigator.clipboard.writeText(input.value)

  const tooltipText = copyBtn.querySelector('span')
  tooltipText.textContent = 'copied'

  const timeOutID = setTimeout(() => {
    checkIcon.classList.add('hidden')
    copyIcon.classList.remove('hidden')

    tooltipText.textContent = 'copy'
    clearTimeout(timeOutID)
  }, 3000)
}
