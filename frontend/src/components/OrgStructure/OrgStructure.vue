<template>
  <div class="hrm-app-container">
    <header class="hrm-header">
      <div class="header-left">
        <span class="breadcrumb">Human Resources / Organization</span>
        <h1 class="main-title">จัดการโครงสร้างอัตรากำลัง</h1>
      </div>
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" v-model="searchQuery" placeholder="ค้นหาแผนกหรือตำแหน่ง...">
      </div>
    </header>

    <div class="hrm-main-layout">
      <aside class="hrm-sidebar">
        <div class="sidebar-inner">
          <div class="hospital-info">
            <div class="hospital-logo">🏥</div>
            <div>
              <h2 class="sidebar-header">โรงพยาบาลชะอำ</h2>
              <p class="total-badge">รวม {{ totalCapacity }} อัตรา</p>
            </div>
          </div>
          
          <nav class="dept-nav">
            <div v-for="dept in filteredDepts" :key="dept.dept_id" class="dept-group">
              <div 
                :class="['dept-label', { 'active': selectedDeptId === dept.dept_id }]"
                @click="selectDept(dept)"
              >
                <span class="arrow-icon">{{ dept.isOpen ? '▾' : '▸' }}</span>
                <span class="dept-text">{{ dept.dept_name }}</span>
              </div>
              
              <transition name="slide">
                <ul v-if="dept.isOpen && dept.sub_dept" class="sub-dept-list">
                  <li class="sub-item">• {{ dept.sub_dept }}</li>
                </ul>
              </transition>
            </div>
          </nav>
        </div>
      </aside>

      <main class="hrm-content">
        <div class="summary-row">
          <div class="summary-card neon-blue">
            <div class="card-content">
              <p class="label">แผนกที่ขาดคน</p>
              <h3 class="value">{{ globalSummary.understaffedCount }} <small>แห่ง</small></h3>
            </div>
            <div class="card-icon-bg">⚠️</div>
          </div>
          <div class="summary-card neon-gold">
            <div class="card-content">
              <p class="label">ตำแหน่งว่างรวม</p>
              <h3 class="value">{{ globalSummary.totalVacant }} <small>อัตรา</small></h3>
            </div>
            <div class="card-icon-bg">📋</div>
          </div>
        </div>

<section class="detail-section">
          <div class="detail-card main-card">
            <div class="card-header-row-modern">
              <h3 class="card-inner-title">
                <span class="icon-bg">📋</span> รายชื่อผู้ครองตำแหน่ง: {{ activeDeptName }}
              </h3>
              <div class="status-pill" :class="{ 'warning': vacantCount > 0 }">
                <span class="dot"></span>
                {{ vacantCount > 0 ? 'ยังมีตำแหน่งว่าง' : 'อัตรากำลังเต็ม' }}
              </div>
            </div>

            <div class="stats-grid-modern">
              <div class="stat-box-new blue">
                <span class="stat-label">กรอบอัตรา</span>
                <div class="stat-value-unit">
                  <span class="stat-value">{{ activeCapacity }}</span>
                  <span class="stat-unit">อัตรา</span>
                </div>
              </div>
              
              <div class="stat-box-new green">
                <span class="stat-label">ครองตำแหน่ง</span>
                <div class="stat-value-unit">
                  <span class="stat-value">{{ currentStaff.length }}</span>
                  <span class="stat-unit">คน</span>
                </div>
              </div>

              <div class="stat-box-new red">
                <span class="stat-label">ว่าง</span>
                <div class="stat-value-unit">
                  <span class="stat-value highlight">{{ vacantCount }}</span>
                  <span class="stat-unit">อัตรา</span>
                </div>
              </div>
            </div>

            <div class="table-wrapper">
              <table class="modern-table">
                <thead>
                  <tr>
                    <th width="15%">เลขที่ตำแหน่ง</th>
                    <th width="35%">ชื่อตำแหน่ง</th>
                    <th width="35%">ผู้ครองตำแหน่ง</th>
                    <th width="15%" class="text-center">Action</th>
                  </tr>
                </thead>
<tbody>
                  <tr v-for="emp in currentStaff" :key="emp.emp_id" class="staff-row">
                    <td class="pos-no">{{ emp.position_no || '-' }}</td>
                    <td class="pos-name">{{ getPositionName(emp.pos_id) }}</td>
                    <td class="emp-name">
                      <div class="user-avatar-mini">👤</div>
                      {{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}
                    </td>
                    <td class="text-center">
                      <button class="btn-manage">จัดการ</button>
                    </td>
                  </tr>

                  <tr v-if="currentStaff.length === 0">
                    <td colspan="4" class="text-center text-muted" style="padding: 40px;">
                      🚫 ไม่พบข้อมูลผู้ครองตำแหน่งในแผนกนี้
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const departmentList = ref([
  { dept_id: 'D001', dept_name: 'ฝ่ายการพยาบาล', sub_dept: null, capacity: 10, isOpen: true },
  { dept_id: 'D002', dept_name: 'กลุ่มงานการแพทย์', sub_dept: null, capacity: 5, isOpen: false },
  { dept_id: 'D003', dept_name: 'กลุ่มงานเภสัชกรรมและคุ้มครองผู้บริโภค', sub_dept: null, capacity: 5, isOpen: false },
  { dept_id: 'D004', dept_name: 'กลุ่มงานทันตกรรม', sub_dept: null, capacity: 5, isOpen: false },
  { dept_id: 'D005', dept_name: 'กลุ่มงานเทคนิคการแพทย์', sub_dept: null, capacity: 4, isOpen: false },
  { dept_id: 'D006', dept_name: 'กลุ่มงานรังสีวิทยา', sub_dept: null, capacity: 3, isOpen: false },
  { dept_id: 'D007', dept_name: 'กลุ่มงานบริหารทั่วไป', sub_dept: null, capacity: 8, isOpen: false },
  { dept_id: 'D008', dept_name: 'กลุ่มงานเวชศาสตร์ฟื้นฟู', sub_dept: null, capacity: 3, isOpen: false },
  { dept_id: 'D009', dept_name: 'กลุ่มงานยุทธศาสตร์และสารสนเทศทางการแพทย์', sub_dept: null, capacity: 4, isOpen: false },
  { dept_id: 'D010', dept_name: 'กลุ่มงานโภชนาการ', sub_dept: null, capacity: 2, isOpen: false }
]);

// ข้อมูลจริงจาก tbl_positions
const positionList = [
  { pos_id: 'P001', pos_name: 'พยาบาลวิชาชีพ' }, { pos_id: 'P002', pos_name: 'นายแพทย์ / แพทย์หญิง' },
  { pos_id: 'P003', pos_name: 'เภสัชกร' }, { pos_id: 'P004', pos_name: 'ทันตแพทย์' },
  { pos_id: 'P005', pos_name: 'นักเทคนิคการแพทย์' }, { pos_id: 'P006', pos_name: 'นักรังสีการแพทย์' },
  { pos_id: 'P007', pos_name: 'นักกายภาพบำบัด' }, { pos_id: 'P008', pos_name: 'นักจัดการงานทั่วไป' },
  { pos_id: 'P009', pos_name: 'นักวิชาการคอมพิวเตอร์' }, { pos_id: 'P010', pos_name: 'พนักงานช่วยเหลือคนไข้' },
  { pos_id: 'P011', pos_name: 'เจ้าพนักงานเวชสถิติ' }
];

// ข้อมูลพนักงานจริงจาก tbl_employees
const employees = ref([
  { emp_id: 'EMP001', prefix: 'นางสาว', first_name_th: 'วรรณวิสา', last_name_th: 'ทดสอบระบบ', dept_id: 'D001', pos_id: 'P001', position_no: 'พย.001' },
  { emp_id: 'EMP003', prefix: 'นาย', first_name_th: '666', last_name_th: '667', dept_id: 'D001', pos_id: 'P001', position_no: 'พย.002' },
  { emp_id: '0007', prefix: 'นพ.', first_name_th: '444444', last_name_th: '44555', dept_id: 'D009', pos_id: 'P009', position_no: 'คอม.001' },
  { emp_id: '1111111', prefix: 'นาง', first_name_th: '00000', last_name_th: '11111', dept_id: 'D010', pos_id: 'P007', position_no: 'กาย.001' }
]);

const selectedDeptId = ref('D001');
const searchQuery = ref('');

const selectDept = (dept) => {
  departmentList.value.forEach(d => d.isOpen = false);
  dept.isOpen = true;
  selectedDeptId.value = dept.dept_id;
};

const getPositionName = (id) => positionList.find(p => p.pos_id === id)?.pos_name || '-';
const filteredDepts = computed(() => departmentList.value.filter(d => d.dept_name.includes(searchQuery.value)));
const activeDeptName = computed(() => departmentList.value.find(d => d.dept_id === selectedDeptId.value)?.dept_name || '');
const activeSubDept = computed(() => departmentList.value.find(d => d.dept_id === selectedDeptId.value)?.sub_dept || '');
const activeCapacity = computed(() => departmentList.value.find(d => d.dept_id === selectedDeptId.value)?.capacity || 0);
const currentStaff = computed(() => employees.value.filter(e => e.dept_id === selectedDeptId.value));
const vacantCount = computed(() => Math.max(0, activeCapacity.value - currentStaff.value.length));
const totalCapacity = computed(() => departmentList.value.reduce((acc, d) => acc + d.capacity, 0));

const globalSummary = computed(() => {
  let under = 0; let totalV = 0;
  departmentList.value.forEach(d => {
    const cur = employees.value.filter(e => e.dept_id === d.dept_id).length;
    if (d.capacity > cur) { under++; totalV += (d.capacity - cur); }
  });
  return { understaffedCount: under, totalVacant: totalV };
});
</script>

<style scoped>
/* 1. คุมโทนพื้นหลังให้นิ่งที่สุด */
.hrm-app-container {
  font-family: 'Sarabun', sans-serif;
  background: #f0f2f5; 
  min-height: 100vh;
  padding: 20px;
  color: #333;
}

/* --- ส่วนที่เพิ่มใหม่: HEADER & SEARCH ให้ดูแพง --- */
.hrm-header {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  padding: 10px 5px 25px 5px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 30px;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.breadcrumb {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.main-title {
  font-size: 28px;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
  letter-spacing: -0.5px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 8px 16px;
  width: 320px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.search-box:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.search-icon {
  font-size: 16px;
  margin-right: 12px;
  opacity: 0.4;
}

.search-box input {
  border: none;
  outline: none;
  width: 100%;
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
  color: #1e293b;
  background: transparent;
}
/* --- จบส่วน HEADER --- */

/* 2. จัด Layout Sidebar กับ Content (คงเดิม) */
.hrm-main-layout {
  display: flex; 
  gap: 20px;
  align-items: flex-start;
}

.hrm-sidebar {
  width: 280px; 
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  flex-shrink: 0;
}

.hrm-content {
  flex-grow: 1; 
}

/* 3. ปรับตัวเลือกแผนก (คงเดิม) */
.dept-label {
  padding: 10px 15px;
  margin-bottom: 5px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  color: #555;
  font-size: 14px;
}

.dept-label:hover {
  background: #f8f9fa;
}

.dept-label.active {
  background: #e7f3ff; 
  color: #007bff; 
  font-weight: bold;
}

/* 4. สรุปภาพรวม (คงเดิม) */
.summary-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.summary-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border-left: 5px solid #007bff; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.card-content .label { color: #666; font-size: 13px; }
.card-content .value { font-size: 24px; font-weight: bold; margin: 5px 0 0; color: #000; }

/* 5. ตาราง (คงเดิม) */
.main-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table th {
  text-align: left;
  padding: 12px;
  background: #f8f9fa;
  border-bottom: 2px solid #eee;
  color: #666;
  font-size: 13px;
}

.modern-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.staff-row:hover { background: #fafafa; }

/* ปุ่ม Action (คงเดิม) */
.btn-manage {
  background: #6c757d;
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

.btn-hire {
  background: #28a745;
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

/* --- ส่วนที่แก้ไขใหม่ก่อนหน้า (คงเดิม) --- */
.card-header-row-modern {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.icon-bg {
  background: #f1f5f9;
  padding: 8px 10px;
  border-radius: 10px;
  margin-right: 8px;
}

.status-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #dcfce7;
}

.status-pill.warning {
  background: #fff7ed;
  color: #ea580c;
  border: 1px solid #ffedd5;
}

.status-pill .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.stats-grid-modern {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-box-new {
  background: #ffffff;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
}

.stat-box-new::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 16px 16px 0 0;
}

.stat-box-new.blue::before { background: #3b82f6; }
.stat-box-new.green::before { background: #10b981; }
.stat-box-new.red::before { background: #ef4444; }

.stat-label {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
}

.stat-value-unit {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
}

.stat-value.highlight {
  color: #ef4444;
}

.stat-unit {
  font-size: 14px;
  color: #94a3b8;
  font-weight: 600;
}
</style>