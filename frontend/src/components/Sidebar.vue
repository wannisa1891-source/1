<template>
  <aside class="sidebar-modern">
    <div class="sidebar-header">
      <div class="logo-box">
        <div class="logo-icon">➕</div>
        <div class="logo-text">
          <h2>HRM</h2>
          <small>โรงพยาบาล</small>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">
      
      <div 
        class="menu-item single" 
        :class="{ active: activeMenu === 'dashboard' }" 
        @click="$emit('change-menu', 'dashboard')"
      >
        <span class="icon">🏠</span>
        <span class="label">Dashboard</span>
      </div>

      <div class="menu-group">
        <div class="menu-header" @click="toggleMenu('personnel')" :class="{ 'is-open': openMenus.personnel }">
          <div class="header-left">
            <span class="icon">👥</span>
            <span class="label">จัดการบุคลากร</span>
          </div>
          <span class="chevron">❯</span>
        </div>
        <div class="sub-menu-list" v-show="openMenus.personnel">
          <div class="sub-item" :class="{ active: activeMenu === 'emp-list' }" @click="$emit('change-menu', 'emp-list')">รายชื่อพนักงาน</div>
          <div class="sub-item" :class="{ active: activeMenu === 'org-struct' }" @click="$emit('change-menu', 'org-struct')">โครงสร้างองค์กร</div>
          <div class="sub-item" :class="{ active: activeMenu === 'transfer' }" @click="$emit('change-menu', 'transfer')">การโยกย้าย</div>
          <div class="sub-item" :class="{ active: activeMenu === 'license' }" @click="$emit('change-menu', 'license')">ใบประกอบวิชาชีพ <span class="badge red">3</span></div>
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-header" @click="toggleMenu('leave')" :class="{ 'is-open': openMenus.leave }">
          <div class="header-left">
            <span class="icon">📅</span>
            <span class="label">การลา</span>
          </div>
          <span class="chevron">❯</span>
        </div>
        <div class="sub-menu-list" v-show="openMenus.leave">
          <div class="sub-item" :class="{ active: activeMenu === 'schedule' }" @click="$emit('change-menu', 'schedule')">ตารางเวร</div>
          <div class="sub-item" :class="{ active: activeMenu === 'leave-sys' }" @click="$emit('change-menu', 'leave-sys')">ระบบการลา <span class="badge yellow">5</span></div>
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-header" @click="toggleMenu('finance')" :class="{ 'is-open': openMenus.finance }">
          <div class="header-left">
            <span class="icon">💰</span>
            <span class="label">การเงิน</span>
          </div>
          <span class="chevron">❯</span>
        </div>
        <div class="sub-menu-list" v-show="openMenus.finance">
          <div class="sub-item" :class="{ active: activeMenu === 'payroll' }" @click="$emit('change-menu', 'payroll')">ระบบเงินเดือน</div>
        </div>
      </div>

    </nav>

    <div class="sidebar-footer">
      <div class="user-profile">
        <div class="avatar">W</div>
        <div class="user-info">
          <strong>Wanwisa</strong>
          <small>Admin</small>
        </div>
      </div>
      <button class="btn-logout" @click="$emit('logout')">ออกจากระบบ</button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

defineProps(['activeMenu'])

// ตัวแปรควบคุมการเปิด-ปิดของแต่ละหมวดหมู่ (ค่าเริ่มต้นให้เปิดหมวดบุคคลากรไว้ก่อน)
const openMenus = ref({
  personnel: true,
  leave: false,
  finance: false
})

// ฟังก์ชันสลับการเปิด-ปิด
const toggleMenu = (menuName) => {
  openMenus.value[menuName] = !openMenus.value[menuName]
}
</script>

<style scoped>
.sidebar-modern {
  width: 280px;
  height: 100vh;
  background: #1e2433; /* สีกรมท่าอมเทา ดูพรีเมียม */
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 4px 0 15px rgba(0,0,0,0.1);
  font-family: 'Sarabun', sans-serif;
}

/* ส่วน Header */
.sidebar-header {
  padding: 30px 20px 20px;
}
.logo-box { display: flex; align-items: center; gap: 15px; }
.logo-icon {
  background: #6366f1; color: white;
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: bold;
}
.logo-text h2 { margin: 0; color: white; font-size: 20px; letter-spacing: 0.5px; }
.logo-text small { color: #64748b; font-size: 12px; }

/* ส่วน Navigation */
.sidebar-nav { flex: 1; padding: 10px 15px; overflow-y: auto; }

/* สไตล์เมนูหลัก (Dashboard) */
.menu-item.single {
  display: flex; align-items: center;
  padding: 12px 15px; margin-bottom: 15px;
  border-radius: 10px; cursor: pointer;
  transition: 0.2s;
}
.menu-item.single:hover { background: rgba(255,255,255,0.05); color: white; }
.menu-item.single.active { background: #c5a073; color: white; } /* ใช้สีทองพาสเทลที่คุณชอบเวลา Active */

/* สไตล์หมวดหมู่ (มีเมนูย่อย) */
.menu-group { margin-bottom: 10px; }
.menu-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 15px; border-radius: 10px;
  cursor: pointer; transition: 0.2s;
  user-select: none;
}
.menu-header:hover { background: rgba(255,255,255,0.05); color: white; }
.menu-header.is-open { color: white; }
.header-left { display: flex; align-items: center; gap: 15px; }
.icon { font-size: 18px; width: 24px; text-align: center; }
.label { font-size: 15px; font-weight: 500; }

/* ลูกศรหมุนเวลาเปิด/ปิด */
.chevron { font-size: 12px; transition: transform 0.3s ease; }
.menu-header.is-open .chevron { transform: rotate(90deg); }

/* สไตล์เมนูย่อย */
.sub-menu-list {
  margin-top: 5px;
  padding-left: 45px; /* ดันเยื้องเข้าไปให้รู้ว่าเป็นเมนูย่อย */
  display: flex; flex-direction: column; gap: 5px;
}
.sub-item {
  padding: 10px 15px; border-radius: 8px;
  cursor: pointer; font-size: 14px;
  transition: 0.2s;
  display: flex; justify-content: space-between; align-items: center;
}
.sub-item:hover { color: white; }
.sub-item.active {
  background: rgba(99, 102, 241, 0.15); /* ไฮไลท์สีม่วงอ่อนๆ */
  color: #818cf8; font-weight: 600;
}

/* Badge แจ้งเตือน */
.badge { font-size: 11px; padding: 2px 6px; border-radius: 10px; color: white; font-weight: bold; }
.badge.red { background: #ef4444; }
.badge.yellow { background: #f59e0b; }

/* ส่วน Footer */
.sidebar-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
.user-profile { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
.avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: #c5a073; color: white;
  display: flex; align-items: center; justify-content: center;
  font-weight: bold; font-size: 16px;
}
.user-info strong { display: block; color: white; font-size: 14px; }
.user-info small { color: #64748b; font-size: 12px; }
.btn-logout {
  width: 100%; padding: 10px; border-radius: 8px;
  border: none; background: #ef4444; color: white;
  font-weight: bold; cursor: pointer; transition: 0.2s;
}
.btn-logout:hover { background: #dc2626; }
</style>