// view รายสัปดาห์
// View สัปดาห์
import { computed } from "vue"

export default function useWeekView(currentDate) {

  // หาวันแรกของสัปดาห์
  const startOfWeek = computed(() => {

    const date = new Date(currentDate.value)

    const day = date.getDay()

    const diff = date.getDate() - day

    const start = new Date(date)

    start.setDate(diff)

    return start

  })


  // สร้าง 7 วันในสัปดาห์
  const weekDays = computed(() => {

    const days = []

    const start = new Date(startOfWeek.value)

    for (let i = 0; i < 7; i++) {

      const day = new Date(start)

      day.setDate(start.getDate() + i)

      days.push(day)

    }

    return days

  })


  // เลขวัน
  function getDayNumber(date) {
    return date.getDate()
  }


  // format วันที่
  function formatDate(date) {
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short"
    })
  }


  return {

    startOfWeek,

    weekDays,

    getDayNumber,

    formatDate

  }

}