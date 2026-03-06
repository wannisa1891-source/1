<script setup>
import { ref } from 'vue'
import axios from 'axios'

import Login from './components/Login/Login.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import Dashboard from './components/Dashboard/Dashboard.vue'
import EmployeeList from './components/EmployeeList/EmployeeList.vue'
import OrgStructure from './components/OrgStructure/OrgStructure.vue'
import Transfer from './components/Transfer/Transfer.vue'
import License from './components/License/LicensePage.vue'
import Schedule from './components/Schedule/Schedule.vue'
import LeaveSystem from './components/LeaveSystem/Leave_System.vue'
import Payroll from './components/Payroll/Payroll.vue'

const isLoggedIn = ref(false)
const employees = ref([])
const activeMenu = ref('dashboard')
const isSidebarCollapsed = ref(false)

/* =========================
   ✅ LOGIN SUCCESS
========================= */
const handleLoginSuccess = async () => {
  isLoggedIn.value = true
  activeMenu.value = 'dashboard'   // รีเซ็ตหน้าไป Dashboard ทุกครั้งที่ login
  await fetchEmployees()
}

/* =========================
   ✅ LOGOUT
========================= */
const handleLogout = () => {
  isLoggedIn.value = false
  employees.value = []
  activeMenu.value = 'dashboard'
}

/* =========================
   ✅ FETCH EMPLOYEE DATA
========================= */
const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/employees')

    console.log('✅ ข้อมูลพนักงานที่ดึงได้:', response.data)

    employees.value = response.data.employees || response.data || []
  } catch (error) {
    console.error('❌ Error fetching employees:', error)
    employees.value = []
  }
}
</script>

<template>
  <Login 
    v-if="!isLoggedIn" 
    @login-success="handleLoginSuccess" 
  />

  <div v-else class="system-container">
    <Sidebar 
      :activeMenu="activeMenu" 
      :collapsed="isSidebarCollapsed"
      @change-menu="activeMenu = $event" 
      @logout="isLoggedIn = false"
      @toggle-collapse="isSidebarCollapsed = $event" 
    />

    <main 
      class="main-content-view"
      :class="{ expanded: isSidebarCollapsed }"
    >
      <Dashboard 
        v-if="activeMenu === 'dashboard'" 
        :employees="employees" 
        @change-menu="activeMenu = $event"
      />

      <EmployeeList 
        v-else-if="activeMenu === 'emp-list'" 
        :employees="employees" 
      />

      <OrgStructure v-else-if="activeMenu === 'org-struct'" :employees="employees" />
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
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap');

/* ===== Reset & Base ===== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app {
  width: 100%;
  height: 100%;
  background-color: #f0f4f8; /* 🌟 สีพื้นหลังนวลๆ โทน Claymorphism */
}

body {
  font-family: 'Sarabun', sans-serif;
  overflow-x: hidden; 
}

/* ===== Layout หลัก ===== */
.system-container {
  display: flex;
  width: 100%; 
  min-height: 100vh;
}

/* ===== Main Content ===== */
.main-content-view {
  flex: 1; /* 🌟 ใช้ flex เพื่อให้ Dashboard ยืดเต็มพื้นที่อัตโนมัติ */
  margin-left: 280px; 
  min-height: 100vh;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent; 
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* เมื่อ Sidebar ย่อ (Collapsed) */
.main-content-view.expanded {
  margin-left: 85px;
}

/* ===== Placeholder Page ===== */
.placeholder-page {
  background: white;
  padding: 40px;
  margin: 40px;
  border-radius: 35px; /* 🌟 ขอบมนพิเศษตามสไตล์ที่ชอบ */
  text-align: center;
  box-shadow: 20px 20px 40px #d1d9e6, -20px -20px 40px #ffffff; /* 🌟 เงานูนสไตล์ Clay */
}
</style>