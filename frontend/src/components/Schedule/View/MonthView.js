import { computed } from "vue"

export default function useMonthView(currentDate, shifts){

  const monthDays = computed(() => {

    const date = new Date(currentDate.value)

    const year = date.getFullYear()
    const month = date.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    const days = []

    // ===== เดือนก่อน =====
    for(let i = firstDay - 1; i >= 0; i--){

      const day = daysInPrevMonth - i
      const d = new Date(year, month - 1, day)

      days.push({
        date: d,
        currentMonth: false
      })

    }

    // ===== เดือนปัจจุบัน =====
    for(let i = 1; i <= daysInMonth; i++){

      const d = new Date(year, month, i)

      days.push({
        date: d,
        currentMonth: true
      })

    }

    // ===== เดือนถัดไป =====
    const remain = 42 - days.length

    for(let i = 1; i <= remain; i++){

      const d = new Date(year, month + 1, i)

      days.push({
        date: d,
        currentMonth: false
      })

    }

    return days

  })


  // ===== เวรของแต่ละวัน =====
  const monthShifts = computed(() => {

    return monthDays.value.map(day => {

      const dayShifts = shifts.value.filter(shift => {

        const shiftDate = new Date(shift.date)

        return (
          shiftDate.getFullYear() === day.date.getFullYear() &&
          shiftDate.getMonth() === day.date.getMonth() &&
          shiftDate.getDate() === day.date.getDate()
        )

      })

      return {
        ...day,
        shifts: dayShifts
      }

    })

  })


  return {
    monthDays,
    monthShifts
  }

}