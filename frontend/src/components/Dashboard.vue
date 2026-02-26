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
/* 🎨 1. ล็อคความสูงให้พอดีหน้าจอ และห้ามเลื่อน (No Scroll) */
.min-h-screen {
  height: 100vh; /* ล็อคความสูงเท่าขนาดหน้าจอพอดี */
  overflow: hidden; /* 🌟 ปิดแถบเลื่อน */
  display: flex;
  flex-direction: column;
}

.max-w-7xl {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 🌟 กระจายข้อมูลให้เต็มหน้าจอพอดี */
  padding-bottom: 20px;
}

/* 🌟 2. ปรับระยะห่าง Header ให้เล็กลง */
header {
  margin-bottom: 20px !important;
}

/* 📊 3. ปรับขนาดการ์ดสถิติให้กระชับขึ้น */
.grid-cols-3 {
  gap: 15px !important;
  margin-bottom: 15px !important;
}

.bg-white.p-8 {
  padding: 20px 25px !important; /* ลด padding เพื่อประหยัดพื้นที่ */
  border-radius: 30px !important;
}

.text-4xl {
  font-size: 2rem !important; /* ปรับขนาดตัวเลขให้เล็กลงเล็กน้อย */
}

/* 🍩 4. ปรับส่วนกราฟและรายการอนุมัติ */
.grid-cols-2 {
  gap: 15px !important;
  margin-bottom: 15px !important;
}

.p-10 {
  padding: 20px 25px !important; /* ลด padding ของการ์ดใหญ่ */
  border-radius: 30px !important;
}

/* 5. ปรับความสูงกราฟแท่งให้เล็กลงเพื่อให้พอดีหน้าเดียว */
.h-40 {
  height: 120px !important;
}

/* ✨ แอนิเมชันตอนโหลด */
.fade-in { animation: fadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>