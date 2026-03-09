// สรุปเวรพนักงาน
<template>
  <div class="schedule-summary">
    <div class="summary-card">
      <p class="label">Total</p>
      <p class="value">{{ totalSchedules }}</p>
    </div>

    <div class="summary-card">
      <p class="label">Today</p>
      <p class="value">{{ todaySchedules }}</p>
    </div>

    <div class="summary-card">
      <p class="label">This Week</p>
      <p class="value">{{ weekSchedules }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  schedules: {
    type: Array,
    required: true
  }
})

const today = new Date()

const totalSchedules = computed(() => props.schedules.length)

const todaySchedules = computed(() => {
  return props.schedules.filter((schedule) => {
    const d = new Date(schedule.date)
    return d.toDateString() === today.toDateString()
  }).length
})

const weekSchedules = computed(() => {
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)

  return props.schedules.filter((schedule) => {
    const d = new Date(schedule.date)
    return d >= startOfWeek && d <= endOfWeek
  }).length
})
</script>

<style scoped>
.schedule-summary {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.summary-card {
  flex: 1;
  padding: 16px;
  border-radius: 10px;
  background: #f4f6f8;
  text-align: center;
}

.label {
  font-size: 14px;
  color: #666;
}

.value {
  font-size: 24px;
  font-weight: bold;
}
</style>