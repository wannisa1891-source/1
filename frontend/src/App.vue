<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 1. สร้างตัวแปรไว้เก็บรายชื่อพนักงานที่ดึงมาจากฐานข้อมูล 
const employees = ref([])

// 2. ฟังก์ชันสำหรับไปดึงข้อมูลจาก API หลังบ้าน (Node.js)
const fetchEmployees = async () => {
  try {
    // เรียกไปที่ URL หลังบ้านที่เราทำไว้ที่ Port 3000 
    const response = await axios.get('http://localhost:3000/api/employees')
    employees.value = response.data
  } catch (error) {
    console.error('ดึงข้อมูลผิดพลาด:', error)
  }
}

// 3. สั่งให้ทำงานทันทีที่เปิดหน้าเว็บ
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
/* คุมโทนสีให้เป็นทางการตามที่กำหนดไว้ [cite: 16] */
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
  background-color: #2c3e50; /* สีน้ำเงินเข้ม ดูเป็นทางการ */
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
}
.status-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}
/* ตกแต่งตารางให้สวยงาม  */
.hrm-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.hrm-table th, .hrm-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.hrm-table th {
  background-color: #34495e;
  color: white;
}
.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: bold;
}
.status-badge.active { background: #e8f5e9; color: #2e7d32; }
.status-badge.resigned { background: #ffebee; color: #c62828; }

.btn-refresh {
  margin-top: 15px;
  padding: 8px 16px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>