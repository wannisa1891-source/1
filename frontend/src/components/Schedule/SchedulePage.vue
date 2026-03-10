// UI หลักของหน้า
<script setup>
import { ref } from "vue"

import useScheduleControls from "./ScheduleControls"
import useScheduleCalendar from "./ScheduleCalendar"
import useMonthView from "./View/MonthView"
import useScheduleModal from "./ScheduleModal"
import useScheduleSummary from "./ScheduleSummary"
import useScheduleStatus from "./ScheduleStatus"


// เก็บข้อมูลเวร
const schedules = ref([])


// controls
const {
  currentDate,
  formatMonth,
  prevMonth,
  nextMonth
} = useScheduleControls()


// calendar
const {
  days,
  calendarDays
} = useScheduleCalendar(currentDate)


// month view
const {
  getDayNumber,
  getDate
} = useMonthView(days, calendarDays)


// modal
const {
  showModal,
  selectedDate,
  form,
  openModal,
  closeModal,
  saveSchedule
} = useScheduleModal()


// summary
const {
  totalSchedules,
  todaySchedules,
  monthSchedules
} = useScheduleSummary(schedules)


// status
const {
  departmentStatus
} = useScheduleStatus(schedules)

</script>

<template>

<div class="schedule-page">

  <h2>ตารางเวร (Shift Schedule)</h2>


  <!-- controls -->
  <div class="controls">

    <button @click="prevMonth">◀</button>

    <span>{{ formatMonth }}</span>

    <button @click="nextMonth">▶</button>

  </div>


  <!-- header วัน -->
  <div class="calendar-header">

    <div
      v-for="d in days"
      :key="d"
      class="day-header"
    >
      {{ d }}
    </div>

  </div>


  <!-- grid ปฏิทิน -->
  <div class="calendar-grid">

    <div
      v-for="(day,index) in calendarDays"
      :key="index"
      class="calendar-day"
      @click="openModal(getDate(day))"
    >
      {{ getDayNumber(day) }}
    </div>

  </div>


  <!-- summary -->
  <div class="summary">

    <div>เวรทั้งหมด: {{ totalSchedules }}</div>

    <div>เวรวันนี้: {{ todaySchedules }}</div>

    <div>เวรเดือนนี้: {{ monthSchedules }}</div>

  </div>


  <!-- department status -->
  <div class="status">

    <h3>สถานะแผนก</h3>

    <div
      v-for="(count,dept) in departmentStatus"
      :key="dept"
    >
      {{ dept }} : {{ count }} เวร
    </div>

  </div>


  <!-- modal -->
  <div v-if="showModal" class="modal">

    <h3>เพิ่มเวร</h3>

    <input v-model="form.nurse" placeholder="ชื่อพยาบาล" />

    <input v-model="form.shift" placeholder="เวร" />

    <input v-model="form.department" placeholder="แผนก" />

    <button @click="saveSchedule(schedules)">บันทึก</button>

    <button @click="closeModal">ปิด</button>

  </div>

</div>

</template>


<style scoped>

.schedule-page{
  padding:20px;
}

.controls{
  display:flex;
  gap:10px;
  margin-bottom:20px;
}

.calendar-header{
  display:grid;
  grid-template-columns:repeat(7,1fr);
  font-weight:bold;
}

.calendar-grid{
  display:grid;
  grid-template-columns:repeat(7,1fr);
}

.calendar-day{
  border:1px solid #ddd;
  height:80px;
  padding:5px;
  cursor:pointer;
}

.summary{
  margin-top:20px;
}

.status{
  margin-top:20px;
}

.modal{
  position:fixed;
  top:30%;
  left:40%;
  background:white;
  padding:20px;
  border:1px solid #ccc;
}

</style>