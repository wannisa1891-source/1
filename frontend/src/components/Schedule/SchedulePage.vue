<script setup>
import { ref } from "vue"

import DayView from "./View/DayView.vue"
import WeekView from "./View/WeekView.vue"
import MonthView from "./View/MonthView.vue"
import YearView from "./View/YearView.vue"

const viewMode = ref("month")
</script>

<template>
  <div>

    <div class="controls">
      <button @click="viewMode = 'day'">Day</button>
      <button @click="viewMode = 'week'">Week</button>
      <button @click="viewMode = 'month'">Month</button>
      <button @click="viewMode = 'year'">Year</button>
    </div>

    <DayView v-if="viewMode === 'day'" />
    <WeekView v-if="viewMode === 'week'" />
    <MonthView v-if="viewMode === 'month'" />
    <YearView v-if="viewMode === 'year'" />

  </div>
</template>