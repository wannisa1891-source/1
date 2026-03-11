<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

import Login from './components/Login/LoginView.vue'
import Register from './components/Login/RegisterView.vue'
import Sidebar from './components/Sidebar/SideBar.vue'
import Dashboard from './components/Dashboard/Dashboard.vue'
import EmployeeList from './components/EmployeeList/EmployeeList.vue'
import OrgStructure from './components/OrgStructure/OrgStructure.vue'
import Transfer from './components/Transfer/Transfer.vue'
import License from './components/License/LicensePage.vue'
import Schedule from './components/Schedule/SchedulePage.vue'
import LeaveSystem from './components/LeaveSystem/Leave_System.vue'
import Payroll from './components/Payroll/Payroll.vue'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.vue'

const isLoggedIn = ref(false)
const currentPage = ref('login') // 'login' | 'register'
const employees = ref([])
const activeMenu = ref('dashboard')
const isSidebarCollapsed = ref(false)

const componentMap = {
  dashboard: Dashboard,
  'emp-list': EmployeeList,
  'org-struct': OrgStructure,
  transfer: Transfer,
  license: License,
  schedule: Schedule,
  payroll: Payroll,
  'leave-sys': LeaveSystem
}

const currentComponent = computed(() => {
  return componentMap[activeMenu.value] || null
})

const handleLoginSuccess = async () => {
  isLoggedIn.value = true
  currentPage.value = 'login'
  activeMenu.value = 'dashboard'
  await fetchEmployees()
}

const goToRegister = () => {
  currentPage.value = 'register'
}

const goToLogin = () => {
  currentPage.value = 'login'
}

const handleLogout = () => {
  isLoggedIn.value = false
  employees.value = []
  activeMenu.value = 'dashboard'
}

const fetchEmployees = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/employees'
    )

    employees.value =
      response.data.employees ||
      response.data ||
      []

  } catch (error) {
    console.error('Fetch employees error:', error)
    employees.value = []
  }
}
</script>

<template>

  <!-- LOGIN -->
  <Login
    v-if="!isLoggedIn && currentPage === 'login'"
    @login-success="handleLoginSuccess"
    @go-register="goToRegister"
  />

  <!-- REGISTER -->
  <Register
    v-if="!isLoggedIn && currentPage === 'register'"
    @go-login="goToLogin"
  />

  <!-- SYSTEM -->
  <div v-else class="system-container">

    <!-- SIDEBAR -->
    <Sidebar
      :activeMenu="activeMenu"
      :collapsed="isSidebarCollapsed"
      @change-menu="activeMenu = $event"
      @logout="handleLogout"
      @toggle-collapse="isSidebarCollapsed = $event"
    />

    <!-- MAIN CONTENT -->
    <main
      class="main-content-view"
      :class="{ expanded: isSidebarCollapsed }"
    >
      <ErrorBoundary>

        <component
          v-if="currentComponent"
          :is="currentComponent"
          :employees="employees"
          @change-menu="activeMenu = $event"
        />

        <section
          v-else
          class="placeholder-page"
        >
          <h2>กำลังพัฒนา: {{ activeMenu }}</h2>
        </section>

      </ErrorBoundary>
    </main>

  </div>

</template>

<style>

.system-container{
  display:flex;
  width:100%;
  min-height:100vh;
}

.main-content-view{
  flex:1;
  padding:20px;
  background:#f4f6f9;
}

.placeholder-page{
  padding:40px;
}
.main-content-view{
  flex:1;
  padding:20px;
  margin-left:280px; /* เว้นพื้นที่ให้ sidebar */
  transition: all 0.35s ease;
}

/* ตอน sidebar ยุบ */
.main-content-view.expanded{
  margin-left:85px;
}
</style>