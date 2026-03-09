<script setup>
import { ref } from "vue"

import ScheduleControls from "./ScheduleControls.vue"

import DayView from "./View/DayView.vue"
import WeekView from "./View/WeekView.vue"
import MonthView from "./View/MonthView.vue"
import YearView from "./View/YearView.vue"

const viewMode = ref("month")
const currentMonth = ref(new Date())

function changeView(view){
  viewMode.value = view.toLowerCase() // ✅ แก้ตรงนี้
}

function prevMonth(){
  const d = new Date(currentMonth.value)
  d.setMonth(d.getMonth() - 1)
  currentMonth.value = d
}

function nextMonth(){
  const d = new Date(currentMonth.value)
  d.setMonth(d.getMonth() + 1)
  currentMonth.value = d
}
</script>

<template>

  <div class="schedule-page">

    <ScheduleControls
      :currentMonth="currentMonth"
      :currentView="viewMode"

      @view-change="changeView"
      @prev="prevMonth"
      @next="nextMonth"
    />

    <DayView v-if="viewMode === 'day'" />
    <WeekView v-if="viewMode === 'week'" />
    <MonthView v-if="viewMode === 'month'" />
    <YearView v-if="viewMode === 'year'" />

  </div>

</template>