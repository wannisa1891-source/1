<template>
  <div class="leave-page-container fade-in">
    
    <div v-if="!showForm" class="main-content-wrapper">
      
      <header class="page-header">
        <div class="header-left">
          <span class="breadcrumb">Personnel / Leave Management</span>
          <h1 class="page-title">ระบบจัดการการลา</h1>
        </div>
        <div class="header-right">
          <button class="btn-back-minimal" @click="goBack">
            <span class="icon">←</span> ย้อนกลับ
          </button>
        </div>
      </header>

      <section class="summary-grid mt-30">
        <div class="summary-card glass blue">
          <div class="card-icon">🤒</div>
          <div class="card-info">
            <span class="card-label">ลาป่วยวันนี้</span>
            <h2 class="card-value">05 <small>คน</small></h2>
          </div>
        </div>
        
        <div class="summary-card glass orange">
          <div class="card-icon">⏳</div>
          <div class="card-info">
            <span class="card-label">รอพิจารณา</span>
            <h2 class="card-value">{{ pendingCount }} <small>รายการ</small></h2>
          </div>
        </div>

        <div class="summary-card glass green">
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
            <input type="text" v-model="searchText" placeholder="ค้นหาชื่อพนักงาน...">
          </div>
          <div class="filter-actions">
            <select class="select-modern" v-model="selectedDept">
              <option value="all">ทุกแผนก</option>
              <option value="D001">ฝ่ายการพยาบาล (D001)</option>
              <option value="D009">ยุทธศาสตร์ฯ (D009)</option>
              <option value="D010">โภชนาการ (D010)</option>
            </select>

            <select class="select-modern" v-model="selectedStatus">
              <option value="all">ทุกสถานะ</option>
              <option value="Pending">รออนุมัติ (Pending)</option>
              <option value="Approved">อนุมัติแล้ว (Approved)</option>
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
                <th>พนักงาน (Emp_ID)</th>
                <th>แผนก</th>
                <th>เริ่ม - สิ้นสุดลา</th>
                <th>เหตุผล</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="leave in filteredLeaves" :key="leave.leave_id">
                <td>#{{ leave.leave_id }}</td>
                <td>
                  <div class="user-cell">
                    <span>{{ leave.emp_id }}</span>
                  </div>
                </td>
                <td>{{ leave.dept_id || 'ไม่ระบุ' }}</td>
                <td>{{ leave.start_date }} ถึง {{ leave.end_date }}</td>
                <td>{{ leave.reason || '-' }}</td>
                <td>
                  <span :class="['status-badge', leave.status === 'Pending' ? 'waiting' : 'approved']">
                    {{ leave.status }}
                  </span>
                </td>
                <td><button class="btn-view" @click="viewDetail(leave)">รายละเอียด</button></td>
              </tr>

              <tr v-if="filteredLeaves.length === 0">
                <td colspan="7" class="empty-row">
                  <div class="empty-content">
                    <span class="empty-icon">📁</span>
                    <p>{{ isLoading ? 'กำลังโหลดข้อมูล...' : 'ไม่พบข้อมูลใบลา' }}</p>
                  </div>
                </td>
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
            <p>กรุณากรอกข้อมูลให้ครบถ้วนเพื่อความรวดเร็วในการอนุมัติ</p>
          </div>
          <button @click="showForm = false" class="btn-close">✕</button>
        </div>

        <div class="form-steps-body">
          
          <div class="form-step-section">
            <div class="step-indicator">01</div>
            <div class="step-content">
              <h3>ข้อมูลผู้ลา <span class="sub-text">(จำลองข้อมูล Login)</span></h3>
              <div class="input-grid">
                <div class="input-field">
                  <label>รหัสพนักงาน (emp_id)</label>
                  <input type="text" v-model="newLeave.emp_id" class="input-control" disabled>
                </div>
              </div>
            </div>
          </div>

          <div class="form-step-section">
            <div class="step-indicator">02</div>
            <div class="step-content">
              <h3>รายละเอียดการลา</h3>
              <div class="type-selector">
                <label class="type-chip">
                  <input type="radio" value="L01" v-model="newLeave.leave_type_id" name="ltype">
                  <span class="chip-label">ลาป่วย</span>
                </label>
                <label class="type-chip">
                  <input type="radio" value="L02" v-model="newLeave.leave_type_id" name="ltype">
                  <span class="chip-label">ลากิจ</span>
                </label>
                <label class="type-chip">
                  <input type="radio" value="L03" v-model="newLeave.leave_type_id" name="ltype">
                  <span class="chip-label">พักร้อน</span>
                </label>
              </div>
              
              <div class="input-grid mt-20">
                <div class="input-field">
                  <label>เริ่มวันที่</label>
                  <input type="date" v-model="newLeave.start_date" class="input-control">
                </div>
                <div class="input-field">
                  <label>ถึงวันที่</label>
                  <input type="date" v-model="newLeave.end_date" class="input-control">
                </div>
                <div class="input-field full">
                  <label>เหตุผลการลา</label>
                  <textarea v-model="newLeave.reason" placeholder="ระบุเหตุผลการลา..." rows="4" class="input-control"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="form-footer-actions">
            <button @click="showForm = false" class="btn-cancel">ยกเลิก</button>
            <button class="btn-submit" @click="submitLeave" :disabled="isSubmitting">
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
          <div class="detail-row">
            <span class="label">รหัสพนักงาน:</span>
            <span class="value">{{ selectedLeave.emp_id }}</span>
          </div>
          <div class="detail-row">
            <span class="label">วันที่ลา:</span>
            <span class="value">{{ selectedLeave.start_date }} ถึง {{ selectedLeave.end_date }}</span>
          </div>
          <div class="detail-row">
            <span class="label">สถานะ:</span>
            <span :class="['status-badge', selectedLeave.status === 'Pending' ? 'waiting' : 'approved']">{{ selectedLeave.status }}</span>
          </div>
          <hr style="border:0; border-top:1px solid #e2e8f0; margin:15px 0;">
          <div class="detail-reason">
            <label>เหตุผล:</label>
            <p>{{ selectedLeave.reason || 'ไม่ได้ระบุเหตุผล' }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// ================= URL ของ API (ต้องแก้ให้ตรงกับเซิร์ฟเวอร์ของคุณ) =================
// ตัวอย่างเช่น ถ้าเขียน PHP รันบน XAMPP ก็จะเป็น 'http://localhost/YOUR_FOLDER/api'
const API_BASE_URL = 'http://localhost/api_hrm' 

/* ================= STATE (ตัวแปรเก็บข้อมูล) ================= */
const leaves = ref([]) // เก็บข้อมูลใบลาทั้งหมดจาก DB
const isLoading = ref(false)
const isSubmitting = ref(false)

// ควบคุมการแสดงผลหน้าต่าง
const showForm = ref(false)
const showDetailModal = ref(false)
const selectedLeave = ref(null) // เก็บข้อมูลแถวที่ถูกคลิกดูรายละเอียด

// ฟิลเตอร์และค้นหา
const searchText = ref('')
const selectedDept = ref('all')
const selectedStatus = ref('all')

// ฟอร์มสร้างใบลา (ตรงกับคอลัมน์ใน tbl_leaves)
const newLeave = ref({
  emp_id: 'EMP001', // กำหนดค่าเริ่มต้นไว้ทดสอบ
  leave_type_id: 'L01',
  start_date: '',
  end_date: '',
  reason: ''
})

/* ================= METHODS (ฟังก์ชันการทำงาน) ================= */

// 1. ดึงข้อมูลจากฐานข้อมูล
const fetchLeaves = async () => {
  isLoading.value = true
  try {
    // สมมติว่ามีไฟล์ get_leaves.php ทำหน้าที่ SELECT ข้อมูลจาก tbl_leaves
    const response = await axios.get(`${API_BASE_URL}/get_leaves.php`)
    
    // เอาข้อมูลยัดใส่ตัวแปร leaves
    if (response.data) {
      leaves.value = response.data
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    // alert('ไม่สามารถดึงข้อมูลจากฐานข้อมูลได้')
  } finally {
    isLoading.value = false
  }
}

// 2. บันทึกข้อมูลลงฐานข้อมูล
const submitLeave = async () => {
  if(!newLeave.value.start_date || !newLeave.value.end_date) {
    alert('กรุณาเลือกวันที่ลา')
    return
  }

  isSubmitting.value = true
  try {
    // ส่งข้อมูลแบบ POST ไปที่ insert_leave.php (ต้องไปเขียน PHP มารับ)
    const response = await axios.post(`${API_BASE_URL}/insert_leave.php`, newLeave.value)
    
    if(response.data.success) {
      alert('ส่งใบลาเรียบร้อยแล้ว')
      showForm.value = false
      fetchLeaves() // โหลดข้อมูลใหม่เพื่อให้ตารางอัปเดต
      
      // ล้างฟอร์ม
      newLeave.value = {
        emp_id: 'EMP001', leave_type_id: 'L01', start_date: '', end_date: '', reason: ''
      }
    } else {
      alert('เกิดข้อผิดพลาด: ' + (response.data.message || 'ไม่ทราบสาเหตุ'))
    }
  } catch (error) {
    console.error('Error submitting leave:', error)
    alert('เซิร์ฟเวอร์มีปัญหา ไม่สามารถบันทึกข้อมูลได้')
  } finally {
    isSubmitting.value = false
  }
}

// 3. เปิด Modal แสดงรายละเอียด
const viewDetail = (leaveData) => {
  selectedLeave.value = leaveData
  showDetailModal.value = true
}

// 4. ปุ่มย้อนกลับ
const goBack = () => {
  window.history.back() // หรือถ้าระบบใช้ Vue Router ใช้: useRouter().back()
}

/* ================= COMPUTED (ประมวลผลข้อมูลตาม Filter) ================= */
const filteredLeaves = computed(() => {
  return leaves.value.filter(leave => {
    // 1. ค้นหาจาก emp_id หรือ reason (ถ้ามีชื่อพนักงานที่ Join มาจาก DB ก็เปลี่ยนเป็นค้นหาชื่อได้)
    const matchSearch = 
      (leave.emp_id || '').toLowerCase().includes(searchText.value.toLowerCase()) ||
      (leave.reason || '').toLowerCase().includes(searchText.value.toLowerCase())

    // 2. Filter สถานะ
    const matchStatus = selectedStatus.value === 'all' || leave.status === selectedStatus.value

    // 3. Filter แผนก (ต้องมั่นใจว่า API ส่ง dept_id มาด้วย)
    const matchDept = selectedDept.value === 'all' || leave.dept_id === selectedDept.value

    return matchSearch && matchStatus && matchDept
  })
})

const pendingCount = computed(() => {
  return leaves.value.filter(l => l.status === 'Pending').length
})

/* ================= LIFECYCLE (ทำงานตอนเปิดหน้าเว็บ) ================= */
onMounted(() => {
  fetchLeaves() // สั่งโหลดข้อมูลทันทีที่เปิดหน้านี้
})
</script>

<style scoped>
/* สไตล์เดิมของคุณ ใส่ไว้เหมือนเดิม */
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap');

.leave-page-container { font-family: 'Sarabun', sans-serif; padding: 30px; background: #f4f7f9; min-height: 100vh; }
.page-header { display: flex; justify-content: space-between; align-items: center; }
.breadcrumb { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
.page-title { font-size: 28px; font-weight: 700; color: #1e293b; margin: 5px 0 0 0; }
.btn-back-minimal { background: white; border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.3s; }
.btn-back-minimal:hover { background: #1e293b; color: white; }
.summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.summary-card { padding: 24px; border-radius: 24px; display: flex; align-items: center; gap: 20px; background: white; border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 10px 25px rgba(0,0,0,0.03); }
.card-icon { font-size: 32px; background: rgba(0,0,0,0.03); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 18px; }
.card-label { font-size: 13px; color: #64748b; font-weight: 600; }
.card-value { font-size: 28px; font-weight: 700; margin: 5px 0; color: #1e293b; }
.table-container-modern { background: white; border-radius: 24px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
.table-controls { display: flex; justify-content: space-between; margin-bottom: 25px; }
.search-box-modern { background: #f8fafc; padding: 10px 15px; border-radius: 15px; display: flex; align-items: center; gap: 10px; width: 350px; }
.search-box-modern input { border: none; background: transparent; outline: none; width: 100%; font-size: 14px; }
.filter-actions { display: flex; gap: 10px; }
.select-modern { background: #f8fafc; border: 1px solid #e2e8f0; padding: 0 15px; border-radius: 12px; font-family: inherit; font-size: 13px; }
.btn-add-primary { background: #1e293b; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 600; cursor: pointer; }
.modern-table { width: 100%; border-collapse: collapse; }
.modern-table th { text-align: left; padding: 15px; border-bottom: 2px solid #f1f5f9; color: #64748b; font-size: 13px; }
.modern-table td { padding: 15px; border-bottom: 1px solid #f8fafc; font-size: 14px; }
.status-badge { padding: 5px 12px; border-radius: 100px; font-size: 11px; font-weight: 700; }
.status-badge.waiting { background: #fef3c7; color: #d97706; }
.status-badge.approved { background: #d1fae5; color: #059669; }
.btn-view { background: transparent; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 8px; cursor: pointer; transition: 0.2s; }
.form-card-premium { max-width: 800px; margin: 0 auto; background: white; border-radius: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.05); padding: 40px;}
.input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;}
.input-grid .full { grid-column: span 2; }
.input-field label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; }
.input-control { width: 100%; padding: 12px; border-radius: 12px; border: 1px solid #e2e8f0; font-family: inherit; }
.type-selector { display: flex; gap: 10px; margin-top: 15px;}
.type-chip { flex: 1; cursor: pointer; }
.type-chip input { display: none; }
.chip-label { display: block; text-align: center; padding: 12px; border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 600; }
.type-chip input:checked + .chip-label { background: #1e293b; color: white; }
.form-footer-actions { display: flex; justify-content: space-between; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
.btn-submit { background: #10b981; color: white; border: none; padding: 12px 30px; border-radius: 12px; font-weight: 700; cursor: pointer;}
.btn-cancel { background: white; border: 1px solid #ccc; padding: 12px 30px; border-radius: 12px; font-weight: 700; cursor: pointer;}
.mt-30 { margin-top: 30px; }

/* CSS สำหรับ Modal โดยเฉพาะ */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-card { background: white; width: 90%; max-width: 450px; padding: 25px; border-radius: 20px; }
.modal-header { display: flex; justify-content: space-between; margin-bottom: 20px; align-items: center; }
.btn-close-dark { background: #eee; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;}
.detail-row { margin-bottom: 10px; font-size: 15px; }
.detail-row .label { font-weight: 600; display: inline-block; width: 100px; color: #64748b;}
</style>