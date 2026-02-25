<template>
  <div class="dashboard-extreme-dark-canvas fade-in">
    
    <div class="inner-content-max-width">
      
      <header class="hospital-banner-navy-v15">
        <div class="banner-inner-flex">
          <div class="brand-group">
            <div class="logo-box-v15">🏥</div>
            <div class="text-group">
              <h1>Hospital HRM Website</h1>
              <p>ระบบบริหารจัดการทรัพยากรบุคคลและวิเคราะห์ข้อมูลสถิติโรงพยาบาล</p>
            </div>
          </div>
          <div class="user-status-badge">
            <div class="user-meta">
              <span class="role-tag">Administrator</span>
              <span class="user-display">คุณ Wanwisa</span>
            </div>
          </div>
        </div>
      </header>

      <section class="summary-section-v15">
        <div class="section-header-v15">
          <h3 class="main-title-v15">สถิติทรัพยากรบุคคล</h3>
          <button class="btn-print-v15"></button>
        </div>
        <div class="stats-grid-v15">
          <div class="stat-card-v15 border-gold">
            <div class="stat-icon-v15">👥</div>
            <div class="stat-data-v15">
              <p class="stat-label">บุคลากรทั้งหมด</p>
              <h2 class="stat-value">{{ employees.length }} <span>คน</span></h2>
            </div>
          </div>
          <div class="stat-card-v15 border-mint">
            <div class="stat-icon-v15">📅</div>
            <div class="stat-data-v15">
              <p class="stat-label">● ลางานวันนี้</p>
              <h2 class="stat-value">0 <span>คน</span></h2>
            </div>
          </div>
          <div class="stat-card-v15 border-orange">
            <div class="stat-icon-v15">⚠️</div>
            <div class="stat-data-v15">
              <p class="stat-label">อัตรากำลังว่าง</p>
              <h2 class="stat-value">0 <span>อัตรา</span></h2>
            </div>
          </div>
        </div>
      </section>

      <div class="analysis-container-v15">
        <div class="analysis-card-v15 chart-card">
          <h4 class="card-head-v15">สัดส่วนบุคลากรแยกตามวิชาชีพ</h4>
          <div class="chart-flex-render">
            <div class="donut-chart-container">
              <div class="donut-chart-v15">
                <div class="donut-inner-label">วิชาชีพ</div>
              </div>
            </div>
            <ul class="legend-list-v15">
              <li><span class="dot navy"></span> พยาบาล <span class="val">50%</span></li>
              <li><span class="dot gold"></span> แพทย์ <span class="val">10%</span></li>
              <li><span class="dot mint"></span> เจ้าหน้าที่ <span class="val">30%</span></li>
              <li><span class="dot gray"></span> อื่นๆ <span class="val">10%</span></li>
            </ul>
          </div>
        </div>

        <div class="analysis-card-v15 bar-card">
          <h4 class="card-head-v15">แนวโน้มบุคลากร (Bar Graph)</h4>
          <div class="bar-chart-render-v15">
            <div class="bars-visual-v15">
              <div class="bar navy" style="height: 80%"></div>
              <div class="bar mint" style="height: 45%"></div>
              <div class="bar navy" style="height: 60%"></div>
              <div class="bar mint" style="height: 95%"></div>
              <div class="bar navy" style="height: 35%"></div>
              <div class="bar mint" style="height: 75%"></div>
              <div class="bar gray" style="height: 50%"></div>
            </div>
            <div class="bar-labels-v15">
              <span>ม.ค.</span><span>ก.พ.</span><span>มี.ค.</span><span>เม.ย.</span><span>พ.ค.</span><span>มิ.ย.</span><span>ก.ค.</span>
            </div>
          </div>
        </div>
      </div>

      <section class="action-panel-v15">
        <div class="action-header-badge-v15">การดำเนินการ</div>
        <div class="action-grid-v15">
          <div class="action-box-v15 forest-green">
            <h4 class="box-title-v15">📌 งานรออนุมัติ</h4>
            <ul class="action-list-v15">
              <li>คำขอย้ายแผนก <span class="badge-mini">3 รายการ</span></li>
              <li>ใบลาพักร้อน <span class="badge-mini">1 รายการ</span></li>
              <li>แจ้งลาออก <span class="badge-mini">0 รายการ</span></li>
            </ul>
          </div>
          <div class="action-box-v15 warm-orange">
            <h4 class="box-title-v15">🔔 แจ้งเตือนระบบ</h4>
            <ul class="action-list-v15">
              <li>ใบประกอบวิชาชีพใกล้หมดอายุใน 30 วัน</li>
              <li>บุคลากรกำลังเกษียณอายุในปีงบประมาณนี้</li>
            </ul>
          </div>
        </div>
      </section>

      <div class="footer-spacer-v15"></div>
    </div>
  </div>
</template>

<script setup>
defineProps(['employees'])
</script>

<style scoped>
/* 🎨 จัดพื้นที่ชิดขอบและถมเทาเข้ม */
.dashboard-extreme-dark-canvas {
  flex-grow: 1;
  width: 100%;
  min-height: 100vh;
  background-color: #333333 !important; 
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow-y: auto !important;
  overflow-x: hidden;
  position: relative;
}

/* ❌ ซ่อนแถบเลื่อน */
.dashboard-extreme-dark-canvas::-webkit-scrollbar { width: 0px; background: transparent; }

.inner-content-max-width {
  width: 100%;
  max-width: 100%; 
  margin: 0; 
  padding: 30px 50px; 
  box-sizing: border-box;
}

/* 🌟 Banner Section */
.hospital-banner-navy-v15 {
  background: linear-gradient(135deg, #1e2433 0%, #334155 100%);
  color: white; padding: 28px 45px; border-radius: 20px; margin-bottom: 30px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}
.banner-inner-flex { display: flex; justify-content: space-between; align-items: center; }
.brand-group { display: flex; align-items: center; gap: 20px; }
.logo-box-v15 { background: #4f46e5; width: 60px; height: 60px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 32px; }
.text-group h1 { margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 0.5px; }
.text-group p { margin: 4px 0 0; opacity: 0.8; font-size: 14px; }
.user-display { display: block; font-weight: 800; color: #c5a073; font-size: 19px; }
.role-tag { font-size: 11px; background: rgba(197, 160, 115, 0.2); color: #c5a073; padding: 3px 12px; border-radius: 20px; font-weight: bold; margin-bottom: 5px; display: inline-block; }

/* 📊 Summary Stats */
.summary-section-v15 { background: white; border-radius: 25px; padding: 35px; margin-bottom: 35px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
.section-header-v15 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.main-title-v15 { font-weight: 800; font-size: 24px; color: #1e293b; }
.btn-print-v15 { background: #f1f5f9; border: none; padding: 10px 22px; border-radius: 12px; font-weight: 700; color: #475569; cursor: pointer; }

.stats-grid-v15 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.stat-card-v15 { background: #fcfcfc; border-radius: 22px; padding: 30px; display: flex; align-items: center; gap: 25px; border: 1px solid #f1f5f9; }
.stat-icon-v15 { width: 65px; height: 65px; border-radius: 18px; background: white; display: flex; align-items: center; justify-content: center; font-size: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.stat-value { font-size: 40px; font-weight: 800; color: #1e293b; margin: 5px 0; }
.stat-value span { font-size: 18px; color: #94a3b8; font-weight: 400; }
.stat-label { font-weight: 700; color: #64748b; font-size: 17px; margin: 0; }
.border-gold { border-left: 7px solid #c5a073; }
.border-mint { border-left: 7px solid #10b981; }
.border-orange { border-left: 7px solid #f59e0b; }

/* 🍩 Analysis (Donut + Bar) */
.analysis-container-v15 { display: grid; grid-template-columns: 1fr 1.2fr; gap: 35px; margin-bottom: 45px; }
.analysis-card-v15 { background: white; border-radius: 25px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); min-height: 250px; }
.card-head-v15 { font-weight: 800; margin-bottom: 30px; color: #1e293b; font-size: 18px; border-left: 5px solid #4f46e5; padding-left: 15px; }

/* 💡 Donut Chart CSS */
.donut-chart-v15 { 
  width: 160px; height: 160px; border-radius: 50%; 
  background: conic-gradient(#1e2433 0% 50%, #10b981 50% 80%, #c5a073 80% 90%, #e2e8f0 90% 100%) !important; 
  display: flex; align-items: center; justify-content: center; 
}
.donut-inner-label { width: 110px; height: 110px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #1e2433; font-size: 18px; }
.chart-flex-render { display: flex; align-items: center; justify-content: space-around; gap: 20px; }
.legend-list-v15 { list-style: none; padding: 0; flex-grow: 1; }
.legend-list-v15 li { padding: 10px 0; font-weight: 700; color: #475569; display: flex; align-items: center; gap: 12px; font-size: 16px; border-bottom: 1px solid #f1f5f9; }
.dot { width: 12px; height: 12px; border-radius: 4px; }
.dot.navy { background: #1e2433; }
.dot.gold { background: #c5a073; }
.dot.mint { background: #10b981; }
.dot.gray { background: #e2e8f0; }
.val { margin-left: auto; font-weight: 800; color: #94a3b8; }

/* 📊 Bar Chart CSS */
.bars-visual-v15 { display: flex; align-items: flex-end; gap: 18px; height: 150px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; }
.bar { flex: 1; border-radius: 6px 6px 0 0; transition: height 0.3s; }
.bar.navy { background: #1e2433 !important; }
.bar.mint { background: #10b981 !important; }
.bar.gray { background: #e2e8f0 !important; }
.bar-labels-v15 { display: flex; justify-content: space-between; padding-top: 30px; font-size: 14px; font-weight: 700; color: #94a3b8; }

/* 🔴 Action Panel */
.action-panel-v15 { background: white; border-radius: 25px; padding: 65px 45px 45px 45px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
.action-header-badge-v15 { background: #5d1a1a; color: white; padding: 14px 80px; border-radius: 40px; position: absolute; top: -35px; left: 50%; transform: translateX(-50%); font-weight: 800; font-size: 22px; box-shadow: 0 12px 25px rgba(0,0,0,0.4); z-index: 10; }
.action-grid-v15 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.action-box-v15 { padding: 35px; border-radius: 22px; }
.forest-green { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
.warm-orange { background: #fffbeb; color: #854d0e; border: 1px solid #fef3c7; }
.box-title-v15 { font-weight: 800; margin-bottom: 20px; font-size: 20px; border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 12px; }
.action-list-v15 { list-style: none; padding: 0; }
.action-list-v15 li { padding: 10px 0; font-weight: 600; display: flex; justify-content: space-between; align-items: center; font-size: 17px; }
.badge-mini { background: #1e2433; color: white; padding: 5px 14px; border-radius: 10px; font-size: 13px; }

.footer-spacer-v15 { height: 80px; }
.dashboard-extreme-dark-canvas {
  width: 100%; /* 💡 บังคับกว้าง 100% เพื่อให้ขยับตาม Layout พ่อ */
  flex-grow: 1;
}
/* ✨ Fade-in Animation */
.fade-in { animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
</style>