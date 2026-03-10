<script setup>

import { ref } from "vue"

import ScheduleControls from "./components/ScheduleControls.vue"
import ScheduleCalendar from "./components/ScheduleCalendar.vue"
import ScheduleSummary from "./components/ScheduleSummary.vue"
import ScheduleStatus from "./components/ScheduleStatus.vue"
import ScheduleModal from "./components/ScheduleModal.vue"

const currentDate = ref(new Date())
const selectedDate = ref(null)
const showModal = ref(false)

function prevMonth(){
  const d = new Date(currentDate.value)
  d.setMonth(d.getMonth() - 1)
  currentDate.value = d
}

function nextMonth(){
  const d = new Date(currentDate.value)
  d.setMonth(d.getMonth() + 1)
  currentDate.value = d
}

function openModal(date){
  selectedDate.value = date
  showModal.value = true
}

function closeModal(){
  showModal.value = false
}

</script>


<template>

<div class="schedule-page">

  <div class="schedule-header">
    <h2>ตารางเวร (Shift Schedule)</h2>
  </div>

  <ScheduleControls
    :currentDate="currentDate"
    @prev="prevMonth"
    @next="nextMonth"
  />

  <ScheduleCalendar
    :currentDate="currentDate"
    @selectDay="openModal"
  />

  <ScheduleSummary />

  <ScheduleStatus />

  <ScheduleModal
    v-if="showModal"
    :date="selectedDate"
    @close="closeModal"
  />

</div>

</template>


<style scoped>

.schedule-page{
  padding:20px;
}

.schedule-header{
  margin-bottom:20px;
}

.schedule-header h2{
  font-size:22px;
  font-weight:600;
}

</style>