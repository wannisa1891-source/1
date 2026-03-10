// สถานะเวร
import { computed } from "vue"

export default function useScheduleStatus(shifts){

  const totalShifts = computed(() => {
    return shifts.value.length
  })

  const morningCount = computed(() => {
    return shifts.value.filter(s => s.shift === "Morning").length
  })

  const eveningCount = computed(() => {
    return shifts.value.filter(s => s.shift === "Evening").length
  })

  const nightCount = computed(() => {
    return shifts.value.filter(s => s.shift === "Night").length
  })

  return {
    totalShifts,
    morningCount,
    eveningCount,
    nightCount
  }

}