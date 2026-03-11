<template>
  <div class="year-grid">
    <div
      v-for="monthData in yearMonths"
      :key="monthData.month"
      class="month-box"
      :class="{ 'has-shifts': monthData.shiftCount > 0 }"
      @click="selectMonth(monthData.month)"
    >
      <div class="month-name">{{ monthNames[monthData.month] }}</div>
      <div v-if="monthData.shiftCount > 0" class="month-badge">
        {{ monthData.shiftCount }} เวร
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRef } from 'vue'
import useYearView from './YearView'

const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  },
  schedules: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(["openMonth"])

const { yearMonths } = useYearView(
  toRef(props, 'currentDate'),
  toRef(props, 'schedules')
)

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

function selectMonth(monthIndex) {
  emit("openMonth", monthIndex)
}
</script>

<style scoped>
.year-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 10px 0;
}
.month-box {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--card);
  border-radius: 12px;
  border: 1.5px solid var(--bdr);
  cursor: pointer;
  transition: all 0.25s;
}
.month-name {
  font-size: 20px;
  font-weight: 600;
  color: var(--txt);
  transition: color 0.25s;
}
.month-badge {
  font-size: 13px;
  color: var(--primary);
  font-weight: 700;
  background: var(--primary-lt);
  padding: 4px 10px;
  border-radius: 20px;
}
.month-box:hover {
  background: #eff6ff;
  border-color: var(--primary, #2563eb);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37,99,235,.12);
}
.month-box:hover .month-name {
  color: var(--primary, #2563eb);
}
</style>
