<template>
  <div class="year-grid">
    <div
      v-for="month in months"
      :key="month.index"
      class="month-box"
      @click="selectMonth(month.index)"
    >
      {{ month.name }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  }
})

const emit = defineEmits(["openMonth"])

const months = [
  { name: "Jan", index: 0 },
  { name: "Feb", index: 1 },
  { name: "Mar", index: 2 },
  { name: "Apr", index: 3 },
  { name: "May", index: 4 },
  { name: "Jun", index: 5 },
  { name: "Jul", index: 6 },
  { name: "Aug", index: 7 },
  { name: "Sep", index: 8 },
  { name: "Oct", index: 9 },
  { name: "Nov", index: 10 },
  { name: "Dec", index: 11 }
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
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: var(--txt);
  background: var(--card);
  border-radius: 12px;
  border: 1.5px solid var(--bdr);
  cursor: pointer;
  transition: all 0.25s;
}
.month-box:hover {
  background: #eff6ff;
  border-color: var(--primary, #2563eb);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37,99,235,.12);
  color: var(--primary, #2563eb);
}
</style>
