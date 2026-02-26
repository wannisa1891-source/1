<template>
  <div class="leave-page-container fade-in">
    
    <div v-if="!showForm" class="main-content-wrapper">
      
      <header class="page-header">
        <div class="header-left">
          <span class="breadcrumb">Personnel / Leave Management</span>
          <h1 class="page-title">ระบบจัดการการลา</h1>
        </div>
        <div class="header-right">
          <button class="btn-back-minimal">
            <span class="icon">←</span> ย้อนกลับ
          </button>
        </div>
      </header>

      <section class="summary-grid mt-30">
        <div class="summary-card glass blue">
          <div class="card-icon">🤒</div>
          <div class="card-info">
            <span class="card-label">ลาป่วยวันนี้</span>
            <h2 class="card-value">05 <small>คน</small></h2>
          </div>
          <button class="btn-card-action">ดูรายชื่อ</button>
        </div>
        
        <div class="summary-card glass orange">
          <div class="card-icon">⏳</div>
          <div class="card-info">
            <span class="card-label">รอพิจารณา</span>
            <h2 class="card-value">12 <small>รายการ</small></h2>
          </div>
          <button class="btn-card-action">จัดการ</button>
        </div>

        <div class="summary-card glass green">
          <div class="card-icon">✅</div>
          <div class="card-info">
            <span class="card-label">อนุมัติแล้ว (เดือนนี้)</span>
            <h2 class="card-value">48 <small>รายการ</small></h2>
          </div>
          <button class="btn-card-action">รายงาน</button>
        </div>
      </section>

      <section class="table-container-modern mt-30">
        <div class="table-controls">
          <div class="search-box-modern">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="ค้นหาชื่อพนักงาน หรือแผนก...">
          </div>
          <div class="filter-actions">
            <select class="select-modern"><option>ทุกแผนก</option></select>
            <select class="select-modern"><option>ทุกสถานะ</option></select>
            <button @click="showForm = true" class="btn-add-primary">
              <span>+</span> สร้างใบลาใหม่
            </button>
          </div>
        </div>

        <div class="table-wrapper">
          <table class="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>พนักงาน</th>
                <th>แผนก</th>
                <th>ประเภท</th>
                <th>วันที่ลา</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#L-901</td>
                <td>
                  <div class="user-cell">
                    <div class="user-avatar">W</div>
                    <span>Wanwisa S.</span>
                  </div>
                </td>
                <td>อายุรกรรม</td>
                <td><span class="type-tag">ลาพักร้อน</span></td>
                <td>26-28 ก.พ. 69</td>
                <td><span class="status-badge waiting">รออนุมัติ</span></td>
                <td><button class="btn-view">รายละเอียด</button></td>
              </tr>
              <tr v-if="false">
                <td colspan="7" class="empty-row">
                  <div class="empty-content">
                    <span class="empty-icon">📁</span>
                    <p>ยังไม่มีรายการใบลาในระบบ</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="table-footer">
          <span class="page-info">แสดง 1-10 จาก 48 รายการ</span>
          <div class="pagination-modern">
            <button disabled>Prev</button>
            <button class="active">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </section>
    </div>

    <div v-else class="form-content-wrapper fade-in">
      <div class="form-card-premium">
        <div class="form-header">
          <div class="form-title-group">
            <h2 class="form-title">เขียนใบขออนุมัติลา</h2>
            <p>กรุณากรอกข้อมูลให้ครบถ้วนเพื่อความรวดเร็วในการอนุมัติ</p>
          </div>
          <button @click="showForm = false" class="btn-close">✕</button>
        </div>

        <div class="form-steps-body">
          <div class="form-step-section">
            <div class="step-indicator">01</div>
            <div class="step-content">
              <h3>ข้อมูลผู้ลา</h3>
              <div class="input-grid">
                <div class="input-field">
                  <label>ชื่อ-นามสกุล</label>
                  <input type="text" value="Wanwisa S." disabled class="locked">
                </div>
                <div class="input-field">
                  <label>ตำแหน่ง/แผนก</label>
                  <input type="text" value="พยาบาลวิชาชีพ / อายุรกรรม" disabled class="locked">
                </div>
              </div>
            </div>
          </div>

          <div class="form-step-section">
            <div class="step-indicator">02</div>
            <div class="step-content">
              <h3>รายละเอียดการลา</h3>
              <div class="type-selector">
                <label class="type-chip">
                  <input type="radio" name="ltype" checked>
                  <span class="chip-label">ป่วย</span>
                </label>
                <label class="type-chip">
                  <input type="radio" name="ltype">
                  <span class="chip-label">กิจ</span>
                </label>
                <label class="type-chip">
                  <input type="radio" name="ltype">
                  <span class="chip-label">พักร้อน</span>
                </label>
              </div>
              
              <div class="input-grid mt-20">
                <div class="input-field">
                  <label>เริ่มวันที่</label>
                  <input type="date" class="input-control">
                </div>
                <div class="input-field">
                  <label>ถึงวันที่</label>
                  <input type="date" class="input-control">
                </div>
                <div class="input-field full">
                  <label>เหตุผลการลา</label>
                  <textarea placeholder="ระบุเหตุผล..." rows="3" class="input-control"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="form-footer-actions">
            <button @click="showForm = false" class="btn-cancel">ยกเลิกข้อมูล</button>
            <button class="btn-submit">ส่งใบลาอนุมัติ <span>→</span></button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap');

.leave-page-container {
  font-family: 'Sarabun', sans-serif;
  padding: 30px;
  background: #f4f7f9;
  min-height: 100vh;
}

/* Header Section */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.breadcrumb { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
.page-title { font-size: 28px; font-weight: 700; color: #1e293b; margin: 5px 0 0 0; }
.btn-back-minimal {
  background: white; border: 1px solid #e2e8f0; padding: 10px 20px;
  border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.3s;
}
.btn-back-minimal:hover { background: #1e293b; color: white; }

/* Summary Grid */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.summary-card {
  padding: 24px; border-radius: 24px; display: flex; align-items: center;
  gap: 20px; position: relative; overflow: hidden;
}
.summary-card.glass { background: white; border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 10px 25px rgba(0,0,0,0.03); }
.card-icon { font-size: 32px; background: rgba(0,0,0,0.03); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 18px; }
.card-label { font-size: 13px; color: #64748b; font-weight: 600; }
.card-value { font-size: 28px; font-weight: 700; margin: 5px 0; color: #1e293b; }
.card-value small { font-size: 14px; color: #94a3b8; font-weight: 400; }
.btn-card-action { margin-left: auto; background: #f1f5f9; border: none; padding: 8px 15px; border-radius: 10px; font-size: 12px; font-weight: 700; cursor: pointer; }

/* Table Section */
.table-container-modern {
  background: white; border-radius: 24px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.02);
}
.table-controls { display: flex; justify-content: space-between; margin-bottom: 25px; }
.search-box-modern {
  background: #f8fafc; padding: 10px 15px; border-radius: 15px; display: flex; align-items: center; gap: 10px; width: 350px;
}
.search-box-modern input { border: none; background: transparent; outline: none; width: 100%; font-size: 14px; }
.filter-actions { display: flex; gap: 10px; }
.select-modern { background: #f8fafc; border: 1px solid #e2e8f0; padding: 0 15px; border-radius: 12px; font-family: inherit; font-size: 13px; }
.btn-add-primary {
  background: #1e293b; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 600; cursor: pointer;
}

/* Modern Table */
.modern-table { width: 100%; border-collapse: collapse; }
.modern-table th { text-align: left; padding: 15px; border-bottom: 2px solid #f1f5f9; color: #64748b; font-size: 13px; }
.modern-table td { padding: 15px; border-bottom: 1px solid #f8fafc; font-size: 14px; }
.user-cell { display: flex; align-items: center; gap: 10px; }
.user-avatar { width: 32px; height: 32px; background: #4A5644; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }
.status-badge { padding: 5px 12px; border-radius: 100px; font-size: 11px; font-weight: 700; }
.status-badge.waiting { background: #fef3c7; color: #d97706; }
.btn-view { background: transparent; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 8px; cursor: pointer; transition: 0.2s; }
.btn-view:hover { background: #f1f5f9; }

/* Form Section */
.form-card-premium {
  max-width: 800px; margin: 0 auto; background: white; border-radius: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.05); overflow: hidden;
}
.form-header {
  background: #1e293b; color: white; padding: 40px; display: flex; justify-content: space-between; align-items: center;
}
.form-title { margin: 0; font-size: 24px; }
.form-header p { margin: 5px 0 0 0; opacity: 0.7; font-size: 14px; }
.btn-close { background: rgba(255,255,255,0.1); border: none; color: white; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; }

.form-steps-body { padding: 40px; }
.form-step-section { display: flex; gap: 20px; margin-bottom: 40px; }
.step-indicator { width: 40px; height: 40px; background: #f1f5f9; color: #1e293b; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
.step-content { flex: 1; }
.step-content h3 { margin: 0 0 20px 0; font-size: 18px; color: #1e293b; }

.input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.input-grid .full { grid-column: span 2; }
.input-field label { display: block; font-size: 13px; font-weight: 600; color: #64748b; margin-bottom: 8px; }
.input-control { width: 100%; padding: 12px 15px; border-radius: 12px; border: 1px solid #e2e8f0; font-family: inherit; transition: 0.3s; }
.input-control:focus { border-color: #1e293b; outline: none; box-shadow: 0 0 0 4px rgba(30,41,59,0.05); }
.locked { background: #f8fafc; color: #94a3b8; }

.type-selector { display: flex; gap: 10px; }
.type-chip { flex: 1; cursor: pointer; }
.type-chip input { display: none; }
.chip-label { display: block; text-align: center; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 600; transition: 0.3s; }
.type-chip input:checked + .chip-label { background: #1e293b; color: white; border-color: #1e293b; }

.form-footer-actions { display: flex; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 30px; margin-top: 20px; }
.btn-cancel { background: white; border: 1px solid #e2e8f0; padding: 12px 30px; border-radius: 12px; font-weight: 600; cursor: pointer; }
.btn-submit { background: #10b981; color: white; border: none; padding: 12px 40px; border-radius: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(16,185,129,0.2); transition: 0.3s; }
.btn-submit:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(16,185,129,0.3); }

.mt-30 { margin-top: 30px; }
.mt-20 { margin-top: 20px; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>