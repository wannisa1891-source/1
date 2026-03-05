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
            <small> HOSPITAL SYSTEM</small>
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
              <div class="sub-item" :class="{ active: activeMenu === 'org-struct' }" @click="$emit('change-menu', 'org-struct')">จัดข้อมูลแผนก</div>
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

// รับค่า activeMenu จาก App.vue
defineProps(['activeMenu'])

// ส่งเหตุการณ์กลับไปยัง App.vue
const emit = defineEmits(['change-menu', 'logout', 'toggle-collapse'])

const isCollapsed = ref(false)
const openMenus = ref({ personnel: true, leave: false, finance: false })

// ฟังก์ชัน Toggle Sidebar และส่งค่าไปบอก App.vue เพื่อขยับเนื้อหา
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  emit('toggle-collapse', isCollapsed.value)
}

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

.sidebar-scroll-wrapper {
  width: 100%; height: 100%;
  overflow-y: auto; overflow-x: hidden;
  display: flex; flex-direction: column;
}

/* ซ่อน Scrollbar */
.sidebar-scroll-wrapper::-webkit-scrollbar { width: 0px; }

/* ปุ่ม Toggle สีส้มที่ยื่นออกมา */
.toggle-floating-btn {
  position: absolute; right: -16px; top: 80px; 
  background: #f97316; color: white; border: none; width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1); z-index: 1001;
}

/* จัดการเมนู */
.menu-item.single, .menu-header {
  display: flex; align-items: center; padding: 12px 20px;
  margin-bottom: 8px; border-radius: 15px; cursor: pointer; 
  transition: 0.2s; font-size: 18px; position: relative;
}

.icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; margin-right: 12px; }

.home-icon-img, .pim-icon-img, .leave-icon-img, .finance-icon-img {
  width: 26px; height: 26px; object-fit: contain; filter: grayscale(100%) opacity(0.6);
}

/* สถานะ Active และสีทอง */
.dashboard-item.active .label, .is-open .label { color: #c5a073 !important; font-weight: 800; }
.dashboard-item.active .home-icon-img, .is-open img {
  filter: invert(74%) sepia(13%) saturate(1001%) hue-rotate(352deg) brightness(88%) contrast(85%) !important;
}

/* รายการย่อย */
.sub-menu-list { 
  padding-left: 0; margin-left: 72px; border-left: 1px dashed #e2e8f0; 
  margin-bottom: 10px; display: flex; flex-direction: column; gap: 5px; 
}
.sub-item { padding: 10px 20px; border-radius: 12px; font-size: 17px; color: #64748b; cursor: pointer; }
.sub-item.active { color: #1e2433 !important; font-weight: 800; }

.sidebar-header { padding: 30px 20px; }
.logo-text h2 { margin: 0; font-size: 24px; font-weight: 800; }
.sidebar-footer { padding: 20px 15px 30px 15px; border-top: 1px solid #f1f5f9; margin-top: auto; }
.user-block { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-bottom: 20px; }
.avatar { width: 48px; height: 48px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.btn-logout-hybrid { width: 100%; padding: 12px; border-radius: 15px; border: 1px solid #fecaca; background: #fff5f5; color: #ef4444; font-weight: bold; cursor: pointer; }
</style>