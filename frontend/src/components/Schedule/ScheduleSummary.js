import { computed } from "vue"

export default function useScheduleSummary(shifts){

  // จำนวนเวรทั้งหมด
  const totalShifts = computed(() => {
    return shifts.value.length
  })

  // รายชื่อพยาบาลไม่ซ้ำ
  const nurses = computed(() => {

    const names = shifts.value.map(s => s.nurse)

    return [...new Set(names)]

  })

  // จำนวนพยาบาล
  const nurseCount = computed(() => {
    return nurses.value.length
  })

  // จำนวนเวรต่อพยาบาล
  const shiftsPerNurse = computed(() => {

    const result = {}

    shifts.value.forEach(shift => {

      if(!result[shift.nurse]){
        result[shift.nurse] = 0
      }

      result[shift.nurse]++

    })

    return result

  })

  return {
    totalShifts,
    nurseCount,
    shiftsPerNurse
  }

}