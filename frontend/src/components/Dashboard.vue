<template>
  <div class="dashboard-extreme-dark-canvas fade-in">
    
    <div class="inner-content-max-width">
      
      <header class="hospital-banner-navy-v13">
        <div class="banner-inner-flex">
          <div class="brand-group">
            <div class="logo-box-v13">🏥</div>
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

      <section class="summary-section-v13">
        <div class="section-header-v13">
          <h3 class="main-title-v13">สถิติทรัพยากรบุคคล</h3>
          <button class="btn-print-v13">📋 พิมพ์รายงาน</button>
        </div>
        <div class="stats-grid-v13">
          <div class="stat-card-v13 border-gold">
            <div class="stat-icon-v13">👥</div>
            <div class="stat-data-v13">
              <p class="stat-label">บุคลากรทั้งหมด</p>
              <h2 class="stat-value">{{ employees.length }} <span>คน</span></h2>
            </div>
          </div>
          <div class="stat-card-v13 border-mint">
            <div class="stat-icon-v13">📅</div>
            <div class="stat-data-v13">
              <p class="stat-label">● ลางานวันนี้</p>
              <h2 class="stat-value">0 <span>คน</span></h2>
            </div>
          </div>
          <div class="stat-card-v13 border-orange">
            <div class="stat-icon-v13">⚠️</div>
            <div class="stat-data-v13">
              <p class="stat-label">อัตรากำลังว่าง</p>
              <h2 class="stat-value">5 <span>อัตรา</span></h2>
            </div>
          </div>
        </div>
      </section>

      <div class="analysis-container-v13">
        <div class="analysis-card-v13">
          <h4 class="card-head-v13">สัดส่วนบุคลากรแยกตามวิชาชีพ</h4>
          <div class="chart-flex-render">
            <div class="donut-chart-box-v13">
              <div class="donut-visual-v13">
                <div class="donut-inner-v13">วิชาชีพ</div>
              </div>
            </div>
            <ul class="legend-list-v13">
              <li><span class="dot-v13 navy"></span> พยาบาล <span class="val">50%</span></li>
              <li><span class="dot-v13 gold"></span> แพทย์ <span class="val">10%</span></li>
              <li><span class="dot-v13 mint"></span> เจ้าหน้าที่ <span class="val">30%</span></li>
              <li><span class="dot-v13 gray"></span> อื่นๆ <span class="val">10%</span></li>
            </ul>
          </div>
        </div>

        <div class="analysis-card-v13">
          <h4 class="card-head-v13">แนวโน้มบุคลากร (Bar Graph)</h4>
          <div class="bar-chart-render-v13">
            <div class="bars-visual-v13">
              <div class="bar-v13 navy" style="height: 80%"></div>
              <div class="bar-v13 mint" style="height: 45%"></div>
              <div class="bar-v13 navy" style="height: 60%"></div>
              <div class="bar-v13 mint" style="height: 95%"></div>
              <div class="bar-v13 navy" style="height: 35%"></div>
              <div class="bar-v13 mint" style="height: 70%"></div>
            </div>
            <div class="bar-labels-v13">
              <span>ม.ค.</span><span>ก.พ.</span><span>มี.ค.</span><span>เม.ย.</span><span>พ.ค.</span><span>มิ.ย.</span>
            </div>
          </div>
        </div>
      </div>

      <section class="action-panel-v13">
        <div class="action-header-badge-v13">การดำเนินการ</div>
        <div class="action-grid-v13">
          <div class="action-box-v13 forest-green">
            <h4 class="box-title-v13">📌 งานรออนุมัติ</h4>
            <ul class="action-list-v13">
              <li>คำขอย้ายแผนก <span class="badge-mini">3 รายการ</span></li>
              <li>ใบลาพักร้อน <span class="badge-mini">1 รายการ</span></li>
              <li>แจ้งลาออก <span class="badge-mini">0 รายการ</span></li>
            </ul>
          </div>
          <div class="action-box-v13 warm-orange">
            <h4 class="box-title-v13">🔔 แจ้งเตือนระบบ</h4>
            <ul class="action-list-v13">
              <li>ใบประกอบวิชาชีพใกล้หมดอายุใน 30 วัน</li>
              <li>บุคลากรกำลังเกษียณอายุในปีงบประมาณนี้</li>
            </ul>
          </div>
        </div>
      </section>

      <div class="footer-spacer-v13"></div>
    </div>
  </div>
</template>

<script setup>
defineProps(['employees'])
</script>

<style scoped>
/* 🎨 หัวใจสำคัญ: ถมสีเทาเข้มให้ "ทะลุ" ออกไปพื้นที่ข้างนอกทั้งหมด */
.dashboard-extreme-dark-canvas {
  /* 💡 สั่งให้ชิดขอบ Sidebar ที่สุด */
  flex-grow: 1;
  width: 100%;
  min-height: 100vh;
  
  /* 💡 ถมสีเทาเข้มตามที่คุณ Wanwisa ต้องการ */
  background-color: #333333 !important; 
  
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  
  /* ❌ กำจัดแถบเลื่อนที่ซ้อนกันน่าเกลียด */
  overflow-y: auto !important;
  overflow-x: hidden;
  position: relative;
}

/* ❌ ซ่อนแถบเลื่อน Browser ให้เนี้ยบกริบ */
.dashboard-extreme-dark-canvas::-webkit-scrollbar { width: 0px; background: transparent; }

.inner-content-max-width {
  /* 💡 ขยายเนื้อหาให้กว้างและชิดขอบหน้าจอที่สุด ไม่เว้นขอบข้างเหลือเยอะ */
  width: 100%;
  max-width: 1600px; /* คุมไม่ให้บานปลายเกินไปในจอ Ultra-Wide */
  margin: 0; 
  padding: 30px 40px; 
  box-sizing: border-box;
}

/* 🌟 Banner Section: ปรับให้ลอยเด่นบนพื้นหลังเข้ม */
.hospital-banner-navy-v13 {
  background: linear-gradient(135deg, #1e2433 0%, #334155 100%);
  color: white; 
  padding: 30px 45px; 
  border-radius: 20px; 
  margin-bottom: 30px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  width: 100%;
}
.banner-inner-flex { display: flex; justify-content: space-between; align-items: center; }
.brand-group { display: flex; align-items: center; gap: 20px; }
.logo-box-v13 { background: #4f46e5; width: 65px; height: 65px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 32px; }
.text-group h1 { margin: 0; font-size: 30px; font-weight: 800; letter-spacing: 0.5px; }
.text-group p { margin: 4px 0 0; opacity: 0.8; font-size: 14px; }
.user-display { display: block; font-weight: 800; color: #c5a073; font-size: 20px; }
.role-tag { font-size: 12px; background: rgba(197, 160, 115, 0.2); color: #c5a073; padding: 3px 12px; border-radius: 20px; font-weight: bold; margin-bottom: 5px; display: inline-block; }

/* 📊 Summary Stats Card */
.summary-section-v13 { background: white; border-radius: 25px; padding: 35px; margin-bottom: 35px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
.section-header-v13 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.main-title-v13 { font-weight: 800; font-size: 24px; color: #1e293b; margin: 0; }
.btn-print-v13 { background: #f1f5f9; border: none; padding: 10px 22px; border-radius: 12px; font-weight: 700; color: #475569; cursor: pointer; transition: 0.2s; }
.btn-print-v13:hover { background: #e2e8f0; }

.stats-grid-v13 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.stat-card-v13 { background: #fcfcfc; border-radius: 22px; padding: 30px; display: flex; align-items: center; gap: 25px; border: 1px solid #f1f5f9; transition: transform 0.3s; }
.stat-card-v13:hover { transform: translateY(-8px); box-shadow: 0 12px 25px rgba(0,0,0,0.1); }
.stat-icon-v13 { width: 65px; height: 65px; border-radius: 18px; background: white; display: flex; align-items: center; justify-content: center; font-size: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.stat-value { font-size: 40px; font-weight: 800; color: #1e293b; margin: 5px 0; }
.stat-value span { font-size: 18px; color: #94a3b8; font-weight: 400; }
.stat-label { font-weight: 700; color: #64748b; font-size: 17px; margin: 0; }

.border-gold { border-left: 7px solid #c5a073; }
.border-mint { border-left: 7px solid #10b981; }
.border-orange { border-left: 7px solid #f59e0b; }

/* 🏗️ Analysis Section (Donut + Bar) */
.analysis-container-v13 { display: grid; grid-template-columns: 1fr 1.2fr; gap: 35px; margin-bottom: 45px; }
.analysis-card-v13 { background: white; border-radius: 25px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
.card-head-v13 { font-weight: 800; margin-bottom: 30px; color: #1e293b; font-size: 18px; border-left: 5px solid #4f46e5; padding-left: 15px; }

.donut-chart-v13 { width: 160px; height: 160px; border-radius: 50%; background: conic-gradient(#1e2433 0% 50%, #10b981 50% 80%, #c5a073 80% 90%, #e2e8f0 90% 100%); display: flex; align-items: center; justify-content: center; }
.donut-inner-v13 { width: 110px; height: 110px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #1e2433; font-size: 20px; }
.chart-flex-render { display: flex; align-items: center; justify-content: space-around; gap: 20px; }
.legend-list-v13 { list-style: none; padding: 0; flex-grow: 1; }
.legend-list-v13 li { padding: 12px 0; font-weight: 700; color: #475569; display: flex; align-items: center; gap: 15px; font-size: 16px; border-bottom: 1px solid #f1f5f9; }
.dot-v13 { width: 12px; height: 12px; border-radius: 4px; }
.dot-v13.navy { background: #1e2433; }
.dot-v13.gold { background: #c5a073; }
.dot-v13.mint { background: #10b981; }
.val { margin-left: auto; font-weight: 800; color: #94a3b8; }

.bars-visual-v13 { display: flex; align-items: flex-end; gap: 18px; height: 150px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; }
.bar-v13 { flex: 1; border-radius: 6px 6px 0 0; }
.bar-v13.navy { background: #1e2433; }
.bar-v13.mint { background: #10b981; }
.bar-labels-v13 { display: flex; justify-content: space-between; padding-top: 15px; font-size: 14px; font-weight: 700; color: #94a3b8; }

/* 🔴 Action Panel */
.action-panel-v13 { background: white; border-radius: 25px; padding: 65px 45px 45px 45px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
.action-header-badge-v13 { background: #5d1a1a; color: white; padding: 14px 80px; border-radius: 40px; position: absolute; top: -35px; left: 50%; transform: translateX(-50%); font-weight: 800; font-size: 22px; box-shadow: 0 12px 25px rgba(0,0,0,0.4); z-index: 10; }
.action-grid-v13 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.action-box-v13 { padding: 35px; border-radius: 22px; }
.forest-green { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
.warm-orange { background: #fffbeb; color: #854d0e; border: 1px solid #fef3c7; }
.box-title-v13 { font-weight: 800; margin-bottom: 20px; font-size: 20px; border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 12px; }
.action-list-v13 { list-style: none; padding: 0; }
.action-list-v13 li { padding: 10px 0; font-weight: 600; display: flex; justify-content: space-between; align-items: center; font-size: 17px; }
.badge-mini { background: #1e2433; color: white; padding: 5px 14px; border-radius: 10px; font-size: 13px; }

.footer-spacer-v13 { height: 80px; }

/* ✨ Fade-in Animation */
.fade-in { animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
</style>