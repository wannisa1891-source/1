// สร้างปฏิทิน
import { computed } from "vue"

export default function useScheduleCalendar(currentDate) {

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  const calendarDays = computed(() => {

    const date = new Date(currentDate.value)

    const year = date.getFullYear()
    const month = date.getMonth()

    // วันแรกของเดือน
    const firstDay = new Date(year, month, 1).getDay()

    // จำนวนวันของเดือน
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const daysArray = []

    // ช่องว่างก่อนวันแรก
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null)
    }

    // วันจริงของเดือน
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({
        day: i,
        date: new Date(year, month, i)
      })
    }

    // เติมให้ครบ 42 ช่อง
    while (daysArray.length < 42) {
      daysArray.push(null)
    }

    return daysArray
  })

  return {
    days,
    calendarDays
  }

}