<template>
  <div class="cal-view-container">
    <!-- Day headers -->
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

    <!-- Grid -->
    <div class="cal-grid">
      <div
        v-for="(day, idx) in calendarDays"
        :key="idx"
        class="cal-cell"
        :class="{
          empty: !day,
          today: isToday(day),
          weekend: day && (idx % 7 === 0 || idx % 7 === 6)
        }"
        @click="onDayClick(day)"
      >
        <template v-if="day">
          <!-- Day number -->
          <div class="cell-num" :class="{ 'today-num': isToday(day) }">
            {{ getDayNumber(day) }}
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
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import useScheduleCalendar from "../ScheduleCalendar"
import useMonthView from "./MonthView"

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

const emit = defineEmits(["openDay", "openEditModal"])

// Date dependency for calendar (reacts to currentDate changes)
const { days, calendarDays } = useScheduleCalendar(computed(() => props.currentDate))

const { getDayNumber, getDate, isToday } = useMonthView(days, calendarDays)

function getDaySchedules(day) {
  if (!day) return []
  const date = getDate(day)
  return props.schedules.filter(sch => {
    const d = new Date(sch.date)
    return d.getFullYear() === date.getFullYear() && 
           d.getMonth() === date.getMonth() && 
           d.getDate() === date.getDate()
  })
}

function onDayClick(day) {
  if (!day) return
  emit("openDay", getDate(day))
}

function onScheduleClick(schedule, event) {
  event.stopPropagation()
  emit("openEditModal", schedule)
}
</script>

<style scoped>
/* Inherit styles form parent but adding missing elements */
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
  min-height: 100px;
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
.cal-cell:hover:not(.empty) {
  background: #eff6ff;
  border-color: var(--primary);
  transform: scale(1.02);
  box-shadow: 0 2px 12px rgba(37,99,235,.12);
  z-index: 1;
}
.cal-cell.empty {
  background: #fafcfe;
  cursor: default;
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
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex;
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
  overflow: hidden;
}
.cell-shift {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
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
