import { formatDistanceToNow, parseISO } from "date-fns"

export function formatLastUpdated(dateString: string): string {
  if (!dateString) return "Unknown"

  try {
    // The API returns dates in the format "2023-05-22 3:04pm GMT",
    // We need to convert this to an ISO 8601 format
    const [datePart, timePart] = dateString.split(" ")
    const [time, period] = timePart.split(/([ap]m)/i)
    const [hour, minute] = time.split(":")

    let formattedHour = Number.parseInt(hour, 10)
    if (period.toLowerCase() === "pm" && formattedHour !== 12) {
      formattedHour += 12
    } else if (period.toLowerCase() === "am" && formattedHour === 12) {
      formattedHour = 0
    }

    const isoDateString = `${datePart}T${formattedHour.toString().padStart(2, "0")}:${minute}:00Z`
    const date = parseISO(isoDateString)
    return formatDistanceToNow(date, { addSuffix: true })
  } catch (error) {
    console.error("Error parsing date:", error, "for date string:", dateString)
    return "Unknown"
  }
}

