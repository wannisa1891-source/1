<template>
  <div class="license-modern-wrapper fade-in">
    
    <div class="header-action-row">
      <h2 class="page-title">ติดตามใบอนุญาตประกอบวิชาชีพ</h2>
      <div class="header-tools">
        <button class="icon-btn">🔔</button>
        <button class="icon-btn">❓</button>
        <button class="btn-primary-upload">
          + Upload Certificate<br><small>อัพโหลดใบรับรอง</small>
        </button>
      </div>
    </div>

    <div class="alert-banner-card mt-20">
      <div class="alert-content">
        <h4 class="text-danger mb-5">⚠️ มีใบอนุญาตทางการแพทย์ 3 รายการหมดอายุแล้ว และอีก 5 รายการกำลังจะหมดอายุภายใน 30 วันข้างหน้า</h4>
        <p class="text-muted text-sm mb-10">จำเป็นต้องดำเนินการทันทีเพื่อให้ยังคงเป็นไปตามข้อกำหนดของแผนกโรคหัวใจและแผนกระบบประสาท</p>
        <div class="alert-links">
          <a href="#" class="link-danger fw-bold">ดูใบอนุญาตที่หมดอายุ ➔</a>
          <a href="#" class="link-muted ml-15">ปิด / ยกเลิกการแจ้งเตือน</a>
        </div>
      </div>
      <div class="alert-stats">
        <div class="alert-stat-box border-right">
          <h2 class="text-danger">3</h2>
          <p class="text-muted fw-bold">EXPIRED<br><span class="text-sm">หมดอายุแล้ว</span></p>
        </div>
        <div class="alert-stat-box">
          <h2 class="text-warning">5</h2>
          <p class="text-muted fw-bold">EXPIRING SOON<br><span class="text-sm">หมดอายุเร็ว ๆ นี้</span></p>
        </div>
      </div>
    </div>

    <div class="stats-grid mt-20">
      <div class="stat-card">
        <div class="stat-header">
          <div class="icon-box blue-light">👤</div>
          <span class="badge-sm bg-gray">Total Staff</span>
        </div>
        <h2>142</h2>
        <p class="fw-bold mb-0">พนักงานทั้งหมด</p>
        <p class="text-muted text-sm mt-5">บุคลากรที่ปฏิบัติงานอยู่ในปัจจุบัน</p>
      </div>

      <div class="stat-card border-top-green">
        <div class="stat-header">
          <div class="icon-box green-light">🟢</div>
          <span class="text-success fw-bold text-sm">94%</span>
        </div>
        <h2>318</h2>
        <p class="fw-bold mb-0">ใบอนุญาตที่ยังไม่หมดอายุ</p>
        <p class="text-muted text-sm mt-5">Valid Licenses</p>
      </div>

      <div class="stat-card border-top-orange">
        <div class="stat-header">
          <div class="icon-box orange-light">🕒</div>
          <span class="badge-sm bg-orange-light text-orange">Action Needed / ต้องดำเนินการ</span>
        </div>
        <h2>8</h2>
        <p class="fw-bold mb-0">ใกล้หมดอายุ < 30 วัน</p>
        <p class="text-muted text-sm mt-5">Expiring < 30 Days</p>
      </div>

      <div class="stat-card border-top-purple">
        <div class="stat-header">
          <div class="icon-box purple-light">✔️</div>
          <span class="text-muted fw-bold text-sm">This Month / เดือนนี้</span>
        </div>
        <h2>12</h2>
        <p class="fw-bold mb-0">การต่ออายุที่เสร็จสมบูรณ์แล้ว</p>
        <p class="text-muted text-sm mt-5">Renewals Completed</p>
      </div>
    </div>

    <div class="table-card mt-20">
      <div class="table-header-flex">
        <div>
          <h3 class="m-0">All Licenses</h3>
          <p class="text-muted text-sm m-0">Total: 362</p>
        </div>
        <div class="table-tools">
          <div class="search-box">
            <span>🔍</span> <input type="text" placeholder="Search provider...">
          </div>
          <select class="select-modern"><option>All Departments 🔽</option></select>
          <button class="btn-filter">🎛️ Status</button>
          <button class="btn-filter">📥</button>
        </div>
      </div>

      <table class="license-table mt-15">
        <thead>
          <tr>
            <th>ชื่อบุคลากร<br><span class="text-xs text-muted">PROVIDER NAME</span></th>
            <th>แผนก<br><span class="text-xs text-muted">DEPARTMENT</span></th>
            <th>ประเภทใบอนุญาต<br><span class="text-xs text-muted">LICENSE TYPE</span></th>
            <th>หมายเลขใบอนุญาต<br><span class="text-xs text-muted">LICENSE NUMBER</span></th>
            <th>วันหมดอายุ<br><span class="text-xs text-muted">EXPIRY DATE</span></th>
            <th>สถานะ<br><span class="text-xs text-muted">STATUS</span></th>
            <th>การดำเนินการ<br><span class="text-xs text-muted">ACTIONS</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="staff-cell">
                <div class="avatar">W</div>
                <div><strong>Wannisa Srivayram</strong><br><span class="text-muted text-xs">ID : 123131</span></div>
              </div>
            </td>
            <td><span class="badge-dept">Cardiology</span></td>
            <td>Medical State<br><span class="text-muted text-xs">License</span></td>
            <td>MD123456789</td>
            <td class="text-danger fw-bold">Feb 14, 2026 ❗</td>
            <td><span class="badge-status-red">● Expired</span></td>
            <td><button class="btn-action-red">Renew Now</button></td>
          </tr>
          <tr>
            <td>
              <div class="staff-cell">
                <div class="avatar">W</div>
                <div><strong>Wannisa Srivayram</strong><br><span class="text-muted text-xs">ID : 123131</span></div>
              </div>
            </td>
            <td><span class="badge-dept purple">Cardiology</span></td>
            <td>Medical State<br><span class="text-muted text-xs">License</span></td>
            <td>MD123456789</td>
            <td class="fw-bold">Feb 18, 2026 <span class="badge-days">5 Day</span></td>
            <td><span class="badge-status-orange">● Expired</span></td>
            <td><button class="btn-action-blue">Renew</button></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
/* ภาพรวม */
.license-modern-wrapper { padding: 10px 20px; animation: fadeIn 0.4s ease; font-family: sans-serif; }
.mt-20 { margin-top: 20px; } .mt-15 { margin-top: 15px; } .mb-10 { margin-bottom: 10px; } .mb-5 { margin-bottom: 5px; } .m-0 { margin: 0; } .ml-15 { margin-left: 15px; }

/* Header */
.header-action-row { display: flex; justify-content: space-between; align-items: center; }
.page-title { margin: 0; font-size: 26px; color: #1e293b; font-weight: bold; background: white; padding: 10px 25px; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 2px 5px rgba(0,0,0,0.02);}
.header-tools { display: flex; gap: 15px; align-items: center; }
.icon-btn { background: white; border: 1px solid #cbd5e1; border-radius: 50%; width: 45px; height: 45px; cursor: pointer; font-size: 18px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.btn-primary-upload { background: #1e3a8a; color: white; border: none; padding: 8px 25px; border-radius: 12px; font-weight: bold; cursor: pointer; text-align: center; line-height: 1.2; box-shadow: 0 4px 6px rgba(30, 58, 138, 0.2); transition: 0.2s;}
.btn-primary-upload:hover { background: #1e40af; transform: translateY(-2px); }
.btn-primary-upload small { font-weight: normal; font-size: 12px; color: #cbd5e1; }

/* Alert Banner */
.alert-banner-card { background: #fff5f5; border: 1px solid #fecaca; border-radius: 15px; display: flex; justify-content: space-between; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
.alert-content { max-width: 60%; }
.text-danger { color: #dc2626; } .text-warning { color: #d97706; }
.text-muted { color: #64748b; } .text-sm { font-size: 13px; } .text-xs { font-size: 11px; }
.fw-bold { font-weight: bold; }
.link-danger { color: #dc2626; text-decoration: none; } .link-muted { color: #64748b; text-decoration: none; }
.alert-stats { display: flex; gap: 30px; text-align: center; align-items: center;}
.alert-stat-box h2 { font-size: 36px; margin: 0 0 5px 0; }
.border-right { border-right: 1px solid #fecaca; padding-right: 30px; }

/* Stats Grid */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.stat-card { background: white; border-radius: 15px; padding: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
.border-top-green { border-top: 4px solid #10b981; }
.border-top-orange { border-top: 4px solid #f59e0b; }
.border-top-purple { border-top: 4px solid #8b5cf6; }
.stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
.icon-box { width: 35px; height: 35px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.blue-light { background: #e0f2fe; } .green-light { background: #d1fae5; } .orange-light { background: #fef3c7; } .purple-light { background: #ede9fe; }
.badge-sm { font-size: 11px; padding: 3px 8px; border-radius: 4px; }
.bg-gray { background: #f1f5f9; color: #64748b; } .bg-orange-light { background: #fef3c7; } .text-orange { color: #d97706; }
.text-success { color: #10b981; }
.stat-card h2 { margin: 0 0 5px 0; font-size: 32px; color: #1e293b; }

/* Table Section */
.table-card { background: white; border-radius: 15px; padding: 25px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
.table-header-flex { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; }
.table-tools { display: flex; gap: 10px; }
.search-box { display: flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 8px; padding: 5px 15px; background: #f8fafc; }
.search-box input { border: none; background: transparent; outline: none; margin-left: 10px; width: 180px; }
.select-modern, .btn-filter { border: 1px solid #cbd5e1; border-radius: 8px; padding: 6px 15px; background: white; color: #475569; font-weight: bold; cursor: pointer; }

/* Table Styles */
.license-table { width: 100%; border-collapse: collapse; text-align: left; }
.license-table th { padding: 12px 10px; border-bottom: 2px solid #e2e8f0; font-size: 14px; color: #1e293b; }
.license-table td { padding: 15px 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #334155; vertical-align: middle; }
.staff-cell { display: flex; align-items: center; gap: 12px; }
.avatar { width: 35px; height: 35px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #64748b; }
.badge-dept { background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px; }
.badge-dept.purple { background: #f3e8ff; color: #7e22ce; }
.badge-status-red { color: #dc2626; font-weight: bold; }
.badge-status-orange { color: #d97706; font-weight: bold; }
.badge-days { background: #fef3c7; color: #d97706; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-left: 5px; }
.btn-action-red { background: #ef4444; color: white; border: none; padding: 6px 15px; border-radius: 6px; font-weight: bold; cursor: pointer; }
.btn-action-blue { background: #3b82f6; color: white; border: none; padding: 6px 15px; border-radius: 6px; font-weight: bold; cursor: pointer; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>