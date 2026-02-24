<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import Login from './components/Login.vue'
import Sidebar from './components/Sidebar.vue'
import Dashboard from './components/Dashboard.vue'
import EmployeeList from './components/EmployeeList.vue' // มีแค่บรรทัดเดียวแล้ว ✅
import OrgStructure from './components/OrgStructure.vue' 
import Transfer from './components/Transfer.vue'

const isLoggedIn = ref(false)
const employees = ref([])
const activeMenu = ref('dashboard')

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
    <Sidebar :activeMenu="activeMenu" @change-menu="(menu) => activeMenu = menu" @logout="isLoggedIn = false" />

    <main class="main-content-view">
      <header class="navy-banner">
        <div class="banner-txt">
          <span class="p-white">➕</span>
          <h1>Hospital HRM Website</h1>
          <p style="background: yellow; color: black; padding: 5px; text-align: center;">
            Debug: ตอนนี้ activeMenu คือ {{ activeMenu }}
          </p>
        </div>
      </header>

      <Dashboard v-if="activeMenu === 'dashboard'" :employees="employees" />
      <EmployeeList v-else-if="activeMenu === 'emp-list'" :employees="employees" />
      <OrgStructure v-else-if="activeMenu === 'org-struct'" />
      <Transfer v-else-if="activeMenu === 'transfer'" />
      
      <section v-else class="placeholder-page">
        <h2>กำลังพัฒนาหน้า: {{ activeMenu }}</h2>
        <p>คุณ Wanwisa สามารถสร้างไฟล์ Component ใหม่มาใส่ตรงนี้ได้เลยครับ</p>
      </section>
      
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600&display=swap');
body { margin: 0; font-family: 'Sarabun', sans-serif; background: #e5e7eb; }
.system-container { display: flex; height: 100vh; }
.main-content-view { margin-left: 280px; flex: 1; display: flex; flex-direction: column; padding: 15px; height: 100vh; box-sizing: border-box; }
.navy-banner { background: #003366; color: white; padding: 25px 40px; border-radius: 18px; margin-bottom: 15px; }
.placeholder-page { background: white; padding: 40px; border-radius: 30px; text-align: center; }
</style>