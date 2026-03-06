<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import Login from './components/Login/Login.vue'
import Sidebar from './components/Sidebar/SideBar.vue'
import Dashboard from './components/Dashboard/Dashboard.vue'
import EmployeeList from './components/EmployeeList/EmployeeList.vue'
import OrgStructure from './components/OrgStructure/OrgStructure.vue'
import Transfer from './components/Transfer/Transfer.vue'
import License from './components/License/LicensePage.vue'
import Schedule from './components/Schedule/Schedule.vue'
import LeaveSystem from './components/LeaveSystem/Leave_System.vue'
import Payroll from './components/Payroll/Payroll.vue'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.vue'
const isLoggedIn = ref(false)
const employees = ref([])
const activeMenu = ref('dashboard')
const isSidebarCollapsed = ref(false)
// =========================
// COMPONENT MAP
// =========================
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
// =========================
// LOGIN SUCCESS
// =========================
const handleLoginSuccess = async () => {
  isLoggedIn.value = true
  activeMenu.value = 'dashboard'
  await fetchEmployees()
}
// =========================
// LOGOUT
// =========================
const handleLogout = () => {
  isLoggedIn.value = false
  employees.value = []
  activeMenu.value = 'dashboard'
}
// =========================
// FETCH EMPLOYEE
// =========================
const fetchEmployees = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/employees'
    )
    console.log('Employees:', response.data)
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
  <!-- LOGIN PAGE -->
  <Login
    v-if="!isLoggedIn"
    @login-success="handleLoginSuccess"
  />
  <!-- MAIN SYSTEM -->
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
      <!-- ERROR PROTECTION -->
      <ErrorBoundary>
        <!-- DYNAMIC PAGE -->
        <component
          v-if="currentComponent"
          :is="currentComponent"
          :employees="employees"
          @change-menu="activeMenu = $event"
        />
        <!-- PAGE NOT FOUND -->
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