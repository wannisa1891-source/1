export default function useMonthView(days, calendarDays) {

  function getDayNumber(day) {
    if (!day) return ""

    // ถ้าเป็น Date
    if (day instanceof Date) {
      return day.getDate()
    }

    // ถ้าเป็นตัวเลข
    return day
  }

  function getDate(day) {
    return day
  }

  return {
    getDayNumber,
    getDate
  }

}