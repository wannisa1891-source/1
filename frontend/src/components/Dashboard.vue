<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-content">

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

      <section class="stats-grid">
        <div class="card stat clickable" @click="$emit('change-menu', 'emp-list')">
          <div class="card-top">
            <span class="icon">👥</span>
            <span class="label">บุคลากรทั้งหมด</span>
          </div>
          <div class="value">
            {{ employees?.length || 0 }}
            <span>คน</span>
          </div>
        </div>

        <div class="card stat clickable" @click="$emit('change-menu', 'leave-sys')">
          <div class="card-top">
            <span class="icon">📉</span>
            <span class="label">ลางานวันนี้</span>
          </div>
          <div class="value">
            0 <span>คน</span>
          </div>
        </div>

        <div class="card stat clickable" @click="$emit('change-menu', 'org-struct')">
          <div class="card-top">
            <span class="icon">📊</span>
            <span class="label">อัตรากำลังว่างแผนกที่ขาดคน</span>
          </div>
          <div class="value">
            0 <span>อัตรา</span>
          </div>
        </div>
      </section>

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
defineEmits(['change-menu'])
</script>

<style scoped>
/* 🌟 สไตล์สำหรับการ์ดที่คลิกได้ (clickable) */
.clickable {
  cursor: pointer;
  transition: all 0.2s ease-in-out !important;
}

.clickable:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
  background-color: #fafafa !important;
}

.clickable:active {
  transform: scale(0.96) !important;
}

.dashboard-wrapper {
  flex: 1;
  width: 100%;
  height: 100vh;
  padding: 2.5vh 40px;
  background: #636874; /* สีพื้นหลังที่คุณเลือกไว้ */
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.dashboard-content {
  width: 100%;
  max-width: 1280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.dashboard-header h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  color: #1e2433;
}

.dashboard-header p {
  font-size: 15px;
  color: #777;
  margin-top: 5px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 12px 20px;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.search-box input {
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Sarabun';
  width: 220px;
  font-size: 15px;
}

.profile {
  width: 45px;
  height: 45px;
  background: #6c500a;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.card {
  background: white;
  border-radius: 35px;
  padding: 3vh 35px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  flex: 1;
}

.stat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.stat .card-top {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.icon {
  background: #F8F7F2;
  padding: 15px;
  border-radius: 20px;
  font-size: 24px;
}

.stat .label {
  font-size: 12px;
  text-transform: uppercase;
  color: #AAA;
  font-weight: 800;
  letter-spacing: 1px;
}

.value {
  font-size: 46px;
  font-weight: 900;
  color: #1e2433;
  margin-top: auto;
}

.value span {
  font-size: 16px;
  color: #999;
  font-weight: 500;
  margin-left: 5px;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 25px;
  flex: 1.3;
}

.chart h3 {
  font-size: 18px;
  font-weight: 800;
  color: #333;
  margin-bottom: 20px;
}

.chart-row {
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: center;
  flex: 1;
}

.donut {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: conic-gradient( #4A5644 0% 50%, #C5A073 50% 60%, #EFEFEF 60% 100% );
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
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #555;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 12px;
}

.sage { background: #4A5644; }
.gold { background: #C5A073; }
.gray { background: #EFEFEF; }

.bars {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 20px;
  flex: 1;
}

.bar {
  width: 35px;
  background: #F2F2F2;
  border-radius: 12px;
  transition: 0.3s;
}

.bar:hover {
  transform: scaleY(1.05);
}

.sage-bg { background: #4A5644; }
.gold-bg { background: #C5A073; }

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  flex: 1;
}

.list-card h3 {
  font-size: 18px;
  font-weight: 800;
  color: #333;
  margin-bottom: 10px;
}

.list-row {
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 2px solid #F9F9F9;
  font-weight: 700;
  color: #555;
}

.list-row:last-child {
  border-bottom: none;
}

.badge {
  background: #F2F2F2;
  padding: 6px 15px;
  border-radius: 12px;
  font-size: 12px;
  color: #888;
}

.alert-card {
  background: #A39160; /* สีทองที่คุณเลือกไว้ */
  color: white;
  border-radius: 35px;
  padding: 3vh 40px;
  box-shadow: 0 20px 45px rgba(74,86,68,0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.alert-card h3 {
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 5px;
}

.alert-card p {
  opacity: 0.8;
  font-size: 15px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.alert-card button {
  background: rgba(255,255,255,0.15);
  border: none;
  padding: 14px;
  border-radius: 20px;
  color: white;
  font-weight: 900;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
}

.alert-card button:hover {
  background: rgba(255,255,255,0.25);
  transform: translateY(-2px);
}
</style>