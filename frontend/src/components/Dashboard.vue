<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-content">

      <!-- HEADER -->
      <header class="dashboard-header">
        <div>
          <h1>สวัสดีครับ, คุณ Wanwisa 👋</h1>
          <p>ยินดีต้อนรับเข้าสู่ระบบจัดการบุคลากรโรงพยาบาลชะอำ</p>
        </div>

        <div class="header-right">
          <div class="search-box">
            <span>🔍</span>
            <input type="text" placeholder="ค้นหาข้อมูลบุคลากร..." />
          </div>
          <div class="profile">W</div>
        </div>
      </header>

      <!-- STATS -->
      <section class="stats-grid">
        <div class="card stat">
          <div class="card-top">
            <span class="icon">👥</span>
            <span class="label">Total Staff</span>
          </div>
          <div class="value">
            {{ employees?.length || 0 }}
            <span>คน</span>
          </div>
        </div>

        <div class="card stat">
          <div class="card-top">
            <span class="icon">📉</span>
            <span class="label">On Leave</span>
          </div>
          <div class="value">
            0 <span>คน</span>
          </div>
        </div>

        <div class="card stat">
          <div class="card-top">
            <span class="icon">📊</span>
            <span class="label">Vacant</span>
          </div>
          <div class="value">
            0 <span>อัตรา</span>
          </div>
        </div>
      </section>

      <!-- CHARTS -->
      <section class="charts-grid">
        <div class="card chart">
          <h3>สัดส่วนบุคลากรแยกตามวิชาชีพ</h3>
          <div class="chart-row">
            <div class="donut"></div>
            <ul class="legend">
              <li><span class="dot sage"></span> พยาบาล 50%</li>
              <li><span class="dot gold"></span> แพทย์ 10%</li>
              <li><span class="dot gray"></span> อื่นๆ 40%</li>
            </ul>
          </div>
        </div>

        <div class="card chart">
          <h3>แนวโน้มบุคลากรรายเดือน</h3>
          <div class="bars">
            <div class="bar" style="height: 60%"></div>
            <div class="bar" style="height: 40%"></div>
            <div class="bar sage-bg" style="height: 85%"></div>
            <div class="bar" style="height: 55%"></div>
            <div class="bar gold-bg" style="height: 95%"></div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <section class="footer-grid">
        <div class="card list-card">
          <h3>📌 รายการที่ต้องอนุมัติ</h3>
          <div class="list-row">
            <span>คำขอย้ายแผนก</span>
            <span class="badge">3 รายการ</span>
          </div>
          <div class="list-row">
            <span>ใบลาพักร้อน</span>
            <span class="badge">1 รายการ</span>
          </div>
        </div>

        <div class="alert-card">
          <h3>🔔 แจ้งเตือนระบบ</h3>
          <p>ใบประกอบวิชาชีพใกล้หมดอายุใน 30 วัน</p>
          <button>ดูรายละเอียดทั้งหมด</button>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
defineProps(['employees'])
</script>

<style scoped>

/* ===== Wrapper ===== */
.dashboard-wrapper {
  flex: 1;
  width: 100%;
  min-height: 100%;
  padding: 28px 36px;   /* 🔥 ค่าบาลานซ์พอดี */
  background: linear-gradient(135deg,#F5F4F1,#ECEBE6);
  box-sizing: border-box;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* ===== Header ===== */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  font-size: 24px;
  font-weight: 800;
  margin: 0;
}

.dashboard-header p {
  font-size: 14px;
  color: #777;
  margin-top: 4px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 8px 14px;
  border-radius: 12px;
  border: 1px solid #E5E5E5;
}

.search-box input {
  border: none;
  outline: none;
  background: transparent;
  font-family: Sarabun;
}

.profile {
  width: 40px;
  height: 40px;
  background: #4A5644;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== Cards ===== */
.card {
  background: white;
  border-radius: 20px;
  padding: 22px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.05);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
}

/* ===== Stats ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 20px;
}

.stat .card-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.stat .label {
  font-size: 11px;
  text-transform: uppercase;
  color: #BBB;
  font-weight: bold;
}

.value {
  font-size: 32px;
  font-weight: 800;
}

.value span {
  font-size: 14px;
  color: #999;
  margin-left: 5px;
}

/* ===== Charts ===== */
.charts-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 20px;
}

.chart h3 {
  font-size: 15px;
  margin-bottom: 18px;
}

.chart-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.donut {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: conic-gradient(
    #4A5644 0% 50%,
    #C5A073 50% 60%,
    #EFEFEF 60% 100%
  );
  position: relative;
}

.donut::after {
  content: "";
  position: absolute;
  width: 75px;
  height: 75px;
  background: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.legend {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #555;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}

.sage { background: #4A5644; }
.gold { background: #C5A073; }
.gray { background: #EFEFEF; }

.bars {
  height: 130px;
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.bar {
  width: 26px;
  background: #EAEAEA;
  border-radius: 12px;
  transition: 0.3s;
}

.bar:hover {
  transform: scaleY(1.05);
}

.sage-bg { background: #4A5644; }
.gold-bg { background: #C5A073; }

/* ===== Footer ===== */
.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.list-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #F2F2F2;
  font-weight: 600;
}

.badge {
  background: #F0F0F0;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  color: #777;
}

.alert-card {
  background: #4A5644;
  color: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 20px 40px rgba(74,86,68,0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.alert-card button {
  margin-top: 12px;
  background: rgba(255,255,255,0.15);
  border: none;
  padding: 10px;
  border-radius: 14px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.alert-card button:hover {
  background: rgba(255,255,255,0.25);
}

</style>