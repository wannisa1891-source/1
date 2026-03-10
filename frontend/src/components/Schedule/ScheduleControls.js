import { computed } from "vue"

export default function useScheduleControls(currentDate){

  // แสดงชื่อเดือน
  const monthText = computed(() => {

    const months = [
      "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
      "พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม",
      "กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"
    ]

    const date = new Date(currentDate.value)

    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${month} ${year}`

  })

  // เดือนก่อน
  function prevMonth(){

    const d = new Date(currentDate.value)

    d.setMonth(d.getMonth() - 1)

    currentDate.value = d

  }

  // เดือนถัดไป
  function nextMonth(){

    const d = new Date(currentDate.value)

    d.setMonth(d.getMonth() + 1)

    currentDate.value = d

  }

  return {
    monthText,
    prevMonth,
    nextMonth
  }

}