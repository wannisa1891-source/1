<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// --- ส่วนของข้อมูล (Logic) ---

const employees = ref([]) // เก็บรายชื่อพนักงาน
const newEmp = ref({      // เก็บค่าจากฟอร์มที่กำลังจะกรอก
  emp_id: '',
  prefix: '',
  first_name_th: '',
  last_name_th: '',
  emp_type: 'พนักงานราชการ',
  dept_id: 'D001',
  pos_id: 'P001',
  start_date: new Date().toISOString().split('T')[0],
  base_salary: 15000
})

// ฟังก์ชัน: ดึงข้อมูลจากหลังบ้าน
const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/employees')
    employees.value = response.data
  } catch (error) {
    console.error('ดึงข้อมูลผิดพลาด:', error)
  }
}

// ฟังก์ชัน: ส่งข้อมูลไปบันทึก
const addEmployee = async () => {
  if (!newEmp.value.emp_id || !newEmp.value.first_name_th) {
    alert('กรุณากรอกรหัสและชื่อพนักงานด้วยครับ')
    return
  }
  try {
    await axios.post('http://localhost:3000/api/employees', newEmp.value)
    alert('✅ บันทึกพนักงานใหม่สำเร็จ!')
    fetchEmployees() // บันทึกเสร็จแล้วดึงข้อมูลใหม่มาโชว์ทันที
    
    // ล้างฟอร์มให้ว่างเพื่อรอคนต่อไป
    newEmp.value = { 
      emp_id: '', prefix: '', first_name_th: '', last_name_th: '', 
      emp_type: 'พนักงานราชการ', dept_id: 'D001', pos_id: 'P001', 
      start_date: new Date().toISOString().split('T')[0], base_salary: 15000 
    }
  } catch (error) {
    alert('❌ บันทึกไม่สำเร็จ ตรวจสอบการเชื่อมต่อ Backend')
  }
}

onMounted(() => {
  fetchEmployees()
})
</script>

<template>
  <div class="hrm-container">
    <header>
      <h1>ระบบบริหารจัดการบุคลากร (HRM)</h1>
      <p>โรงพยาบาล - จัดการข้อมูลพนักงาน</p>
    </header>
    
    <main>
      <div class="card add-form">
        <h3 style="margin-top:0">➕ เพิ่มพนักงานใหม่</h3>
        <div class="form-grid">
          <input v-model="newEmp.emp_id" placeholder="รหัสพนักงาน">
          <select v-model="newEmp.prefix">
            <option value="">คำนำหน้า</option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
          <input v-model="newEmp.first_name_th" placeholder="ชื่อจริง">
          <input v-model="newEmp.last_name_th" placeholder="นามสกุล">
          <button @click="addEmployee" class="btn-save">💾 บันทึกข้อมูล</button>
        </div>
      </div>

      <div class="status-card">
        <h3>ยินดีต้อนรับคุณ Wanwisa</h3>
        <p>จำนวนพนักงานในระบบ: <strong>{{ employees.length }}</strong> คน</p>
      </div>

      <div class="data-section">
        <h2>รายชื่อพนักงาน (tbl_employees)</h2>
        <table v-if="employees.length > 0" class="hrm-table">
          <thead>
            <tr>
              <th>รหัสพนักงาน</th>
              <th>ชื่อ-นามสกุล</th>
              <th>ประเภทการจ้าง</th>
              <th>แผนก</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in employees" :key="emp.emp_id">
              <td>{{ emp.emp_id }}</td>
              <td>{{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}</td>
              <td>{{ emp.emp_type }}</td>
              <td>{{ emp.dept_id }}</td>
              <td>
                <span :class="['status-badge', emp.status === 'Active' ? 'active' : 'resigned']">
                  {{ emp.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="empty-table">
          <p>ไม่พบข้อมูลพนักงาน หรือยังไม่ได้รัน Backend</p>
          <button @click="fetchEmployees" class="btn-refresh">ลองดึงข้อมูลใหม่</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Sarabun', sans-serif;
  background-color: #f4f7f6;
}
.hrm-container {
  padding: 20px;
  max-width: 1100px;
  margin: 0 auto;
}
header {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
}
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}
.add-form { border-top: 5px solid #27ae60; }
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
}
.form-grid input, .form-grid select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.btn-save {
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.status-card { background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
.hrm-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}
.hrm-table th, .hrm-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
.hrm-table th { background-color: #34495e; color: white; }
.status-badge { padding: 4px 8px; border-radius: 4px; font-size: 0.85em; font-weight: bold; }
.status-badge.active { background: #e8f5e9; color: #2e7d32; }
.btn-refresh { padding: 8px 16px; background: #2c3e50; color: white; border: none; border-radius: 4px; cursor: pointer; }
</style>