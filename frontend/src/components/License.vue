<template>
  <div class="license-modern-wrapper">
    <div class="header-action-row">
      <h2 class="page-title">ติดตามใบอนุญาตประกอบวิชาชีพ</h2>
      <div class="header-tools">
        <button class="icon-btn">🔔</button>
        <button class="icon-btn">❓</button>
        <button class="btn-primary-upload">+ Upload Certificate<br><small>อัพโหลดใบรับรอง</small></button>
      </div>
    </div>

    </div>
</template>

<style scoped>
/* 1. ปรับฟอนต์ให้คมชัดระดับ Modern UI */
.license-modern-wrapper {
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #f8fafc;
  min-height: 100vh;
}

/* 2. ปรับการ์ดให้มีมิติ (Soft Shadow แทนขอบแข็งๆ) */
.stat-card, .table-card, .alert-banner-card, .page-title {
  background: white;
  border-radius: 16px; /* มุมมนที่ดูนุ่มนวลกว่าเดิม */
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

/* 3. ปรับระยะห่าง (Whitespace) ให้หายใจได้ */
.stat-card { padding: 24px; transition: transform 0.2s; }
.stat-card:hover { transform: translateY(-2px); }

/* 4. ปรับตารางให้ดูโปร่ง (Typography Hierarchy) */
.license-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.license-table th { 
  padding: 16px; 
  color: #64748b; 
  font-size: 11px; 
  text-transform: uppercase; 
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e2e8f0; 
}
.license-table td { padding: 20px 16px; border-bottom: 1px solid #f1f5f9; }

/* 5. ปุ่มและการกระทำ (Visual Focus) */
.btn-action-red, .btn-action-blue {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-action-red:hover, .btn-action-blue:hover { opacity: 0.9; }

/* 6. ปรับสีให้ดูมี Contrast ที่เป็นมิตร */
.text-danger { color: #e11d48; }
.text-warning { color: #d97706; }
.text-muted { color: #64748b; }

/* ตัวช่วยจัดเรียง */
.mt-20 { margin-top: 24px; }
</style>