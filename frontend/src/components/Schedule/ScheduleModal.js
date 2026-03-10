import { ref } from "vue"

export default function useScheduleModal(){

  const showModal = ref(false)

  const selectedDate = ref(null)

  const shiftData = ref({
    nurse: "",
    shift: "",
    note: ""
  })

  function openModal(date){

    selectedDate.value = date

    shiftData.value = {
      nurse: "",
      shift: "",
      note: ""
    }

    showModal.value = true
  }

  function closeModal(){

    showModal.value = false

  }

  function saveShift(){

    const data = {
      date: selectedDate.value,
      nurse: shiftData.value.nurse,
      shift: shiftData.value.shift,
      note: shiftData.value.note
    }

    console.log("save shift", data)

    showModal.value = false

  }

  return {
    showModal,
    selectedDate,
    shiftData,
    openModal,
    closeModal,
    saveShift
  }

}