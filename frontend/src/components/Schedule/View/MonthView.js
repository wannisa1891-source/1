// logic แสดงเดือน
export default function useMonthView(days, calendarDays) {

  // เลขวันที่ในช่องปฏิทิน
  function getDayNumber(day) {

    if (!day) return ""

    // รองรับ object { day: number, date: Date }
    if (day && typeof day === "object" && day.day !== undefined) {
      return day.day
    }

    if (day instanceof Date) {
      return day.getDate()
    }

    return day
  }


  // คืนค่า Date ของวันนั้น
  function getDate(day) {

    if (!day) return null

    // รองรับ object { day: number, date: Date }
    if (day && typeof day === "object" && day.date) {
      return day.date
    }

    if (day instanceof Date) {
      return day
    }

    return new Date(day)
  }


  // เช็คว่าวันนั้นเป็นวันนี้ไหม
  function isToday(day) {
    const d = getDate(day)
    if (!d) return false

    const today = new Date()
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    )
  }

  // format วันที่
  function formatDate(day) {
    const d = getDate(day)
    if (!d) return ""

    return d.toLocaleDateString("th-TH", {
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