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
        class="menu-item single" 
        :class="{ active: activeMenu === 'dashboard' }" 
        @click="$emit('change-menu', 'dashboard')"
        title="Dashboard"
      >
        <span class="icon">📊</span>
        <span class="label" v-if="!isCollapsed">Dashboard</span>
      </div>

      <div class="menu-group">
        <div class="menu-header" @click="toggleMenu('personnel')" :class="{ 'is-open': openMenus.personnel && !isCollapsed }">
          <div class="header-left">
            <span class="icon">👥</span>
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
      <button class="btn-logout-hybrid" @click="$emit('logout')" v-if="!isCollapsed">
        ออกจากระบบ
      </button>
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
/* 1. เปลี่ยนพื้นหลังเป็นขาวและตัวอักษรเป็นสีกรมท่า */
.sidebar-hybrid {
  width: 280px;
  height: 100vh;
  background: #ffffff; /* พื้นหลังขาวสะอาด */
  color: #1e2433; /* ตัวอักษรสีกรมท่าเข้ม */
  border-radius: 0 40px 40px 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0; top: 0;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  box-shadow: 4px 0 20px rgba(0,0,0,0.05); /* เพิ่มเงาเบาๆ ให้ดูมีมิติ */
}
.sidebar-hybrid.collapsed { width: 85px; border-radius: 0 30px 30px 0; }

/* ปุ่มส้มลอยๆ */
.toggle-floating-btn {
  position: absolute;
  right: -15px; top: 80px;
  background: #f97316;
  color: white; border: none;
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(249, 115, 22, 0.4);
  z-index: 1001;
}

/* Header */
.sidebar-header { padding: 30px 20px; }
.logo-box { display: flex; align-items: center; gap: 15px; }
.logo-icon {
  background: #6366f1; color: white;
  width: 40px; height: 40px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-weight: bold; font-size: 20px;
}
.logo-text h2 { margin: 0; color: #1e2433; font-size: 24px; font-weight: 800; }
.logo-text small { color: #f97316; font-weight: bold; font-size: 13px; }

/* Menu Styles */
.sidebar-nav { flex: 1; padding: 10px 15px; overflow-y: auto; }

.menu-item.single, .menu-header {
  display: flex; align-items: center;
  padding: 14px 20px; /* เพิ่ม Padding ให้ดูโปร่งขึ้น */
  margin-bottom: 8px;
  border-radius: 15px; cursor: pointer;
  transition: 0.2s;
  font-size: 17px; /* ขยายขนาดฟอนต์หัวข้อหลัก */
}

.menu-item:hover, .menu-header:hover { background: #f8fafc; color: #f97316; }

/* 2. พอกดเลือก (Active) ให้เป็นสีทองพาสเทลที่คุณชอบ */
.menu-item.active { background: #c5a073; color: white; box-shadow: 0 4px 12px rgba(197, 160, 115, 0.3); }
.menu-item.active .icon { color: white; }

.icon { font-size: 22px; min-width: 35px; text-align: center; color: #1e2433; }
.label { margin-left: 10px; font-weight: 600; }
.chevron { margin-left: auto; font-size: 11px; transition: 0.3s; color: #cbd5e1; }
.is-open .chevron { transform: rotate(90deg); color: #f97316; }

/* 3. รายการย่อย (ไม่ชิดขวา และขยายฟอนต์) */
.sub-menu-list { 
  padding-left: 20px; /* ลดระยะเยื้องเพื่อให้ดูไม่ชิดขวาเกินไป */
  margin-bottom: 10px; 
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.sub-item {
  padding: 10px 20px; 
  border-radius: 12px;
  font-size: 15px; /* ขยายขนาดฟอนต์เมนูย่อย */
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
  color: #64748b;
  text-align: left; /* บังคับให้ชิดซ้าย */
}
.sub-item:hover { color: #f97316; background: #f8fafc; }
/* เมนูย่อยเวลาเลือกให้เด่นขึ้น */
.sub-item.active { color: #c5a073; font-weight: 800; background: rgba(197, 160, 115, 0.05); }

/* Footer */
.sidebar-footer { padding: 25px 20px; border-top: 1px solid #f1f5f9; }
.user-block { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
.avatar {
  width: 45px; height: 45px; border-radius: 50%;
  background: #c5a073; color: white;
  display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px;
}
.user-info strong { display: block; color: #1e2433; font-size: 15px; }
.user-info small { color: #94a3b8; font-size: 12px; }

.btn-logout-hybrid {
  width: 100%; padding: 12px; border-radius: 15px;
  border: 1px solid #fecaca; background: #fff5f5; color: #ef4444;
  font-weight: bold; cursor: pointer; font-size: 15px;
}

/* Slide Transition */
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; overflow: hidden; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }

/* Collapsed Styles */
.collapsed .menu-item, .collapsed .menu-header { justify-content: center; padding: 15px 0; }
.collapsed .icon { margin: 0; font-size: 24px; }
.collapsed .user-block { justify-content: center; }
</style>