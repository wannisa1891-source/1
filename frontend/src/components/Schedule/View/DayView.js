// มุมมองรายวัน
import { computed } from "vue"

export default function useWeekView(currentDate, shifts){

  // คำนวณวันในสัปดาห์
  const weekDays = computed(() => {

    const date = new Date(currentDate.value)

    const day = date.getDay()

    const start = new Date(date)
    start.setDate(date.getDate() - day)

    const days = []

    for(let i = 0; i < 7; i++){

      const d = new Date(start)

      d.setDate(start.getDate() + i)

      days.push(d)

    }

    return days

  })


  // เวรในสัปดาห์
  const weekShifts = computed(() => {

    const days = weekDays.value

    return days.map(day => {

      const dayShifts = shifts.value.filter(shift => {

        const shiftDate = new Date(shift.date)

        return (
          shiftDate.getFullYear() === day.getFullYear() &&
          shiftDate.getMonth() === day.getMonth() &&
          shiftDate.getDate() === day.getDate()
        )

      })

      return {
        date: day,
        shifts: dayShifts
      }

    })

  })

  return {
    weekDays,
    weekShifts
  }

}