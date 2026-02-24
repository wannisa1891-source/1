<template>
  <div class="transfer-modern-wrapper fade-in">
    
    <div v-if="!showForm" class="premium-glass-card bg-light-gray">
      
      <div class="header-action-row">
        <div class="empty-space-for-flex"></div> 
        <div class="title-pill-box">
          <h2 class="page-title">ประวัติการย้าย</h2>
        </div>
        <button class="btn-invisible"></button> </div>

      <div class="create-action-row">
        <button @click="showForm = true" class="btn-navy-add">
          [ ➕ สร้างคำสั่งย้ายใหม่ ]
        </button>
      </div>

      <div class="filter-search-row">
        <div class="search-group">
          <label class="fw-bold">ค้นหา:</label>
          <div class="input-with-icon">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="ชื่อ / เลขที่คำสั่ง..." class="input-modern">
          </div>
        </div>
        <div class="filter-group">
          <label class="fw-bold">ประเภท:</label>
          <select class="input-modern"><option>[ ทั้งหมด 🔽 ]</option></select>
        </div>
      </div>

      <div class="table-responsive bg-white mt-20">
        <table class="transfer-table">
          <thead>
            <tr>
              <th>| ID</th>
              <th>| วันที่มีผล</th>
              <th>| ข้าราชการ/พนง.</th>
              <th>| รายละเอียด</th>
              <th>| เลขที่คำสั่ง</th>
              <th>| สถานะ |</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="6" class="empty-state">
                <div class="empty-box">ยังไม่มีประวัติการโยกย้ายในระบบ</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="premium-glass-card bg-light-gray">
      
      <div class="header-action-row">
        <div class="empty-space-for-flex"></div> 
        <div class="title-pill-box">
          <h2 class="page-title">บันทึกคำสั่งแต่งตั้ง/การย้าย</h2>
        </div>
        <button @click="showForm = false" class="btn-outline-back">
          &lt; ย้อนกลับ
        </button>
      </div>

      <div class="form-body-scroll mt-20">
        
        <div class="form-section-box">
          <div class="section-badge">1. ข้อมูลคำสั่ง</div>
          <div class="form-grid-2">
            <div class="input-group">
              <label>เลขที่คำสั่ง :</label>
              <input type="text" class="input-modern bg-disabled">
            </div>
            <div class="input-group">
              <label>ลงวันที่ :</label>
              <input type="text" class="input-modern" placeholder="[ วว/ดด/ปปปป ]">
            </div>
            <div class="input-group full-width">
              <label>เรื่อง :</label>
              <input type="text" class="input-modern bg-disabled">
            </div>
            <div class="input-group full-width">
              <label>ประเภท :</label>
              <select class="input-modern w-50"><option>[ 03 - ย้าย/สับเปลี่ยนตำแหน่ง 🔽 ]</option></select>
            </div>
            <div class="input-group">
              <label>วันที่มีผล :</label>
              <input type="text" class="input-modern" placeholder="[ วว/ดด/ปปปป ]">
            </div>
          </div>
        </div>

        <div class="form-section-box mt-20">
          <div class="section-badge">2. รายละเอียดการเปลี่ยนแปลง</div>
          <div class="mt-15 mb-15">
            <div class="input-group full-width justify-center">
              <label class="w-auto">ผู้ถูกคำสั่ง:</label>
              <div class="input-with-icon w-60 bg-white">
                <span class="search-icon">🔍</span>
                <input type="text" placeholder="ค้นหา: 55001 - xxxxxx xxxxx (พยาบาล)" class="input-modern">
              </div>
            </div>
          </div>

          <div class="comparison-table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>| รายการ</th>
                  <th>| ⬅️ ข้อมูลปัจจุบัน (เดิม)</th>
                  <th>| ➡️ ข้อมูลใหม่ (ที่ย้ายไป) |</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="fw-bold">สังกัด/หน่วยงาน</td>
                  <td class="text-center text-muted">xxxxxx</td>
                  <td class="text-center text-muted">xxxxxx</td>
                </tr>
                <tr>
                  <td class="fw-bold">ตำแหน่งสายงาน</td>
                  <td class="text-center text-muted">xxxxxx</td>
                  <td class="text-center text-muted">xxxxxx</td>
                </tr>
                <tr>
                  <td class="fw-bold">ระดับ</td>
                  <td class="text-center text-muted">xxxxxx</td>
                  <td class="text-center text-muted">xxxxxx</td>
                </tr>
                <tr>
                  <td class="fw-bold">เลขที่ตำแหน่ง</td>
                  <td class="text-center text-muted">xxxxxx</td>
                  <td class="text-center text-muted">xxxxxx</td>
                </tr>
                <tr>
                  <td class="fw-bold">เงินเดือน (บาท)</td>
                  <td class="text-center text-muted">xxxxxx</td>
                  <td class="text-center text-muted">xxxxxx</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="form-section-box mt-20">
          <div class="section-badge">3. เอกสารแนบ</div>
          <div class="form-grid-1 mt-15">
            <div class="input-group">
              <label>หมายเหตุ :</label>
              <input type="text" class="input-modern bg-disabled">
            </div>
            <div class="input-group">
              <label>ไฟล์แนบ PDF :</label>
              <div class="file-upload-box">
                [อัปโหลดไฟล์คำสั่งฉบับจริง (Scan).pdf]
              </div>
            </div>
          </div>
        </div>

        <div class="form-action-buttons">
          <button @click="showForm = false" class="btn-cancel-modern">ยกเลิก</button>
          <button class="btn-save-modern">บันทึก</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// ตัวแปรคุมการสลับหน้า (false = โชว์ตาราง, true = โชว์ฟอร์ม)
const showForm = ref(false)
</script>

<style scoped>
/* ================= สไตล์หลัก ================= */
.transfer-modern-wrapper { padding: 10px 20px; animation: fadeIn 0.4s ease; font-family: sans-serif;}
.premium-glass-card { background: #d1d5db; border-radius: 15px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); min-height: 80vh; }
.bg-light-gray { background: #cbd5e1; }
.bg-white { background: white; }

/* ================= ส่วน Header ================= */
.header-action-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.empty-space-for-flex, .btn-invisible { width: 100px; background: transparent; border: none; }
.title-pill-box { background: white; padding: 10px 60px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); text-align: center; border: 1px solid #94a3b8; }
.page-title { margin: 0; font-size: 22px; color: #1e293b; font-weight: bold; }
.btn-outline-back { background: white; color: #475569; border: 1px solid #94a3b8; padding: 8px 15px; border-radius: 10px; font-weight: bold; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.btn-outline-back:hover { background: #f8fafc; }

/* ================= เครื่องมือตาราง ================= */
.create-action-row { display: flex; justify-content: flex-end; margin-bottom: 15px; }
.btn-navy-add { background: #1e3a8a; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer; box-shadow: 0 4px 6px rgba(30, 58, 138, 0.2); transition: 0.2s;}
.btn-navy-add:hover { background: #1e40af; transform: translateY(-2px); }

.filter-search-row { display: flex; justify-content: center; gap: 40px; margin-bottom: 15px; align-items: center; font-size: 15px; }
.search-group, .filter-group { display: flex; align-items: center; gap: 10px; color: #334155; }
.input-with-icon { display: flex; align-items: center; background: white; border: 1px solid #94a3b8; border-radius: 8px; padding: 5px 15px; width: 250px; }
.input-modern { border: 1px solid #94a3b8; outline: none; background: white; padding: 8px 15px; border-radius: 8px; width: 100%; font-family: inherit; }
.input-with-icon .input-modern { border: none; padding: 5px; }
.fw-bold { font-weight: bold; }
.text-center { text-align: center; }
.text-muted { color: #64748b; }

/* ================= ตารางประวัติ ================= */
.table-responsive { overflow-x: auto; border-radius: 12px; border: 1px solid #94a3b8; min-height: 400px; }
.transfer-table { width: 100%; border-collapse: collapse; text-align: left; }
.transfer-table th { background: white; color: #475569; font-weight: bold; padding: 15px 20px; font-size: 15px; border-bottom: 2px solid #cbd5e1; }
.transfer-table td { padding: 15px 20px; border-bottom: 1px solid #e2e8f0; }
.empty-state { text-align: center; padding: 60px 0; color: #94a3b8; }
.empty-box { font-size: 16px; }

/* ================= ฟอร์มบันทึกคำสั่ง ================= */
.form-section-box { background: white; border-radius: 15px; padding: 25px 30px; border: 1px solid #94a3b8; position: relative; margin-top: 30px; }
.section-badge { position: absolute; top: -15px; left: 20px; background: #cbd5e1; padding: 5px 20px; border-radius: 15px; border: 1px solid #94a3b8; font-weight: bold; color: #334155; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.mt-20 { margin-top: 20px; }
.mt-15 { margin-top: 15px; }
.mb-15 { margin-bottom: 15px; }

.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px 30px; margin-top: 15px; }
.form-grid-1 { display: grid; grid-template-columns: 1fr; gap: 15px; }
.input-group { display: flex; align-items: center; gap: 15px; }
.input-group.full-width { grid-column: span 2; }
.input-group.justify-center { justify-content: center; }
.input-group label { width: 130px; text-align: right; font-weight: bold; color: #475569; font-size: 14px; }
.input-group label.w-auto { width: auto; }
.w-50 { width: 50% !important; }
.w-60 { width: 60% !important; }

.bg-disabled { background-color: #e2e8f0; } /* ช่องทึบ */
.file-upload-box { background: #f1f5f9; border: 1px dashed #94a3b8; padding: 10px 20px; border-radius: 8px; color: #64748b; flex: 1; cursor: pointer; }

/* ================= ตารางเปรียบเทียบ ================= */
.comparison-table-wrapper { background: #e2e8f0; border-radius: 12px; padding: 2px; border: 1px solid #94a3b8; overflow: hidden; }
.comparison-table { width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden; }
.comparison-table th { background: #f8fafc; padding: 12px; border-bottom: 2px solid #e2e8f0; color: #334155; }
.comparison-table td { padding: 10px 15px; border-bottom: 1px solid #f1f5f9; }
.comparison-table tr:last-child td { border-bottom: none; }
.comparison-table td:first-child { background: #f1f5f9; border-right: 1px solid #e2e8f0; width: 30%; }

/* ================= ปุ่ม Action ฟอร์ม ================= */
.form-action-buttons { display: flex; justify-content: center; gap: 20px; margin-top: 30px; padding-bottom: 10px; }
.btn-cancel-modern { background: #d4b483; color: black; border: 1px solid #94a3b8; padding: 12px 40px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.2s; }
.btn-save-modern { background: #4ade80; color: black; border: 1px solid #94a3b8; padding: 12px 40px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.2s; }
.btn-cancel-modern:hover { background: #c5a073; }
.btn-save-modern:hover { background: #22c55e; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>