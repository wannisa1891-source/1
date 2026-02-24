<template>
  <div class="schedule-wrapper fade-in">
    <div class="header-title">
      <h2>ปฏิทินตารางเวร</h2>
    </div>

    <div class="controls-bar">
      <div class="left-controls">
        <div class="month-nav">
          <button class="nav-btn">&lt;</button>
          <span class="current-month">October 2026</span>
          <button class="nav-btn">&gt;</button>
        </div>
        <div class="view-toggles">
          <button class="toggle-btn active">เดือน</button>
          <button class="toggle-btn">สัปดาห์</button>
          <button class="toggle-btn">วัน</button>
        </div>
        <select class="dept-select"><option>All Departments 🔽</option></select>
      </div>

      <div class="right-controls">
        <div class="legend-group">
          <span class="legend-item"><span class="dot green"></span> เวรเช้า(M)</span>
          <span class="legend-item"><span class="dot blue"></span> เวรบ่าย(A)</span>
          <span class="legend-item"><span class="dot red"></span> เวรดึก(N)</span>
        </div>
        <button class="action-btn">🖨️ Print</button>
        <button class="action-btn">📄 Export PDF</button>
      </div>
    </div>

    <div class="calendar-card">
      <div class="calendar-header">
        <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
      </div>
      <div class="calendar-grid">
        <div class="cal-day empty"><span class="date">29</span></div>
        <div class="cal-day empty"><span class="date">30</span></div>
        <div class="cal-day">
          <span class="date">1</span>
          <div class="shift-block shift-m">08:00 - 16:00 (Dr. James)</div>
          <div class="shift-block shift-a">16:00 - 00:00 (Nurse Joy)</div>
        </div>
        <div class="cal-day highlight-today">
          <span class="date">2</span>
          <div class="shift-block shift-m">08:00 - 16:00 (Dr. Emily)</div>
          <div class="shift-block shift-n">00:00 - 08:00 (Dr. Mike)</div>
        </div>
        <div class="cal-day">
          <span class="date">3</span>
          <div class="shift-block shift-m">08:00 - 16:00 (Nurse Sarah)</div>
          <div class="shift-block shift-a">16:00 - 00:00 (Dr. Alan)</div>
          <div class="shift-more">+ 2 more</div>
        </div>
        <div class="cal-day">
          <span class="date">4</span>
          <div class="shift-block shift-m">08:00 - 16:00 (Dr. James)</div>
        </div>
        <div class="cal-day">
          <span class="date">5</span>
          <span class="badge-critical">🔴 CRITICAL</span>
          <div class="shift-block shift-n mt-5">00:00 - 08:00 (Dr. Mike)</div>
        </div>
      </div>
    </div>

    <div class="dashboard-bottom-grid">
      
      <div class="summary-card">
        <div class="card-header-flex">
          <div>
            <h3>สรุปเวรรายบุคคล (Staff Summary)</h3>
            <p class="subtitle-sm">ตุลาคม 2026</p>
          </div>
          <a href="#" class="link-blue">ดูทั้งหมด</a>
        </div>
        <table class="summary-table">
          <thead>
            <tr><th>STAFF NAME</th><th>TOTAL DAYS</th><th>NIGHT SHIFTS</th><th>OT (HRS)</th><th>ACTION</th></tr>
          </thead>
          <tbody>
            <tr>
              <td class="staff-info"><div class="avatar">SM</div><div><strong>Somchai M.</strong><br><span>Doctor</span></div></td>
              <td class="text-center">22</td><td class="text-center">4</td><td class="text-center text-blue">12.5</td><td class="text-center">...</td>
            </tr>
            <tr>
              <td class="staff-info"><div class="avatar pink">NM</div><div><strong>Nattaya M.</strong><br><span>Nurse</span></div></td>
              <td class="text-center">20</td><td class="text-center">8</td><td class="text-center text-blue">4.0</td><td class="text-center">...</td>
            </tr>
            <tr>
              <td class="staff-info"><div class="avatar blue">WJ</div><div><strong>Wichai J.</strong><br><span>Doctor</span></div></td>
              <td class="text-center">18</td><td class="text-center">2</td><td class="text-center text-blue">0.0</td><td class="text-center">...</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="status-card">
        <div class="card-header-flex">
          <h3>สถานะแผนก (Dept. Status)</h3>
          <select class="mini-select"><option>All Departments 🔽</option></select>
        </div>
        
        <div class="status-widgets">
          <div class="widget-box light-green">
            <p>Staff Completeness</p>
            <div class="percent">92% <span class="trend up">↑ 2%</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width: 92%;"></div></div>
          </div>
          <div class="widget-box light-red alert">
            <p>⚠️ คนไม่พอ (Shortage)</p>
            <p class="alert-desc">วันที่ 4, 12 ก.พ. ขาดเวรดึก</p>
            <button class="btn-alert-action">จัดการทันที</button>
          </div>
        </div>

        <div class="chart-container">
          <div class="donut-chart-mockup"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* ภาพรวม */
.schedule-wrapper { padding: 10px 20px; animation: fadeIn 0.4s ease; font-family: sans-serif; }
.header-title h2 { margin: 0 0 15px 0; color: #1e293b; font-size: 24px; }

/* แถบควบคุมด้านบน */
.controls-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px; }
.left-controls, .right-controls { display: flex; align-items: center; gap: 15px; }
.month-nav { display: flex; align-items: center; background: white; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; }
.nav-btn { background: #f8fafc; border: none; padding: 8px 12px; cursor: pointer; color: #475569; font-weight: bold; }
.nav-btn:hover { background: #e2e8f0; }
.current-month { padding: 0 15px; font-weight: bold; color: #334155; }
.view-toggles { display: flex; background: #f1f5f9; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; }
.toggle-btn { border: none; background: transparent; padding: 8px 15px; cursor: pointer; color: #64748b; font-weight: 600; }
.toggle-btn.active { background: white; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.dept-select { padding: 8px 15px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; background: white; }

/* Legend & Buttons */
.legend-group { display: flex; gap: 15px; background: white; padding: 8px 20px; border-radius: 30px; border: 1px solid #cbd5e1; font-size: 14px; font-weight: bold; color: #475569;}
.dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 5px; }
.dot.green { background: #10b981; } .dot.blue { background: #3b82f6; } .dot.red { background: #ef4444; }
.action-btn { background: white; border: 1px solid #cbd5e1; padding: 8px 15px; border-radius: 8px; cursor: pointer; font-weight: bold; color: #334155; transition: 0.2s;}
.action-btn:hover { background: #f8fafc; }

/* ปฏิทิน */
.calendar-card { background: white; border-radius: 15px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.02); overflow: hidden; margin-bottom: 25px; }
.calendar-header { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-weight: bold; color: #64748b; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #e2e8f0; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.cal-day { min-height: 120px; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 10px; position: relative; }
.cal-day:nth-child(7n) { border-right: none; }
.cal-day.empty { background: #f8fafc; }
.highlight-today { background: #eff6ff; }
.date { font-weight: bold; color: #475569; display: block; margin-bottom: 8px; }
.highlight-today .date { color: #3b82f6; background: #dbeafe; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }

/* บล็อกตารางเวร */
.shift-block { font-size: 11px; padding: 4px 6px; border-radius: 4px; margin-bottom: 4px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.shift-m { background: #d1fae5; color: #065f46; border-left: 3px solid #10b981; }
.shift-a { background: #dbeafe; color: #1e40af; border-left: 3px solid #3b82f6; }
.shift-n { background: #fee2e2; color: #991b1b; border-left: 3px solid #ef4444; }
.shift-more { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 5px; }
.badge-critical { position: absolute; top: 10px; right: 10px; background: #fee2e2; color: #dc2626; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: bold; }
.mt-5 { margin-top: 20px; }

/* ส่วนล่าง: สรุปและสถานะ */
.dashboard-bottom-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; }
.summary-card, .status-card { background: white; border-radius: 15px; padding: 25px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
.card-header-flex { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.card-header-flex h3 { margin: 0; color: #1e293b; font-size: 18px; }
.subtitle-sm { margin: 0; font-size: 13px; color: #94a3b8; }
.link-blue { color: #3b82f6; text-decoration: none; font-size: 14px; font-weight: 600; }

/* ตารางสรุปรายบุคคล */
.summary-table { width: 100%; border-collapse: collapse; }
.summary-table th { text-align: center; color: #94a3b8; font-size: 12px; font-weight: 600; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0; }
.summary-table th:first-child { text-align: left; }
.summary-table td { padding: 15px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }
.staff-info { display: flex; align-items: center; gap: 15px; }
.avatar { width: 40px; height: 40px; border-radius: 50%; background: #e0e7ff; color: #3730a3; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.avatar.pink { background: #fce7f3; color: #be185d; }
.avatar.blue { background: #dbeafe; color: #1e40af; }
.staff-info span { font-size: 12px; color: #94a3b8; }
.text-center { text-align: center; }
.text-blue { color: #3b82f6; font-weight: bold; }

/* สถานะแผนก */
.mini-select { border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px 8px; color: #475569; }
.status-widgets { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; }
.widget-box { padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; }
.widget-box p { margin: 0 0 10px 0; font-size: 13px; font-weight: 600; color: #64748b; }
.percent { font-size: 24px; font-weight: bold; color: #1e293b; display: flex; align-items: center; gap: 10px; margin-bottom: 10px;}
.trend.up { font-size: 12px; color: #10b981; background: #d1fae5; padding: 2px 6px; border-radius: 4px; }
.progress-bar { height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: #10b981; }

.widget-box.alert { background: #fef2f2; border-color: #fecaca; }
.widget-box.alert p { color: #dc2626; }
.alert-desc { font-size: 12px !important; color: #991b1b !important; margin-bottom: 10px !important; }
.btn-alert-action { background: transparent; border: 1px solid #ef4444; color: #ef4444; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; }

/* กราฟโดนัทจำลอง */
.chart-container { display: flex; justify-content: center; padding: 20px 0; }
.donut-chart-mockup { width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(#38bdf8 0% 25%, #4ade80 25% 55%, #fbbf24 55% 75%, #f472b6 75% 100%); mask-image: radial-gradient(circle, transparent 50%, black 51%); -webkit-mask-image: radial-gradient(circle, transparent 50%, black 51%); }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>