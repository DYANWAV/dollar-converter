export const updateIcons = (copyBtn, isCopied = false) => {
  const checkIcon = copyBtn.querySelector('.icon-tabler-check')
  const copyIcon = copyBtn.querySelector('.copy-icon')
  const tooltipText = copyBtn.querySelector('span')

  if (isCopied) {
    checkIcon.classList.add('hidden')
    copyIcon.classList.remove('hidden')
    tooltipText.textContent = 'Copy'
  } else {
    checkIcon.classList.remove('hidden')
    copyIcon.classList.add('hidden')
    tooltipText.textContent = 'Copied'
  }
}
