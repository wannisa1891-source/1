<template>
  <div class="login-full-page">
    <div class="bear-card">
      <div class="bear-ears"></div>
      <div class="login-box-design">
        <img src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png" class="login-logo">
        <h2 class="system-title">HOSPITAL HRM</h2>
        
        <div class="input-group">
          <input v-model="username" placeholder="admin" class="bear-input">
          <input v-model="password" type="password" placeholder="••••" class="bear-input">
        </div>

        <button @click="handleLogin" class="btn-login-sage">เข้าสู่ระบบ</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login-success'])
const username = ref('')
const password = ref('')

const handleLogin = () => {
  // ตรวจสอบข้อมูลตามที่คุณ Wannisa ตั้งค่าไว้
  if (username.value === 'admin' && password.value === '1234') {
    emit('login-success')
  } else {
    alert('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง')
  }
}
</script>

<style scoped>
/* 🎨 1. ล็อคหน้าจอให้เต็ม Viewport และทับทุกอย่าง (รวมถึงขอบดำ Sidebar) */
.login-full-page { 
  position: fixed; /* 🌟 บังคับให้หลุดจากโครงสร้าง Grid/Flex ของ App.vue เพื่อลบขอบดำ */
  top: 0;
  left: 0;
  height: 100vh; 
  width: 100vw;
  z-index: 9999; /* 🌟 มั่นใจว่าอยู่บนสุดแน่นอน */
  display: flex; 
  justify-content: center; 
  align-items: center; 
  background-color: #F2F2F2 !important; /* สีเทานวลตามต้นฉบับ */
  font-family: 'Sarabun', sans-serif;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* 🐻 2. bear-card: จัดกึ่งกลางเป๊ะ */
.bear-card {
  position: relative;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 👂 3. หูหมี: สีครีมขอบมนและลายในหูสีน้ำตาล */
.bear-ears::before,
.bear-ears::after {
  content: "";
  position: absolute;
  top: -40px; 
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #EFE9D9; /* สีขาวครีม */
  z-index: 1;
}

/* ลายในหูสีน้ำตาลเข้ม */
.bear-ears::before {
  left: 15px;
  background: radial-gradient(circle, #8D5B3E 42%, #EFE9D9 43%); 
}

.bear-ears::after {
  right: 15px;
  background: radial-gradient(circle, #8D5B3E 42%, #EFE9D9 43%);
}

/* 🐻 4. ตัวใบหน้าหมี: ทรงป่องๆ สีขาวครีม */
.login-box-design { 
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 60px 45px; 
  border-radius: 80px 80px 115px 115px; /* ปรับทรงให้เหมือนรูปเป๊ะ */
  background: #EFE9D9; 
  text-align: center; 
  box-shadow: 0 25px 50px rgba(0,0,0,0.06); 
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-logo { 
  width: 95px;
  margin-bottom: 15px;
}

.system-title {
  font-weight: 800;
  color: #444;
  margin-bottom: 35px;
  font-size: 1.2rem;
  letter-spacing: 1px;
}

.input-group {
  width: 100%;
}

/* ⌨️ 5. ช่อง Input สีเทาฟ้า (Grey Blue) */
.bear-input { 
  width: 100%; 
  padding: 18px 25px; 
  margin-bottom: 15px; 
  border-radius: 20px;
  border: none; 
  background-color: #BCC3D1; /* สีตามภาพ */
  box-sizing: border-box; 
  outline: none;
  font-size: 16px;
  color: #333;
}

.bear-input::placeholder {
  color: #f8f8f8;
}

/* 🔘 6. ปุ่มล็อกอินสีเขียวขี้ม้า */
.btn-login-sage { 
  width: 100%; 
  padding: 18px; 
  background: #4A5644; /* สีเขียว Dark Olive */
  color: white; 
  border: none; 
  border-radius: 20px; 
  cursor: pointer; 
  font-weight: 800;
  font-size: 18px;
  margin-top: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(74, 86, 68, 0.2);
}

.btn-login-sage:hover {
  background: #3A4634;
  transform: translateY(-2px);
}


</style>