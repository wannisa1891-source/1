<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Login from './components/Login.vue'
import Sidebar from './components/Sidebar.vue'
import Dashboard from './components/Dashboard.vue'
import EmployeeList from './components/EmployeeList.vue' 
import OrgStructure from './components/OrgStructure.vue' 
import Transfer from './components/Transfer.vue'
import License from './components/License.vue'
import Schedule from './components/Schedule.vue'
import LeaveSystem from './components/LeaveSystem.vue'
import Payroll from './components/Payroll.vue'

const isLoggedIn = ref(false)
const employees = ref([])
const activeMenu = ref('dashboard')
const isSidebarCollapsed = ref(false) // ✅ เก็บสถานะ Sidebar ไว้ที่นี่

const handleLoginSuccess = () => {
  isLoggedIn.value = true
  fetchEmployees()
}

const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/employees')
    employees.value = response.data
  } catch (error) { console.error(error) }
}

onMounted(() => { if (isLoggedIn.value) fetchEmployees() })
</script>

<template>
  <Login v-if="!isLoggedIn" @login-success="handleLoginSuccess" />

  <div v-else class="system-container">
    <Sidebar 
      :activeMenu="activeMenu" 
      @change-menu="(menu) => activeMenu = menu" 
      @logout="isLoggedIn = false"
      @toggle-collapse="(val) => isSidebarCollapsed = val" 
    />

    <main :class="['main-content-view', { 'expanded': isSidebarCollapsed }]">
      
      <Dashboard v-if="activeMenu === 'dashboard'" :employees="employees" />
      <EmployeeList v-else-if="activeMenu === 'emp-list'" :employees="employees" />
      <OrgStructure v-else-if="activeMenu === 'org-struct'" />
      <Transfer v-else-if="activeMenu === 'transfer'" />
      <License v-else-if="activeMenu === 'license'" />
      <Schedule v-else-if="activeMenu === 'schedule'" />
      <Payroll v-else-if="activeMenu === 'payroll'" />
      <LeaveSystem v-else-if="activeMenu === 'leave-sys'" />
      
      <section v-else class="placeholder-page">
        <h2>กำลังพัฒนาหน้า: {{ activeMenu }}</h2>
      </section>
      
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600&display=swap');
body { 
  margin: 0; 
  font-family: 'Sarabun', sans-serif; 
  background: #333333; /* ✅ ถมสีเทาเข้มตั้งแต่ข้างนอกสุดตามเรพ */
  overflow: hidden; /* ❌ ฆ่าแถบเลื่อนตัวนอกสุดทิ้ง */
}

.system-container { display: flex; height: 100vh; background: #333333; }

.main-content-view { 
  /* 💡 ใช้ transition เพื่อให้ขยับตาม Sidebar นิ่มๆ */
  margin-left: 280px; 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  height: 100vh; 
  box-sizing: border-box; 
  transition: all 0.35s ease;
  background: #333333;
}

/* 💡 เมื่อ Sidebar ย่อ ตัวเนื้อหาจะขยับมาชิดขอบเหลือแค่ 85px */
.main-content-view.expanded { margin-left: 85px; }

.placeholder-page { background: white; padding: 40px; margin: 20px; border-radius: 30px; text-align: center; }
</style>