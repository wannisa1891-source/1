<template>
  <div class="leave-modern-wrapper fade-in">
    
    <div v-if="!showForm" class="premium-glass-card bg-light-gray">
      
      <div class="header-action-row">
        <div class="empty-space-for-flex"></div>
        <div class="title-pill-box">
          <h2 class="page-title">จัดการการลา</h2>
        </div>
        <button class="btn-outline-back">&lt; ย้อนกลับ</button>
      </div>

      <div class="summary-cards-row mt-20">
        <div class="summary-box">
          <h3>ลาป่วยวันนี้</h3>
          <p class="stat-value">XX คน</p>
          <button class="btn-summary">ดูรายชื่อ</button>
        </div>
        <div class="summary-box">
          <h3>รออนุมัติ</h3>
          <p class="stat-value">XX รายการ</p>
          <button class="btn-summary">จัดการ</button>
        </div>
        <div class="summary-box">
          <h3>อนุมัติเดือนนี้</h3>
          <p class="stat-value">XX รายการ</p>
          <button class="btn-summary">พิมพ์</button>
        </div>
      </div>

      <div class="table-section-card mt-20">
        <div class="table-header-flex">
          <h3 class="m-0">รายการใบลาทั้งหมด</h3>
          <button @click="showForm = true" class="btn-navy-add">[ ➕ สร้างใบลาใหม่ ]</button>
        </div>
        
        <div class="filter-tools-row mt-15">
          <div class="search-group">
            <label class="fw-bold">ค้นหา:</label>
            <div class="input-with-icon">
              <span class="search-icon">🔍</span>
              <input type="text" placeholder="ค้นหาชื่อ..." class="input-modern">
            </div>
          </div>
          <div class="filter-group">
            <label>[ กรองข้อมูล 🔽 ]</label>
            <label>แผนก: [ ทั้งหมด 🔽 ]</label>
            <label>สถานะ: [ ทั้งหมด 🔽 ]</label>
          </div>
        </div>

        <div class="table-responsive mt-15">
          <table class="leave-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>วันที่ลา</th>
                <th>พนักงาน</th>
                <th>แผนก</th>
                <th>ประเภท</th>
                <th>เหตุผล</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="8" class="empty-state">
                  <div class="empty-box">ยังไม่มีรายการใบลาในระบบ</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination-right">&lt; ก่อนหน้า [1] 2 3 ถัดไป &gt;</div>
      </div>

    </div>

    <div v-else class="premium-glass-card bg-light-gray">
      
      <div class="header-action-row">
        <div class="empty-space-for-flex"></div>
        <div class="title-pill-box">
          <h2 class="page-title">เขียนใบขออนุมัติลา</h2>
        </div>
        <button @click="showForm = false" class="btn-outline-back">&lt; ย้อนกลับ</button>
      </div>

      <div class="form-body-scroll mt-20">
        
        <div class="form-section-box">
          <h3 class="section-title">1. ข้อมูลผู้ลา</h3>
          <div class="form-grid-2">
            <div class="input-group">
              <label>ชื่อ:</label>
              <input type="text" class="input-modern bg-disabled" disabled>
            </div>
            <div class="input-group">
              <label>ตำแหน่ง:</label>
              <input type="text" class="input-modern bg-disabled" disabled>
            </div>
            <div class="input-group full-width">
              <label>แผนก:</label>
              <input type="text" class="input-modern bg-disabled w-50" disabled>
            </div>
          </div>
        </div>

        <div class="form-section-box mt-20">
          <h3 class="section-title">2. รายละเอียดการลา</h3>
          <div class="form-grid-1">
            <div class="input-group inline-radio">
              <label>ประเภท :</label>
              <label><input type="radio" name="leaveType" checked> ป่วย</label>
              <label><input type="radio" name="leaveType"> กิจ</label>
              <label><input type="radio" name="leaveType"> พักร้อน</label>
            </div>
            <div class="input-group">
              <label>วันที่ :</label>
              <span>[ วว/ดด/ปปปป ] ถึง [ วว/ดด/ปปปป ]</span>
            </div>
            <div class="input-group inline-radio">
              <label>เวลางาน :</label>
              <label><input type="radio" name="leaveTime" checked> เต็มวัน</label>
              <label><input type="radio" name="leaveTime"> ครึ่งวัน</label>
              <span class="ml-15 fw-bold">&gt;&gt; รวม: [ xx ] วัน</span>
            </div>
            <div class="input-group full-width">
              <label>เหตุผล :</label>
              <input type="text" class="input-modern bg-disabled">
            </div>
            <div class="input-group full-width">
              <label>แนบไฟล์ :</label>
              <div class="file-upload-box">[ Upload ใบรับรองแพทย์ ]</div>
            </div>
          </div>
        </div>

        <div class="form-section-box mt-20">
          <h3 class="section-title">3. การติดต่อ</h3>
          <div class="form-grid-1">
            <div class="input-group full-width">
              <label>ที่อยู่ :</label>
              <input type="text" class="input-modern bg-disabled">
            </div>
            <div class="input-group full-width">
              <label>เบอร์โทร :</label>
              <input type="text" class="input-modern bg-disabled w-50">
            </div>
          </div>
        </div>

        <div class="form-action-buttons">
          <button @click="showForm = false" class="btn-cancel-modern">ยกเลิก</button>
          <button class="btn-save-modern">ยืนยัน</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// ตัวแปรควบคุมการสลับหน้า 
const showForm = ref(false)
</script>

<style scoped>
/* สไตล์ภาพรวม */
.leave-modern-wrapper { padding: 10px 20px; animation: fadeIn 0.4s ease; font-family: sans-serif; }
.premium-glass-card { background: #cbd5e1; border-radius: 15px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); min-height: 80vh; }
.bg-light-gray { background: #cbd5e1; }
.mt-20 { margin-top: 20px; } .mt-15 { margin-top: 15px; } .m-0 { margin: 0; } .ml-15 { margin-left: 15px; } .fw-bold { font-weight: bold; }

/* ส่วน Header */
.header-action-row { display: flex; justify-content: space-between; align-items: flex-start; }
.empty-space-for-flex { width: 100px; }
.title-pill-box { background: white; padding: 10px 80px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); text-align: center; border: 1px solid #94a3b8; }
.page-title { margin: 0; font-size: 24px; color: #1e293b; font-weight: bold; }
.btn-outline-back { background: white; color: #475569; border: 1px solid #94a3b8; padding: 8px 15px; border-radius: 10px; font-weight: bold; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.btn-outline-back:hover { background: #f8fafc; }

/* กล่องสถิติ (สีม่วง) */
.summary-cards-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.summary-box { background: #ede9fe; border-radius: 15px; padding: 20px; text-align: center; border: 1px solid #ddd6fe; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
.summary-box h3 { margin: 0 0 10px 0; color: #1e293b; font-size: 18px; }
.stat-value { font-size: 20px; color: #475569; margin-bottom: 15px; }
.btn-summary { background: white; border: 1px solid #a78bfa; color: #1e293b; padding: 5px 20px; border-radius: 20px; font-weight: bold; cursor: pointer; transition: 0.2s; }
.btn-summary:hover { background: #f5f3ff; }

/* พื้นที่ตาราง */
.table-section-card { background: #e2e8f0; border-radius: 15px; padding: 25px; border: 1px solid #cbd5e1; }
.table-header-flex { display: flex; justify-content: space-between; align-items: center; }
.btn-navy-add { background: transparent; color: #1e293b; border: none; font-weight: bold; font-size: 16px; cursor: pointer; }

.filter-tools-row { display: flex; align-items: center; gap: 30px; margin-bottom: 15px; font-size: 14px; }
.search-group, .filter-group { display: flex; align-items: center; gap: 10px; color: #334155; font-weight: bold;}
.input-with-icon { display: flex; align-items: center; background: white; border: 1px solid #94a3b8; border-radius: 20px; padding: 5px 15px; width: 200px; }
.input-modern { border: none; outline: none; background: transparent; padding: 5px; width: 100%; font-family: inherit; }
.filter-group label { cursor: pointer; }

/* ตารางข้อมูล */
.table-responsive { background: white; border-radius: 12px; border: 1px solid #cbd5e1; min-height: 300px; overflow: hidden; }
.leave-table { width: 100%; border-collapse: collapse; text-align: center; }
.leave-table th { background: white; color: #1e293b; font-weight: bold; padding: 12px; font-size: 14px; border-bottom: 2px solid #e2e8f0; }
.leave-table td { padding: 12px; border-bottom: 1px solid #f1f5f9; }
.empty-state { padding: 60px 0; color: #94a3b8; }
.pagination-right { text-align: right; margin-top: 15px; font-size: 14px; color: #475569; font-weight: bold; }

/* ================= ฟอร์มขออนุมัติลา ================= */
.form-section-box { background: white; border-radius: 10px; padding: 20px 30px; border: 1px solid #94a3b8; margin-bottom: 15px;}
.section-title { margin-top: 0; font-size: 18px; color: #1e293b; margin-bottom: 15px; }

.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px 30px; }
.form-grid-1 { display: grid; grid-template-columns: 1fr; gap: 15px; }
.input-group { display: flex; align-items: center; gap: 15px; }
.input-group.full-width { grid-column: span 2; }
.input-group label { width: 100px; text-align: right; color: #334155; font-size: 15px; }

.input-modern { border: 1px solid #94a3b8; outline: none; background: white; padding: 8px 15px; border-radius: 20px; flex: 1; font-family: inherit; }
.bg-disabled { background-color: #e2e8f0; }
.w-50 { width: 50% !important; flex: none; }

.inline-radio { display: flex; gap: 20px; align-items: center; }
.inline-radio label { width: auto; text-align: left; display: flex; align-items: center; gap: 5px; cursor: pointer; }

.file-upload-box { background: #e2e8f0; border: 1px solid #94a3b8; padding: 8px 20px; border-radius: 20px; color: #334155; flex: 1; cursor: pointer; }

/* ปุ่ม Action ฟอร์ม */
.form-action-buttons { display: flex; justify-content: center; gap: 20px; margin-top: 30px; padding-bottom: 10px; }
.btn-cancel-modern { background: #d4b483; color: black; border: 1px solid #6b7280; padding: 12px 50px; border-radius: 12px; font-weight: bold; font-size: 16px; cursor: pointer; transition: 0.2s; }
.btn-save-modern { background: #4ade80; color: black; border: 1px solid #6b7280; padding: 12px 50px; border-radius: 12px; font-weight: bold; font-size: 16px; cursor: pointer; transition: 0.2s; }
.btn-cancel-modern:hover { background: #c5a073; }
.btn-save-modern:hover { background: #22c55e; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>