// ปฏิทินเวร
<template>
  <div class="calendar-card">

    <!-- header -->
    <div class="calendar-header">
      <div v-for="d in days" :key="d">{{ d }}</div>
    </div>

    <!-- calendar -->
    <div class="calendar-grid">

      <div
        v-for="(day,index) in calendarDays"
        :key="index"
        class="cal-day"
        :class="{ empty: !day }"
        @click="selectDay(day)"
      >

        <span v-if="day" class="date">{{ day }}</span>

        <!-- shifts -->
        <div
          v-for="shift in getShifts(day)"
          :key="shift.id"
          class="shift-block"
          :class="'shift-' + shift.shift"
        >
          {{ shift.shift }} ({{ shift.name }})
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  month: Number,
  year: Number,
  schedules: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(["select-day"])

const days = ["SUN","MON","TUE","WED","THU","FRI","SAT"]

const calendarDays = computed(() => {

  const totalDays = new Date(props.year, props.month + 1, 0).getDate()
  const firstDay = new Date(props.year, props.month, 1).getDay()

  const arr = []

  // เติมช่องว่างต้นเดือน
  for (let i = 0; i < firstDay; i++) {
    arr.push(null)
  }

  // วันจริงของเดือน
  for (let d = 1; d <= totalDays; d++) {
    arr.push(d)
  }

  // เติมให้ครบ 42 ช่อง
  while (arr.length < 42) {
    arr.push(null)
  }

  return arr
})

function selectDay(day){

  if(!day) return

  const date = new Date(props.year, props.month, day)

  emit("select-day", date)

}

function getShifts(day){

  if(!day) return []

  return props.schedules.filter(s => {

    const d = new Date(s.date)

    return (
      d.getDate() === day &&
      d.getMonth() === props.month &&
      d.getFullYear() === props.year
    )

  })

}
</script>

<style scoped>

.calendar-card{
  background:white;
  border-radius:15px;
  border:1px solid #e2e8f0;
  overflow:hidden;
}

.calendar-header{
  display:grid;
  grid-template-columns:repeat(7,1fr);
  text-align:center;
  font-weight:bold;
  padding:15px 0;
  color:#64748b;
  border-bottom:1px solid #e2e8f0;
}

.calendar-grid{
  display:grid;
  grid-template-columns:repeat(7,1fr);
}

.cal-day{
  min-height:120px;
  border-right:1px solid #e2e8f0;
  border-bottom:1px solid #e2e8f0;
  padding:10px;
  cursor:pointer;
}

.cal-day:nth-child(7n){
  border-right:none;
}

.cal-day.empty{
  background:#f8fafc;
  cursor:default;
}

.date{
  font-weight:bold;
  display:block;
  margin-bottom:6px;
  color:#475569;
}

.shift-block{
  font-size:11px;
  padding:4px 6px;
  border-radius:4px;
  margin-bottom:4px;
  font-weight:600;
}

/* สีเวร */

.shift-เช้า{
  background:#d1fae5;
  color:#065f46;
}

.shift-บ่าย{
  background:#dbeafe;
  color:#1e40af;
}

.shift-ดึก{
  background:#fee2e2;
  color:#991b1b;
}

</style>