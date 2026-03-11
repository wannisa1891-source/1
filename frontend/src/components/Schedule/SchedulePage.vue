<!-- SchedulePage.vue — ระบบจัดตารางเวรพยาบาล (Shift Schedule) -->
<script setup>
import { ref } from "vue"

import useScheduleControls from "./ScheduleControls"
import useScheduleModal from "./ScheduleModal"
import useScheduleSummary from "./ScheduleSummary"
import useScheduleStatus from "./ScheduleStatus"
import YearView from "./View/YearView.vue"
import MonthView from "./View/MonthView.vue"
import WeekView from "./View/WeekView.vue"
import DayView from "./View/DayView.vue"

// ===== Data =====
const schedules = ref([])

// ===== Controls =====
const {
  currentDate,
  currentView,
  views,
  formatDisplay,
  formatDate,
  goPrev,
  goNext,
  goToday,
  changeView
} = useScheduleControls()



// ===== Modal =====
const {
  showModal,
  selectedDate,
  editingId,
  errors,
  shiftTypes,
  departments,
  form,
  isEditing,
  openModal,
  openEditModal,
  closeModal,
  saveSchedule,
  deleteSchedule,
  getSchedulesForDate,
  getShiftColor
} = useScheduleModal(schedules)

// ===== Summary =====
const { totalSchedules, todaySchedules, monthSchedules } = useScheduleSummary(schedules)

// ===== Status =====
const { departmentStatus } = useScheduleStatus(schedules)

// ===== Helpers =====
function checkIsToday(day) {
  if (!day) return false
  const date = (day && typeof day === "object" && day.date) ? day.date : day
  if (!(date instanceof Date)) return false
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

function getDaySchedules(day) {
  if (!day) return []
  const date = (day && typeof day === "object" && day.date) ? day.date : day
  return getSchedulesForDate(date)
}

function getShiftDot(shift) {
  if (shift === "Morning") return "🟢"
  if (shift === "Afternoon") return "🟠"
  if (shift === "Night") return "🟣"
  return "⚪"
}

function onDayClick(day) {
  if (!day) return
  openModal(getDate(day))
}

function onScheduleClick(schedule, event) {
  event.stopPropagation()
  openEditModal(schedule)
}

function confirmDelete(id) {
  if (confirm("คุณต้องการลบเวรนี้ใช่ไหม?")) {
    deleteSchedule(id)
  }
}

function openMonth(monthIndex) {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(monthIndex)
  currentDate.value = newDate
  changeView("month")
}

function openDay(date) {
  currentDate.value = date
  changeView("day")
}
</script>


<template>
<div class="schedule-page">

  <!-- ==================== HEADER ==================== -->
  <div class="page-header">
    <div class="header-left">
      <div class="header-icon">🏥</div>
      <div>
        <h1>ตารางเวรพยาบาล</h1>
        <p class="header-sub">Nurse Shift Schedule Management</p>
      </div>
    </div>
  </div>


  <!-- ==================== SUMMARY ==================== -->
  <div class="summary-row">

    <div class="sum-card sum-total">
      <div class="sum-icon-wrap sum-icon-blue">
        <span>📋</span>
      </div>
      <div class="sum-body">
        <span class="sum-num">{{ totalSchedules }}</span>
        <span class="sum-label">เวรทั้งหมด</span>
      </div>
    </div>

    <div class="sum-card sum-today">
      <div class="sum-icon-wrap sum-icon-green">
        <span>🕐</span>
      </div>
      <div class="sum-body">
        <span class="sum-num">{{ todaySchedules }}</span>
        <span class="sum-label">เวรวันนี้</span>
      </div>
    </div>

    <div class="sum-card sum-month">
      <div class="sum-icon-wrap sum-icon-amber">
        <span>📆</span>
      </div>
      <div class="sum-body">
        <span class="sum-num">{{ monthSchedules }}</span>
        <span class="sum-label">เวรเดือนนี้</span>
      </div>
    </div>

  </div>


  <!-- ==================== CALENDAR CARD ==================== -->
  <div class="cal-card">

    <!-- Controls -->
    <div class="cal-controls">

      <div class="cal-nav">
        <button class="btn-nav" @click="goPrev" title="ก่อนหน้า">◀</button>
        <h2 class="cal-month">{{ formatDisplay }}</h2>
        <button class="btn-nav" @click="goNext" title="ถัดไป">▶</button>
        <button class="btn-today" @click="goToday">Today</button>
      </div>

      <div class="cal-views">
        <button
          v-for="v in views"
          :key="v"
          class="btn-view"
          :class="{ active: currentView === v }"
          @click="changeView(v)"
        >
          {{ v }}
        </button>
      </div>

    </div>

    <!-- Day View -->
    <DayView
      v-if="currentView === 'day'"
      :currentDate="currentDate"
      :schedules="schedules"
      :getShiftColor="getShiftColor"
      :getShiftDot="getShiftDot"
      @openDay="openModal"
      @openEditModal="openEditModal"
    />

    <!-- Week View -->
    <WeekView
      v-else-if="currentView === 'week'"
      :currentDate="currentDate"
      :schedules="schedules"
      :getShiftColor="getShiftColor"
      :getShiftDot="getShiftDot"
      @openDay="openDay"
      @openEditModal="openEditModal"
    />

    <!-- Month View -->
    <MonthView
      v-else-if="currentView === 'month'"
      :currentDate="currentDate"
      :schedules="schedules"
      :getShiftColor="getShiftColor"
      :getShiftDot="getShiftDot"
      @openDay="openDay"
      @openEditModal="openEditModal"
    />

    <!-- Year View -->
    <YearView
      v-else-if="currentView === 'year'"
      :currentDate="currentDate"
      :schedules="schedules"
      @openMonth="openMonth"
    />

    <!-- Shift Legend -->
    <div class="shift-legend" v-if="currentView !== 'year'">
      <div class="legend-item" v-for="st in shiftTypes" :key="st.value">
        <span class="legend-dot" :style="{ background: st.color }"></span>
        <span>{{ st.value }}</span>
      </div>
    </div>

  </div>


  <!-- ==================== DEPARTMENT STATUS ==================== -->
  <div class="dept-card" v-if="Object.keys(departmentStatus).length">
    <h3 class="dept-title">
      <span>🏥</span> สถานะเวรแต่ละแผนก
    </h3>
    <div class="dept-grid">
      <div
        v-for="(count, dept) in departmentStatus"
        :key="dept"
        class="dept-item"
      >
        <span class="dept-name">{{ dept }}</span>
        <span class="dept-badge">{{ count }} เวร</span>
      </div>
    </div>
  </div>


  <!-- ==================== MODAL ==================== -->
  <transition name="modal-anim">
    <div v-if="showModal" class="modal-bg" @click.self="closeModal">
      <div class="modal-box">

        <!-- Header -->
        <div class="modal-top">
          <h3>{{ isEditing ? '✏️ แก้ไขเวร' : '➕ เพิ่มเวร' }}</h3>
          <button class="modal-x" @click="closeModal">✕</button>
        </div>

        <!-- Date badge -->
        <div class="modal-date">
          📅 {{ formatDate(selectedDate) }}
        </div>

        <!-- Existing schedules for this date -->
        <div v-if="!isEditing && getDaySchedules({ date: selectedDate }).length" class="modal-existing">
          <p class="existing-title">เวรที่มีอยู่ในวันนี้:</p>
          <div
            v-for="sch in getDaySchedules({ date: selectedDate })"
            :key="sch.id"
            class="existing-item"
          >
            <div class="existing-info">
              <span class="existing-dot" :style="{ background: getShiftColor(sch.shift) }"></span>
              <span>{{ sch.nurseName }} — {{ sch.shift }} — {{ sch.department }}</span>
            </div>
            <div class="existing-actions">
              <button class="btn-icon btn-edit" @click="openEditModal(sch)" title="แก้ไข">✏️</button>
              <button class="btn-icon btn-del" @click="confirmDelete(sch.id)" title="ลบ">🗑️</button>
            </div>
          </div>
        </div>

        <!-- Errors -->
        <div v-if="errors.length" class="modal-errors">
          <div v-for="(err, i) in errors" :key="i" class="err-line">
            ⚠️ {{ err }}
          </div>
        </div>

        <!-- Form -->
        <div class="modal-form">

          <div class="fg">
            <label>👩‍⚕️ ชื่อพยาบาล <span class="req">*</span></label>
            <input
              v-model="form.nurseName"
              placeholder="กรอกชื่อพยาบาล"
              class="fi"
            />
          </div>

          <div class="fg">
            <label>⏰ ประเภทเวร <span class="req">*</span></label>
            <div class="shift-picker">
              <button
                v-for="st in shiftTypes"
                :key="st.value"
                class="shift-opt"
                :class="{ selected: form.shift === st.value }"
                :style="{
                  borderColor: form.shift === st.value ? st.color : 'transparent',
                  background: form.shift === st.value ? st.color + '18' : ''
                }"
                @click="form.shift = st.value"
              >
                {{ st.label }}
              </button>
            </div>
          </div>

          <div class="fg">
            <label>🏢 แผนก <span class="req">*</span></label>
            <select v-model="form.department" class="fi">
              <option value="" disabled>เลือกแผนก</option>
              <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>

          <div class="fg">
            <label>📝 หมายเหตุ</label>
            <input
              v-model="form.note"
              placeholder="หมายเหตุ (ไม่จำเป็น)"
              class="fi"
            />
          </div>

        </div>

        <!-- Buttons -->
        <div class="modal-btns">
          <button class="btn-save" @click="saveSchedule">
            💾 {{ isEditing ? 'อัปเดต' : 'บันทึก' }}
          </button>
          <button v-if="isEditing" class="btn-delete" @click="confirmDelete(editingId)">
            🗑️ ลบเวร
          </button>
          <button class="btn-close" @click="closeModal">
            ยกเลิก
          </button>
        </div>

      </div>
    </div>
  </transition>

</div>
</template>


<style scoped>
/* ===========================
   COLOR TOKENS
   =========================== */
.schedule-page {
  --primary: #2563eb;
  --primary-lt: #dbeafe;
  --primary-dk: #1d4ed8;
  --green: #10b981;
  --green-lt: #d1fae5;
  --amber: #f59e0b;
  --amber-lt: #fef3c7;
  --purple: #7c3aed;
  --purple-lt: #ede9fe;
  --red: #ef4444;
  --card: #ffffff;
  --bg: #f8fafc;
  --txt: #1e293b;
  --txt2: #64748b;
  --bdr: #e2e8f0;
  --shd: 0 4px 20px rgba(0,0,0,.06);
  --shd2: 0 8px 32px rgba(0,0,0,.1);
  --rad: 16px;
}

/* ===========================
   PAGE
   =========================== */
.schedule-page {
  padding: 28px 32px;
  max-width: 1200px;
  margin: 0 auto;
  background: var(--bg);
  min-height: 100vh;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

/* ===========================
   HEADER
   =========================== */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.header-icon {
  font-size: 34px;
  width: 56px; height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-lt);
  border-radius: 14px;
}
.page-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: var(--txt);
}
.header-sub {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--txt2);
}

/* ===========================
   SUMMARY CARDS
   =========================== */
.summary-row {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 18px;
  margin-bottom: 28px;
}
.sum-card {
  background: var(--card);
  border-radius: var(--rad);
  padding: 22px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shd);
  border: 1px solid var(--bdr);
  transition: .3s;
}
.sum-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shd2);
}
.sum-icon-wrap {
  width: 52px; height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}
.sum-icon-blue  { background: linear-gradient(135deg,#dbeafe,#bfdbfe); }
.sum-icon-green { background: linear-gradient(135deg,#d1fae5,#a7f3d0); }
.sum-icon-amber { background: linear-gradient(135deg,#fef3c7,#fde68a); }
.sum-body { display: flex; flex-direction: column; }
.sum-num {
  font-size: 28px;
  font-weight: 800;
  color: var(--txt);
  line-height: 1;
}
.sum-label {
  font-size: 13px;
  color: var(--txt2);
  margin-top: 4px;
  font-weight: 500;
}

/* ===========================
   CALENDAR CARD
   =========================== */
.cal-card {
  background: var(--card);
  border-radius: 20px;
  padding: 28px;
  box-shadow: var(--shd);
  border: 1px solid var(--bdr);
  margin-bottom: 28px;
}

/* --- controls --- */
.cal-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  flex-wrap: wrap;
  gap: 12px;
}
.cal-nav {
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn-nav {
  width: 38px; height: 38px;
  border-radius: 10px;
  border: 1px solid var(--bdr);
  background: var(--card);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: var(--txt);
  transition: .25s;
}
.btn-nav:hover {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
  transform: scale(1.06);
}
.cal-month {
  font-size: 20px;
  font-weight: 700;
  color: var(--txt);
  min-width: 160px;
  text-align: center;
  margin: 0;
}
.btn-today {
  padding: 7px 16px;
  border-radius: 8px;
  border: 1px solid var(--primary);
  background: var(--primary-lt);
  color: var(--primary);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: .25s;
}
.btn-today:hover {
  background: var(--primary);
  color: #fff;
}

/* --- view buttons --- */
.cal-views {
  display: flex;
  gap: 4px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 10px;
}
.btn-view {
  padding: 7px 18px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--txt2);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: .25s;
  text-transform: capitalize;
}
.btn-view:hover { color: var(--primary); }
.btn-view.active {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 2px 8px rgba(37,99,235,.3);
}

/* --- day header --- */
.cal-header {
  display: grid;
  grid-template-columns: repeat(7,1fr);
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

/* --- grid --- */
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7,1fr);
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

/* --- shifts inside cells --- */
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

/* --- legend --- */
.shift-legend {
  display: flex;
  gap: 20px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--bdr);
  justify-content: center;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--txt2);
  font-weight: 500;
}
.legend-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
}

/* ===========================
   DEPARTMENT STATUS
   =========================== */
.dept-card {
  background: var(--card);
  border-radius: 20px;
  padding: 24px 28px;
  box-shadow: var(--shd);
  border: 1px solid var(--bdr);
}
.dept-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--txt);
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.dept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px,1fr));
  gap: 10px;
}
.dept-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid var(--bdr);
  transition: .2s;
}
.dept-item:hover {
  background: #eff6ff;
  border-color: var(--primary);
}
.dept-name {
  font-weight: 600;
  color: var(--txt);
  font-size: 14px;
}
.dept-badge {
  font-size: 12px;
  color: var(--primary);
  font-weight: 700;
  background: var(--primary-lt);
  padding: 4px 10px;
  border-radius: 20px;
}

/* ===========================
   MODAL
   =========================== */
.modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-box {
  background: var(--card);
  border-radius: 22px;
  padding: 30px;
  width: 520px;
  max-width: 92vw;
  max-height: 88vh;
  overflow-y: auto;
  box-shadow: var(--shd2);
  animation: mSlide .3s ease;
}
@keyframes mSlide {
  from { transform: translateY(24px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.modal-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.modal-top h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--txt);
}
.modal-x {
  width: 34px; height: 34px;
  border-radius: 10px;
  border: 1px solid var(--bdr);
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  color: var(--txt2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s;
}
.modal-x:hover {
  background: #fee2e2;
  color: var(--red);
  border-color: var(--red);
}

.modal-date {
  background: var(--primary-lt);
  color: var(--primary-dk);
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
}

/* --- existing schedules list --- */
.modal-existing {
  margin-bottom: 16px;
  padding: 14px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid var(--bdr);
}
.existing-title {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--txt2);
}
.existing-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 8px;
  margin-bottom: 6px;
  background: var(--card);
  border: 1px solid var(--bdr);
  transition: .2s;
}
.existing-item:last-child { margin-bottom: 0; }
.existing-item:hover { border-color: var(--primary); }
.existing-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--txt);
  font-weight: 500;
}
.existing-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.existing-actions {
  display: flex;
  gap: 4px;
}
.btn-icon {
  width: 30px; height: 30px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s;
}
.btn-edit:hover { background: #dbeafe; }
.btn-del:hover  { background: #fee2e2; }

/* --- errors --- */
.modal-errors {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 16px;
}
.err-line {
  font-size: 13px;
  color: var(--red);
  margin-bottom: 4px;
  font-weight: 500;
}
.err-line:last-child { margin-bottom: 0; }

/* --- form --- */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 22px;
}
.fg label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--txt);
  margin-bottom: 6px;
}
.req { color: var(--red); }
.fi {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid var(--bdr);
  border-radius: 10px;
  font-size: 14px;
  color: var(--txt);
  background: #f8fafc;
  transition: .25s;
  box-sizing: border-box;
  outline: none;
}
.fi:focus {
  border-color: var(--primary);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(37,99,235,.1);
}
.fi::placeholder { color: #94a3b8; }

select.fi {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2364748b' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}
select.fi option { background: #fff; color: var(--txt); }

/* --- shift picker --- */
.shift-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.shift-opt {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 10px;
  border: 2px solid transparent;
  background: #f8fafc;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--txt);
  transition: .25s;
}
.shift-opt:hover { background: #f1f5f9; }
.shift-opt.selected {
  font-weight: 700;
}

/* --- buttons --- */
.modal-btns {
  display: flex;
  gap: 10px;
}
.btn-save {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dk));
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: .25s;
}
.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(37,99,235,.35);
}
.btn-delete {
  padding: 12px 18px;
  border: 1px solid #fecaca;
  border-radius: 10px;
  background: #fef2f2;
  color: var(--red);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: .2s;
}
.btn-delete:hover {
  background: #fee2e2;
}
.btn-close {
  padding: 12px 18px;
  border: 1px solid var(--bdr);
  border-radius: 10px;
  background: transparent;
  color: var(--txt2);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: .2s;
}
.btn-close:hover { background: #f1f5f9; }

/* ===========================
   MODAL TRANSITION
   =========================== */
.modal-anim-enter-active,
.modal-anim-leave-active { transition: .3s ease; }
.modal-anim-enter-from,
.modal-anim-leave-to { opacity: 0; }
.modal-anim-enter-from .modal-box,
.modal-anim-leave-to .modal-box {
  transform: translateY(24px);
}

/* ===========================
   RESPONSIVE
   =========================== */
@media (max-width: 768px) {
  .schedule-page { padding: 16px; }
  .summary-row { grid-template-columns: 1fr; }
  .cal-controls { flex-direction: column; align-items: flex-start; }
  .cal-card { padding: 16px; }
  .cal-cell { min-height: 60px; padding: 4px; border-radius: 8px; }
  .cell-num { font-size: 11px; }
  .cell-shift { font-size: 10px; }
  .modal-box { width: 95vw; padding: 20px; }
}
</style>