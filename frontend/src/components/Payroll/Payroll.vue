<template>
  <div class="leave-wrapper fade-in">
    <div class="glass-bg"></div>

    <div class="dashboard-content">
      <header class="dashboard-header glass">
        <div class="header-left">
          <div class="status-indicator">
            <span class="dot-pulse"></span>
            <span>ระบบจัดการบุคลากร (HRM v1.0)</span>
          </div>
          <h1>{{ title }}</h1>
          <p class="subtitle">{{ subtitle }}</p>
        </div>

        <div class="header-right">
          <div class="search-container glass-inset">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="ค้นหาพนักงาน...">
          </div>
          <div class="admin-profile">
            <div class="admin-info">
              <span class="admin-name">Administrator</span>
              <span class="admin-role">HR Manager</span>
            </div>
            <div class="admin-avatar">A</div>
          </div>
        </div>
      </header>

      <section class="stats-grid mt-30">
        <div class="stat-card glass-white blue-line">
          <div class="stat-icon">💰</div>
          <div class="stat-data">
            <span class="stat-label">งบประมาณเงินเดือน</span>
            <h2 class="stat-value">฿{{ totalSalary.toLocaleString() }}</h2>
            <div class="stat-trend">จากพนักงาน {{ employees.length }} ท่าน</div>
          </div>
        </div>

        <div class="stat-card glass-white orange-line">
          <div class="stat-icon">👥</div>
          <div class="stat-data">
            <span class="stat-label">พนักงานทั้งหมด</span>
            <h2 class="stat-value">{{ employees.length }} <small>คน</small></h2>
            <div class="stat-trend green-text">● สถานะออนไลน์</div>
          </div>
        </div>

        <div class="stat-card gold-gradient">
          <div class="stat-icon dark">📄</div>
          <div class="stat-data">
            <span class="stat-label white-text">ใบลาที่รออนุมัติ</span>
            <h2 class="stat-value white-text">{{ pendingLeavesCount }} <small>รายการ</small></h2>
            <button class="action-btn">จัดการทันที →</button>
          </div>
        </div>
      </section>

      <section class="charts-row mt-30">
        <div class="chart-card glass-white main-chart">
          <div class="card-title">
            <h3>Budget Allocation</h3>
            <p>งบประมาณรายแผนก (หน่วย: บาท)</p>
          </div>
          <div class="bar-chart-container">
            <div v-for="dept in deptBudget" :key="dept.name" class="bar-item">
              <div class="bar-track">
                <div class="bar-active" :style="{ height: dept.percent + '%' }">
                  <div class="bar-tooltip">฿{{ dept.amount }}</div>
                </div>
              </div>
              <span class="bar-label">{{ dept.name }}</span>
            </div>
          </div>
        </div>

        <div class="chart-card glass-white side-chart">
          <div class="card-title">
            <h3>Leave Types</h3>
            <p>สัดส่วนประเภทการลา</p>
          </div>
          <div class="donut-box">
            <div class="donut-graphic">
              <div class="donut-hole">
                <strong>{{ leaveTypes.length }}</strong>
                <span>ประเภท</span>
              </div>
            </div>
            <div class="donut-list">
              <div class="list-item" v-for="type in leaveTypes" :key="type.id">
                <span class="list-dot" :style="{background: type.color}"></span>
                {{ type.name }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="table-card glass-white mt-30">
        <div class="table-top">
          <h3>รายชื่อบุคลากรล่าสุด</h3>
          <div class="table-actions">
            <button class="filter-btn">Filters</button>
            <button class="export-btn">Export SQL</button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="styled-table">
            <thead>
              <tr>
                <th>รหัสพนักงาน</th>
                <th>พนักงาน</th>
                <th>แผนก</th>
                <th>ประเภท</th>
                <th>เงินเดือน</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emp in employees" :key="emp.emp_id">
                <td class="id-text">#{{ emp.emp_id }}</td>
                <td>
                  <div class="user-info">
                    <div class="user-img">{{ emp.first_name_th[0] }}</div>
                    <div class="user-details">
                      <span class="name">{{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}</span>
                      <span class="start-date">เริ่ม: {{ emp.start_date }}</span>
                    </div>
                  </div>
                </td>
                <td><span class="dept-chip">{{ emp.dept_id }}</span></td>
                <td>{{ emp.emp_type }}</td>
                <td class="salary-text">฿{{ emp.base_salary.toLocaleString() }}</td>
                <td><span class="status-tag active">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const title = ref("Analytics Dashboard")
const subtitle = ref("HR Management & Budget Monitoring System")

// ข้อมูลจริงจากไฟล์ SQL ที่คุณให้มา
const employees = ref([
  { emp_id: 'EMP001', prefix: 'นางสาว', first_name_th: 'วรรณวิสา', last_name_th: 'ทดสอบระบบ', dept_id: 'D001', emp_type: 'ข้าราชการ', base_salary: 25000.00, start_date: '2026-01-01' },
  { emp_id: '0007', prefix: 'นพ.', first_name_th: '444444', last_name_th: '44555', dept_id: 'D009', emp_type: 'ข้าราชการ', base_salary: 11.00, start_date: '2026-02-06' },
  { emp_id: '1111111', prefix: 'นาง', first_name_th: '00000', last_name_th: '11111', dept_id: 'D010', emp_type: 'ข้าราชการ', base_salary: 4.00, start_date: '2026-03-12' },
  { emp_id: 'EMP003', prefix: 'นาย', first_name_th: '666', last_name_th: '667', dept_id: 'D001', emp_type: 'ข้าราชการ', base_salary: 1000.00, start_date: '2026-02-11' }
])

const leaveTypes = ref([
  { id: 'L01', name: 'ลาป่วย', color: '#3182ce' },
  { id: 'L02', name: 'ลากิจ', color: '#38a169' },
  { id: 'L03', name: 'ลาพักร้อน', color: '#805ad5' }
])

const totalSalary = computed(() => employees.value.reduce((sum, emp) => sum + emp.base_salary, 0))
const pendingLeavesCount = ref(1) // ตามข้อมูลที่มีใน leaves

const deptBudget = computed(() => {
  const depts = [{id:'D001', name:'พยาบาล'}, {id:'D009', name:'ไอที'}, {id:'D010', name:'โภชนาการ'}]
  return depts.map(d => {
    const total = employees.value.filter(e => e.dept_id === d.id).reduce((s, e) => s + e.base_salary, 0)
    return { name: d.name, amount: total.toLocaleString(), percent: (total / (totalSalary.value || 1)) * 100 || 5 }
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&display=swap');

/* Main Wrapper */
.leave-wrapper {
  min-height: 100vh;
  background: #f4f7fa;
  font-family: 'Sarabun', sans-serif;
  color: #2d3748;
  padding: 30px;
  position: relative;
  overflow-x: hidden;
}

.glass-bg {
  position: absolute; top: 0; left: 0; right: 0; height: 350px;
  background: linear-gradient(135deg, #1a365d 0%, #2d3748 100%);
  z-index: 0;
}

.dashboard-content { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; }

/* Header Decoration */
.dashboard-header.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 25px 35px; border-radius: 24px;
  display: flex; justify-content: space-between; align-items: center; color: white;
}

.dot-pulse {
  height: 8px; width: 8px; background: #48bb78; border-radius: 50%; display: inline-block;
  margin-right: 10px; box-shadow: 0 0 0 rgba(72, 187, 120, 0.4); animation: pulse 2s infinite;
}

.header-left h1 { font-size: 32px; font-weight: 800; margin: 5px 0; letter-spacing: -0.5px; }

/* Glass Cards */
.glass-white {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
}

.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
.stat-card { padding: 30px; border-radius: 24px; display: flex; align-items: center; gap: 20px; transition: transform 0.3s; }
.stat-card:hover { transform: translateY(-5px); }

.blue-line { border-left: 6px solid #3182ce; }
.orange-line { border-left: 6px solid #ed8936; }
.gold-gradient { background: linear-gradient(135deg, #d69e2e 0%, #b7791f 100%); border: none; }

.stat-icon { width: 55px; height: 55px; background: #f7fafc; border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.stat-icon.dark { background: rgba(0,0,0,0.1); }
.stat-value { font-size: 32px; font-weight: 800; margin: 5px 0; color: #1a202c; }
.stat-label { font-size: 14px; font-weight: 600; color: #718096; text-transform: uppercase; }

/* Charts */
.charts-row { display: grid; grid-template-columns: 1.8fr 1fr; gap: 25px; }
.chart-card { padding: 30px; border-radius: 24px; }
.card-title h3 { font-size: 18px; font-weight: 700; margin: 0; }
.card-title p { font-size: 13px; color: #718096; margin-top: 5px; }

/* Bar Chart */
.bar-chart-container { height: 220px; display: flex; align-items: flex-end; justify-content: space-around; margin-top: 30px; }
.bar-item { flex: 1; display: flex; flex-direction: column; align-items: center; max-width: 80px; }
.bar-track { width: 40px; height: 160px; background: #edf2f7; border-radius: 12px; display: flex; align-items: flex-end; position: relative; }
.bar-active { width: 100%; background: linear-gradient(to top, #2c5282, #4299e1); border-radius: 12px; transition: height 1s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; }
.bar-active:hover .bar-tooltip { opacity: 1; transform: translateX(-50%) translateY(-10px); }
.bar-tooltip { position: absolute; top: -35px; left: 50%; transform: translateX(-50%); background: #2d3748; color: white; padding: 5px 10px; border-radius: 8px; font-size: 11px; opacity: 0; transition: 0.3s; pointer-events: none; }

/* Donut Chart */
.donut-box { display: flex; flex-direction: column; align-items: center; gap: 20px; margin-top: 20px; }
.donut-graphic {
  width: 140px; height: 140px; border-radius: 50%;
  background: conic-gradient(#3182ce 0% 30%, #38a169 30% 65%, #805ad5 65% 100%);
  display: flex; align-items: center; justify-content: center; position: relative;
}
.donut-hole { width: 100px; height: 100px; background: white; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: inset 0 2px 10px rgba(0,0,0,0.05); }

/* Table */
.table-card { padding: 35px; border-radius: 24px; }
.table-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.styled-table { width: 100%; border-collapse: collapse; }
.styled-table th { text-align: left; padding: 18px; background: #f8fafc; color: #4a5568; font-size: 12px; font-weight: 700; text-transform: uppercase; border-bottom: 2px solid #edf2f7; }
.styled-table td { padding: 20px 18px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
.styled-table tr:hover { background: #fbfcfe; cursor: pointer; }

.user-info { display: flex; align-items: center; gap: 15px; }
.user-img { width: 40px; height: 40px; background: #ebf4ff; color: #3182ce; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; }
.user-details .name { display: block; font-weight: 700; color: #1a202c; }
.user-details .start-date { font-size: 11px; color: #a0aec0; }

.dept-chip { background: #edf2f7; padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; color: #4a5568; }
.salary-text { font-weight: 800; color: #2f855a; }
.status-tag.active { background: #c6f6d5; color: #22543d; padding: 5px 15px; border-radius: 20px; font-size: 11px; font-weight: 700; }

/* Buttons & Inputs */
.action-btn { background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; padding: 8px 16px; border-radius: 12px; cursor: pointer; transition: 0.3s; margin-top: 10px;}
.action-btn:hover { background: white; color: #b7791f; }

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(72, 187, 120, 0); }
  100% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0); }
}

.fade-in { animation: fadeIn 0.8s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>