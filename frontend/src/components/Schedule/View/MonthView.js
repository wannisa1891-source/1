// logic แสดงเดือน
export default function useMonthView(days, calendarDays) {

  // เลขวันที่ในช่องปฏิทิน
  function getDayNumber(day) {

    if (!day) return ""

    if (day instanceof Date) {
      return day.getDate()
    }

    return day
  }


  // คืนค่า Date ของวันนั้น
  function getDate(day) {

    if (!day) return null

    if (day instanceof Date) {
      return day
    }

    return new Date(day)
  }


  // เช็คว่าวันนั้นเป็นวันนี้ไหม
  function isToday(day) {

    if (!day) return false

    const today = new Date()

    return (
      day.getFullYear() === today.getFullYear() &&
      day.getMonth() === today.getMonth() &&
      day.getDate() === today.getDate()
    )

  }


  // format วันที่
  function formatDate(day) {

    if (!day) return ""

    return day.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short"
    })

  }


  return {
    getDayNumber,
    getDate,
    isToday,
    formatDate
  }

}