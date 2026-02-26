<template>
  <div class="org-modern-wrapper fade-in">
    <div class="org-header-flex">
      <h2 class="card-title">จัดการข้อมูลแผนก</h2>
      <div class="search-pill">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="ค้นหาแผนก..." class="search-input-clean">
      </div>
    </div>

    <div class="org-grid-layout">
      
      <div class="dept-tree-card">
        <h3 class="tree-title">ข้อมูลแผนก</h3>
        <p class="tree-subtitle">โรงพยาบาลชะอำ (รวม xx อัตรา)</p>
        
        <ul class="tree-list">
          <li class="tree-item active-group">
            <span class="toggle-icon">▼</span> กลุ่มงานการพยาบาล
            <ul class="sub-tree-list">
              <li>• ผู้ป่วยนอก OPD</li>
              <li>• ฉุกเฉิน ER</li>
              <li>• ผู้ป่วยใน IPD</li>
              <li>• ห้องคลอด LR</li>
              <li>• ห้องผ่าตัด OR</li>
              <li>• ทันตกรรม</li>
              <li>• กายภาพ</li>
            </ul>
          </li>
          <li class="tree-item"><span class="toggle-icon">▶</span> กลุ่มงานการแพทย์</li>
          <li class="tree-item"><span class="toggle-icon">▶</span> กลุ่มงานบริหารทั่วไป</li>
          <li class="tree-item"><span class="toggle-icon">▶</span> กลุ่มงานบริการด้านปฐมภูมิฯ</li>
          <li class="tree-item"><span class="toggle-icon">▶</span> กลุ่มงานวิชาชีพเฉพาะทางอื่นๆ</li>
          <li class="tree-item"><span class="toggle-icon">▶</span> กลุ่มงานประกันสุขภาพฯ</li>
        </ul>
      </div>

      <div class="dept-detail-area">
        
        <div class="overview-section">
          <h3 class="section-title">สรุปภาพรวม</h3>
          <div class="overview-cards">
            <div class="stat-card brown-dark">
              <h4>แผนกที่ขาดคน</h4>
              <h2>3 แห่ง</h2>
            </div>
            <div class="stat-card yellow-light">
              <h4>ตำแหน่งว่างรวม</h4>
              <h2>15 อัตรา</h2>
            </div>
          </div>
        </div>

        <div class="detail-box-card">
          <div class="detail-header-row">
            <h3 class="section-title mb-0">รายละเอียดแผนก</h3>
            <div class="dept-select-group">
              <span class="label">แผนก: </span>
              <select class="input-modern"><option>แผนก.......... 🔽</option></select>
            </div>
          </div>
          
          <div class="info-grid mt-15">
            <div class="input-row">
              <span class="label">สังกัด :</span>
              <input type="text" class="input-modern bg-disabled" disabled>
            </div>
            <div class="input-row">
              <span class="label">หัวหน้า :</span>
              <input type="text" class="input-modern bg-disabled" disabled>
            </div>
          </div>

          <div class="three-stat-cards mt-20">
            <div class="mini-stat orange-bg">
              <p>จำนวนคนเต็มอัตรา</p>
              <h3>10 คน</h3>
            </div>
            <div class="mini-stat green-bg">
              <p>อัตราปัจจุบัน</p>
              <h3>8 คน</h3>
            </div>
            <div class="mini-stat pink-bg">
              <p>ตำแหน่งว่าง</p>
              <h3>2 คน</h3>
            </div>
          </div>

          <div class="table-section mt-20">
            <div class="table-filters">
              <span>ตัวกรอง: <select class="mini-select"><option>[ ทั้งหมด 🔽 ]</option></select></span>
              <span>สถานะ: <select class="mini-select"><option>เฉพาะที่ว่าง 🔽</option></select></span>
            </div>
            
            <table class="modern-dept-table mt-10">
              <thead>
                <tr>
                  <th>เลขที่</th>
                  <th>ชื่อตำแหน่ง (จ.18)</th>
                  <th>ผู้ครองตำแหน่ง</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>xxxxx</td>
                  <td>xxxxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxxxx</td>
                  <td><button class="btn-action">จัดการ</button></td>
                </tr>
                <tr>
                  <td>xxxxx</td>
                  <td>xxxxxxxxxxxxxxx</td>
                  <td>- ว่าง -</td>
                  <td><button class="btn-action">จัดการ</button></td>
                </tr>
                <tr>
                  <td>xxxxx</td>
                  <td>xxxxxxxxxxxxxxx</td>
                  <td>xxxxxxxxxxxxxxx</td>
                  <td><button class="btn-action">จัดการ</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style>
body {
  margin: 0;
  background: #f4f6f9;
}
.sidebar {
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
}

.sidebar .logo {
  font-weight: 700;
  font-size: 22px;
  color: #002D55;
}

.sidebar .menu-item {
  padding: 10px 18px;
  font-size: 14px;
  color: #334155;
  border-radius: 6px;
  transition: 0.2s;
}

.sidebar .menu-item:hover {
  background: #f1f5f9;
}

.sidebar .menu-item.active {
  background: #002D55;
  color: white;
}
</style>

<style scoped>
/* ===== GLOBAL BACKGROUND ===== */
.org-modern-wrapper {
  padding: 40px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc, #eef2f7);
}

/* ===== HEADER GLASS CARD ===== */
.org-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(10px);
  padding: 22px 30px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,45,85,0.08);
  margin-bottom: 35px;
}

.card-title {
  font-size: 22px;
  font-weight: 700;
  color: #002D55;
}

/* ===== SEARCH MODERN ===== */
.search-pill {
  display: flex;
  align-items: center;
  background: white;
  padding: 10px 16px;
  border-radius: 50px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: 0.3s;
}

.search-pill input {
  border: none;
  outline: none;
  margin-left: 10px;
  font-size: 14px;
}

.search-pill:focus-within {
  box-shadow: 0 8px 20px rgba(0,45,85,0.15);
}

/* ===== GRID LAYOUT ===== */
.org-grid-layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 30px;
}

/* ===== TREE CARD ===== */
.dept-tree-card {
  background: white;
  border-radius: 18px;
  padding: 25px;
  box-shadow: 0 15px 35px rgba(0,45,85,0.08);
}

.tree-title {
  font-weight: 700;
  color: #002D55;
  margin-bottom: 5px;
}

.tree-subtitle {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 20px;
}

.tree-list {
  list-style: none;
  padding: 0;
}

.tree-item {
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 14px;
  transition: 0.25s;
  cursor: pointer;
}

.tree-item:hover {
  background: #002D55;
}

.active-group {
  background: linear-gradient(90deg, #002D55, #0a4a7a);
  color: white;
  font-weight: 600;
}

/* ===== OVERVIEW ===== */
.overview-section {
  margin-bottom: 30px;
}

.section-title {
  font-weight: 700;
  color: #002D55;
  margin-bottom: 15px;
}

.overview-cards {
  display: flex;
  gap: 20px;
}

.stat-card {
  flex: 1;
  padding: 25px;
  border-radius: 16px;
  color: white;
  box-shadow: 0 15px 30px rgba(0,0,0,0.08);
  transition: 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.brown-dark {
  background: linear-gradient(135deg, #002D55, #001f3a);
}

.yellow-light {
  background: linear-gradient(135deg, #A39160, #8f7e4e);
}

/* ===== DETAIL CARD ===== */
.detail-box-card {
  background: white;
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0 15px 35px rgba(0,45,85,0.08);
}

/* ===== MINI STAT ===== */
.three-stat-cards {
  display: flex;
  gap: 20px;
}

.mini-stat {
  flex: 1;
  padding: 20px;
  border-radius: 14px;
  background: #f8fafc;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: 0.3s;
}

.mini-stat:hover {
  transform: scale(1.03);
}

.mini-stat h3 {
  color: #002D55;
  font-size: 20px;
  margin-top: 5px;
}

/* ===== TABLE PREMIUM ===== */
.modern-dept-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.modern-dept-table thead {
  background: linear-gradient(90deg, #002D55, #0a4a7a);
  color: white;
}

.modern-dept-table th {
  padding: 14px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modern-dept-table td {
  padding: 14px;
  font-size: 14px;
}

.modern-dept-table tbody tr {
  transition: 0.2s;
}

.modern-dept-table tbody tr:hover {
  background: #f1f5f9;
}

/* ===== BUTTON MODERN ===== */
.btn-action {
  background: linear-gradient(135deg, #002D55, #0a4a7a);
  border: none;
  color: white;
  padding: 7px 16px;
  border-radius: 50px;
  font-size: 12px;
  cursor: pointer;
  transition: 0.25s;
}

.btn-action:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(0,45,85,0.25);
}
</style>