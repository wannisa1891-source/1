<template>
  <div class="page-container">
    <div class="header-row">
      <h2>ทะเบียนบุคลากร</h2>
      <button class="btn-primary-gold">+ เพิ่มพนักงานใหม่</button>
    </div>

    <div class="filter-card">
      <input type="text" placeholder="ค้นหาชื่อ หรือ รหัส..." class="search-input">
      <select class="select-box"><option>ทุกแผนก</option></select>
      <select class="select-box"><option>ทุกตำแหน่ง</option></select>
    </div>

    <div class="table-card">
      <table class="hrm-table-modern">
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
          <tr v-for="emp in employees" :key="emp.emp_id">
            <td><div class="img-placeholder">👤</div></td>
            <td>{{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}</td>
            <td>{{ emp.pos_id }}</td>
            <td>{{ emp.dept_id }}</td>
            <td><span class="status-active">● Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const employees = ref([])
const fetchEmployees = async () => {
  const res = await axios.get('http://localhost:3000/api/employees')
  employees.value = res.data
}
onMounted(fetchEmployees)
</script>

<style scoped>
/* ใส่ CSS เฉพาะหน้านี้เพื่อให้ดีไซน์ไม่หลุดไปหน้าอื่น */
.page-container { padding: 20px; animation: fadeIn 0.5s; }
.header-row { display: flex; justify-content: space-between; margin-bottom: 20px; }
.filter-card { background: white; padding: 20px; border-radius: 15px; margin-bottom: 20px; display: flex; gap: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
.table-card { background: white; border-radius: 15px; padding: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
.btn-primary-gold { background: #c5a073; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
</style>