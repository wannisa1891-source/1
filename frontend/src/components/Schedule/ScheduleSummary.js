// สรุปจำนวนเวร
import { computed } from "vue"

export default function useScheduleSummary(schedules) {

  const totalSchedules = computed(() => {
    return schedules.value.length
  })

  const todaySchedules = computed(() => {

    const today = new Date().toDateString()

    return schedules.value.filter(schedule => {
      return new Date(schedule.date).toDateString() === today
    }).length

  })

  const monthSchedules = computed(() => {

    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()

    return schedules.value.filter(schedule => {

      const d = new Date(schedule.date)

      return (
        d.getMonth() === month &&
        d.getFullYear() === year
      )

    }).length

  })

  return {
    totalSchedules,
    todaySchedules,
    monthSchedules
  }

}