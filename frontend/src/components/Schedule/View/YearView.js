import { computed } from "vue"

export default function useYearView(currentDate, shifts){

  const yearMonths = computed(() => {

    const date = new Date(currentDate.value)

    const year = date.getFullYear()

    const months = []

    for(let m = 0; m < 12; m++){

      const monthDate = new Date(year, m, 1)

      const monthShifts = shifts.value.filter(shift => {

        const shiftDate = new Date(shift.date)

        return (
          shiftDate.getFullYear() === year &&
          shiftDate.getMonth() === m
        )

      })

      months.push({
        month: m,
        date: monthDate,
        shiftCount: monthShifts.length,
        shifts: monthShifts
      })

    }

    return months

  })

  return {
    yearMonths
  }

}