<template>
  <div class="cal-view-container">
    <!-- Day headers for Week -->
    <div class="cal-header">
      <div
        v-for="d in days"
        :key="d"
        class="cal-day-name"
        :class="{ weekend: d === 'Sun' || d === 'Sat' }"
      >
        {{ d }}
      </div>
    </div>

    <!-- 7-day Grid -->
    <div class="cal-grid">
      <div
        v-for="(day, idx) in weekDays"
        :key="idx"
        class="cal-cell"
        :class="{
          today: isTodayDate(day),
          weekend: idx === 0 || idx === 6
        }"
        @click="onDayClick(day)"
      >
        <!-- Day number -->
        <div class="cell-num" :class="{ 'today-num': isTodayDate(day) }">
          {{ getDayNumber(day) }} ({{ formatDate(day) }})
        </div>

        <!-- Schedules in cell -->
        <div class="cell-schedules">
          <div
            v-for="sch in getDaySchedules(day)"
            :key="sch.id"
            class="cell-shift"
            :style="{ borderLeftColor: getShiftColor(sch.shift) }"
            @click="onScheduleClick(sch, $event)"
            :title="`${sch.nurseName} — ${sch.shift} — ${sch.department}`"
          >
            <span class="shift-dot">{{ getShiftDot(sch.shift) }}</span>
            <span class="shift-text">{{ sch.nurseName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import useWeekView from "./WeekView"

const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  },
  schedules: {
    type: Array,
    required: true
  },
  getShiftColor: {
    type: Function,
    required: true
  },
  getShiftDot: {
    type: Function,
    required: true
  }
})

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const emit = defineEmits(["openDay", "openEditModal"])

const { weekDays, getDayNumber, formatDate } = useWeekView(computed(() => props.currentDate))

function isTodayDate(date) {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

function getDaySchedules(date) {
  return props.schedules.filter(sch => {
    const d = new Date(sch.date)
    return d.getFullYear() === date.getFullYear() && 
           d.getMonth() === date.getMonth() && 
           d.getDate() === date.getDate()
  })
}

function onDayClick(date) {
  emit("openDay", date)
}

function onScheduleClick(schedule, event) {
  event.stopPropagation()
  emit("openEditModal", schedule)
}
</script>

<style scoped>
.cal-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
}
.cal-day-name {
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  color: var(--txt2);
  padding: 8px 0;
  text-transform: uppercase;
  letter-spacing: .5px;
}
.cal-day-name.weekend { color: var(--red); }

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
}
.cal-cell {
  min-height: 250px;
  padding: 8px;
  border-radius: 12px;
  cursor: pointer;
  background: var(--card);
  border: 1.5px solid transparent;
  transition: .25s;
  position: relative;
  display: flex;
  flex-direction: column;
}
.cal-cell:hover {
  background: #eff6ff;
  border-color: var(--primary);
  transform: scale(1.02);
  box-shadow: 0 2px 12px rgba(37,99,235,.12);
  z-index: 1;
}
.cal-cell.today {
  background: var(--purple-lt);
  border-color: var(--purple);
}
.cal-cell.weekend:not(.today) .cell-num { color: var(--red); }

.cell-num {
  font-size: 13px;
  font-weight: 600;
  color: var(--txt);
  margin-bottom: 4px;
}
.today-num {
  background: var(--purple);
  color: #fff !important;
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.cell-schedules {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  overflow: auto;
}
.cell-shift {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  border-radius: 6px;
  background: rgba(0,0,0,.03);
  border-left: 3px solid;
  font-size: 11px;
  transition: .2s;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cell-shift:hover {
  background: rgba(0,0,0,.07);
}
.shift-dot { font-size: 10px; flex-shrink: 0; }
.shift-text {
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--txt);
  font-weight: 500;
}
</style>
