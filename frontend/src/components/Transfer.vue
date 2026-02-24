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
                <div class="card-title">1. รายละเอียดข้อมูลคำสั่ง</div>
                <div class="card-body">
                  <div class="form-row-2">
                    <div class="form-group">
                      <label>เลขที่คำสั่ง <span class="req">*</span></label>
                      <input v-model="formData.orderNo" type="text" placeholder="เช่น 123/2569" :class="{'error-input': errors.orderNo}">
                    </div>
                    <div class="form-group">
                      <label>ลงวันที่ <span class="req">*</span></label>
                      <input v-model="formData.orderDate" type="date">
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <label> เรื่อง / เหตุผลในการย้าย</label>
                    <input v-model="formData.title" type="text" placeholder="ระบุเรื่องหรือเหตุผลประกอบคำสั่ง">
                  </div>
                </div>
              </section>

              <section class="card">
                <div class="card-title">2. รายละเอียดการเปลี่ยนแปลงข้อมูลบุคลากร</div>
                <div class="card-body">
                  <div class="search-staff-area">
                    <label>ค้นหาบุคลากรที่ต้องการย้าย <span class="req">*</span></label>
                    <div class="autocomplete-wrapper">
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
                      <div>ข้อมูลปัจจุบัน (เดิม)</div>
                      <div>ข้อมูลที่ย้ายไป (ใหม่)</div>
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
                <div class="card-footer">
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

// --- 1. Global State ---
const showForm = ref(false)
const isLoading = ref(false)
const searchQuery = ref('')
const filterStatus = ref('all')
const fileName = ref('')
const fileInput = ref(null)

// --- 2. Form & Validation State ---
const formData = reactive({
  orderNo: '',
  orderDate: new Date().toISOString().substr(0, 10),
  title: '',
  staffSearch: '',
  selectedStaffId: null,
  note: ''
})

const errors = reactive({ orderNo: false })

// ตรวจสอบความถูกต้องของฟอร์ม (Validation)
const isFormValid = computed(() => {
  return formData.orderNo && formData.selectedStaffId
})

// --- 3. Comparison Rows (Dynamic Data) ---
const comparisonRows = ref([
  { id: 'dept', label: 'สังกัด/หน่วยงาน', oldVal: '-', newVal: '' },
  { id: 'pos', label: 'ตำแหน่งงาน', oldVal: '-', newVal: '' },
  { id: 'lv', label: 'ระดับ/ชั้น', oldVal: '-', newVal: '' },
  { id: 'posNo', label: 'เลขที่ตำแหน่ง', oldVal: '-', newVal: '' },
  { id: 'salary', label: 'เงินเดือน (บาท)', oldVal: '-', newVal: '' },
])

// --- 4. History Data (Mock) ---
const historyList = ref([
  { id: 1, orderNo: '01/2569', orderDate: '2026-02-15', staffName: 'สมศักดิ์ รักชาติ', oldPos: 'พนักงานธุรการ', newPos: 'เจ้าหน้าที่บริหารงานทั่วไป', status: 'สำเร็จ', statusType: 'success' },
  { id: 2, orderNo: '05/2569', orderDate: '2026-02-20', staffName: 'วิภาดา ใจดี', oldPos: 'พยาบาลวิชาชีพ', newPos: 'พยาบาลวิชาชีพชำนาญการ', status: 'สำเร็จ', statusType: 'success' }
])

const filteredHistory = computed(() => {
  return historyList.value.filter(item => {
    const matchSearch = item.staffName.includes(searchQuery.value) || item.orderNo.includes(searchQuery.value)
    const matchStatus = filterStatus.value === 'all' || item.statusType === filterStatus.value
    return matchSearch && matchStatus
  })
})

// --- 5. Logic: Search Staff & Auto-fill ---
const searchResults = ref([])
const handleSearchStaff = () => {
  if (formData.staffSearch.length < 2) return searchResults.value = []
  // จำลองการเรียก API
  const mockStaff = [
    { id: '55001', name: 'กิตติพงษ์ ใจเย็น', pos: 'นักวิชาการคอมพิวเตอร์', dept: 'ศูนย์เทคโนโลยี', lv: 'ปฏิบัติการ', posNo: 'บค.01', salary: '22,500' },
    { id: '55002', name: 'รัตนาภรณ์ สดใส', pos: 'พยาบาลวิชาชีพ', dept: 'กุมารเวชกรรม', lv: 'ปฏิบัติการ', posNo: 'พย.112', salary: '24,000' }
  ]
  searchResults.value = mockStaff.filter(s => s.name.includes(formData.staffSearch) || s.id.includes(formData.staffSearch))
}

const selectStaff = (staff) => {
  formData.selectedStaffId = staff.id
  formData.staffSearch = `${staff.id} - ${staff.name}`
  searchResults.value = []
  
  // Auto-fill ข้อมูลเดิมเข้าตารางเปรียบเทียบ
  comparisonRows.value.find(r => r.id === 'dept').oldVal = staff.dept
  comparisonRows.value.find(r => r.id === 'pos').oldVal = staff.pos
  comparisonRows.value.find(r => r.id === 'lv').oldVal = staff.lv
  comparisonRows.value.find(r => r.id === 'posNo').oldVal = staff.posNo
  comparisonRows.value.find(r => r.id === 'salary').oldVal = staff.salary
}

// --- 6. Logic: File & Save ---
const triggerUpload = () => fileInput.value.click()
const handleFileUpload = (e) => fileName.value = e.target.files[0]?.name || ''

const handleSave = async () => {
  if (!isFormValid.value) return
  isLoading.value = true
  
  // จำลองการบันทึก
  setTimeout(() => {
    alert('บันทึกคำสั่งแต่งตั้ง/ย้าย สำเร็จเรียบร้อยแล้ว')
    resetForm()
    isLoading.value = false
  }, 1200)
}

const resetForm = () => {
  showForm.value = false
  fileName.value = ''
  formData.staffSearch = ''
  formData.selectedStaffId = null
  formData.orderNo = ''
  comparisonRows.value.forEach(r => { r.oldVal = '-'; r.newVal = '' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap');

.transfer-app-container {
  --primary: #1e3a8a;
  --primary-light: #eff6ff;
  --accent: #3b82f6;
  --success: #10b981;
  --bg-page: #f1f5f9;
  --text-main: #1e293b;
  --border: #e2e8f0;
  
  font-family: 'Sarabun', sans-serif;
  color: var(--text-main);
  background: var(--bg-page);
  min-height: 100vh;
}

/* Header Design */
.app-header {
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border);
  position: sticky; top: 0; z-index: 1000;
}
.header-content {
  max-width: 1300px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
}
.brand-info { display: flex; align-items: center; gap: 1rem; }
.brand-logo { font-size: 2rem; background: var(--primary-light); padding: 8px; border-radius: 12px; }
.brand-info h1 { font-size: 1.2rem; margin: 0; font-weight: 700; color: var(--primary); }
.brand-info p { font-size: 0.8rem; color: #64748b; margin: 0; }

/* Dashboard & Cards */
.main-content { max-width: 1300px; margin: 2rem auto; padding: 0 1rem; }
.card { background: white; border-radius: 16px; border: 1px solid var(--border); overflow: hidden; }
.shadow-sm { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
.mb-4 { margin-bottom: 1.5rem; }

/* Filter Card */
.filter-card { padding: 1.5rem; display: flex; gap: 2rem; align-items: center; margin-bottom: 1.5rem; }
.search-box { flex: 1; position: relative; }
.search-box input { width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 1px solid var(--border); border-radius: 10px; }
.search-box .icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }

/* Modern Table */
.table-container { overflow-x: auto; }
.modern-table { width: 100%; border-collapse: collapse; }
.modern-table th { background: #f8fafc; padding: 1.25rem 1rem; text-align: left; font-size: 0.85rem; color: #64748b; font-weight: 600; }
.modern-table td { padding: 1.25rem 1rem; border-bottom: 1px solid var(--border); }
.order-no { font-family: monospace; color: var(--primary); font-weight: 600; }
.pos-change { font-size: 0.85rem; }
.pos-change .old { color: #64748b; }
.pos-change .arrow { margin: 0 8px; color: var(--accent); }
.pos-change .new { color: var(--primary); font-weight: 600; }
.badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
.success { background: #dcfce7; color: #166534; }

/* Form Layout */
.form-grid { display: grid; grid-template-columns: 1fr 380px; gap: 1.5rem; align-items: start; }
.card-title { padding: 1.25rem 1.5rem; font-weight: 700; color: var(--primary); border-bottom: 1px solid var(--border); font-size: 1rem; }
.card-body { padding: 1.5rem; }

/* Comparison Grid */
.comparison-container { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
.comp-header-grid { 
  display: grid; grid-template-columns: 1.2fr 1fr 1fr; background: #f8fafc; 
  padding: 10px; font-weight: 600; font-size: 0.85rem; text-align: center; border-bottom: 2px solid var(--border);
}
.comp-row-grid { 
  display: grid; grid-template-columns: 1.2fr 1fr 1fr; border-bottom: 1px solid var(--border); align-items: center;
}
.comp-row-grid .label { padding: 12px; background: #f8fafc; font-weight: 600; font-size: 0.9rem; }
.comp-row-grid .old-val { padding: 12px; text-align: center; color: #64748b; font-size: 0.9rem; border-left: 1px solid var(--border); }
.comp-row-grid .new-val { padding: 8px; border-left: 1px solid var(--border); }
.comp-row-grid input { width: 100%; border: 1px solid transparent; padding: 6px; text-align: center; font-size: 0.9rem; }
.comp-row-grid input:focus { border-bottom: 2px solid var(--accent); }

/* Form Side Sidebar */
.sticky-sidebar { position: sticky; top: 100px; }
.upload-area { 
  border: 2px dashed #cbd5e1; padding: 2rem; border-radius: 12px; 
  text-align: center; cursor: pointer; transition: 0.3s;
}
.upload-area:hover { border-color: var(--accent); background: var(--primary-light); }
.upload-placeholder .icon { font-size: 2rem; display: block; margin-bottom: 10px; }
.file-name-active { color: var(--success); font-weight: 600; }

/* Buttons & Inputs */
.btn-primary { background: var(--primary); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; }
.btn-submit { 
  width: 100%; background: var(--primary); color: white; border: none; 
  padding: 1.25rem; border-radius: 12px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: 0.3s;
}
.btn-submit:disabled { background: #94a3b8; cursor: not-allowed; }
.btn-ghost { background: transparent; color: var(--secondary); border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; }

input, textarea, select {
  width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px; outline: none; font-size: 0.95rem;
}
input:focus { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
.req { color: #ef4444; margin-left: 4px; }
.validation-tip { color: #ef4444; font-size: 0.8rem; text-align: center; margin-top: 10px; }

/* Search Autocomplete Dropdown */
.autocomplete-wrapper { position: relative; }
.search-input-inner { position: relative; }
.search-input-inner .icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
.search-input-inner input { padding-left: 2.5rem; }
.search-dropdown {
  position: absolute; top: 100%; left: 0; right: 0; background: white; border-radius: 10px;
  z-index: 100; padding: 0; margin-top: 8px; border: 1px solid var(--border); max-height: 250px; overflow-y: auto;
}
.search-dropdown li { padding: 12px 1rem; cursor: pointer; list-style: none; transition: 0.2s; border-bottom: 1px solid #f8fafc; }
.search-dropdown li:hover { background: var(--primary-light); color: var(--primary); }
.id-tag { background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; margin-right: 8px; font-weight: 600; }

/* Transitions */
.page-fade-enter-active, .page-fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.page-fade-enter-from { opacity: 0; transform: translateY(10px); }
.page-fade-leave-to { opacity: 0; transform: translateY(-10px); }

@media (max-width: 1024px) {
  .form-grid { grid-template-columns: 1fr; }
  .form-sidebar { order: -1; }
  .sticky-sidebar { position: relative; top: 0; }
}
</style>