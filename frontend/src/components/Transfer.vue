<template>
  <div class="transfer-app-container">
    <header class="app-header shadow-sm">
      <div class="header-content">
        <div class="brand-info">
          <div class="brand-logo">🔄</div>
          <div>
            <h1>ระบบคำสั่งแต่งตั้งและโยกย้าย</h1>
            <p>Personnel Transfer Management System</p>
          </div>
        </div>
        <div class="header-actions">
          <button v-if="!showForm" @click="showForm = true" class="btn-primary">
            <span>+</span> สร้างคำสั่งย้ายใหม่
          </button>
          <button v-else @click="resetForm" class="btn-ghost">
            ← ย้อนกลับ
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <transition name="page-fade" mode="out-in">
        <div v-if="!showForm" key="dashboard" class="dashboard-view">
          <div class="filter-card card shadow-sm">
            <div class="search-box">
              <span class="icon">🔍</span>
              <input v-model="searchQuery" type="text" placeholder="ค้นหาชื่อพนักงาน หรือเลขที่คำสั่ง...">
            </div>
            <div class="filter-group">
              <label>สถานะ:</label>
              <select v-model="filterStatus">
                <option value="all">ทั้งหมด</option>
                <option value="success">สำเร็จ</option>
                <option value="pending">รอดำเนินการ</option>
              </select>
            </div>
          </div>

          <div class="table-container card shadow-sm mt-4">
            <table class="modern-table">
              <thead>
                <tr>
                  <th>เลขที่คำสั่ง</th>
                  <th>วันที่</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>ตำแหน่งเดิม → ใหม่</th>
                  <th>สถานะ</th>
                  <th class="text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredHistory.length === 0">
                  <td colspan="6" class="empty-state">
                    <div class="empty-msg">📭 ไม่พบข้อมูลประวัติการย้าย</div>
                  </td>
                </tr>
                <tr v-for="item in filteredHistory" :key="item.id">
                  <td class="order-no">{{ item.orderNo }}</td>
                  <td>{{ item.orderDate }}</td>
                  <td class="fw-bold">{{ item.staffName }}</td>
                  <td class="pos-change">
                    <span class="old">{{ item.oldPos }}</span>
                    <span class="arrow">→</span>
                    <span class="new">{{ item.newPos }}</span>
                  </td>
                  <td>
                    <span :class="['badge', item.statusType]">{{ item.status }}</span>
                  </td>
                  <td class="text-center">
                    <button class="btn-icon">📄</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else key="form" class="form-view">
          <div class="form-grid">
            <div class="form-main-content">
              <section class="card mb-4">
                <div class="card-title">1. รายละเอียดข้อมูลคำสั่ง00111</div>
                <div class="card-body">
                  <div class="form-row-2">
                    <div class="form-group">
                      <label>เลขที่คำสั่ง <span class="req">*</span></label>
                      <input v-model="formData.orderNo" type="text" placeholder="เช่น 123/2569">
                    </div>
                    <div class="form-group">
                      <label>ลงวันที่ <span class="req">*</span></label>
                      <input v-model="formData.orderDate" type="date">
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <label>เรื่อง / เหตุผลในการย้าย</label>
                    <input v-model="formData.title" type="text" placeholder="ระบุเรื่องหรือเหตุผลประกอบคำสั่ง">
                  </div>
                </div>
              </section>

              <section class="card overflow-visible">
                <div class="card-title">2. รายละเอียดการเปลี่ยนแปลงข้อมูลบุคลากร</div>
                <div class="card-body">
                  <div class="search-staff-area">
                    <label>ค้นหาบุคลากรที่ต้องการย้าย <span class="req">*</span></label>
                    <div class="autocomplete-wrapper">
                      <div class="search-input-inner">
                        <span class="icon">🔍</span>
                        <input v-model="formData.staffSearch" @input="handleSearchStaff" type="text" placeholder="พิมพ์รหัสพนักงาน หรือ ชื่อ-นามสกุล...">
                      </div>
                      <ul v-if="searchResults.length > 0" class="search-dropdown shadow-lg">
                        <li v-for="s in searchResults" :key="s.id" @click="selectStaff(s)">
                          <span class="id-tag">{{ s.id }}</span> {{ s.name }} | {{ s.pos }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="comparison-container mt-4">
                    <div class="comp-header-grid">
                      <div>รายการ</div>
                      <div>ข้อมูลปัจจุบัน (เดิม)</div>
                      <div>ข้อมูลที่ย้ายไป (ใหม่)</div>
                    </div>
                    <div v-for="row in comparisonRows" :key="row.id" class="comp-row-grid">
                      <div class="label">{{ row.label }}</div>
                      <div class="old-val">
  <input 
    v-model="row.oldVal" 
    type="text" 
    placeholder="กรอกข้อมูลเดิม..." 
    @input="handleInputValidation(row, 'old', $event)"
  >
</div>
                      <div class="new-val">
                        <input 
                          v-model="row.newVal" 
                          type="text" 
                          placeholder="กรอกข้อมูลใหม่..."
                          @input="handleInputValidation(row, 'new', $event)"
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside class="form-sidebar">
              <div class="card sticky-sidebar shadow-sm">
                <div class="card-title border-bottom">3. เอกสารและยืนยัน</div>
                <div class="card-body">
                  <div class="upload-area" @click="triggerUpload">
                    <div v-if="!fileName" class="upload-placeholder">
                      <span class="icon">☁️</span>
                      <p>อัปโหลดไฟล์คำสั่ง (PDF)</p>
                    </div>
                    <div v-else class="file-name-active">
                      <span>📄</span> {{ fileName }}
                    </div>
                    <input type="file" ref="fileInput" hidden @change="handleFileUpload" accept=".pdf">
                  </div>
                  <div class="form-group mt-4">
                    <label>หมายเหตุเพิ่มเติม</label>
                    <textarea v-model="formData.note" rows="3" placeholder="ระบุหมายเหตุ (ถ้ามี)"></textarea>
                  </div>
                </div>
                <div class="card-footer p-3">
                  <button @click="handleSave" class="btn-submit" :disabled="isLoading || !isFormValid">
                    {{ isLoading ? 'กำลังประมวลผล...' : 'บันทึกคำสั่ง' }}
                  </button>
                  <p v-if="!isFormValid" class="validation-tip">กรุณากรอกเลขที่คำสั่งและเลือกบุคลากร</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const showForm = ref(false)
const isLoading = ref(false)
const searchQuery = ref('')
const filterStatus = ref('all')
const fileName = ref('')
const fileInput = ref(null)

const formData = reactive({
  orderNo: '',
  orderDate: new Date().toISOString().substr(0, 10),
  title: '',
  staffSearch: '',
  selectedStaffId: null,
  note: ''
})

const isFormValid = computed(() => formData.orderNo && formData.selectedStaffId)

const comparisonRows = ref([
  { id: 'dept', label: 'สังกัด/หน่วยงาน', oldVal: '', newVal: '' }, // ลบ - ออก
  { id: 'pos', label: 'ตำแหน่งงาน', oldVal: '', newVal: '' },      // ลบ - ออก
  { id: 'lv', label: 'ระดับ/ชั้น', oldVal: '', newVal: '' },       // ลบ - ออก
  { id: 'posNo', label: 'เลขที่ตำแหน่ง', oldVal: '', newVal: '' },  // ลบ - ออก
  { id: 'salary', label: 'เงินเดือน (บาท)', oldVal: '', newVal: '' }, // ลบ - ออก
])

const historyList = ref([
  { id: 1, orderNo: '01/2569', orderDate: '2026-02-15', staffName: 'สมศักดิ์ รักชาติ', oldPos: 'ธุรการ', newPos: 'บริหารทั่วไป', status: 'สำเร็จ', statusType: 'success' }
])

const filteredHistory = computed(() => {
  return historyList.value.filter(item => (item.staffName.includes(searchQuery.value) || item.orderNo.includes(searchQuery.value)) && (filterStatus.value === 'all' || item.statusType === filterStatus.value))
})

const searchResults = ref([])
const handleSearchStaff = () => {
  if (formData.staffSearch.length < 2) return searchResults.value = []
  const mock = [
    { id: '55001', name: 'กิตติพงษ์ ใจเย็น', dept: 'ฝ่ายไอที', pos: 'โปรแกรมเมอร์', lv: 'ปฏิบัติการ', posNo: 'IT-001', salary: '25,000' }
  ]
  searchResults.value = mock.filter(s => s.name.includes(formData.staffSearch) || s.id.includes(formData.staffSearch))
}

const selectStaff = (staff) => {
  formData.selectedStaffId = staff.id;
  formData.staffSearch = staff.name;
  searchResults.value = [];
  comparisonRows.value.forEach(row => {
    row.oldVal = staff[row.id] || '-';
    row.newVal = '';
  });
};

// แก้ไขฟังก์ชันให้รองรับทั้งฝั่ง old และ new
const handleInputValidation = (row, type, event) => {
  let val = event.target.value;
  if (row.id === 'salary') {
    val = val.replace(/[^0-9]/g, '').slice(0, 10);
  }
  if (type === 'old') row.oldVal = val;
  else row.newVal = val;
};

const triggerUpload = () => fileInput.value.click()
const handleFileUpload = (e) => fileName.value = e.target.files[0]?.name || ''
const handleSave = () => {
  isLoading.value = true
  setTimeout(() => { alert('บันทึกสำเร็จ'); resetForm(); isLoading.value = false; }, 1000)
}
const resetForm = () => {
  showForm.value = false
  Object.assign(formData, { orderNo: '', selectedStaffId: null, staffSearch: '' })
  fileName.value = ''
  comparisonRows.value.forEach(r => {
    r.oldVal = '' // เปลี่ยนจาก '-' เป็น ''
    r.newVal = ''
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap');

.transfer-app-container {
  --primary: #1e3a8a;
  --bg: #f1f5f9;
  --border: #e2e8f0;
  font-family: 'Sarabun', sans-serif;
  background: var(--bg);
  min-height: 100vh;
}

.filter-card { padding: 1.5rem; display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; }
.search-box { flex: 1; min-width: 300px; max-width: 600px; position: relative; }
.search-box input { width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 1px solid var(--border); border-radius: 10px; }
.filter-group { display: flex; align-items: center; gap: 12px; white-space: nowrap; }
.filter-group select { width: 180px; padding: 0.7rem; border: 1px solid var(--border); border-radius: 10px; }
.app-header { background: white; padding: 1rem 2rem; border-bottom: 1px solid var(--border); }
.header-content { max-width: 1300px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.main-content { max-width: 1300px; margin: 2rem auto; padding: 0 1rem; }
.card { background: white; border-radius: 16px; border: 1px solid var(--border); overflow: hidden; }
.overflow-visible { overflow: visible !important; }
.search-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid var(--border); z-index: 1000; border-radius: 10px; margin-top: 5px; list-style: none; padding: 0; max-height: 200px; overflow-y: auto; }
.search-dropdown li { padding: 12px; border-bottom: 1px solid #f1f5f9; cursor: pointer; }
.search-dropdown li:hover { background: #eff6ff; }
.id-tag { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }

/* Comparison Table Styles */
.comparison-container { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
.comp-header-grid, .comp-row-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr; border-bottom: 1px solid var(--border); }
.comp-header-grid { background: #f8fafc; font-weight: bold; padding: 10px; text-align: center; }
.comp-row-grid .label { background: #f8fafc; padding: 12px; font-weight: 600; }
.comp-row-grid .old-val, .comp-row-grid .new-val { padding: 8px; }
.comp-row-grid input { 
  width: 100%; 
  border: 1px solid var(--border); 
  border-radius: 6px; 
  padding: 5px; 
  text-align: center; 
  background: white;
}
.comp-row-grid .old-val input { background-color: #fcfcfc; }

.form-grid { display: grid; grid-template-columns: 1fr 380px; gap: 1.5rem; }
.btn-primary { background: var(--primary); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; font-weight: 600; }
.btn-submit { width: 100%; background: var(--primary); color: white; padding: 1.25rem; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; }
.btn-submit:disabled { background: #cbd5e1; }
.modern-table { width: 100%; border-collapse: collapse; }
.modern-table th { background: #f8fafc; padding: 1rem; text-align: left; color: #64748b; font-size: 0.85rem; }
.modern-table td { padding: 1rem; border-bottom: 1px solid var(--border); }
.badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
.success { background: #dcfce7; color: #166534; }
.search-box .icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
@media (max-width: 1024px) { .form-grid { grid-template-columns: 1fr; } }
</style>