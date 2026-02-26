<template>
  <div class="min-h-screen w-full bg-[#F4F3F0] p-10 font-['Sarabun'] overflow-y-auto">
    <div class="max-w-7xl mx-auto">
      
      <header class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-3xl font-black text-gray-800">สวัสดีครับ, คุณ Wanwisa! 👋</h1>
          <p class="text-gray-500">ยินดีต้อนรับเข้าสู่ระบบจัดการบุคลากรโรงพยาบาล</p>
        </div>
        <div class="flex gap-4 items-center">
          <div class="bg-white px-5 py-2 rounded-full shadow-sm flex items-center gap-2">
            🔍 <input type="text" placeholder="ค้นหาข้อมูล..." class="outline-none bg-transparent">
          </div>
          <div class="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">W</div>
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div class="bg-white p-8 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all hover:scale-105 duration-300">
          <div class="flex justify-between items-start mb-6">
            <div class="bg-[#F8F7F2] p-4 rounded-2xl text-2xl">👥</div>
            <span class="text-xs font-bold uppercase tracking-wider text-gray-400">Total Staff</span>
          </div>
          <p class="text-gray-500 font-medium text-sm">บุคลากรทั้งหมด</p>
          <h2 class="text-4xl font-black text-[#1A1A1A] mt-1">
            {{ employees.length }} <span class="text-lg font-normal text-gray-400">คน</span>
          </h2>
        </div>

        <div class="bg-white p-8 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
          <div class="flex justify-between items-start mb-6">
            <div class="bg-[#F8F7F2] p-4 rounded-2xl text-2xl">📉</div>
            <span class="text-xs font-bold uppercase tracking-wider text-gray-400">On Leave</span>
          </div>
          <p class="text-gray-500 font-medium text-sm">ลางานวันนี้</p>
          <h2 class="text-4xl font-black text-[#1A1A1A] mt-1">0 <span class="text-lg font-normal text-gray-400">คน</span></h2>
        </div>

        <div class="bg-white p-8 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
          <div class="flex justify-between items-start mb-6">
            <div class="bg-[#F8F7F2] p-4 rounded-2xl text-2xl">📊</div>
            <span class="text-xs font-bold uppercase tracking-wider text-gray-400">Vacant</span>
          </div>
          <p class="text-gray-500 font-medium text-sm">อัตรากำลังว่าง</p>
          <h2 class="text-4xl font-black text-[#1A1A1A] mt-1">0 <span class="text-lg font-normal text-gray-400">อัตรา</span></h2>
        </div>


      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div class="bg-white p-10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
          <h4 class="font-bold text-gray-800 mb-8">สัดส่วนบุคลากรแยกตามวิชาชีพ</h4>
          <div class="flex items-center justify-around">
            <div class="w-40 h-40 rounded-full border-[15px] border-[#4D5B4A] flex items-center justify-center font-bold">วิชาชีพ</div>
            <ul class="space-y-3">
              <li class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#4D5B4A]"></span> พยาบาล 50%</li>
              <li class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#C5A073]"></span> แพทย์ 10%</li>
              <li class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-gray-200"></span> อื่นๆ 40%</li>
            </ul>
          </div>
        </div>

        <div class="bg-white p-10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
          <h4 class="font-bold text-gray-800 mb-8">แนวโน้มบุคลากรรายเดือน</h4>
          <div class="flex items-end justify-between h-40 gap-3">
            <div class="bg-gray-100 w-full rounded-2xl" style="height: 60%"></div>
            <div class="bg-gray-100 w-full rounded-2xl" style="height: 40%"></div>
            <div class="bg-[#4D5B4A] w-full rounded-2xl" style="height: 85%"></div>
            <div class="bg-gray-100 w-full rounded-2xl" style="height: 55%"></div>
            <div class="bg-[#C5A073] w-full rounded-2xl" style="height: 95%"></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
        <div class="bg-white p-10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-[#F0EFEA]">
          <h4 class="font-bold text-gray-800 mb-6">📌 รายการที่ต้องอนุมัติ</h4>
          <div class="flex justify-between py-3 border-b border-gray-50 font-semibold">
            <span>คำขอย้ายแผนก</span> <span class="bg-gray-100 px-3 py-1 rounded-lg text-xs">3 รายการ</span>
          </div>
          <div class="flex justify-between py-3 font-semibold">
            <span>ใบลาพักร้อน</span> <span class="bg-gray-100 px-3 py-1 rounded-lg text-xs">1 รายการ</span>
          </div>
        </div>

        <div class="bg-[#4D5B4A] p-10 rounded-[40px] shadow-lg text-white">
          <h4 class="font-bold mb-4">🔔 แจ้งเตือนระบบ</h4>
          <p class="opacity-80 text-sm mb-6">ใบประกอบวิชาชีพใกล้หมดอายุใน 30 วัน</p>
          <button class="w-full bg-white/10 hover:bg-white/20 py-3 rounded-2xl font-bold transition-all">ดูทั้งหมด</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps(['employees'])
</script>

<style scoped>
/* 🎨 1. พื้นฐานและสี (Soft Cream & Minimal) */
.bento-dashboard-wrapper {
  flex-grow: 1;
  width: 100%;
  min-height: 100vh;
  background-color: #F4F3F0; /* สีพื้นหลังเบจครีม */
  padding: 40px;
  box-sizing: border-box;
  overflow-y: auto;
}

.bento-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 🌟 2. Header Style */
.bento-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.welcome-text h1 { font-size: 28px; font-weight: 800; color: #1a1a1a; margin: 0; }
.welcome-text p { color: #64748b; margin: 5px 0 0; }

.header-actions { display: flex; gap: 20px; align-items: center; }
.search-box-bento {
  background: white;
  padding: 10px 20px;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  display: flex; gap: 10px;
}
.search-box-bento input { border: none; outline: none; background: transparent; }
.icon-btn { background: white; border: none; padding: 10px; border-radius: 50%; cursor: pointer; }
.icon-btn-profile { background: #1a1a1a; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-weight: bold; }

/* 📊 3. Grid Layout (Bento Style) */
.bento-grid-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card-bento, .analysis-card-bento, .action-card-bento, .alert-card-bento {
  background: white;
  border-radius: 35px; /* ขอบมนจัดๆ ตามรูปตัวอย่าง */
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02); /* เงาบางมากๆ */
  transition: transform 0.3s ease;
}

.stat-card-bento:hover { transform: translateY(-5px); }

.card-top { display: flex; justify-content: space-between; margin-bottom: 15px; }
.stat-label { color: #64748b; font-weight: 600; font-size: 14px; }
.stat-value { font-size: 32px; font-weight: 800; margin: 0; color: #1a1a1a; }
.stat-value span { font-size: 16px; color: #94a3b8; font-weight: 400; }

/* 🌑 Dark Card */
.stat-card-bento.dark-theme { background: #4D5B4A; color: white; } /* สีเขียวหม่น Sage Green */
.text-white { color: white !important; }

/* 🍩 Analysis Section */
.bento-grid-analysis {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.card-title-bento { font-size: 18px; color: #1a1a1a; margin-bottom: 25px; }

.chart-flex-bento { display: flex; align-items: center; gap: 30px; justify-content: space-around; }
.donut-visual {
  width: 140px; height: 140px; border-radius: 50%;
  background: conic-gradient(#4D5B4A 0% 60%, #C5A073 60% 85%, #E2E8F0 85% 100%);
  display: flex; align-items: center; justify-content: center;
}
.donut-inner { width: 100px; height: 100px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }

.bar-visual-bento { display: flex; align-items: flex-end; gap: 15px; height: 150px; justify-content: center; }
.bar-item { width: 35px; background: #E2E8F0; border-radius: 10px; transition: 0.3s; }
.bar-item.dark { background: #4D5B4A; }

.bento-grid-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.list-item-bento { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #F1F5F9; font-weight: 600; }
.badge-mini { background: #F1F5F9; padding: 4px 12px; border-radius: 10px; font-size: 12px; }
.btn-action-bento { width: 100%; margin-top: 15px; padding: 12px; border-radius: 15px; border: 1px solid #E2E8F0; background: white; cursor: pointer; font-weight: bold; transition: 0.2s; }
.btn-action-bento:hover { background: #F8F9FA; }

/* ✨ Animations */
.fade-in { animation: fadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>