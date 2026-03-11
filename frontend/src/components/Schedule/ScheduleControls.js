// ควบคุมเดือน / ปี / เปลี่ยน view / ปุ่ม Today
import { ref, computed } from "vue"

export default function useScheduleControls() {

  const currentDate = ref(new Date())
  const currentView = ref("month")
  const views = ["day", "week", "month", "year"]

  // แสดงเดือน+ปี สำหรับ month view
  const formatMonth = computed(() => {
    return currentDate.value.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long"
    })
  })

  // แสดงปี สำหรับ year view
  const formatYear = computed(() => {
    return currentDate.value.getFullYear() + 543 // พ.ศ.
  })

  // format วันที่สำหรับแสดงใน modal
  const formatDate = (date) => {
    if (!date) return ""
    if (typeof date === "string") return date
    return date.toLocaleDateString("th-TH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  function prevMonth() {
    const d = new Date(currentDate.value)
    d.setMonth(d.getMonth() - 1)
    currentDate.value = d
  }

  function nextMonth() {
    const d = new Date(currentDate.value)
    d.setMonth(d.getMonth() + 1)
    currentDate.value = d
  }

  function prevYear() {
    const d = new Date(currentDate.value)
    d.setFullYear(d.getFullYear() - 1)
    currentDate.value = d
  }

  function nextYear() {
    const d = new Date(currentDate.value)
    d.setFullYear(d.getFullYear() + 1)
    currentDate.value = d
  }

  function goToday() {
    currentDate.value = new Date()
    currentView.value = "month"
  }

  function changeView(view) {
    if (!views.includes(view)) return
    currentView.value = view
  }

  return {
    currentDate,
    currentView,
    views,
    formatMonth,
    formatYear,
    formatDate,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    goToday,
    changeView
  }
}