<template>
  <div class="day-view-container">
    <div class="day-header" :class="{ 'is-today': isTodayDate(currentDay) }">
      <h2 class="day-title">{{ formatDate }}</h2>
    </div>

    <div class="time-grid">
      <div v-for="hour in hours" :key="hour" class="time-row">
        <div class="time-label">{{ hour }}</div>
        <div class="time-cell" @click="createShift(hour)">
          <div 
            v-for="shift in getShiftsForHour(hour)" 
            :key="shift.id"
            class="shift-card"
            :style="{ borderLeftColor: getShiftColor(shift.shift) }"
            @click.stop="editShift(shift)"
          >
            <span class="shift-dot">{{ getShiftDot(shift.shift) }}</span>
            <div class="shift-details">
              <h4 class="nurse-name">{{ shift.nurseName }}</h4>
              <span class="shift-meta">({{ shift.shift }} / {{ shift.department }})</span>
            </div>
            <span class="shift-note" v-if="shift.note">{{ shift.note }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import useDayView from "./DayView"

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

// To ensure reactiveness if schedules change externally
const { currentDay, dayShifts, formatDate } = useDayView(
  computed(() => props.currentDate),
  computed(() => props.schedules)
)

function isTodayDate(date) {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

// 1. สร้างรายการเวลา 24 ชั่วโมง (00:00 – 23:00)
const hours = Array.from({ length: 24 }, (_, i) => {
  return `${i.toString().padStart(2, '0')}:00`
})

// 4. แสดงเวรในช่องเวลาที่ตรงกับ shift.startTime === hour
function getShiftsForHour(hour) {
  return dayShifts.value.filter(shift => shift.startTime === hour)
}

// 1. เมื่อกดช่องเวลา
function createShift(hour) {
  const targetDate = new Date(currentDay.value)
  const hourInt = parseInt(hour.split(":")[0])
  targetDate.setHours(hourInt, 0, 0, 0)
  // ให้เรียกฟังก์ชัน createShift(hour) เพื่อเปิด ScheduleModal และใช้ hour เป็น startTime
  emit('openDay', targetDate)
}

// 2. เมื่อกดเวรที่มีอยู่
function editShift(shift) {
  // ให้เรียก editShift(shift) เพื่อเปิด ScheduleModal สำหรับแก้ไข
  emit('openEditModal', shift)
}
</script>

<style scoped>
.day-view-container {
  background: var(--card);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--bdr);
}

.day-header {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--bdr);
  background: #f8fafc;
}

.day-header.is-today {
  background: var(--purple-lt);
}

.day-title {
  margin: 0;
  font-size: 20px;
  color: var(--txt);
  font-weight: 700;
}

.day-header.is-today .day-title {
  color: var(--purple);
}

.time-grid {
  display: flex;
  flex-direction: column;
}

.time-row {
  display: flex;
  min-height: 70px;
  border-bottom: 1px solid var(--bdr);
}

.time-row:last-child {
  border-bottom: none;
}

.time-label {
  width: 70px;
  padding: 12px;
  text-align: right;
  font-size: 13px;
  color: var(--txt2);
  font-weight: 600;
  border-right: 1px solid var(--bdr);
  background: #f8fafc;
  flex-shrink: 0;
}

.time-cell {
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.time-cell:hover {
  background: #f1f5f9;
}

.shift-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 10px 14px;
  background: var(--bg);
  border: 1px solid var(--bdr);
  border-left-width: 5px;
  border-left-style: solid;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  width: max-content;
  max-width: 100%;
}

.shift-card:hover {
  background: #eff6ff;
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37,99,235,.1);
}

.shift-dot {
  font-size: 16px;
}

.shift-details {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.nurse-name {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--txt);
}

.shift-meta {
  font-size: 13px;
  color: var(--txt2);
}

.shift-note {
  font-size: 12px;
  color: var(--txt2);
  background: var(--amber-lt);
  padding: 2px 10px;
  border-radius: 12px;
  margin-left: 6px;
}
</style>
