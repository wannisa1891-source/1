// สถานะเวร
import { computed } from "vue"

export default function useScheduleStatus(schedules) {

  const departmentStatus = computed(() => {

    const result = {}

    schedules.value.forEach(schedule => {

      const dept = schedule.department || "Unknown"

      if (!result[dept]) {
        result[dept] = 0
      }

      result[dept]++

    })

    return result

  })

  return {
    departmentStatus
  }

}