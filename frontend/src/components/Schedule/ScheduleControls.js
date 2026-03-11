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

  function prevDay() {
    const d = new Date(currentDate.value)
    d.setDate(d.getDate() - 1)
    currentDate.value = d
  }

  function nextDay() {
    const d = new Date(currentDate.value)
    d.setDate(d.getDate() + 1)
    currentDate.value = d
  }

  function prevWeek() {
    const d = new Date(currentDate.value)
    d.setDate(d.getDate() - 7)
    currentDate.value = d
  }

  function nextWeek() {
    const d = new Date(currentDate.value)
    d.setDate(d.getDate() + 7)
    currentDate.value = d
  }

  function goPrev() {
    if (currentView.value === "year") prevYear()
    else if (currentView.value === "month") prevMonth()
    else if (currentView.value === "week") prevWeek()
    else if (currentView.value === "day") prevDay()
  }

  function goNext() {
    if (currentView.value === "year") nextYear()
    else if (currentView.value === "month") nextMonth()
    else if (currentView.value === "week") nextWeek()
    else if (currentView.value === "day") nextDay()
  }

  function goToday() {
    currentDate.value = new Date()
    // Don't force view changes, just go to today
  }

  function changeView(view) {
    if (!views.includes(view)) return
    currentView.value = view
  }

  const formatDisplay = computed(() => {
    if (currentView.value === "year") return formatYear.value
    if (currentView.value === "month") return formatMonth.value
    if (currentView.value === "week") {
      const d = currentDate.value
      return `สัปดาห์ของ ${d.getDate()} ` + d.toLocaleDateString("th-TH", { month: "short", year: "numeric" })
    }
    if (currentView.value === "day") {
      return currentDate.value.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })
    }
    return formatMonth.value
  })

  return {
    currentDate,
    currentView,
    views,
    formatMonth,
    formatYear,
    formatDate,
    formatDisplay,
    goPrev,
    goNext,
    goToday,
    changeView
  }
}