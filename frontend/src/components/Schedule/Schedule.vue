<script setup>
import { ref, computed, onMounted } from "vue"

import ScheduleControls from "./ScheduleControls.vue"
import ScheduleCalendar from "./ScheduleCalendar.vue"
import ScheduleSummary from "./ScheduleSummary.vue"
import ScheduleStatus from "./ScheduleStatus.vue"
import ScheduleModal from "./ScheduleModal.vue"

const currentDate = ref(new Date())

const showModal = ref(false)
const selectedDate = ref(null)

const schedules = ref([])

const currentView = ref("Month") // ✅ แก้กลับ
const selectedDept = ref("")

const editingShift = ref(null)

const departments = ref([
  { id: "ER", name: "ER" },
  { id: "ICU", name: "ICU" },
  { id: "OPD", name: "OPD" }
])

const month = computed(() => currentDate.value.getMonth())
const year = computed(() => currentDate.value.getFullYear())

const filteredSchedules = computed(() => {

  if (!selectedDept.value) return schedules.value

  return schedules.value.filter(
    s => s.department === selectedDept.value
  )

})

function nextMonth() {
  currentDate.value = new Date(year.value, month.value + 1, 1)
}

function prevMonth() {
  currentDate.value = new Date(year.value, month.value - 1, 1)
}

function changeView(view) {
  currentView.value = view // ✅ เอา toLowerCase ออก
}

function filterDept(dept) {
  selectedDept.value = dept
}

function printSchedule() {
  window.print()
}

function exportSchedule() {

  const data = JSON.stringify(schedules.value, null, 2)

  const blob = new Blob([data], { type: "application/json" })

  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "schedule.json"
  a.click()

}

function openModal(date) {
  selectedDate.value = date
  editingShift.value = null
  showModal.value = true
}

function editShift(shift) {

  selectedDate.value = new Date(shift.date)
  editingShift.value = shift
  showModal.value = true

}

function closeModal() {
  showModal.value = false
}

function handleSaved(newShift) {

  if (editingShift.value) {

    const index = schedules.value.findIndex(
      s => s.id === editingShift.value.id
    )

    schedules.value[index] = newShift

  } else {

    newShift.id = Date.now()
    schedules.value.push(newShift)

  }

  closeModal()

}

function deleteShift(id) {

  schedules.value = schedules.value.filter(
    s => s.id !== id
  )

  closeModal()

}

function loadSchedules() {

  schedules.value = [
    {
      id: 1,
      name: "พยาบาลสมใจ",
      shift: "เช้า",
      date: "2026-03-10",
      department: "ER"
    },
    {
      id: 2,
      name: "หมออนันต์",
      shift: "ดึก",
      date: "2026-03-11",
      department: "ICU"
    }
  ]

}

onMounted(() => {
  loadSchedules()
})
</script>