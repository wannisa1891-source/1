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

<style scoped>
/* ภาพรวม */
.org-modern-wrapper { padding: 10px 20px; animation: fadeIn 0.4s ease; }
.org-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; background: white; padding: 15px 25px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
.card-title { margin: 0; font-size: 22px; color: #1e293b; font-weight: 700; }

/* ช่องค้นหา */
.search-pill { display: flex; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 50px; padding: 8px 20px; width: 300px; }
.search-input-clean { border: none; background: transparent; outline: none; width: 100%; margin-left: 10px; color: #334155; }

/* โครงสร้าง Grid ซ้าย-ขวา */
.org-grid-layout { display: grid; grid-template-columns: 320px 1fr; gap: 20px; align-items: start; }

/* ฝั่งซ้าย: Tree View (พื้นหลังสีทองอ่อนตามแบบ) */
.dept-tree-card { background: #e6ccb2; border-radius: 15px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); min-height: 70vh; }
.tree-title { color: white; text-align: center; font-size: 20px; margin-top: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); margin-bottom: 5px;}
.tree-subtitle { text-align: center; color: #5c4033; font-size: 14px; font-weight: 600; margin-bottom: 20px; }
.tree-list { list-style: none; padding: 0; margin: 0; color: #3e2723; font-weight: 600; }
.tree-item { margin-bottom: 12px; cursor: pointer; }
.toggle-icon { display: inline-block; width: 20px; font-size: 12px; }
.active-group { color: #1e293b; }
.sub-tree-list { list-style: none; padding-left: 25px; margin-top: 8px; font-weight: 400; font-size: 14.5px; }
.sub-tree-list li { margin-bottom: 8px; padding: 5px 10px; border-radius: 8px; transition: 0.2s; }
.sub-tree-list li:hover { background: rgba(255,255,255,0.4); }

/* ฝั่งขวา: พื้นที่รายละเอียด */
.dept-detail-area { display: flex; flex-direction: column; gap: 20px; }
.section-title { margin: 0 0 15px 0; color: #1e293b; font-size: 18px; }
.overview-section { background: #fef0ba; padding: 20px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
.overview-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.stat-card { padding: 25px; border-radius: 15px; text-align: center; color: white; box-shadow: 0 4px 10px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: center; align-items: center;}
.stat-card h4 { margin: 0 0 10px 0; font-weight: normal; font-size: 16px; }
.stat-card h2 { margin: 0; font-size: 28px; }
.brown-dark { background: #7f4f4f; } /* สีน้ำตาลแดงตามแบบ */
.yellow-light { background: #fef0ba; border: 2px solid #eab308; color: #854d0e; } /* สีเหลืองอ่อนตามแบบ */

/* กล่องรายละเอียดแผนก */
.detail-box-card { background: white; border-radius: 15px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
.detail-header-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px; }
.mb-0 { margin-bottom: 0; }
.dept-select-group { display: flex; align-items: center; gap: 10px; background: #e2e8f0; padding: 5px 15px; border-radius: 20px;}
.input-row { display: flex; align-items: center; margin-bottom: 10px; }
.input-row .label { width: 80px; font-weight: 600; color: #475569; }
.input-modern { padding: 8px 15px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; flex: 1; }
.bg-disabled { background-color: #e2e8f0; color: #64748b;}

/* 3 การ์ดสถิติย่อย */
.three-stat-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
.mini-stat { padding: 15px; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
.mini-stat p { margin: 0 0 5px 0; font-size: 14px; font-weight: 600; }
.mini-stat h3 { margin: 0; font-size: 22px; }
.orange-bg { background: #d97706; color: white; }
.green-bg { background: #bbf7d0; color: #166534; }
.pink-bg { background: #fecdd3; color: #9f1239; }

/* ตารางด้านล่าง */
.table-filters { display: flex; justify-content: flex-end; gap: 15px; font-size: 13px; color: #64748b; }
.mini-select { border: 1px solid #cbd5e1; border-radius: 5px; padding: 2px 5px; }
.modern-dept-table { width: 100%; border-collapse: collapse; text-align: left; }
.modern-dept-table th { background: #94a3b8; color: white; padding: 12px; font-size: 14px; }
.modern-dept-table td { padding: 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }
.btn-action { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; }
.btn-action:hover { background: #e2e8f0; }
.mt-10 { margin-top: 10px; }
.mt-15 { margin-top: 15px; }
.mt-20 { margin-top: 20px; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>