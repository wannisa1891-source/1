<template>
  <aside class="hospital-sidebar">
    <div class="sidebar-brand">
      <div class="logo-plus">➕</div>
      <h3>Hospital HRM</h3>
    </div>

    <nav class="nav-scroll">
      <div class="nav-grp" @click="$emit('change-menu', 'dashboard')" :class="{ active: activeMenu === 'dashboard' }">
        🏠 Dashboard
      </div>

      <div class="nav-label">👤 จัดการบุคลากร</div>
      <div class="sub-list">
        <span @click="$emit('change-menu', 'emp-list')">› รายชื่อบุคลากร</span>
        <span @click="$emit('change-menu', 'org-struct')">› โครงสร้างองค์กร</span>
        <span @click="$emit('change-menu', 'transfer')">› การโยกย้าย</span>
        <span @click="$emit('change-menu', 'license')">› ใบประกอบวิชาชีพ</span>
      </div>

      <div class="nav-label">📅 จัดการเวลาและเวร</div>
      <div class="sub-list">
        <span @click="$emit('change-menu', 'schedule')">› ตารางเวร</span>
        <span @click="$emit('change-menu', 'leave-sys')">› ระบบการลา</span>
      </div>

      <div class="nav-label">💰 จัดการการเงิน</div>
      <div class="sub-list">
        <span @click="$emit('change-menu', 'payroll')">› ระบบเงินเดือน</span>
      </div>
    </nav>

    <div class="sidebar-user-footer">
      <div class="user-pill-info">
        <div class="avt">W</div>
        <div class="det">
          <p>Wanwisa</p>
          <small>Admin</small>
        </div>
      </div>
      <button @click="$emit('logout')" class="btn-logout-pink">ออกจากระบบ</button>
    </div>
  </aside>
</template>

<script setup>
defineProps(['activeMenu'])
defineEmits(['change-menu', 'logout'])
</script>

<style scoped>
.hospital-sidebar { width: 280px; background: #34495e; color: white; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; box-shadow: 4px 0 15px rgba(0,0,0,0.1); }
.sidebar-brand { padding: 30px; text-align: center; }
.nav-scroll { flex: 1; overflow-y: auto; padding-bottom: 20px; }
.nav-grp { padding: 15px 25px; cursor: pointer; }
.nav-grp.active { background: #c5a073; border-left: 6px solid white; border-radius: 0 10px 10px 0; margin-right: 15px; }
.nav-label { padding: 20px 25px 5px; font-weight: 600; font-size: 0.9em; opacity: 0.7; }
.sub-list { padding-left: 45px; display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
.sub-list span { cursor: pointer; color: #bdc3c7; transition: 0.3s; font-size: 0.95em; }
.sub-list span:hover { color: #c5a073; }
.sidebar-user-footer { margin-top: auto; padding: 20px; background: rgba(0,0,0,0.1); }
.user-pill-info { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
.avt { width: 40px; height: 40px; background: #c5a073; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.btn-logout-pink { width: 100%; padding: 12px; background: #ff4757; color: white; border: none; border-radius: 10px; cursor: pointer; }
</style>