<template>
  <div class="emp-page-wrapper">
    <div class="emp-header-section">
      <div class="banner-title-box">
        <span class="plus-icon">➕</span>
        <h2>Hospital HRM Website</h2>
      </div>
    </div>

    <div class="emp-main-card">
      <div class="card-top-header">
        <h3>ทะเบียนบุคลากร</h3>
      </div>

      <div class="emp-action-bar">
        <div class="search-input-group">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="ค้นหาชื่อ หรือ รหัส..." class="search-box-input">
        </div>
        <button class="btn-add-employee">+ เพิ่มพนักงานใหม่</button>
      </div>

      <div class="filter-controls">
        <span>ตัวกรอง: </span>
        <select class="filter-select"><option>[ ทุกแผนก 🔽 ]</option></select>
        <select class="filter-select"><option>[ ทุกตำแหน่ง 🔽 ]</option></select>
        <select class="filter-select"><option>[ สถานะ: ทั้งหมด 🔽 ]</option></select>
      </div>

      <div class="emp-table-container">
        <table class="hrm-custom-table">
          <thead>
            <tr>
              <th>รูปภาพ</th>
              <th>ชื่อ-สกุล</th>
              <th>ตำแหน่ง</th>
              <th>แผนก</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in employees" :key="emp.emp_id">
              <td class="td-img">
                <div class="img-box">[รูป]</div>
              </td>
              <td class="td-name">{{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}</td>
              <td class="td-pos">{{ emp.pos_id }}</td>
              <td class="td-dept">{{ emp.dept_id }}</td>
              <td class="td-status">
                <span class="status-label">Active</span>
              </td>
            </tr>
            <tr v-if="employees.length === 0">
              <td colspan="5" class="empty-row">ไม่พบข้อมูลบุคลากร</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-pagination">
        <span>&lt; ก่อนหน้า [1] 2 3 ถัดไป &gt;</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// รับข้อมูลพนักงานมาจาก App.vue
defineProps(['employees'])
</script>

<style scoped>
/* ดีไซน์เน้นโทนสีตามแบบ บุคลากร.png และ Screenshot 2026-02-20 082635.png */
.emp-page-wrapper {
  padding: 10px;
  background-color: #d1d5db; /* พื้นหลังเทาตามแบบ */
  min-height: 100%;
}

.emp-header-section {
  background-color: #2c3e50; /* สีน้ำเงินเข้ม */
  color: white;
  padding: 15px 30px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.banner-title-box {
  display: flex;
  align-items: center;
  gap: 15px;
}

.emp-main-card {
  background: #ffffff;
  border-radius: 15px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.card-top-header {
  padding: 15px 25px;
  border-bottom: 1px solid #eee;
}

.emp-action-bar {
  display: flex;
  justify-content: space-between;
  padding: 20px 25px 10px;
}

.search-input-group {
  display: flex;
  align-items: center;
  background: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px 15px;
  width: 50%;
}

.search-box-input {
  border: none;
  background: transparent;
  padding: 8px;
  width: 100%;
  outline: none;
}

.btn-add-employee {
  background-color: #4a5568; /* สีเทาเข้มตามแบบ */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.filter-controls {
  padding: 0 25px 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.filter-select {
  border: 1px solid #ccc;
  background: #f8f9fa;
  padding: 5px 10px;
  border-radius: 5px;
}

/* ตารางแบบคลาสสิก */
.hrm-custom-table {
  width: 100%;
  border-collapse: collapse;
}

.hrm-custom-table th {
  background-color: #c5a073; /* สีทองตามแบบ Dashboard เดิม */
  color: #333;
  padding: 12px;
  text-align: left;
}

.hrm-custom-table td {
  padding: 15px 12px;
  border-bottom: 1px solid #eee;
  background-color: #e2e8f0; /* สีพื้นหลังแถวตารางตามแบบ */
}

.img-box {
  width: 60px;
  height: 60px;
  background: #cbd5e0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.table-pagination {
  text-align: right;
  padding: 20px;
  color: #666;
}

.status-label {
  background: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}
</style>