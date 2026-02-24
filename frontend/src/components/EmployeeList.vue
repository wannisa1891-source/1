<template>
  <div class="emp-modern-wrapper">
    
    <div v-if="!showForm" class="premium-glass-card fade-in">
      
      <div class="card-header-flex">
        <h2 class="card-title">ทะเบียนบุคลากร</h2>
        <button @click="showForm = true" class="btn-primary-add">
          <span class="icon">➕</span> เพิ่มพนักงานใหม่
        </button>
      </div>

      <div class="action-bar-modern">
        <div class="search-pill">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="ค้นหาชื่อ หรือ รหัสพนักงาน..." class="search-input-clean">
        </div>
        
        <div class="filter-group">
          <span class="filter-label">ตัวกรอง:</span>
          <select class="select-modern"><option>ทุกแผนก</option></select>
          <select class="select-modern"><option>ทุกตำแหน่ง</option></select>
          <select class="select-modern"><option>สถานะ: ทั้งหมด</option></select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="premium-table">
          <thead>
            <tr>
              <th>รูปภาพ</th>
              <th>ชื่อ-นามสกุล</th>
              <th>ตำแหน่ง</th>
              <th>แผนก</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in employees" :key="emp.emp_id" class="table-row-hover">
              <td>
                <div class="avatar-circle">👤</div>
              </td>
              <td class="fw-bold text-dark">{{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}</td>
              <td class="text-muted">{{ emp.pos_id }}</td>
              <td class="text-muted">{{ emp.dept_id }}</td>
              <td>
                <span class="badge-success">● ทำงานอยู่</span>
              </td>
            </tr>
            <tr v-if="employees.length === 0">
              <td colspan="5" class="empty-state">
                <div class="empty-box">
                  <span class="empty-icon">📂</span>
                  <p>ยังไม่มีข้อมูลบุคลากรในระบบ</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination-modern">
        <button class="page-btn text-muted">&lt; ก่อนหน้า</button>
        <div class="page-numbers">
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
        </div>
        <button class="page-btn text-muted">ถัดไป &gt;</button>
      </div>
    </div>

    <div v-else class="premium-glass-card fade-in">
      <div class="card-header-flex border-bottom">
        <h2 class="card-title">ฟอร์มลงทะเบียนพนักงานใหม่</h2>
        <button @click="showForm = false" class="btn-outline-back">
          🔙 ย้อนกลับ
        </button>
      </div>
      
      <div class="form-placeholder">
        <h4 style="color: #64748b; text-align: center; margin-top: 50px;">
          (เดี๋ยวเราเอาโค้ดฟอร์มจากเวอร์ชันก่อนมาใส่ตรงนี้ครับ)
        </h4>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps(['employees'])
const showForm = ref(false)
</script>

<style scoped>
/* 🎨 1. ภาพรวมของหน้า (ลบความแข็งกระด้างออก) */
.emp-modern-wrapper {
  padding: 10px 20px;
  animation: fadeIn 0.4s ease-in-out;
}

/* 🎨 2. การ์ดหลัก (Premium Card Design) */
.premium-glass-card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  padding: 30px;
  border: 1px solid #f1f5f9;
}

.card-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.card-title {
  margin: 0;
  font-size: 22px;
  color: #1e293b;
  font-weight: 700;
}

.border-bottom {
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 20px;
}

/* 🎨 3. แถบเครื่องมือ (Action Bar & Filters) */
.action-bar-modern {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

.search-pill {
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  padding: 8px 20px;
  width: 350px;
  transition: all 0.3s;
}

.search-pill:focus-within {
  border-color: #c5a073;
  box-shadow: 0 0 0 3px rgba(197, 160, 115, 0.1);
}

.search-input-clean {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  margin-left: 10px;
  font-family: inherit;
  color: #334155;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-label {
  color: #64748b;
  font-weight: 600;
  font-size: 14px;
}

.select-modern {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
  padding: 8px 15px;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  font-family: inherit;
}

/* 🎨 4. ปุ่ม (Buttons) */
.btn-primary-add {
  background: #c5a073; /* สีทองตามธีมโรงพยาบาล */
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.2s;
  box-shadow: 0 4px 12px rgba(197, 160, 115, 0.3);
}

.btn-primary-add:hover {
  background: #b58d5c;
  transform: translateY(-2px);
}

.btn-outline-back {
  background: white;
  color: #475569;
  border: 1px solid #cbd5e1;
  padding: 8px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn-outline-back:hover {
  background: #f8fafc;
  color: #1e293b;
}

/* 🎨 5. ตาราง (Modern Table) */
.table-responsive {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
}

.premium-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.premium-table th {
  background: #f8fafc;
  color: #64748b;
  font-weight: 700;
  padding: 16px 20px;
  font-size: 14px;
  border-bottom: 2px solid #e2e8f0;
}

.premium-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.table-row-hover:hover {
  background-color: #f8fafc;
  transition: 0.2s;
}

.text-dark { color: #1e293b; }
.text-muted { color: #64748b; font-size: 14px; }
.fw-bold { font-weight: 600; }

.avatar-circle {
  width: 45px;
  height: 45px;
  background: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

/* 🎨 6. Badge สถานะ */
.badge-success {
  background: #dcfce7;
  color: #166534;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 700;
}

/* 🎨 7. อื่นๆ (Empty State & Pagination & Animation) */
.empty-state { text-align: center; padding: 60px 0; }
.empty-box { display: flex; flex-direction: column; align-items: center; color: #94a3b8; }
.empty-icon { font-size: 40px; margin-bottom: 15px; opacity: 0.5; }

.pagination-modern {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}

.page-numbers { display: flex; gap: 8px; }
.page-btn {
  background: white; border: 1px solid #e2e8f0; padding: 8px 14px; border-radius: 8px; cursor: pointer; color: #475569; font-weight: 600; transition: 0.2s;
}
.page-btn:hover { background: #f8fafc; }
.page-btn.active { background: #c5a073; color: white; border-color: #c5a073; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>