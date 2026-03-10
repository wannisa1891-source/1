import { computed } from "vue"

export default function useCalendar(currentDate){

  const calendarDays = computed(() => {

    const date = new Date(currentDate.value)

    const year = date.getFullYear()
    const month = date.getMonth()

    const today = new Date()

    const firstDayOfMonth = new Date(year, month, 1)
    const startDay = firstDayOfMonth.getDay()

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    const days = []

    // ===== เดือนก่อน =====
    for(let i = startDay - 1; i >= 0; i--){

      const day = daysInPrevMonth - i

      const d = new Date(year, month - 1, day)

      days.push({
        date: d,
        day: day,
        currentMonth: false,
        today: false
      })
    }

    // ===== เดือนปัจจุบัน =====
    for(let i = 1; i <= daysInMonth; i++){

      const d = new Date(year, month, i)

      const isToday =
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()

      days.push({
        date: d,
        day: i,
        currentMonth: true,
        today: isToday
      })
    }

    // ===== เดือนถัดไป =====
    const remaining = 42 - days.length

    for(let i = 1; i <= remaining; i++){

      const d = new Date(year, month + 1, i)

      days.push({
        date: d,
        day: i,
        currentMonth: false,
        today: false
      })
    }

    return days

  })

  return {
    calendarDays
  }

}