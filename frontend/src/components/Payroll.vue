<template>
  <div class="payroll-wrapper fade-in">
    
    <div class="header-banner-card">
      <h2 class="page-title">ข้อมูลการเงิน</h2>
      <div class="header-tools">
        <div class="search-box">
          <span>🔍</span>
          <input type="text" placeholder="ค้นหาการเงิน">
        </div>
        <button class="icon-btn-circle">🔔</button>
        <button class="btn-export">
          📥 Export Report<br><small>(ส่งออก (.pdf))</small>
        </button>
      </div>
    </div>

    <div class="stats-grid mt-20">
      <div class="stat-card">
        <div class="stat-icon-row">
          <div class="icon-blue">💰</div>
          <span class="text-muted fw-bold">TOTAL SALARY<br><small>(เงินเดือนรวม)</small></span>
        </div>
        <h2 class="stat-amount">฿ 400,000</h2>
        <p class="trend up">↗ 2.6% <span class="text-muted">last month</span></p>
      </div>

      <div class="stat-card">
        <div class="stat-icon-row">
          <div class="icon-orange">⏱️</div>
          <span class="text-muted fw-bold">OVERTIME COST<br><small>(ค่าล่วงเวลา)</small></span>
        </div>
        <h2 class="stat-amount">฿ 15,000</h2>
        <p class="trend down">↘ 2.6% <span class="text-muted">last month</span></p>
      </div>

      <div class="stat-card">
        <div class="stat-icon-row">
          <div class="icon-purple">🌙</div>
          <span class="text-muted fw-bold">NIGHT SHIFT<br><small>(เวรดึก)</small></span>
        </div>
        <h2 class="stat-amount">฿ 6,051</h2>
        <p class="trend up">↗ 1.2% <span class="text-muted">last month</span></p>
      </div>

      <div class="stat-card bg-navy text-white">
        <div class="action-header">
          <span>📝 Action Needed<br><small>รายการที่ต้องดำเนินการ</small></span>
        </div>
        <p class="mb-5 mt-10">Pending Approvals</p>
        <h2 class="text-yellow m-0">14 Requests</h2>
        <p class="text-xs text-light-blue mb-10">3 Overtime, 11 Leave requests</p>
        <button class="btn-review-now">Review Now<br><small>เข้าไปตรวจสอบ</small></button>
      </div>
    </div>

    <div class="charts-grid mt-20">
      
      <div class="chart-card">
        <div class="chart-header">
          <div>
            <h3 class="m-0">Department Salary Distribution</h3>
            <p class="text-muted text-sm m-0">ยอดรวมเงินเดือนแต่ละแผนก</p>
          </div>
          <div class="toggle-pill">
            <span class="active">Monthly<br><small>เดือน</small></span>
            <span>Yearly<br><small>ปี</small></span>
          </div>
        </div>
        
        <div class="bar-chart-mockup mt-20">
          <div class="y-axis">
            <span>$150k</span><span>$100k</span><span>$50k</span><span>$0</span>
          </div>
          <div class="bars-container">
            <div class="bar-col"><div class="bar" style="height: 90%;"></div><span class="bar-label">Doctors</span></div>
            <div class="bar-col"><div class="bar" style="height: 60%;"></div><span class="bar-label">Nurses</span></div>
            <div class="bar-col"><div class="bar" style="height: 75%;"></div><span class="bar-label">Admin</span></div>
            <div class="bar-col"><div class="bar" style="height: 40%;"></div><span class="bar-label">Lab Tech</span></div>
            <div class="bar-col"><div class="bar" style="height: 30%;"></div><span class="bar-label">Support</span></div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h3 class="m-0">Allowances Breakdown</h3>
        <p class="text-muted text-sm m-0">รายละเอียดเงิน</p>
        <div class="donut-chart-container mt-20">
          <div class="donut-chart"></div>
        </div>
        <div class="chart-legend mt-20">
          <span class="legend-item"><span class="dot blue"></span> Doctors (แพทย์)</span>
          <span class="legend-item"><span class="dot green"></span> Nurses (พยาบาล)</span>
          <span class="legend-item"><span class="dot pink"></span> Admin (ผู้ดูแลระบบ)</span>
          <span class="legend-item"><span class="dot yellow"></span> Lab Tech (แล็บ)</span>
          <span class="legend-item"><span class="dot purple"></span> Support (ฝ่ายสนับสนุน)</span>
        </div>
      </div>
    </div>

    <div class="table-card mt-20">
      <div class="table-header-flex">
        <div>
          <h3 class="m-0">Department Salary Distribution</h3>
          <p class="text-muted text-sm m-0">( การกระจายเงินในแผนก ) <span class="badge-blue">142 Employees (จำนวนคน)</span></p>
        </div>
        <div class="table-filters">
          <div class="filter-col">
            <label>( แผนก ทั้งหมด )</label>
            <select class="select-modern"><option>All Departments 🔽</option></select>
          </div>
          <div class="filter-col">
            <label>( สถานะ: ทั้งหมด )</label>
            <select class="select-modern"><option>Status : All 🔽</option></select>
          </div>
        </div>
      </div>

      <div class="table-responsive mt-15">
        <table class="payroll-table">
          <thead>
            <tr>
              <th>EMPLOYEE<br><small>(ชื่อพนักงาน)</small></th>
              <th>DEPARTMENT<br><small>(แผนก)</small></th>
              <th>BASE SALARY<br><small>(ฐานเงินเดือน)</small></th>
              <th>OT AMOUNT<br><small>(ค่า OT)</small></th>
              <th>NIGHT SHIFT<br><small>(ค่ากะดึก)</small></th>
              <th>TOTAL SALARY<br><small>(ยอดเงินรวม)</small></th>
              <th>STATUS<br><small>(สถานะ)</small></th>
              <th></th>
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
              <td><span class="badge-dept outline-blue">แม่บ้าน</span></td>
              <td class="fw-bold">฿2,000.00</td>
              <td class="text-blue fw-bold bg-light-blue badge-rounded">2h</td>
              <td class="fw-bold">฿0.00</td>
              <td class="fw-bold">฿2,000.00</td>
              <td><span class="status-paid">● paid</span></td>
              <td class="text-muted">•••</td>
            </tr>
            <tr>
              <td>
                <div class="staff-cell">
                  <div class="avatar">W</div>
                  <div><strong>Wannisa Srivayram</strong><br><span class="text-muted text-xs">ID : 123131</span></div>
                </div>
              </td>
              <td><span class="badge-dept outline-gray">หมอ</span></td>
              <td class="fw-bold">฿0.00</td>
              <td class="text-blue fw-bold bg-light-blue badge-rounded">20h</td>
              <td class="fw-bold">฿2,000,000.00</td>
              <td class="fw-bold">฿200,000.00</td>
              <td><span class="status-paid">● paid</span></td>
              <td class="text-muted">•••</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
// โค้ดส่วนนี้ปล่อยว่างไว้ก่อนได้ครับ (หน้านี้มีหน้าที่แสดงผลอย่างเดียว)
</script>

<style scoped>
/* ภาพรวม */
.payroll-wrapper { padding: 10px 20px; animation: fadeIn 0.4s ease; font-family: sans-serif; }
.mt-20 { margin-top: 20px; } .mt-15 { margin-top: 15px; } .mt-10 { margin-top: 10px; } .mb-5 { margin-bottom: 5px; } .mb-10 { margin-bottom: 10px; } .m-0 { margin: 0; }
.text-muted { color: #64748b; } .text-sm { font-size: 13px; } .text-xs { font-size: 11px; } .fw-bold { font-weight: bold; }

/* Header Banner */
.header-banner-card { background: white; border-radius: 15px; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 10px rgba(0,0,0,0.02); border: 1px solid #e2e8f0; }
.page-title { margin: 0; font-size: 24px; color: #1e293b; font-weight: bold; }
.header-tools { display: flex; gap: 15px; align-items: center; }
.search-box { display: flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 20px; padding: 8px 15px; background: #f8fafc; width: 250px; }
.search-box input { border: none; background: transparent; outline: none; margin-left: 10px; width: 100%; font-family: inherit; }
.icon-btn-circle { background: #f1f5f9; border: none; border-radius: 50%; width: 45px; height: 45px; cursor: pointer; font-size: 18px; color: #475569; }
.btn-export { background: transparent; border: none; color: #475569; font-weight: bold; text-align: left; cursor: pointer; display: flex; align-items: center; line-height: 1.2; }
.btn-export small { font-weight: normal; font-size: 11px; }

/* Stats Grid */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.stat-card { background: white; border-radius: 15px; padding: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
.stat-icon-row { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; line-height: 1.2; }
.icon-blue { font-size: 24px; } .icon-orange { font-size: 24px; } .icon-purple { font-size: 24px; }
.stat-amount { margin: 0 0 10px 0; font-size: 28px; color: #1e293b; }
.trend { font-size: 13px; font-weight: bold; margin: 0; }
.trend.up { color: #10b981; } .trend.down { color: #ef4444; }

/* Dark Blue Card */
.bg-navy { background: #1e3a8a; border: none; }
.text-white { color: white; }
.action-header { color: #fcd34d; font-weight: bold; text-align: right; line-height: 1.2; }
.text-yellow { color: #fde047; font-size: 32px; }
.text-light-blue { color: #bae6fd; }
.btn-review-now { background: white; color: #1e3a8a; border: none; padding: 8px 0; width: 100%; border-radius: 8px; font-weight: bold; cursor: pointer; line-height: 1.2; transition: 0.2s;}
.btn-review-now:hover { background: #f1f5f9; }

/* Charts Grid */
.charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
.chart-card { background: white; border-radius: 15px; padding: 25px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
.chart-header { display: flex; justify-content: space-between; align-items: flex-start; }
.toggle-pill { display: flex; background: #f1f5f9; border-radius: 20px; overflow: hidden; text-align: center; }
.toggle-pill span { padding: 5px 15px; font-size: 12px; font-weight: bold; color: #64748b; cursor: pointer; line-height: 1.2;}
.toggle-pill span.active { background: #e2e8f0; color: #1e293b; }

/* Bar Chart Mockup */
.bar-chart-mockup { display: flex; height: 200px; gap: 15px; }
.y-axis { display: flex; flex-direction: column; justify-content: space-between; color: #94a3b8; font-size: 12px; font-weight: bold; padding-bottom: 20px; text-align: right; }
.bars-container { flex: 1; display: flex; justify-content: space-around; align-items: flex-end; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; }
.bar-col { display: flex; flex-direction: column; align-items: center; gap: 10px; height: 100%; justify-content: flex-end; width: 15%; }
.bar { width: 100%; background: #38bdf8; border-radius: 4px 4px 0 0; transition: 0.3s; }
.bar-label { font-size: 11px; color: #64748b; font-weight: bold; }

/* Donut Chart Mockup */
.donut-chart-container { display: flex; justify-content: center; }
.donut-chart { width: 160px; height: 160px; border-radius: 50%; background: conic-gradient(#3b82f6 0% 30%, #10b981 30% 55%, #f43f5e 55% 75%, #eab308 75% 90%, #a855f7 90% 100%); mask-image: radial-gradient(circle, transparent 50%, black 51%); -webkit-mask-image: radial-gradient(circle, transparent 50%, black 51%); }
.chart-legend { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; font-size: 11px; font-weight: bold; color: #64748b;}
.legend-item { display: flex; align-items: center; gap: 5px; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot.blue { background: #3b82f6; } .dot.green { background: #10b981; } .dot.pink { background: #f43f5e; } .dot.yellow { background: #eab308; } .dot.purple { background: #a855f7; }

/* Table Section */
.table-card { background: white; border-radius: 15px; padding: 25px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
.table-header-flex { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; }
.badge-blue { background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 10px; font-weight: bold; margin-left: 10px;}
.table-filters { display: flex; gap: 15px; }
.filter-col { display: flex; flex-direction: column; gap: 5px; }
.filter-col label { font-size: 12px; font-weight: bold; color: #1e293b; text-align: center;}
.select-modern { border: 1px solid #cbd5e1; border-radius: 20px; padding: 6px 15px; background: white; color: #475569; font-weight: bold; outline: none; }

.table-responsive { overflow-x: auto; }
.payroll-table { width: 100%; border-collapse: collapse; text-align: center; }
.payroll-table th { color: #64748b; font-size: 12px; padding: 15px 10px; border-bottom: 2px solid #e2e8f0; line-height: 1.2; }
.payroll-table th small { font-weight: normal; }
.payroll-table td { padding: 15px 10px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; color: #1e293b; }
.staff-cell { display: flex; align-items: center; gap: 12px; text-align: left; }
.avatar { width: 35px; height: 35px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #64748b; }

.badge-dept { padding: 4px 12px; border-radius: 15px; font-weight: bold; font-size: 13px; }
.outline-blue { border: 2px solid #3b82f6; color: #3b82f6; }
.outline-gray { border: 1px solid #cbd5e1; color: #64748b; background: #f8fafc; }

.text-blue { color: #3b82f6; }
.bg-light-blue { background: #e0f2fe; }
.badge-rounded { padding: 2px 10px; border-radius: 10px; }

.status-paid { color: #10b981; font-weight: bold; background: #d1fae5; padding: 4px 12px; border-radius: 15px; font-size: 12px; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>