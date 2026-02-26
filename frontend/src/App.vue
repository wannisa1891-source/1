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
const isSidebarCollapsed = ref(false)

const handleLoginSuccess = () => {
  isLoggedIn.value = true
  fetchEmployees()
}

const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/employees')
    employees.value = response.data.employees || response.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  if (isLoggedIn.value) fetchEmployees()
})
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
      @change-menu="(menu) => activeMenu = menu" 
      @logout="isLoggedIn = false"
      @toggle-collapse="(val) => isSidebarCollapsed = val" 
    />

    <main 
      class="main-content-view"
      :class="{ expanded: isSidebarCollapsed }"
    >
      <Dashboard 
        v-if="activeMenu === 'dashboard'" 
        :employees="employees" 
      />

      <EmployeeList 
        v-else-if="activeMenu === 'emp-list'" 
        :employees="employees" 
      />

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
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap');

/* ===== Reset ===== */
* {
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Sarabun', sans-serif;
  background: #F5F4F1;   
  overflow-x: hidden; /* 🌟 สำคัญ: ล็อคไม่ให้เกิดแถบเลื่อนแนวนอน */
}

/* ===== Layout หลัก ===== */
.system-container {
  display: flex;
  width: 100vw; /* 🌟 บังคับกว้างเท่าหน้าจอมอนิเตอร์เป๊ะๆ */
  min-height: 100vh;
  background: #F5F4F1; 
}

/* ===== Main Content ===== */
.main-content-view {
  margin-left: 280px; 
  /* 🌟 สูตรพระเจ้า: เอาความกว้างจอ (100vw) ลบด้วยความกว้าง Sidebar (280px) */
  width: calc(100vw - 280px); 
  min-height: 100vh;
  transition: all 0.35s ease;
  background: transparent; 
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* เมื่อ Sidebar ย่อ */
.main-content-view.expanded {
  margin-left: 85px;
  /* 🌟 คำนวณใหม่ตอน Sidebar หดตัว */
  width: calc(100vw - 85px); 
}

/* ===== Placeholder Page ===== */
.placeholder-page {
  background: white;
  padding: 40px;
  margin: 40px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}
</style>