// logic รายวัน
import { computed } from "vue"

export default function useDayView(currentDate, shifts) {

  // วันที่ปัจจุบัน
  const currentDay = computed(() => {
    return new Date(currentDate.value)
  })


  // เวรของวันนั้น
  const dayShifts = computed(() => {

    const day = currentDay.value

    return shifts.value.filter(shift => {

      const shiftDate = new Date(shift.date)

      return (
        shiftDate.getFullYear() === day.getFullYear() &&
        shiftDate.getMonth() === day.getMonth() &&
        shiftDate.getDate() === day.getDate()
      )

    })

  })


  // format วันที่
  const formatDate = computed(() => {
    return currentDay.value.toLocaleDateString("th-TH", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  })


  return {
    currentDay,
    dayShifts,
    formatDate
  }

}