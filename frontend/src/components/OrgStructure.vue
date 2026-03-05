<template>
  <div class="hrm-app-container">
    <header class="hrm-header">
      <h1 class="main-title">จัดการข้อมูลแผนก</h1>
      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="ค้นหาแผนก...">
        <span class="search-btn">🔍</span>
      </div>
    </header>

    <div class="hrm-main-layout">
      <aside class="hrm-sidebar">
        <div class="sidebar-content">
          <h2 class="sidebar-header">ข้อมูลแผนก</h2>
          <p class="hospital-name">โรงพยาบาลชะอำ (รวม {{ totalCapacity }} อัตรา)</p>
          
          <nav class="dept-nav">
            <div v-for="dept in filteredDepts" :key="dept.dept_id" class="dept-item">
              <div 
                :class="['dept-label', { 'active': selectedDeptId === dept.dept_id }]"
                @click="selectDept(dept)"
              >
                <span class="arrow">{{ dept.sub_dept ? (dept.isOpen ? '▼' : '▶') : '•' }}</span>
                {{ dept.dept_name }}
              </div>
              
              <ul v-if="dept.isOpen && dept.sub_dept" class="sub-dept-list">
                <li class="sub-item active-sub">• {{ dept.sub_dept }}</li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      <main class="hrm-content">
        <section class="summary-section">
          <h3 class="section-title">สรุปภาพรวม</h3>
          <div class="summary-grid">
            <div class="summary-card card-blue">
              <p>แผนกที่ขาดคน</p>
              <h3>{{ globalSummary.understaffedCount }} แห่ง</h3>
            </div>
            <div class="summary-card card-gold">
              <p>ตำแหน่งว่างรวม</p>
              <h3>{{ globalSummary.totalVacant }} อัตรา</h3>
            </div>
          </div>
        </section>

        <section class="detail-section">
          <div class="detail-card">
            <h3 class="card-inner-title">รายละเอียดพนักงาน</h3>
            
            <div class="filter-row">
              <div class="input-group">
                <label>แผนก:</label>
                <select v-model="selectedDeptId" class="custom-select">
                  <option v-for="d in departmentList" :key="d.dept_id" :value="d.dept_id">{{ d.dept_name }}</option>
                </select>
              </div>
              <div class="input-group">
                <label>สังกัดหลัก:</label>
                <input type="text" :value="activeDeptName + (activeSubDept ? ' ('+activeSubDept+')' : '')" disabled class="custom-input-disabled">
              </div>
            </div>

            <div class="stats-row">
              <div class="stat-box">
                <p>กรอบอัตรากำลัง</p>
                <div class="val">{{ activeCapacity }} คน</div>
              </div>
              <div class="stat-box">
                <p>คนครองตำแหน่ง</p>
                <div class="val">{{ currentStaff.length }} คน</div>
              </div>
              <div class="stat-box">
                <p>คงเหลือ (ว่าง)</p>
                <div class="val text-red">{{ vacantCount }} อัตรา</div>
              </div>
            </div>

            <div class="table-container">
              <table class="hrm-table">
                <thead>
                  <tr>
                    <th>เลขที่</th>
                    <th>ชื่อตำแหน่ง</th>
                    <th>ผู้ครองตำแหน่ง</th>
                    <th class="text-center">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="emp in currentStaff" :key="emp.emp_id">
                    <td>{{ emp.position_no || '-' }}</td>
                    <td>{{ getPositionName(emp.pos_id) }}</td>
                    <td class="font-bold">{{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}</td>
                    <td class="text-center"><button class="btn-edit">จัดการ</button></td>
                  </tr>
                  <tr v-for="n in vacantCount" :key="'v'+n" class="empty-row">
                    <td>-</td>
                    <td>-</td>
                    <td class="text-orange">-- ตำแหน่งว่าง --</td>
                    <td class="text-center"><button class="btn-add">รับเข้า</button></td>
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
/* 🎨 ตกแต่งตามรูปต้นฉบับ 100% */
.hrm-app-container { font-family: 'Sarabun', sans-serif; background: #fdfdfd; min-height: 100vh; padding: 20px; }

/* Header */
.hrm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.main-title { font-size: 28px; font-weight: 800; color: #000; margin: 0; }
.search-box { display: flex; align-items: center; border: 1px solid #ccc; border-radius: 8px; padding: 5px 15px; background: white; }
.search-box input { border: none; outline: none; padding: 8px; width: 200px; }

/* Layout */
.hrm-main-layout { display: grid; grid-template-columns: 320px 1fr; gap: 20px; }

/* Sidebar: โทนสีน้ำตาล/ทอง ตามรูป image_936e84.png */
.hrm-sidebar { background: #c2a882; border-radius: 15px; padding: 20px; color: #fff; min-height: 80vh; }
.sidebar-header { font-size: 22px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 15px; }
.hospital-name { font-size: 14px; margin: 10px 0 20px; text-align: center; }

.dept-label { padding: 12px; cursor: pointer; border-radius: 8px; margin-bottom: 5px; font-weight: 600; color: #000; display: flex; align-items: center; }
.dept-label.active { background: rgba(255,255,255,0.2); }
.sub-dept-list { list-style: none; padding-left: 25px; margin-bottom: 10px; }
.sub-item { padding: 5px 0; font-size: 14px; color: #000; }

/* Content Area */
.summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
.summary-card { padding: 25px; border-radius: 15px; color: white; }
.card-blue { background: #004d99; }
.card-gold { background: #b39b4d; }
.summary-card h3 { font-size: 32px; margin: 10px 0 0; }

/* Detail Card */
.detail-card { background: white; border: 1px solid #eee; border-radius: 15px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
.filter-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
.input-group label { display: block; font-size: 14px; margin-bottom: 5px; font-weight: bold; }
.custom-select, .custom-input-disabled { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; }

/* Stats */
.stats-row { display: flex; gap: 15px; margin-bottom: 25px; }
.stat-box { flex: 1; border: 1px solid #eee; border-radius: 12px; padding: 20px; text-align: center; }
.stat-box .val { font-size: 24px; font-weight: bold; margin-top: 10px; }

/* Table */
.hrm-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
.hrm-table th { background: #003366; color: white; padding: 15px; text-align: left; }
.hrm-table td { padding: 15px; border-bottom: 1px solid #f0f0f0; }
.empty-row { background: #fffaf0; }
.btn-edit { background: #003366; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
.btn-add { background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }

/* Utils */
.text-red { color: #dc3545; }
.text-orange { color: #fd7e14; font-weight: bold; }
</style>