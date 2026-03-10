
import { ref, computed } from "vue"

export default function useScheduleControls() {

  const currentDate = ref(new Date())
  const currentView = ref("month")

  const views = ["day", "week", "month", "year"]

  // เดือนที่แสดง
  const formatMonth = computed(() => {
    return currentDate.value.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long"
    })
  })

  // เดือนก่อน
  function prevMonth() {
    const date = new Date(currentDate.value)
    date.setMonth(date.getMonth() - 1)
    currentDate.value = date
  }

  // เดือนถัดไป
  function nextMonth() {
    const date = new Date(currentDate.value)
    date.setMonth(date.getMonth() + 1)
    currentDate.value = date
  }

  // เปลี่ยน view
  function changeView(view) {
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