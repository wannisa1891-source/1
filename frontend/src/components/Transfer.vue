<template>
  <div class="transfer-app-container">
    
    <header class="app-header shadow-sm">
      <div class="header-content">
        <div class="brand-info">
          <div class="brand-logo">🔄</div>
          <div>
            <h1>ระบบคำสั่งโยกย้ายบุคลากร</h1>
            <p>Personnel Transfer Management System</p>
          </div>
        </div>
        <div class="header-actions">
          <button v-if="!showForm" @click="showForm = true" class="btn-primary">สร้างคำสั่งใหม่</button>
          <button v-else @click="resetForm" class="btn-ghost">ย้อนกลับ</button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <transition name="page-fade" mode="out-in">
        <div v-if="!showForm" key="dashboard" class="dashboard-view">
          <div class="filter-card card shadow-sm mb-4">
            <div class="search-box">
              <span class="icon">🔍</span>
              <input v-model="searchQuery" type="text" placeholder="ค้นหาชื่อพนักงาน หรือเลขที่คำสั่ง...">
            </div>
          </div>

          <div class="table-container card shadow-sm">
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
                  <td colspan="6" class="empty-state">ไม่พบข้อมูลประวัติ</td>
                </tr>
                <tr v-for="item in filteredHistory" :key="item.id">
                  <td class="order-no">{{ item.orderNo }}</td>
                  <td>{{ item.orderDate }}</td>
                  <td class="fw-bold">{{ item.staffName }}</td>
                  <td class="pos-change">
                    <span class="old">{{ item.oldPos }}</span> → <span class="new">{{ item.newPos }}</span>
                  </td>
                  <td><span :class="['badge', item.statusType]">{{ item.status }}</span></td>
                  <td class="text-center"><button class="btn-icon">📄</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else key="form" class="form-view">
          <div class="form-grid">
            
            <div class="form-main-content">
              <section class="card mb-4">
                <div class="card-title">1. รายละเอียดข้อมูลคำสั่ง</div>
                <div class="card-body grid-2">
                  <div class="form-group">
                    <label>เลขที่คำสั่ง <span class="req">*</span></label>
                    <input v-model="formData.orderNo" type="text" placeholder="เช่น 123/2569">
                  </div>
                  <div class="form-group">
                    <label>ลงวันที่ <span class="req">*</span></label>
                    <input v-model="formData.orderDate" type="date">
                  </div>
                  <div class="form-group full-width mt-3">
                    <label>เรื่อง / เหตุผลในการย้าย</label>
                    <input v-model="formData.title" type="text" placeholder="ระบุเหตุผลประกอบ">
                  </div>
                </div>
              </section>

              <section class="card overflow-visible">
                <div class="card-title">2. รายละเอียดการเปลี่ยนแปลง</div>
                <div class="card-body">
                  
                  <div class="search-staff-area">
                    <label>ค้นหาบุคลากรที่ต้องการย้าย <span class="req">*</span></label>
                    <div class="autocomplete-container">
                      <div class="search-input-inner">
                        <span class="icon">🔍</span>
                        <input 
                          v-model="formData.staffSearch" 
                          @input="handleSearchStaff"
                          type="text" 
                          placeholder="พิมพ์รหัสพนักงาน หรือ ชื่อ-นามสกุล..."
                        >
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
                      <div>ข้อมูลเดิม</div>
                      <div>ข้อมูลใหม่</div>
                    </div>
                    <div v-for="row in comparisonRows" :key="row.id" class="comp-row-grid">
                      <div class="label">{{ row.label }}</div>
                      <div class="old-val">{{ row.oldVal }}</div>
                      <div class="new-val">
                        <input v-model="row.newVal" type="text" placeholder="กรอกข้อมูลใหม่...">
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside class="form-sidebar">
              <div class="card sticky-sidebar shadow-sm">
                <div class="card-title">3. เอกสารและยืนยัน</div>
                <div class="card-body">
                  <div class="upload-area" @click="triggerUpload">
                    <span class="icon">☁️</span>
                    <p>{{ fileName || 'อัปโหลดไฟล์คำสั่ง (PDF)' }}</p>
                    <input type="file" ref="fileInput" hidden @change="handleFileUpload" accept=".pdf">
                  </div>
                </div>
                <div class="card-footer p-3">
                  <button @click="handleSave" class="btn-submit" :disabled="isLoading || !isFormValid">
                    {{ isLoading ? 'กำลังประมวลผล...' : 'บันทึกคำสั่ง' }}
                  </button>
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
const fileName = ref('')
const fileInput = ref(null)

const formData = reactive({
  orderNo: '',
  orderDate: new Date().toISOString().substr(0, 10),
  title: '',
  staffSearch: '',
  selectedStaffId: null
})

const isFormValid = computed(() => formData.orderNo && formData.selectedStaffId)

const comparisonRows = ref([
  { id: 'dept', label: 'สังกัด/หน่วยงาน', oldVal: '-', newVal: '' },
  { id: 'pos', label: 'ตำแหน่งงาน', oldVal: '-', newVal: '' },
  { id: 'salary', label: 'เงินเดือน (บาท)', oldVal: '-', newVal: '' },
])

const historyList = ref([
  { id: 1, orderNo: '01/2569', orderDate: '2026-02-15', staffName: 'สมศักดิ์ รักชาติ', oldPos: 'ธุรการ', newPos: 'บริหารทั่วไป', status: 'สำเร็จ', statusType: 'success' },
])

const filteredHistory = computed(() => historyList.value.filter(i => i.staffName.includes(searchQuery.value)))

const searchResults = ref([])
const handleSearchStaff = () => {
  if (formData.staffSearch.length < 2) return searchResults.value = []
  // จำลอง Mock Data
  searchResults.value = [
    { id: '55001', name: 'กิตติพงษ์ ใจเย็น', pos: 'นักวิชาการ', dept: 'เทคโนโลยี', salary: '22,500' }
  ].filter(s => s.name.includes(formData.staffSearch))
}

const selectStaff = (staff) => {
  formData.selectedStaffId = staff.id
  formData.staffSearch = staff.name
  searchResults.value = []
  comparisonRows.value.forEach(r => r.oldVal = staff[r.id] || staff.salary)
}

const triggerUpload = () => fileInput.value.click()
const handleFileUpload = (e) => fileName.value = e.target.files[0]?.name || ''

const handleSave = () => {
  isLoading.value = true
  setTimeout(() => {
    alert('บันทึกสำเร็จ');
    resetForm();
    isLoading.value = false;
  }, 1000)
}

const resetForm = () => {
  showForm.value = false
  formData.orderNo = ''
  formData.selectedStaffId = null
  formData.staffSearch = ''
}
</script>

<style scoped>
/* แก้ไขปัญหาการทับซ้อน (Overlap Fixes) */

.transfer-app-container {
  --primary: #1e3a8a;
  --bg: #f1f5f9;
  font-family: 'Sarabun', sans-serif;
  background: var(--bg);
  min-height: 100vh;
}

.main-content { max-width: 1200px; margin: 20px auto; padding: 0 15px; }

.card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; position: relative; }
.overflow-visible { overflow: visible !important; } /* สำคัญมากเพื่อให้ Dropdown ไม่โดนตัด */

/* ส่วนการค้นหาพนักงาน */
.autocomplete-container {
  position: relative; /* สร้างขอบเขตให้ Dropdown */
  width: 100%;
  z-index: 100; /* ให้ส่วนค้นหาอยู่เลเยอร์ที่สูงขึ้น */
}

.search-dropdown {
  position: absolute;
  top: 100%; /* ต่อท้ายช่อง Input */
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-top: 5px;
  padding: 0;
  list-style: none;
  max-height: 250px;
  overflow-y: auto;
  z-index: 9999; /* สูงที่สุดเพื่อให้ทับตารางเปรียบเทียบ */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.search-dropdown li {
  padding: 12px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f8fafc;
}

.search-dropdown li:hover { background: #eff6ff; color: var(--primary); }

/* ตารางเปรียบเทียบ */
.comparison-container {
  position: relative;
  z-index: 10; /* ต่ำกว่า Dropdown */
}

.comp-header-grid, .comp-row-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid #e2e8f0;
}

.comp-header-grid { background: #f8fafc; font-weight: bold; padding: 10px; text-align: center; }
.comp-row-grid div { padding: 12px; }
.comp-row-grid .label { background: #f8fafc; font-weight: bold; }
.comp-row-grid input { width: 100%; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px; text-align: center; }

/* Layout อื่นๆ */
.form-grid { display: grid; grid-template-columns: 1fr 350px; gap: 20px; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.app-header { background: white; padding: 15px 30px; }
.header-content { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; }
.btn-primary { background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
.btn-submit { width: 100%; background: var(--primary); color: white; padding: 15px; border-radius: 8px; border: none; font-weight: bold; cursor: pointer; }
.btn-submit:disabled { background: #94a3b8; }

@media (max-width: 992px) {
  .form-grid { grid-template-columns: 1fr; }
  .sticky-sidebar { position: relative; top: 0; }
}
</style>