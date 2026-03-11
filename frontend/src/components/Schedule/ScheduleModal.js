// Modal สำหรับเพิ่ม / แก้ไข / ลบเวร + Validation
import { ref, computed } from "vue"

export default function useScheduleModal(schedules) {

  const showModal = ref(false)
  const selectedDate = ref(null)
  const editingId = ref(null) // null = เพิ่มใหม่, มีค่า = แก้ไข
  const errors = ref([])

  // ประเภทเวร
  const shiftTypes = [
    { value: "Morning", label: "🟢 Morning (เช้า)", color: "#10b981" },
    { value: "Afternoon", label: "🟠 Afternoon (บ่าย)", color: "#f59e0b" },
    { value: "Night", label: "🟣 Night (ดึก)", color: "#8b5cf6" }
  ]

  // แผนกที่มีในระบบ
  const departments = ["ICU", "ER", "OPD", "IPD", "OR", "LR", "NICU", "Ward"]

  const form = ref({
    nurseName: "",
    shift: "",
    department: "",
    note: ""
  })

  // สร้าง ID
  let idCounter = 1
  function generateId() {
    return String(idCounter++).padStart(3, "0")
  }

  // เปิด modal สำหรับเพิ่มเวรใหม่
  function openModal(date) {
    selectedDate.value = date
    editingId.value = null
    errors.value = []
    form.value = {
      nurseName: "",
      shift: "",
      department: "",
      note: ""
    }
    showModal.value = true
  }

  // เปิด modal สำหรับแก้ไขเวร
  function openEditModal(schedule) {
    selectedDate.value = schedule.date
    editingId.value = schedule.id
    errors.value = []
    form.value = {
      nurseName: schedule.nurseName,
      shift: schedule.shift,
      department: schedule.department,
      note: schedule.note || ""
    }
    showModal.value = true
  }

  // ปิด modal
  function closeModal() {
    showModal.value = false
    errors.value = []
  }

  // Validation
  function validate() {
    const errs = []

    if (!selectedDate.value) errs.push("ต้องเลือกวันที่")
    if (!form.value.nurseName.trim()) errs.push("ต้องกรอกชื่อพยาบาล")
    if (!form.value.shift) errs.push("ต้องเลือกประเภทเวร")
    if (!form.value.department) errs.push("ต้องเลือกแผนก")

    // ตรวจสอบ: พยาบาล 1 คน ห้ามมีมากกว่า 1 เวร ในวันเดียวกัน
    if (form.value.nurseName.trim() && selectedDate.value && schedules) {
      const dateStr = new Date(selectedDate.value).toDateString()
      const nurseName = form.value.nurseName.trim().toLowerCase()

      const duplicate = schedules.value.find(s => {
        if (editingId.value && s.id === editingId.value) return false
        return (
          new Date(s.date).toDateString() === dateStr &&
          s.nurseName.trim().toLowerCase() === nurseName
        )
      })

      if (duplicate) {
        errs.push(`${form.value.nurseName} มีเวรในวันนี้แล้ว (${duplicate.shift})`)
      }
    }

    errors.value = errs
    return errs.length === 0
  }

  // บันทึกเวร (เพิ่ม / แก้ไข)
  function saveSchedule() {
    if (!validate()) return false

    if (editingId.value) {
      // แก้ไข
      const idx = schedules.value.findIndex(s => s.id === editingId.value)
      if (idx !== -1) {
        schedules.value[idx] = {
          ...schedules.value[idx],
          nurseName: form.value.nurseName.trim(),
          shift: form.value.shift,
          department: form.value.department,
          note: form.value.note.trim()
        }
      }
    } else {
      // เพิ่มใหม่
      schedules.value.push({
        id: generateId(),
        date: selectedDate.value,
        nurseName: form.value.nurseName.trim(),
        shift: form.value.shift,
        department: form.value.department,
        note: form.value.note.trim()
      })
    }

    closeModal()
    return true
  }

  // ลบเวร
  function deleteSchedule(id) {
    const idx = schedules.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      schedules.value.splice(idx, 1)
    }
    closeModal()
  }

  // ดึงเวรของวันที่เฉพาะ
  function getSchedulesForDate(date) {
    if (!date || !schedules) return []
    const dateStr = new Date(date).toDateString()
    return schedules.value.filter(s =>
      new Date(s.date).toDateString() === dateStr
    )
  }

  // ดึงสีเวร
  function getShiftColor(shift) {
    const found = shiftTypes.find(s => s.value === shift)
    return found ? found.color : "#64748b"
  }

  // ข้อมูลว่ากำลังแก้ไขอยู่ไหม
  const isEditing = computed(() => editingId.value !== null)

  return {
    showModal,
    selectedDate,
    editingId,
    errors,
    shiftTypes,
    departments,
    form,
    isEditing,
    openModal,
    openEditModal,
    closeModal,
    saveSchedule,
    deleteSchedule,
    getSchedulesForDate,
    getShiftColor
  }
}