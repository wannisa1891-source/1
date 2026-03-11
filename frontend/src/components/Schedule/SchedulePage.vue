// UI หลัก
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
  currentView,
  views,
  formatMonth,
  prevMonth,
  nextMonth,
  changeView
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

    <span class="month">{{ formatMonth }}</span>

    <button @click="nextMonth">▶</button>

    <div class="view-buttons">
      <button
        v-for="v in views"
        :key="v"
        @click="changeView(v)"
        :class="{ active: currentView === v }"
      >
        {{ v }}
      </button>
    </div>

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
      @click="day && openModal(getDate(day))"
    >

      <div class="date-number">
        {{ getDayNumber(day) }}
      </div>

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
      class="dept-row"
    >
      {{ dept }} : {{ count }} เวร
    </div>

  </div>


  <!-- modal -->
  <div v-if="showModal" class="modal">

    <h3>เพิ่มเวร</h3>

    <div class="modal-date">
      วันที่: {{ selectedDate }}
    </div>

    <input v-model="form.nurse" placeholder="ชื่อพยาบาล" />

    <input v-model="form.shift" placeholder="เวร (เช้า/บ่าย/ดึก)" />

    <input v-model="form.department" placeholder="แผนก" />

    <div class="modal-buttons">
      <button @click="saveSchedule(schedules)">บันทึก</button>
      <button @click="closeModal">ปิด</button>
    </div>

  </div>

</div>

</template>


<style scoped>

.schedule-page{
  padding:20px;
  max-width:900px;
}

.controls{
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:20px;
}

.month{
  font-weight:bold;
}

.view-buttons{
  margin-left:20px;
}

.view-buttons button{
  margin-right:5px;
}

.active{
  background:#1976d2;
  color:white;
}

.calendar-header{
  display:grid;
  grid-template-columns:repeat(7,1fr);
  font-weight:bold;
  text-align:center;
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

.calendar-day:hover{
  background:#f5f5f5;
}

.date-number{
  font-size:14px;
}

.summary{
  margin-top:20px;
}

.status{
  margin-top:20px;
}

.dept-row{
  margin-bottom:5px;
}

.modal{
  position:fixed;
  top:30%;
  left:50%;
  transform:translateX(-50%);
  background:white;
  padding:20px;
  border:1px solid #ccc;
  width:250px;
}

.modal input{
  width:100%;
  margin-bottom:10px;
}

.modal-buttons{
  display:flex;
  gap:10px;
}

</style>