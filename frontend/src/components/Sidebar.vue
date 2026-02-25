<template>
  <aside :class="['sidebar-hybrid', { 'collapsed': isCollapsed }]">
    
    <button class="toggle-floating-btn" @click="toggleSidebar">
      <span v-if="isCollapsed">❯</span>
      <span v-else>❮</span>
    </button>

    <div class="sidebar-scroll-wrapper">
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
            <span class="icon">
              <img src="../assets/pim.png" class="pim-icon-img" alt="Personnel">
            </span>
            <span class="label" v-if="!isCollapsed">จัดการบุคลากร</span>
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
          <div 
            class="menu-header leave-header" 
            @click="toggleMenu('leave')" 
            :class="{ 'is-open': openMenus.leave && !isCollapsed }"
          >
            <span class="icon">
              <img src="../assets/leave.png" class="leave-icon-img" alt="Leave">
            </span>
            <span class="label" v-if="!isCollapsed">การลา</span>
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
          <div 
            class="menu-header finance-header" 
            @click="toggleMenu('finance')" 
            :class="{ 'is-open': openMenus.finance && !isCollapsed }"
          >
            <span class="icon">
              <img src="../assets/finance.png" class="finance-icon-img" alt="Finance">
            </span>
            <span class="label" v-if="!isCollapsed">การเงิน</span>
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
        <div class="user-block" v-if="!isCollapsed">
          <div class="avatar">W</div>
          <div class="user-info">
            <span class="username">Wanwisa</span>
            <span class="role">Admin</span>
          </div>
        </div>
        <button class="btn-logout-hybrid" @click="$emit('logout')" v-if="!isCollapsed">
          ออกจากระบบ
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
defineProps(['activeMenu'])

const emit = defineEmits(['change-menu', 'logout', 'toggle-collapse']) // 💡 เพิ่ม toggle-collapse
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  emit('toggle-collapse', isCollapsed.value) // 💡 ส่งค่าไปบอก App.vue
}

const isCollapsed = ref(false)
const openMenus = ref({ personnel: true, leave: false, finance: false })

const toggleMenu = (menuName) => {
  if (isCollapsed.value) isCollapsed.value = false;
  openMenus.value[menuName] = !openMenus.value[menuName]
}
</script>

<style scoped>
/* 1. Sidebar หลัก: ปล่อยให้ปุ่มยื่นออกได้ ห้ามใส่ overflow: hidden ที่นี่ */
.sidebar-hybrid {
  width: 280px; height: 100vh; background: #ffffff; color: #1e2433;
  border-radius: 0 40px 40px 0; display: flex; flex-direction: column;
  position: fixed; left: 0; top: 0; transition: all 0.35s ease;
  z-index: 1000; box-shadow: 4px 0 20px rgba(0,0,0,0.05);
}
.sidebar-hybrid.collapsed { width: 85px; }

/* 💡 แผ่นใสสำหรับเลื่อนขึ้น-ลง */
.sidebar-scroll-wrapper {
  width: 100%; height: 100%;
  overflow-y: auto; overflow-x: hidden;
  display: flex; flex-direction: column;
}

/* ซ่อน Scrollbar */
.sidebar-scroll-wrapper::-webkit-scrollbar {
  width: 0px; background: transparent;
}

/* 2. ปุ่ม Toggle สีส้ม: ให้ยื่นออกไปนอกขอบ */
.toggle-floating-btn {
  position: absolute; right: -16px; top: 80px; 
  background: #f97316;
  color: white; border: none; width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.4); z-index: 1001;
}

/* 3. จัดระเบียบเมนู */
.menu-item.single, .menu-header {
  display: flex !important; flex-direction: row !important; align-items: center !important; 
  padding: 12px 20px; margin-bottom: 8px; border-radius: 15px; cursor: pointer; 
  transition: 0.2s; font-size: 18px; background: transparent !important; position: relative;
}

.icon { 
  width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; 
  flex-shrink: 0; margin-right: 12px;
}

.home-icon-img, .pim-icon-img, .leave-icon-img, .finance-icon-img {
  width: 26px; height: 26px; object-fit: contain; filter: grayscale(100%) opacity(0.6); transition: 0.3s;
}

/* 🌟 สีทองและเส้นแอบตัด */
.dashboard-item.active::before,
.personnel-header.is-open::before,
.leave-header.is-open::before,
.finance-header.is-open::before {
  content: ''; position: absolute; left: 0; top: 15%; height: 70%;
  width: 5px; background: #c5a073 !important; border-radius: 0 5px 5px 0;
}

.dashboard-item.active .label,
.personnel-header.is-open .label,
.leave-header.is-open .label,
.finance-header.is-open .label {
  color: #c5a073 !important; font-weight: 800 !important;
}

.dashboard-item.active .home-icon-img,
.personnel-header.is-open .pim-icon-img,
.leave-header.is-open .leave-icon-img,
.finance-header.is-open .finance-icon-img {
  filter: invert(74%) sepia(13%) saturate(1001%) hue-rotate(352deg) brightness(88%) contrast(85%) !important;
}

.label { margin: 0 !important; font-weight: 600; white-space: nowrap; }
.chevron { margin-left: auto; font-size: 11px; transition: 0.3s; color: #cbd5e1; }
.is-open .chevron { transform: rotate(90deg); color: #f97316; }

/* รายการย่อย */
.sub-menu-list { 
  padding-left: 0; margin-left: 72px; border-left: 1px dashed #e2e8f0; 
  margin-bottom: 10px; display: flex; flex-direction: column; gap: 5px; 
}
.sub-item { padding: 10px 20px; border-radius: 12px; font-size: 17px; font-weight: 500; cursor: pointer; color: #64748b; text-align: left; }
.sub-item.active { color: #1e2433 !important; font-weight: 800 !important; }

/* 4. ส่วนหัวและท้าย */
.sidebar-header { padding: 30px 20px; }
.logo-text h2 { margin: 0; color: #1e2433; font-size: 24px; font-weight: 800; }
.logo-text small { color: #f97316; font-weight: bold; font-size: 13px; }

.sidebar-footer { 
  padding: 20px 15px 30px 15px; border-top: 1px solid #f1f5f9; margin-top: auto;
  display: flex; flex-direction: column; align-items: center;
}

.user-block { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-bottom: 20px; width: 100%; }
.avatar { 
  width: 48px; height: 48px; border-radius: 50%; background: #e2e8f0; color: #1e2433; 
  display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; flex-shrink: 0;
}
.user-info { display: flex; flex-direction: column; align-items: center; line-height: 1.2; }
.username { display: block; color: #1e2433; font-size: 17px; font-weight: 800; }
.role { display: block; color: #94a3b8; font-size: 13px; font-weight: 500; }

.btn-logout-hybrid { 
  width: 100%; max-width: 220px; padding: 12px; border-radius: 15px; border: 1px solid #fecaca; 
  background: #fff5f5; color: #ef4444; font-weight: bold; cursor: pointer; font-size: 15px;
}

.main-content-view {
  margin-left: 280px; /* ค่าเริ่มต้น */
  transition: all 0.35s ease; /* 💡 สำคัญ: เพื่อให้ขยับนิ่มๆ */
}

/* 💡 เมื่อย่อ Sidebar (85px) ให้ขยับ Dashboard มาชิดขอบ */
.main-content-view.expanded { 
  margin-left: 85px; 
}
</style>