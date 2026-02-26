<script setup>
import { ref, onMounted, shallowRef } from 'vue'
import axios from 'axios'

// Import คอมโพเนนต์ทั้งหมด
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

// 🌟 ยุบ v-if ทั้งหมดมาไว้ที่นี่ (ใช้ shallowRef เพื่อประสิทธิภาพ)
const menuComponents = {
  'dashboard': Dashboard,
  'emp-list': EmployeeList,
  'org-struct': OrgStructure,
  'transfer': Transfer,
  'license': License,
  'schedule': Schedule,
  'payroll': Payroll,
  'leave-sys': LeaveSystem
}

const changeMenu = (target) => { activeMenu.value = target }
const handleLoginSuccess = () => { isLoggedIn.value = true; fetchEmployees(); }

const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/employees')
    employees.value = response.data.employees || response.data || []
  } catch (error) { console.error(error) }
}

onMounted(() => { if (isLoggedIn.value) fetchEmployees() })
</script>

<template>
  <Login v-if="!isLoggedIn" @login-success="handleLoginSuccess" />

  <div v-else class="system-container">
    <Sidebar 
      :activeMenu="activeMenu" 
      :collapsed="isSidebarCollapsed"
      @change-menu="changeMenu" 
      @logout="isLoggedIn = false"
      @toggle-collapse="(val) => isSidebarCollapsed = val" 
    />

    <main class="main-content-view" :class="{ expanded: isSidebarCollapsed }">
      <component 
        :is="menuComponents[activeMenu]" 
        :employees="employees"
        @change-menu="changeMenu"
      />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #app { width: 100%; height: 100%; background: #F5F4F1; overflow: hidden; }

.system-container { display: flex; width: 100%; min-height: 100vh; }

.main-content-view {
  flex: 1; /* 🌟 สั่งให้ยืดเต็มพื้นที่ที่เหลือทันที ลบปัญหาที่ว่างด้านข้าง */
  margin-left: 280px;
  transition: all 0.35s ease;
  display: flex;
  flex-direction: column;
}

.main-content-view.expanded { margin-left: 85px; }
</style>