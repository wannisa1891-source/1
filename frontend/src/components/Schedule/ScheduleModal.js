// popup เพิ่มเวร
import { ref } from "vue"

export default function useScheduleModal() {

  const showModal = ref(false)
  const selectedDate = ref(null)

  const form = ref({
    nurse: "",
    shift: "",
    department: ""
  })

  // เปิด modal
  function openModal(date) {
    selectedDate.value = date
    showModal.value = true
  }

  // ปิด modal
  function closeModal() {
    showModal.value = false
  }

  // บันทึกเวร
  function saveSchedule(schedules) {

    schedules.value.push({
      date: selectedDate.value,
      nurse: form.value.nurse,
      shift: form.value.shift,
      department: form.value.department
    })

    closeModal()
  }

  return {
    showModal,
    selectedDate,
    form,
    openModal,
    closeModal,
    saveSchedule
  }

}