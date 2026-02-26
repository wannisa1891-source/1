<template>
  <div class="dashboard-wrapper">
    <div class="bg-decoration"></div>

    <div class="dashboard-content">
      <header class="dashboard-header">
        <div class="welcome-text">
          <span class="date-chip">26 กุมภาพันธ์ 2569</span>
          <h1>สวัสดีครับ, <span class="name">คุณ Wanwisa</span></h1>
          <p>มาดูความเคลื่อนไหวของบุคลากรวันนี้กันครับ</p>
        </div>

        <div class="header-actions">
          <div class="search-glass">
            <span class="icon">🔍</span>
            <input type="text" placeholder="ค้นหาข้อมูล..." />
          </div>
          <div class="user-profile">
            <div class="avatar">W</div>
            <div class="status-dot"></div>
          </div>
        </div>
      </header>

      <div class="main-grid">
        
        <div class="left-col">
          <section class="stats-row">
            <div class="glass-card stat clickable" @click="$emit('change-menu', 'emp-list')">
              <div class="stat-head">
                <div class="icon-circle sage">👥</div>
                <span class="trend up">↑ 2%</span>
              </div>
              <div class="stat-body">
                <span class="label">บุคลากรทั้งหมด</span>
                <h2 class="value">{{ employees?.length || 0 }} <small>คน</small></h2>
              </div>
            </div>

            <div class="glass-card stat clickable" @click="$emit('change-menu', 'leave-sys')">
              <div class="stat-head">
                <div class="icon-circle red">📉</div>
                <span class="trend">วันนี้</span>
              </div>
              <div class="stat-body">
                <span class="label">ลางาน/พักร้อน</span>
                <h2 class="value">0 <small>คน</small></h2>
              </div>
            </div>

            <div class="glass-card stat clickable" @click="$emit('change-menu', 'org-struct')">
              <div class="stat-head">
                <div class="icon-circle gold">📊</div>
                <span class="trend">คงเหลือ</span>
              </div>
              <div class="stat-body">
                <span class="label">อัตรากำลังว่าง</span>
                <h2 class="value">0 <small>อัตรา</small></h2>
              </div>
            </div>
          </section>

          <section class="chart-section glass-card">
            <div class="card-title">
              <h3>สถิติวิชาชีพบุคลากร</h3>
              <div class="tabs">
                <span class="active">ทั้งหมด</span>
                <span>รายแผนก</span>
              </div>
            </div>
            <div class="chart-main">
              <div class="viz-container">
                <div class="donut-box">
                  <svg viewBox="0 0 36 36" class="circular-chart">
                    <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path class="circle sage-path" stroke-dasharray="50, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                    <path class="circle gold-path" stroke-dasharray="10, 100" stroke-dashoffset="-50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                  </svg>
                  <div class="percentage">100%</div>
                </div>
                <div class="custom-legend">
                  <div class="leg-item"><span class="dot sage"></span> พยาบาล <strong>50%</strong></div>
                  <div class="leg-item"><span class="dot gold"></span> แพทย์ <strong>10%</strong></div>
                  <div class="leg-item"><span class="dot gray"></span> อื่นๆ <strong>40%</strong></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="right-col">
          <div class="glass-card task-card">
            <h3>📌 รายการรออนุมัติ</h3>
            <div class="task-list">
              <div class="task-item">
                <div class="task-icon">📄</div>
                <div class="task-info">
                  <p>คำขอย้ายแผนก</p>
                  <span>3 รายการใหม่</span>
                </div>
                <button class="btn-arrow">→</button>
              </div>
              <div class="task-item">
                <div class="task-icon">🏖️</div>
                <div class="task-info">
                  <p>ใบลาพักร้อน</p>
                  <span>1 รายการใหม่</span>
                </div>
                <button class="btn-arrow">→</button>
              </div>
            </div>
          </div>

          <div class="alert-premium">
            <div class="premium-content">
              <span class="tag">System Alert</span>
              <h4>ใบประกอบวิชาชีพ</h4>
              <p>พบข้อมูลใกล้หมดอายุใน 30 วัน</p>
              <button class="btn-action">ตรวจสอบทันที</button>
            </div>
            <div class="premium-bg-icon">🔔</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap');

/* Base & Layout */
.dashboard-wrapper {
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Sarabun', sans-serif;
  color: #1a1a1a;
  padding: 40px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.bg-decoration {
  position: absolute;
  top: -10%; right: -5%;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(74,86,68,0.08) 0%, rgba(255,255,255,0) 70%);
  z-index: 0;
}

.dashboard-content {
  width: 100%;
  max-width: 1400px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.date-chip {
  background: #fff;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  color: #4A5644;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.welcome-text h1 { font-size: 32px; font-weight: 700; margin: 10px 0 5px 0; }
.welcome-text h1 .name { color: #4A5644; }
.welcome-text p { color: #666; margin: 0; }

.header-actions { display: flex; align-items: center; gap: 20px; }

.search-glass {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
  border: 1px solid white;
  padding: 10px 18px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-glass input {
  border: none; outline: none; background: transparent; width: 180px;
}

.user-profile {
  position: relative;
  width: 45px; height: 45px;
}

.avatar {
  width: 100%; height: 100%;
  background: #4A5644; color: white;
  border-radius: 15px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700;
}

.status-dot {
  position: absolute; bottom: -2px; right: -2px;
  width: 12px; height: 12px;
  background: #4cd137; border: 2px solid #f0f2f5; border-radius: 50%;
}

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.left-col { display: flex; flex-direction: column; gap: 30px; }

/* Stats */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 30px;
  padding: 25px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.03);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.clickable:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 45px rgba(0,0,0,0.07);
  background: white;
}

.stat-head {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;
}

.icon-circle {
  width: 50px; height: 50px; border-radius: 18px;
  display: flex; align-items: center; justify-content: center; font-size: 20px;
}

.icon-circle.sage { background: #EBF0E9; color: #4A5644; }
.icon-circle.red { background: #FFF0F0; color: #E74C3C; }
.icon-circle.gold { background: #FFF9EB; color: #C5A073; }

.trend { font-size: 12px; font-weight: 700; color: #999; }
.trend.up { color: #27ae60; }

.stat-body .label { font-size: 13px; color: #888; font-weight: 600; display: block; margin-bottom: 5px; }
.stat-body .value { font-size: 36px; font-weight: 700; margin: 0; }
.stat-body .value small { font-size: 16px; color: #bbb; font-weight: 400; }

/* Chart Section */
.chart-section .card-title {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;
}

.tabs {
  background: #f0f2f5; padding: 5px; border-radius: 12px; display: flex; gap: 5px;
}

.tabs span {
  padding: 6px 15px; border-radius: 8px; font-size: 12px; cursor: pointer; font-weight: 600;
}

.tabs span.active { background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }

.viz-container {
  display: flex; justify-content: space-around; align-items: center; padding: 20px 0;
}

.donut-box { position: relative; width: 180px; }
.circular-chart { display: block; margin: 0 auto; max-width: 100%; }
.circle-bg { fill: none; stroke: #eee; stroke-width: 3.8; }
.circle { fill: none; stroke-width: 3.8; stroke-linecap: round; transition: stroke-dasharray 1s ease; }
.sage-path { stroke: #4A5644; }
.gold-path { stroke: #C5A073; }

.percentage {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  font-size: 24px; font-weight: 700;
}

.custom-legend { display: flex; flex-direction: column; gap: 15px; }
.leg-item { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #555; }
.dot { width: 10px; height: 10px; border-radius: 50%; }

/* Task Card */
.task-card h3 { font-size: 18px; margin-top: 0; margin-bottom: 20px; }
.task-list { display: flex; flex-direction: column; gap: 15px; }

.task-item {
  background: #F9FBFA; padding: 15px; border-radius: 20px;
  display: flex; align-items: center; gap: 15px;
}

.task-icon { font-size: 20px; }
.task-info { flex: 1; }
.task-info p { margin: 0; font-weight: 700; font-size: 14px; }
.task-info span { font-size: 12px; color: #888; }

.btn-arrow {
  background: white; border: none; width: 35px; height: 35px; border-radius: 10px;
  cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: 0.3s;
}
.btn-arrow:hover { background: #4A5644; color: white; }

/* Alert Premium */
.alert-premium {
  margin-top: 30px;
  background: linear-gradient(135deg, #4A5644 0%, #2d3436 100%);
  border-radius: 30px;
  padding: 30px;
  color: white;
  position: relative;
  overflow: hidden;
}

.premium-content { position: relative; z-index: 2; }
.tag {
  background: rgba(255,255,255,0.2);
  padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: 700; text-transform: uppercase;
}

.alert-premium h4 { font-size: 20px; margin: 15px 0 5px 0; }
.alert-premium p { font-size: 14px; opacity: 0.8; margin-bottom: 25px; }

.btn-action {
  background: #C5A073; border: none; padding: 12px 25px; border-radius: 12px;
  color: white; font-weight: 700; cursor: pointer; transition: 0.3s;
}

.btn-action:hover { background: #D4B185; transform: scale(1.05); }

.premium-bg-icon {
  position: absolute; right: -20px; bottom: -20px;
  font-size: 120px; opacity: 0.1; transform: rotate(-15deg);
}
</style>