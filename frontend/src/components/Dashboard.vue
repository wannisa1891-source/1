<template>
  <section class="dashboard-area fade-in">
    
    <div class="summary-section card-box">
      <h3 class="section-title">ข้อมูลสรุป</h3>
      <div class="top-stat-grid">
        <div class="stat-card-v2 brown">
          <p>บุคลากรทั้งหมด</p>
          <h2>{{ employees.length }}</h2>
        </div>
        <div class="stat-card-v2 gold">
          <p><span class="dot">●</span> ลางานวันนี้</p>
          <h2>0</h2>
        </div>
        <div class="stat-card-v2 brown">
          <p>อัตรากำลังว่าง<br><small>แผนกที่ขาดคน</small></p>
          <h2>5</h2>
        </div>
      </div>
    </div>

    <div class="analysis-grid mt-20">
      <div class="analysis-card card-box">
        <h3 class="section-title">สัดส่วนบุคลากรแยกตามวิชาชีพ</h3>
        <div class="chart-flex">
          <div class="pie-chart-mock">
            <div class="pie-inner"></div>
          </div>
          <ul class="chart-legend">
            <li>▶ แพทย์ <span class="percent">-- %</span></li>
            <li>▶ พยาบาล <span class="percent">-- %</span></li>
            <li>▶ เภสัชกร <span class="percent">-- %</span></li>
            <li>▶ เจ้าหน้าที่ <span class="percent">-- %</span></li>
            <li>▶ ฯลฯ</li>
          </ul>
        </div>
      </div>

      <div class="analysis-card card-box bg-light-green">
        <div class="bar-graph-mock">
          <p class="text-center text-muted">Bar Graph</p>
          <div class="bar-placeholder">📊</div>
        </div>
      </div>
    </div>

    <div class="action-grid mt-20">
      <div class="action-card card-box text-center">
        <div class="action-badge">การดำเนินการ</div>
        <div class="action-container">
          <div class="action-item green">
            <h4>งานรออนุมัติ</h4>
            <ul>
              <li>คำขอย้ายแผนก</li>
              <li>ใบลาพักร้อน</li>
              <li>แจ้งลาออก</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="alert-card card-box">
        <div class="alert-item yellow">
          <h4>แจ้งเตือนระบบ</h4>
          <ul>
            <li>ใบประกอบฯ ใกล้หมดอายุ</li>
            <li>กำลังเกษียณในปีนี้</li>
          </ul>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
defineProps(['employees'])
</script>

<style scoped>
.dashboard-area { padding: 5px; }
.card-box { background: white; border-radius: 25px; padding: 20px; border: 1px solid #e2e8f0; }
.section-title { margin-top: 0; color: #1e293b; font-size: 18px; margin-bottom: 15px; }
.mt-20 { margin-top: 20px; }

/* Top Stat */
.top-stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.stat-card-v2 { padding: 25px; border-radius: 20px; text-align: center; color: white; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.stat-card-v2.brown { background: #bcaaa4; }
.stat-card-v2.gold { background: #c5a073; }
.stat-card-v2 h2 { font-size: 36px; margin: 10px 0 0; }
.dot { color: white; margin-right: 5px; }

/* Analysis Section */
.analysis-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px; }
.chart-flex { display: flex; align-items: center; gap: 30px; padding: 10px; }
.pie-chart-mock { width: 140px; height: 140px; background: #eee; border-radius: 50%; position: relative; overflow: hidden; border: 1px solid #ddd; }
.pie-inner { position: absolute; top: 50%; left: 50%; width: 0; height: 0; border-style: solid; border-width: 0 40px 100px 40px; border-color: transparent transparent #ffd700 transparent; transform: translate(-50%, -50%); }
.chart-legend { list-style: none; padding: 0; font-size: 14px; line-height: 2; color: #334155; }
.percent { font-weight: bold; margin-left: 10px; }
.bg-light-green { background: #f0fdf4; }
.bar-placeholder { font-size: 60px; text-align: center; padding: 20px; }

/* Action & Alert */
.action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.action-badge { background: #5d1a1a; color: white; padding: 5px 20px; border-radius: 20px; display: inline-block; margin-bottom: 15px; font-weight: bold; }
.action-item, .alert-item { border-radius: 15px; padding: 15px; text-align: left; height: 100%; }
.action-item.green { background: #4a6352; color: white; }
.alert-item.yellow { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }
.action-item h4, .alert-item h4 { margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px; }
.alert-item h4 { border-bottom-color: #fde047; }
.action-item ul, .alert-item ul { padding-left: 20px; margin-bottom: 0; font-size: 14px; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>