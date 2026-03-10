<template>
  <div class="schedule-controls">

    <!-- เดือน -->
    <div class="month-control">
      <button @click="$emit('prev')">◀</button>
      <span class="month-text">{{ formatMonth }}</span>
      <button @click="$emit('next')">▶</button>
    </div>

    <!-- View -->
    <div class="view-control">
      <button
        v-for="v in views"
        :key="v"
        :class="{ active: currentView === v }"
        @click="changeView(v)"
      >
        {{ v }}
      </button>
    </div>

    <!-- Department -->
    <div class="dept-control">
      <select v-model="selectedDept" @change="changeDept">
        <option value="">ทุกแผนก</option>
        <option
          v-for="d in departments"
          :key="d.id"
          :value="d.id"
        >
          {{ d.name }}
        </option>
      </select>
    </div>

    <!-- Action -->
    <div class="action-control">
      <button @click="$emit('print')">Print</button>
      <button @click="$emit('export')">Export</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "ScheduleControls",

  emits: [
    "prev",
    "next",
    "view-change",
    "dept-change",
    "print",
    "export"
  ],

  props: {
    currentMonth: {
      type: Date,
      required: true
    },
    currentView: {
      type: String,
      default: "Month"
    },
    departments: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      views: ["Month", "Week", "Day", "Year"], // ✅ เพิ่ม Year
      selectedDept: ""
    }
  },

  computed: {
    formatMonth() {

      if (!this.currentMonth) return ""

      const options = {
        year: "numeric",
        month: "long"
      }

      return this.currentMonth.toLocaleDateString("th-TH", options)

    }
  },

  methods: {
    changeView(view) {
      this.$emit("view-change", view)
    },

    changeDept() {
      this.$emit("dept-change", this.selectedDept)
    }
  }
}
</script>

<style scoped>

.schedule-controls{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:16px;
  gap:10px;
  flex-wrap:wrap;
}

.month-control button{
  padding:4px 10px;
}

.month-text{
  font-weight:bold;
  margin:0 10px;
}

.view-control button{
  margin-right:5px;
  padding:4px 10px;
}

.view-control button.active{
  background:#3b82f6;
  color:white;
}

.dept-control select{
  padding:4px 8px;
}

.action-control button{
  margin-left:5px;
  padding:4px 10px;
}

</style>