// ควบคุมเดือน / เปลี่ยน view
import { ref, computed } from "vue"

export default function useScheduleControls() {

  // วันที่ปัจจุบัน
  const currentDate = ref(new Date())

  // view ปัจจุบัน
  const currentView = ref("month")

  // view ที่มีในระบบ
  const views = ["day", "week", "month", "year"]

  // เดือนที่แสดงบนหัวปฏิทิน
  const formatMonth = computed(() => {
    return currentDate.value.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long"
    })
  })

  // เดือนก่อน
  function prevMonth() {
    const newDate = new Date(currentDate.value)
    newDate.setMonth(newDate.getMonth() - 1)
    currentDate.value = newDate
  }

  // เดือนถัดไป
  function nextMonth() {
    const newDate = new Date(currentDate.value)
    newDate.setMonth(newDate.getMonth() + 1)
    currentDate.value = newDate
  }

  // เปลี่ยน view (day / week / month / year)
  function changeView(view) {

    // ป้องกัน view ที่ไม่มี
    if (!views.includes(view)) return

    currentView.value = view
  }

  return {
    currentDate,
    currentView,
    views,
    formatMonth,
    prevMonth,
    nextMonth,
    changeView
  }
}