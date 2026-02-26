<template>
  <div class="emp-modern-wrapper">
    
    <div v-if="!showForm" class="premium-glass-card fade-in">
      <div class="card-header-flex">
        <h2 class="card-title">ทะเบียนบุคลากร</h2>
        <button @click="showForm = true" class="btn-primary-add">
          <span class="icon">➕</span> เพิ่มพนักงานใหม่
        </button>
      </div>

      <div class="action-bar-modern">
        <div class="search-pill">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="ค้นหาชื่อ หรือ รหัสพนักงาน..." class="search-input-clean">
        </div>
        <div class="filter-group">
          <span class="filter-label">ตัวกรอง:</span>
          <select class="select-modern"><option>ทุกแผนก</option></select>
          <select class="select-modern"><option>ทุกตำแหน่ง</option></select>
          <select class="select-modern"><option>สถานะ: ทั้งหมด</option></select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="premium-table">
          <thead>
            <tr>
              <th>รูปภาพ</th>
              <th>ชื่อ-นามสกุล</th>
              <th>ตำแหน่ง</th>
              <th>แผนก</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in employees" :key="emp.emp_id" class="table-row-hover">
              <td><div class="avatar-circle">👤</div></td>
              <td class="fw-bold text-dark">{{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}</td>
              <td class="text-muted">{{ emp.pos_id }}</td>
              <td class="text-muted">{{ emp.dept_id }}</td>
              <td>
                <span class="badge-success">● {{ emp.status }}</span>
              </td>
            </tr>
            
            <tr v-if="employees.length === 0">
              <td colspan="5" class="empty-state">ยังไม่มีข้อมูลบุคลากรในระบบ</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination-modern">
        <button class="page-btn text-muted">&lt; ก่อนหน้า</button>
        <div class="page-numbers"><button class="page-btn active">1</button></div>
        <button class="page-btn text-muted">ถัดไป &gt;</button>
      </div>
    </div>

    <div v-else class="premium-glass-card fade-in bg-light-gray">
      <div class="card-header-flex border-bottom-dark">
        <h2 class="card-title text-center w-100">ฟอร์มลงทะเบียนพนักงานใหม่</h2>
        <button @click="showForm = false" class="btn-outline-back">🔙 ย้อนกลับ</button>
      </div>
      
      <div class="form-body-scroll">
        
        <div class="form-section-box">
          <h3 class="section-title">1. ข้อมูลส่วนตัว</h3>
          <div class="form-flex-layout">
            <div class="photo-upload-area">
              <div class="photo-placeholder">Image</div>
            </div>
            <div class="form-grid-2">
              <div class="input-wrapper full-width">
                <label>คำนำหน้า :</label>
                <select v-model="newEmp.prefix" class="input-modern">
                  <option value="">[ เลือก 🔽 ]</option>
                  <option value="นพ.">นพ.</option><option value="พญ.">พญ.</option>
                  <option value="นาย">นาย</option><option value="นางสาว">นางสาว</option>
                </select>
              </div>
              <div class="input-wrapper"><label>ชื่อ (ไทย):</label><input v-model="newEmp.first_name_th" type="text" class="input-modern"></div>
              <div class="input-wrapper"><label>นามสกุล (ไทย):</label><input v-model="newEmp.last_name_th" type="text" class="input-modern"></div>
              <div class="input-wrapper"><label>เลขบัตรประชาชน:</label><input v-model="newEmp.citizen_id" type="text" class="input-modern" placeholder="x-xxxx-xxxxx-xx-x"></div>
            </div>
          </div>
        </div>

        <div class="form-section-box">
          <h3 class="section-title">2. ข้อมูลการทำงาน</h3>
          <div class="form-grid-3">
            <div class="input-wrapper"><label>รหัสพนักงาน:</label><input v-model="newEmp.emp_id" type="text" class="input-modern" placeholder="EMP00x"></div>
            <div class="input-wrapper"><label>วันที่เริ่มงาน:</label><input v-model="newEmp.start_date" type="date" class="input-modern"></div>
            <div class="input-wrapper"><label>ประเภทการจ้าง:</label><input v-model="newEmp.emp_type" type="text" class="input-modern" placeholder="ข้าราชการ"></div>
            <div class="input-wrapper"><label>แผนก (ID):</label><input v-model="newEmp.dept_id" type="text" class="input-modern" placeholder="D001"></div>
            <div class="input-wrapper"><label>ตำแหน่ง (ID):</label><input v-model="newEmp.pos_id" type="text" class="input-modern" placeholder="P001"></div>
            <div class="input-wrapper"><label>เงินเดือน:</label><input v-model="newEmp.base_salary" type="number" class="input-modern"></div>
          </div>
        </div>

        <div class="form-action-buttons">
          <button @click="showForm = false" class="btn-cancel-modern">ยกเลิก</button>
          <button @click="saveEmployee" class="btn-save-modern">บันทึกข้อมูล</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  employees: {
    type: Array,
    default: () => []
  }
})
const showForm = ref(false)

const newEmp = ref({
  emp_id: '', prefix: 'นางสาว', first_name_th: '', last_name_th: '',
  citizen_id: '', phone: '081-000-0000', emp_type: 'ข้าราชการ',
  dept_id: 'D001', pos_id: 'P001', start_date: '2026-02-25', base_salary: 0
})

const saveEmployee = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/employees', newEmp.value)
    alert('✅ บันทึกสำเร็จ: ' + response.data.message)
    showForm.value = false
    window.location.reload() 
  } catch (error) {
    alert('❌ บันทึกไม่สำเร็จ: ' + (error.response?.data?.error || error.message))
  }
}
</script>

<style scoped>
/* สไตล์เดิมทั้งหมด แต่เพิ่มสีข้อความให้ตาราง */
.emp-modern-wrapper { padding: 35px 20px 20px 20px; animation: fadeIn 0.4s ease-in-out; background: #333333; min-height: 100vh; }
.premium-glass-card { background: #ffffff; border-radius: 20px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); padding: 30px; border: 1px solid #f1f5f9; }
.bg-light-gray { background: #f8fafc; }
.card-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.card-title { margin: 0; font-size: 22px; color: #1e293b; font-weight: 700; }
.w-100 { flex: 1; }
.border-bottom-dark { border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; }

.action-bar-modern { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 15px; }
.search-pill { display: flex; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 50px; padding: 8px 20px; width: 350px; }
.search-input-clean { border: none; background: transparent; outline: none; width: 100%; margin-left: 10px; color: #334155; }
.filter-group { display: flex; align-items: center; gap: 12px; }
.select-modern { border: 1px solid #e2e8f0; background: #ffffff; padding: 8px 15px; border-radius: 10px; outline: none; cursor: pointer; }
.btn-primary-add { background: #c5a073; color: white; border: none; padding: 10px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 12px rgba(197, 160, 115, 0.3); }
.btn-primary-add:hover { background: #b58d5c; transform: translateY(-2px); }
.btn-outline-back { background: white; color: #475569; border: 1px solid #cbd5e1; padding: 8px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: 0.2s; }
.btn-outline-back:hover { background: #f1f5f9; }

.table-responsive { overflow-x: auto; border-radius: 12px; border: 1px solid #f1f5f9; }
.premium-table { width: 100%; border-collapse: collapse; text-align: left; }
.premium-table th { background: #f8fafc; color: #64748b; padding: 16px 20px; border-bottom: 2px solid #e2e8f0; }

/* 💡 แก้ตรงนี้: ใส่สีให้ตัวอักษรในตาราง จะได้มองเห็นชัดๆ ไม่กลืนกับพื้นหลัง */
.premium-table td { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; color: #1e293b; font-weight: 600; }

.avatar-circle { width: 45px; height: 45px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.badge-success { background: #dcfce7; color: #166534; padding: 6px 14px; border-radius: 50px; font-size: 13px; font-weight: 700; }
.pagination-modern { display: flex; justify-content: space-between; align-items: center; margin-top: 25px; }
.page-btn { background: white; border: 1px solid #e2e8f0; padding: 8px 14px; border-radius: 8px; cursor: pointer; color: #475569; font-weight: 600; }
.page-btn.active { background: #c5a073; color: white; border-color: #c5a073; }

.form-section-box { background: #ffffff; border-radius: 15px; padding: 25px; margin-bottom: 20px; border: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
.section-title { margin-top: 0; font-size: 18px; color: #334155; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 20px; }

.form-flex-layout { display: flex; gap: 30px; }
.photo-upload-area { width: 140px; }
.photo-placeholder { width: 120px; height: 150px; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-weight: 600; background: #f8fafc; }
.form-grid-2 { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 15px 25px; }
.form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px 25px; }

.input-wrapper { display: flex; align-items: center; gap: 10px; }
.input-wrapper.full-width { grid-column: span 2; }
.input-wrapper label { width: 160px; text-align: right; color: #475569; font-size: 14px; font-weight: 600; }

.input-modern { flex: 1; padding: 8px 15px; border: 1px solid #cbd5e1; border-radius: 10px; outline: none; font-family: inherit; color: #334155; transition: 0.3s; }
.input-modern:focus { border-color: #c5a073; box-shadow: 0 0 0 3px rgba(197, 160, 115, 0.1); }

.form-action-buttons { display: flex; justify-content: center; gap: 20px; margin-top: 35px; padding-bottom: 20px; }
.btn-cancel-modern { background: #ffffff; color: #475569; border: 2px solid #cbd5e1; padding: 12px 40px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.2s; }
.btn-save-modern { background: #22c55e; color: white; border: none; padding: 12px 50px; border-radius: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); transition: 0.2s; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>