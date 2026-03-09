<template>
  <div class="status-card">

    <h3>สถานะแผนก</h3>

    <div
      v-for="(count, dept) in departmentStats"
      :key="dept"
      class="status-row"
    >
      <span class="dept-name">{{ dept }}</span>
      <span class="dept-count">{{ count }} เวร</span>
    </div>

    <div v-if="isEmpty" class="empty">
      ไม่มีข้อมูลเวร
    </div>

  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  schedules: {
    type: Array,
    default: () => []
  }
})

const departmentStats = computed(() => {

  const stats = {}
  const list = props.schedules || []

  list.forEach(item => {

    const dept = item.department || "ไม่ระบุ"

    if (!stats[dept]) {
      stats[dept] = 0
    }

    stats[dept]++

  })

  return stats

})

const isEmpty = computed(() => {
  return Object.keys(departmentStats.value).length === 0
})
</script>

<style scoped>

.status-card{
  background:white;
  padding:16px;
  border-radius:8px;
  box-shadow:0 2px 6px rgba(0,0,0,0.1);
}

.status-row{
  display:flex;
  justify-content:space-between;
  padding:8px 0;
  border-bottom:1px solid #eee;
}

.dept-name{
  font-weight:500;
}

.dept-count{
  color:#3b82f6;
}

.empty{
  text-align:center;
  color:#999;
  padding:10px;
}

</style>