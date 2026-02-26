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
<<<<<<< HEAD
      @change-menu="changeMenu" 
      @logout="isLoggedIn = false"
      @toggle-collapse="(val) => isSidebarCollapsed = val" 
=======
<<<<<<< HEAD
      @change-menu="(menu) => activeMenu = menu" 
       @logout="isLoggedIn = false"
      @toggle-collapse="(val) => isSidebarCollapsed = val" 
=======
      @change-menu="activeMenu = $event" 
      @logout="isLoggedIn = false"
      @toggle-collapse="isSidebarCollapsed = $event" 
>>>>>>> b30d892a44b5bf844bb0ad9a406da21edf96a19c
>>>>>>> 3cb288a40e44c39678efc97870e70e189ea7ad0d
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
body {
  margin: 0;
  background: #333333;
}
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap');

<<<<<<< HEAD
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
=======
/* ===== Reset ===== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app {
  width: 100%;
  height: 100%;
  font-family: 'Sarabun', sans-serif;
<<<<<<< HEAD
  background: #F5F4F1;
  overflow-x: hidden;
=======
  background: #F5F4F1;   
  overflow-x: hidden; 
>>>>>>> b30d892a44b5bf844bb0ad9a406da21edf96a19c
}

/* ===== Layout หลัก ===== */
.system-container {
<<<<<<< HEAD
  display: flex;
  width: 100%;
=======
  /* 🌟 ลบ display: flex ออก เพื่อไม่ให้ตีกับระบบ Sidebar ที่ลอยอยู่ */
  width: 100%; 
>>>>>>> b30d892a44b5bf844bb0ad9a406da21edf96a19c
  min-height: 100vh;
}

/* ===== Main Content ===== */
.main-content-view {
<<<<<<< HEAD
  flex: 1;              /* ⭐ ใช้ flex อย่างเดียว */
=======
  margin-left: 280px; 
  /* 🌟 เปลี่ยนจาก 100vw เป็น 100% เพื่อป้องกันปัญหาหน้าจอเพี้ยนเวลาเกิดแถบเลื่อน */
  width: calc(100% - 280px); 
>>>>>>> b30d892a44b5bf844bb0ad9a406da21edf96a19c
  min-height: 100vh;
  transition: 0.35s ease;
  background: #F5F4F1;
  padding: 30px;
  overflow: auto;
}

<<<<<<< HEAD
/* ===== Placeholder ===== */
=======
/* เมื่อ Sidebar ย่อ */
.main-content-view.expanded {
  margin-left: 85px;
  /* 🌟 คำนวณใหม่ตอน Sidebar หดตัว */
  width: calc(100% - 85px); 
}

/* ===== Placeholder Page ===== */
>>>>>>> b30d892a44b5bf844bb0ad9a406da21edf96a19c
.placeholder-page {
  background: white;
  padding: 40px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}
>>>>>>> 3cb288a40e44c39678efc97870e70e189ea7ad0d
</style>