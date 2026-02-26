<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    
    <button class="toggle-floating-btn" @click="toggleSidebar">
      <span v-if="isCollapsed">❯</span>
      <span v-else>❮</span>
    </button>

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

  </aside>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['toggle-collapse'])

const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  emit('toggle-collapse', isCollapsed.value)
}
</script>

<style scoped>

/* ===== SIDEBAR ===== */
.sidebar {
  width: 260px;
  height: 100vh;
  background-color: #002D55;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  transition: all 0.35s ease;
  position: relative;
}

.sidebar.collapsed {
  width: 85px;
}

/* ===== TOGGLE BUTTON ===== */
.toggle-floating-btn {
  position: absolute;
  right: -12px;
  top: 40px;
  background: #A39160;
  border: none;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
}

/* ===== HEADER ===== */
.sidebar-header {
  margin-bottom: 30px;
}

.sidebar-header h2 {
  font-size: 22px;
  font-weight: 700;
}

.sidebar-header span {
  font-size: 12px;
  color: #A39160;
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
}

.menu-item:hover {
  background-color: rgba(255,255,255,0.1);
}

.menu-item.active {
  background-color: #A39160;
}

/* ===== USER SECTION ===== */
.sidebar-user {
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 20px;
}

.logout-btn {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #ffffff;
  color: #002D55;
  font-weight: 600;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #A39160;
  color: #ffffff;
}

</style>