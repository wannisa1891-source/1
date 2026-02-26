<template>
  <div class="sidebar">

    <div class="sidebar-header">
      <h2>HRM</h2>
      <span>HOSPITAL SYSTEM</span>
    </div>

    <div class="menu">
      <div class="menu-item active">📊 Dashboard</div>
      <div class="menu-item">👥 จัดการบุคลากร</div>
      <div class="menu-item">📅 การลา</div>
      <div class="menu-item">💰 การเงิน</div>
    </div>

    <div class="sidebar-user">
      <div class="name">Wanvisa</div>
      <div class="role">Admin</div>
      <button class="logout-btn">ออกจากระบบ</button>
    </div>

  </div>
</template>

<script setup>
defineProps(['activeMenu'])
</script>

<style scoped>

/* ===== SIDEBAR CONTAINER ===== */
.sidebar {
  width: 260px;
  height: 100vh;
  background-color: #002D55; /* น้ำเงินโรงพยาบาล */
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

/* ===== HEADER ===== */
.sidebar-header {
  margin-bottom: 30px;
}

.sidebar-header h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.sidebar-header span {
  font-size: 12px;
  color: #A39160; /* ทอง */
  letter-spacing: 2px;
}

/* ===== MENU ===== */
.menu {
  flex: 1;
}

.menu-item {
  padding: 12px 14px;
  margin-bottom: 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 500;
}

.menu-item:hover {
  background-color: rgba(255,255,255,0.1);
}

/* ===== ACTIVE MENU ===== */
.menu-item.active {
  background-color: #A39160;
  color: #ffffff;
}

/* ===== USER SECTION ===== */
.sidebar-user {
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 20px;
}

.name {
  font-weight: 600;
}

.role {
  font-size: 12px;
  color: #cbd5e1;
  margin-bottom: 12px;
}

/* ===== LOGOUT BUTTON ===== */
.logout-btn {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #ffffff;
  color: #002D55;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.logout-btn:hover {
  background-color: #A39160;
  color: #ffffff;
}

</style>