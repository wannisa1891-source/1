<template>
  <aside :class="['sidebar-hybrid', { 'collapsed': isCollapsed }]">
    
    <button class="toggle-floating-btn" @click="isCollapsed = !isCollapsed">
      <span v-if="isCollapsed">❯</span>
      <span v-else>❮</span>
    </button>

    <div class="sidebar-header">
      <div class="logo-box">
        <div class="logo-icon">➕</div>
        <div class="logo-text" v-if="!isCollapsed">
          <h2>HRM</h2>
          <small>HOSPITAL SYSTEM</small>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">
      
      <div 
        class="menu-item single dashboard-item" 
        :class="{ active: activeMenu === 'dashboard' }" 
        @click="$emit('change-menu', 'dashboard')"
      >
        <span class="icon">
          <img src="../assets/home.png" class="home-icon-img" alt="Dashboard">
        </span>
        <span class="label" v-if="!isCollapsed">Dashboard</span>
      </div>

      <div class="menu-group">
        <div 
          class="menu-header personnel-header" 
          @click="toggleMenu('personnel')" 
          :class="{ 'is-open': openMenus.personnel && !isCollapsed }"
        >
          <div class="header-left">
            <span class="icon">
              <img src="../assets/pim.png" class="pim-icon-img" alt="Personnel">
            </span>
            <span class="label" v-if="!isCollapsed">จัดการบุคลากร</span>
          </div>
          <span class="chevron" v-if="!isCollapsed">❯</span>
        </div>
        
        <transition name="slide">
          <div class="sub-menu-list" v-show="openMenus.personnel && !isCollapsed">
            <div class="sub-item" :class="{ active: activeMenu === 'emp-list' }" @click="$emit('change-menu', 'emp-list')">รายชื่อพนักงาน</div>
            <div class="sub-item" :class="{ active: activeMenu === 'org-struct' }" @click="$emit('change-menu', 'org-struct')">โครงสร้างองค์กร</div>
            <div class="sub-item" :class="{ active: activeMenu === 'transfer' }" @click="$emit('change-menu', 'transfer')">การโยกย้าย</div>
            <div class="sub-item" :class="{ active: activeMenu === 'license' }" @click="$emit('change-menu', 'license')">ใบประกอบวิชาชีพ</div>
          </div>
        </transition>
      </div>

      <div class="menu-group">
        <div class="menu-header" @click="toggleMenu('leave')" :class="{ 'is-open': openMenus.leave && !isCollapsed }">
          <div class="header-left">
            <span class="icon">📅</span>
            <span class="label" v-if="!isCollapsed">การลา</span>
          </div>
          <span class="chevron" v-if="!isCollapsed">❯</span>
        </div>
        <transition name="slide">
          <div class="sub-menu-list" v-show="openMenus.leave && !isCollapsed">
            <div class="sub-item" :class="{ active: activeMenu === 'schedule' }" @click="$emit('change-menu', 'schedule')">ตารางเวร</div>
            <div class="sub-item" :class="{ active: activeMenu === 'leave-sys' }" @click="$emit('change-menu', 'leave-sys')">ระบบการลา</div>
          </div>
        </transition>
      </div>

      <div class="menu-group">
        <div class="menu-header" @click="toggleMenu('finance')" :class="{ 'is-open': openMenus.finance && !isCollapsed }">
          <div class="header-left">
            <span class="icon">💰</span>
            <span class="label" v-if="!isCollapsed">การเงิน</span>
          </div>
          <span class="chevron" v-if="!isCollapsed">❯</span>
        </div>
        <transition name="slide">
          <div class="sub-menu-list" v-show="openMenus.finance && !isCollapsed">
            <div class="sub-item" :class="{ active: activeMenu === 'payroll' }" @click="$emit('change-menu', 'payroll')">ระบบเงินเดือน</div>
          </div>
        </transition>
      </div>

    </nav>

    <div class="sidebar-footer">
      <div class="user-block">
        <div class="avatar">W</div>
        <div class="user-info" v-if="!isCollapsed">
          <strong>Wanwisa</strong>
          <small>Admin</small>
        </div>
      </div>
      <button class="btn-logout-hybrid" @click="$emit('logout')" v-if="!isCollapsed">ออกจากระบบ</button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
defineProps(['activeMenu'])

const isCollapsed = ref(false)
const openMenus = ref({ personnel: true, leave: false, finance: false })

const toggleMenu = (menuName) => {
  if (isCollapsed.value) isCollapsed.value = false;
  openMenus.value[menuName] = !openMenus.value[menuName]
}
</script>

<style scoped>
/* พื้นฐาน Sidebar */
.sidebar-hybrid {
  width: 280px; height: 100vh; background: #ffffff; color: #1e2433;
  border-radius: 0 40px 40px 0; display: flex; flex-direction: column;
  position: fixed; left: 0; top: 0; transition: all 0.35s ease;
  z-index: 1000; box-shadow: 4px 0 20px rgba(0,0,0,0.05);
}
.sidebar-hybrid.collapsed { width: 85px; }

/* ปุ่ม Toggle */
.toggle-floating-btn {
  position: absolute; right: -15px; top: 80px; background: #f97316;
  color: white; border: none; width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  box-shadow: 0 4px 10px rgba(249, 115, 22, 0.4); z-index: 1001;
}

/* เมนูหลัก */
.menu-item.single, .menu-header {
  display: flex; align-items: center; padding: 14px 20px; margin-bottom: 8px;
  border-radius: 15px; cursor: pointer; transition: 0.2s; font-size: 18px;
  background: transparent !important; position: relative;
}

/* 🌟 เส้นแอบตัดสีทอง (Dashboard & บุคลากรเวลาเปิด) */
.dashboard-item.active::before,
.personnel-header.is-open::before {
  content: ''; position: absolute; left: 0; top: 15%; height: 70%;
  width: 5px; background: #c5a073 !important; border-radius: 0 5px 5px 0;
}

/* 🌟 สีทองพาสเทลสำหรับ Dashboard และจัดการบุคลากร */
.dashboard-item.active .label,
.personnel-header.is-open .label {
  color: #c5a073 !important; font-weight: 800 !important;
}

/* 🌟 สไตล์รูปไอคอน Dashboard & Personnel */
.home-icon-img, .pim-icon-img {
  width: 26px; height: 26px; filter: grayscale(100%) opacity(0.6); transition: 0.3s;
}

/* เปลี่ยนรูปเป็นสีทองเวลา Active/Open */
.dashboard-item.active .home-icon-img,
.personnel-header.is-open .pim-icon-img {
  filter: invert(74%) sepia(13%) saturate(1001%) hue-rotate(352deg) brightness(88%) contrast(85%) !important;
}

/* เมนูทั่วไปเวลา Active (แอบตัดสีกรมท่า) */
.menu-item.active::before {
  content: ''; position: absolute; left: 0; top: 15%; height: 70%;
  width: 5px; background: #1e2433; border-radius: 0 5px 5px 0;
}

.icon { font-size: 24px; min-width: 35px; text-align: center; color: #94a3b8; display: flex; align-items: center; justify-content: center; }
.label { margin-left: 10px; font-weight: 600; }
.chevron { margin-left: auto; font-size: 11px; transition: 0.3s; color: #cbd5e1; }
.is-open .chevron { transform: rotate(90deg); color: #f97316; }

/* รายการย่อย */
.sub-menu-list { padding-left: 20px; border-left: 1px dashed #e2e8f0; margin-left: 35px; margin-bottom: 10px; display: flex; flex-direction: column; gap: 5px; }
.sub-item { padding: 10px 20px; border-radius: 12px; font-size: 17px; font-weight: 500; cursor: pointer; color: #64748b; text-align: left; }
.sub-item.active { color: #1e2433 !important; font-weight: 800 !important; }

/* Header & Footer */
.sidebar-header { padding: 30px 20px; }
.logo-text h2 { margin: 0; color: #1e2433; font-size: 24px; font-weight: 800; }
.sidebar-footer { padding: 25px 20px; border-top: 1px solid #f1f5f9; }
.avatar { width: 45px; height: 45px; border-radius: 50%; background: #e2e8f0; color: #1e2433; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; }
.btn-logout-hybrid { width: 100%; padding: 12px; border-radius: 15px; border: 1px solid #fecaca; background: #fff5f5; color: #ef4444; font-weight: bold; cursor: pointer; font-size: 15px; }

.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; overflow: hidden; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>