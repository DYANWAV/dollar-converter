export const setLastUpdate = (monitors, monitor, $last_update) => {
  const { last_update } = monitors[monitor]
  const [date, time] = last_update.split(",")
  const formattedDate = date.replaceAll("/", "-")
  const formattedTime = time.trim()
  $last_update.textContent = `${date}, ${time}`
  $last_update.setAttribute("datetime", date)

  return { date: formattedDate, time: formattedTime }
}
