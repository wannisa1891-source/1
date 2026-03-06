// Template & Style
<template>
  <div class="leave-page-container fade-in">  
    <div v-if="!showForm" class="main-content-wrapper">
      <header class="page-header">
        <div class="header-left">
          <span class="breadcrumb">Personnel / Leave Management</span>
          <h1 class="page-title">ระบบจัดการการลา</h1>
        </div>
        <div class="header-right">
          <button class="btn-back-minimal" @click="$emit('goBack')">
            <span class="icon">←</span> ย้อนกลับ
          </button>
        </div>
      </header>
      <section class="summary-grid mt-30">
        <div class="summary-card glass blue" @click="$emit('filterCard', 'sick')" style="cursor: pointer;">
          <div class="card-icon">🤒</div>
          <div class="card-info">
            <span class="card-label">ลาป่วยวันนี้</span>
            <h2 class="card-value">{{ sickTodayCount }} <small>คน</small></h2>
          </div>
        </div>     
        <div class="summary-card glass orange" @click="$emit('filterCard', 'pending')" style="cursor: pointer;">
          <div class="card-icon">⏳</div>
          <div class="card-info">
            <span class="card-label">รอพิจารณา</span>
            <h2 class="card-value">{{ pendingCount }} <small>รายการ</small></h2>
          </div>
        </div>
        <div class="summary-card glass green" @click="$emit('filterCard', 'all')" style="cursor: pointer;">
          <div class="card-icon">✅</div>
          <div class="card-info">
            <span class="card-label">รายการทั้งหมด</span>
            <h2 class="card-value">{{ leaves.length }} <small>รายการ</small></h2>
          </div>
        </div>
      </section>
      <section class="table-container-modern mt-30">
        <div class="table-controls">
          <div class="search-box-modern">
            <span class="search-icon">🔍</span>
            <input type="text" 
                   :value="searchText" 
                   @input="$emit('update:searchText', $event.target.value)" 
                   placeholder="ค้นหาชื่อพนักงาน...">
          </div>
          <div class="filter-actions">
            <select class="select-modern" :value="selectedDept" @change="$emit('update:selectedDept', $event.target.value)">
              <option value="all">ทุกแผนก</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
            </select>
            <select class="select-modern" :value="selectedStatus" @change="$emit('update:selectedStatus', $event.target.value)">
              <option value="all">ทุกสถานะ</option>
              <option value="Pending">รออนุมัติ</option>
              <option value="Approved">อนุมัติแล้ว</option>
            </select>       
            <button @click="showForm = true" class="btn-add-primary">
              <span>+</span> สร้างใบลาใหม่
            </button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>พนักงาน</th>
                <th>แผนก</th>
                <th>เริ่ม - สิ้นสุด</th>
                <th>เหตุผล</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="leave in filteredLeaves" :key="leave.leave_id">
                <td>#{{ leave.leave_id }}</td>
                <td>{{ leave.first_name_th }} {{ leave.last_name_th }} ({{ leave.emp_id }})</td>
                <td>{{ leave.dept_name || 'ไม่ระบุ' }}</td>
                <td class="date-cell">{{ formatDate(leave.start_date) }} - {{ formatDate(leave.end_date) }}</td>
                <td>{{ leave.reason || '-' }}</td>
                <td>
                  <span :class="['status-badge', leave.status === 'Pending' ? 'waiting' : 'approved']">
                    {{ leave.status }}
                  </span>
                </td>
                <td><button class="btn-view" @click="viewDetail(leave)">รายละเอียด</button></td>
              </tr>
              <tr v-if="filteredLeaves.length === 0">
                <td colspan="7" class="empty-row">{{ isLoading ? 'กำลังโหลดข้อมูล...' : 'ไม่พบข้อมูลใบลา' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <div v-else class="form-content-wrapper fade-in">
      <div class="form-card-premium">
        <div class="form-header">
          <div class="form-title-group">
            <h2 class="form-title">เขียนใบขออนุมัติลา</h2>
            <p>กรุณากรอกข้อมูลให้ครบถ้วน</p>
          </div>
          <button @click="showForm = false" class="btn-close">✕</button>
        </div>
        <div class="form-steps-body">
          <div class="form-step-section">
            <div class="step-indicator">01</div>
            <div class="step-content">
              <h3>ข้อมูลผู้ลา</h3>
              <div class="input-grid">
                <div class="input-field">
                  <label>รหัสพนักงาน</label>
                  <input type="text" v-model="localNewLeave.emp_id" class="input-control" placeholder="เช่น 0007">
                </div>
                <div class="input-field">
                  <label>กลุ่มงาน (แผนก)</label>
                  <select v-model="localNewLeave.dept_id" class="input-control">
                    <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="form-step-section">
            <div class="step-indicator">02</div>
            <div class="step-content">
              <h3>รายละเอียดการลา</h3>
              <div class="type-selector">
                <label class="type-chip"><input type="radio" value="L01" v-model="localNewLeave.leave_type_id"><span class="chip-label">ลาป่วย</span></label>
                <label class="type-chip"><input type="radio" value="L02" v-model="localNewLeave.leave_type_id"><span class="chip-label">ลากิจ</span></label>
                <label class="type-chip"><input type="radio" value="L03" v-model="localNewLeave.leave_type_id"><span class="chip-label">พักร้อน</span></label>
              </div>
              <div class="input-grid mt-20">
                <div class="input-field">
                  <label>เริ่มวันที่</label>
                  <input type="date" v-model="localNewLeave.start_date" class="input-control">
                </div>
                <div class="input-field">
                  <label>ถึงวันที่</label>
                  <input type="date" v-model="localNewLeave.end_date" class="input-control">
                </div>
                <div class="input-field full">
                  <label>เหตุผลการลา</label>
                  <textarea v-model="localNewLeave.reason" rows="4" class="input-control"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="form-footer-actions">
            <button @click="showForm = false" class="btn-cancel">ยกเลิก</button>
            <button class="btn-submit" @click="handleFormSubmit" :disabled="isSubmitting">
              {{ isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งใบลาอนุมัติ →' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDetailModal" class="modal-overlay" @click.self="showDetailModal = false">
      <div class="modal-card fade-in">
        <div class="modal-header">
          <h3>รายละเอียดการลา #{{ selectedLeave?.leave_id }}</h3>
          <button @click="showDetailModal = false" class="btn-close-dark">✕</button>
        </div>
        <div class="modal-body" v-if="selectedLeave">
          <p><strong>พนักงาน:</strong> {{ selectedLeave.first_name_th }} {{ selectedLeave.last_name_th }}</p>
          <p><strong>เหตุผล:</strong> {{ selectedLeave.reason || '-' }}</p>
          <p><strong>วันที่:</strong> {{ formatDate(selectedLeave.start_date) }} ถึง {{ formatDate(selectedLeave.end_date) }}</p>         
          <div v-if="selectedLeave.status === 'Pending'" style="margin-top: 20px; display: flex; gap: 10px;">
            <button @click="handleUpdateStatus(selectedLeave.leave_id, 'Rejected')" class="btn-cancel" style="flex:1">ปฏิเสธ</button>
            <button @click="handleUpdateStatus(selectedLeave.leave_id, 'Approved')" class="btn-submit" style="flex:1">อนุมัติ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps([
  'leaves', 'sickTodayCount', 'pendingCount', 'filteredLeaves', 
  'isLoading', 'isSubmitting', 'departments', 'positions',
  'searchText', 'selectedDept', 'selectedStatus'
])
const emit = defineEmits([
  'filterCard', 'submit', 'updateStatus', 'goBack', 
  'update:searchText', 'update:selectedDept', 'update:selectedStatus'
])
// Local UI State
const showForm = ref(false)
const showDetailModal = ref(false)
const selectedLeave = ref(null)
const localNewLeave = ref({
  emp_id: '',
  dept_id: '',
  leave_type_id: 'L01',
  start_date: '',
  end_date: '',
  reason: ''
})
const viewDetail = (leave) => {
  selectedLeave.value = leave
  showDetailModal.value = true
}
const handleFormSubmit = async () => {
  const success = await emit('submit', { ...localNewLeave.value })
  if (success) {
    showForm.value = false
    localNewLeave.value = { emp_id: '', dept_id: '', leave_type_id: 'L01', start_date: '', end_date: '', reason: '' }
  }
}
const handleUpdateStatus = async (id, status) => {
  const success = await emit('updateStatus', id, status)
  if (success) showDetailModal.value = false
}
const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: '2-digit' });
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap');

/* =========================================
   Layout & General
========================================= */
.leave-page-container { font-family: 'Sarabun', sans-serif; padding: 30px; background: #f4f7f9; min-height: 100vh; }
.page-header { display: flex; justify-content: space-between; align-items: center; }
.breadcrumb { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
.page-title { font-size: 28px; font-weight: 700; color: #1e293b; margin: 5px 0 0 0; }
.btn-back-minimal { background: white; border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.3s; }
.btn-back-minimal:hover { background: #1e293b; color: white; }

/* Summary Cards */
.summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px; }
.summary-card { padding: 24px; border-radius: 24px; display: flex; align-items: center; gap: 20px; background: white; border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 10px 25px rgba(0,0,0,0.03); }
.card-icon { font-size: 32px; background: rgba(0,0,0,0.03); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 18px; }
.card-label { font-size: 13px; color: #64748b; font-weight: 600; }
.card-value { font-size: 28px; font-weight: 700; margin: 5px 0; color: #1e293b; }

/* =========================================
   Table System (แก้จุดที่เบี้ยว)
========================================= */
.table-container-modern { background: white; border-radius: 24px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.02); margin-top: 30px; }
.table-controls { display: flex; justify-content: space-between; margin-bottom: 25px; }
.search-box-modern { background: #f8fafc; padding: 10px 15px; border-radius: 15px; display: flex; align-items: center; gap: 10px; width: 350px; }
.search-box-modern input { border: none; background: transparent; outline: none; width: 100%; font-size: 14px; }
.filter-actions { display: flex; gap: 10px; }
.select-modern { background: #f8fafc; border: 1px solid #e2e8f0; padding: 0 15px; border-radius: 12px; font-family: inherit; font-size: 13px; }
.btn-add-primary { background: #1e293b; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 600; cursor: pointer; }

/* ล็อคความกว้างตาราง */
.modern-table { width: 100%; border-collapse: collapse; table-layout: fixed; }

/* จัดการส่วนเนื้อหาตาราง (TD) */
.modern-table td { 
  padding: 15px; 
  border-bottom: 1px solid #f8fafc; 
  font-size: 14px; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
}

/* ล็อคความกว้างแต่ละคอลัมน์ให้ตรงกันเป๊ะทั้งหัวและเนื้อหา */
.modern-table th:nth-child(1), .modern-table td:nth-child(1) { width: 60px; text-align: center; } 
.modern-table th:nth-child(2), .modern-table td:nth-child(2) { width: 220px; } 
.modern-table th:nth-child(3), .modern-table td:nth-child(3) { width: 160px; } 
.modern-table th:nth-child(4), .modern-table td:nth-child(4) { width: 180px; } 
.modern-table th:nth-child(5), .modern-table td:nth-child(5) { width: 150px; } 
.modern-table th:nth-child(6), .modern-table td:nth-child(6) { width: 110px; text-align: center; } 
.modern-table th:nth-child(7), .modern-table td:nth-child(7) { width: 100px; text-align: center; }
.modern-table th { padding: 15px; text-align: left; color: #64748b; font-size: 13px; font-weight: 700; background: #f8fafc; border-bottom: 2px solid #f1f5f9; }
.status-badge { padding: 5px 12px; border-radius: 100px; font-size: 11px; font-weight: 700; display: inline-block; }
.status-badge.waiting { background: #fef3c7; color: #d97706; }
.status-badge.approved { background: #d1fae5; color: #059669; }
.btn-view { background: #f1f5f9; border: 1px solid #cbd5e1; color: #475569; padding: 8px 16px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: 0.2s; }
.btn-view:hover { background: #1e293b; color: white; border-color: #1e293b; }

/* =========================================
   ฟอร์มสร้างใบลา (รักษาไว้ครบถ้วน)
========================================= */
.form-content-wrapper { display: flex; justify-content: center; padding: 20px 0; }
.form-card-premium { width: 100%; max-width: 800px; background: #ffffff; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.06); overflow: hidden; }
.form-header { background: #f8fafc; padding: 30px 40px; display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #e2e8f0; }
.form-title-group h2 { margin: 0; font-size: 22px; color: #0f172a; font-weight: 700; }
.form-title-group p { margin: 5px 0 0 0; color: #64748b; font-size: 14px; }
.btn-close { background: white; border: 1px solid #cbd5e1; color: #475569; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; transition: 0.2s; }
.btn-close:hover { background: #fee2e2; color: #ef4444; border-color: #fca5a5; }
.form-steps-body { padding: 40px; }
.form-step-section { display: flex; gap: 20px; margin-bottom: 40px; }
.step-indicator { width: 44px; height: 44px; background: #eff6ff; color: #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0; }
.step-content { flex: 1; }
.step-content h3 { margin: 0 0 20px 0; font-size: 18px; color: #1e293b; display: flex; align-items: center; gap: 10px; }
.input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.input-grid .full { grid-column: span 2; }
.input-field label { display: block; font-size: 14px; font-weight: 600; color: #475569; margin-bottom: 8px; }
.input-control { width: 100%; padding: 14px; border-radius: 12px; border: 1px solid #cbd5e1; background-color: #ffffff; color: #1e293b; font-family: inherit; font-size: 15px; box-sizing: border-box; transition: all 0.3s ease; }
.input-control:focus { border-color: #3b82f6; outline: none; box-shadow: 0 0 0 4px rgba(59,130,246,0.1); }
.type-selector { display: flex; gap: 15px; }
.type-chip { flex: 1; cursor: pointer; }
.type-chip input { display: none; }
.chip-label { display: block; text-align: center; padding: 14px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; font-weight: 600; color: #64748b; transition: all 0.2s; }
.type-chip input:checked + .chip-label { background: #0f172a; color: white; border-color: #0f172a; box-shadow: 0 4px 10px rgba(15,23,42,0.15); }
.form-footer-actions { display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 30px; margin-top: 10px; }
.btn-cancel { background: white; border: 1px solid #cbd5e1; color: #475569; padding: 12px 30px; border-radius: 12px; font-weight: 600; font-size: 15px; cursor: pointer; transition: 0.2s; }
.btn-submit { background: #10b981; color: white; border: none; padding: 12px 40px; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer; transition: 0.3s; }
/* =========================================
   Modal & Date Picker
========================================= */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-card { background: white; width: 90%; max-width: 450px; padding: 25px; border-radius: 20px; }
.modal-header { display: flex; justify-content: space-between; margin-bottom: 20px; align-items: center; }
.btn-close-dark { background: #eee; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;}
.detail-row { margin-bottom: 10px; font-size: 15px; }
.detail-row .label { font-weight: 600; display: inline-block; width: 100px; color: #64748b;}
input[type="date"] { position: relative; cursor: pointer; }
input[type="date"]::-webkit-calendar-picker-indicator { background: transparent; bottom: 0; color: transparent; cursor: pointer; height: auto; left: 0; position: absolute; right: 0; top: 0; width: auto; }
.date-cell { white-space: nowrap; font-family: 'monospace', sans-serif; color: #334155; font-weight: 500; }
</style>