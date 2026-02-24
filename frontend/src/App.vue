<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const isLoggedIn = ref(false)
const username = ref('')
const password = ref('')
const employees = ref([])
const activeMenu = ref('dashboard') // เก็บว่าตอนนี้อยู่ที่เมนูไหน

const handleLogin = () => {
  if (username.value === 'admin' && password.value === '1234') {
    isLoggedIn.value = true
    fetchEmployees()
  }
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
  <div v-if="!isLoggedIn" class="login-full-page">
    <div class="login-box-design">
      <img src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png" width="100">
      <h2>HOSPITAL HRM</h2>
      <input v-model="username" placeholder="ชื่อผู้ใช้งาน">
      <input v-model="password" type="password" placeholder="รหัสผ่าน">
      <button @click="handleLogin" class="btn-login-navy">เข้าสู่ระบบ</button>
    </div>
  </div>

  <div v-else class="system-container">
    <aside class="hospital-sidebar">
      <div class="sidebar-brand">
        <div class="logo-plus">➕</div>
        <h3>Hospital HRM</h3>
      </div>

      <nav class="nav-scroll">
        <div class="nav-grp" @click="activeMenu = 'dashboard'" :class="{ active: activeMenu === 'dashboard' }">
          🏠 Dashboard
        </div>

        <div class="nav-label">👤 จัดการบุคลากร</div>
        <div class="sub-list">
          <span @click="activeMenu = 'emp-list'">› รายชื่อบุคลากร</span>
          <span @click="activeMenu = 'org-struct'">› โครงสร้างองค์กร</span>
          <span @click="activeMenu = 'transfer'">› การโยกย้าย</span>
          <span @click="activeMenu = 'license'">› ใบประกอบวิชาชีพ</span>
        </div>

        <div class="nav-label">📅 จัดการเวลาและเวร</div>
        <div class="sub-list">
          <span @click="activeMenu = 'schedule'">› ตารางเวร</span>
          <span @click="activeMenu = 'leave-sys'">› ระบบการลา</span>
        </div>

        <div class="nav-label">💰 จัดการการเงิน</div>
        <div class="sub-list">
          <span @click="activeMenu = 'payroll'">› ระบบเงินเดือน</span>
        </div>
      </nav>

      <div class="sidebar-user-footer">
        <div class="user-pill-info">
          <div class="avt">W</div>
          <div class="det">
            <p>user 123456</p>
            <small>Admin</small>
          </div>
        </div>
        <button @click="isLoggedIn = false" class="btn-logout-pink">ออกจากระบบ</button>
      </div>
    </aside>

    <main class="main-content-view">
      <header class="navy-banner">
        <div class="banner-txt">
          <span class="p-white">➕</span>
          <h1>Hospital HRM Website</h1>
        </div>
      </header>

      <section v-if="activeMenu === 'dashboard'" class="dashboard-area">
        <div class="top-stat-grid">
          <div class="stat-card-v2 brown">
            <p>บุคลากรทั้งหมด</p>
            <h2>{{ employees.length }}</h2>
          </div>
          <div class="stat-card-v2 gold">
            <p>ลางานวันนี้</p>
            <h2>0</h2>
          </div>
          <div class="stat-card-v2 brown">
            <p>อัตรากำลังว่าง</p>
            <h2>5</h2>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-head">
            <h2>รายชื่อพนักงานล่าสุด</h2>
            <button class="btn-plus-emp">+ เพิ่มพนักงานใหม่</button>
          </div>
          <table class="modern-table">
            <thead>
              <tr><th>รูป</th><th>ชื่อ-นามสกุล</th><th>ตำแหน่ง</th><th>แผนก</th><th>สถานะ</th></tr>
            </thead>
            <tbody>
              <tr v-for="emp in employees" :key="emp.emp_id">
                <td><div class="small-avt">👤</div></td>
                <td>{{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}</td>
                <td>{{ emp.pos_id }}</td>
                <td>{{ emp.dept_id }}</td>
                <td><span class="badge-active">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section v-else class="placeholder-page">
        <h2>กำลังพัฒนาหน้า: {{ activeMenu }}</h2>
        <p>คุณ Wanwisa สามารถเพิ่มโค้ดเฉพาะหน้านี้ได้ในสเต็ปถัดไปครับ</p>
      </section>
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600&display=swap');

:root {
  --navy: #003366;
  --sidebar-dark: #34495e;
  --gold-theme: #c5a073;
  --brown-theme: #bcaaa4;
}

body { margin: 0; font-family: 'Sarabun', sans-serif; background: #e5e7eb; }

/* LOGIN UI */
.login-full-page { height: 100vh; display: flex; justify-content: center; align-items: center; background: white; }
.login-box-design { width: 400px; padding: 50px; border-radius: 40px; border: 1.5px solid #eee; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
.login-box-design input { width: 100%; padding: 15px; margin-bottom: 15px; border-radius: 12px; border: 1px solid #ddd; box-sizing: border-box; }
.btn-login-navy { width: 100%; padding: 15px; background: var(--navy); color: white; border: none; border-radius: 12px; cursor: pointer; }

.system-container {
  display: flex;
  height: 100vh;
}

/* SIDEBAR ดีไซน์นุ่มนวล */
.hospital-sidebar {
  width: 280px;
  background: var(--sidebar-dark);
  color: white;
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;

  border-radius: 0;
  box-shadow: 4px 0 15px rgba(0,0,0,0.1);
}
.sidebar-brand { padding: 30px; text-align: center; }
.nav-scroll { flex: 1; overflow-y: auto; padding-bottom: 20px; }
.nav-grp { padding: 15px 25px; cursor: pointer; }
.nav-grp.active { background: var(--gold-theme); border-left: 6px solid white; border-radius: 0 10px 10px 0; margin-right: 15px; }
.nav-label { padding: 20px 25px 5px; font-weight: 600; font-size: 0.9em; opacity: 0.7; }
.sub-list { padding-left: 45px; display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
.sub-list span { cursor: pointer; color: #bdc3c7; transition: 0.3s; font-size: 0.95em; }
.sub-list span:hover { color: var(--gold-theme); }

.main-content-view {
  margin-left: 280px; 
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 100vh;
  box-sizing: border-box;
}
.navy-banner { background: var(--navy); color: white; padding: 25px 40px; border-radius: 18px; margin-bottom: 15px; }

/* DASHBOARD STATS */
.top-stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px; }
.stat-card-v2 { padding: 30px; border-radius: 22px; text-align: center; color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.15); }
.stat-card-v2.brown { background: var(--brown-theme); }
.stat-card-v2.gold { background: var(--gold-theme); }
.stat-card-v2 h2 { font-size: 40px; margin: 10px 0 0; }

.dashboard-card { background: white; padding: 35px; border-radius: 30px; flex: 1; overflow-y: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.card-head { display: flex; justify-content: space-between; margin-bottom: 25px; }
.btn-plus-emp { background: var(--sidebar-dark); color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; }

.modern-table { width: 100%; border-collapse: collapse; }
.modern-table th { text-align: left; padding: 15px; background: #f8fafc; color: #64748b; }
.modern-table td { padding: 15px; border-bottom: 1px solid #f1f5f9; }
.badge-active { color: #22c55e; font-weight: 600; }

.sidebar-user-footer { margin-top: auto; padding: 20px; background: rgba(0,0,0,0.1); border-radius: 0 0 25px 25px; }
.user-pill-info { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
.avt { width: 40px; height: 40px; background: var(--gold-theme); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.btn-logout-pink { width: 100%; padding: 12px; background: #ff4757; color: white; border: none; border-radius: 10px; cursor: pointer; }
</style>