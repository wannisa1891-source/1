<template>
  <div class="login-full-page">
    <div class="login-box-design">
      <img src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png" class="login-logo">
      <h2>HOSPITAL HRM</h2>
      
      <div class="input-group">
        <input v-model="username" placeholder="ชื่อผู้ใช้งาน">
        <input v-model="password" type="password" placeholder="รหัสผ่าน">
      </div>

      <button @click="handleLogin" class="btn-login-navy">เข้าสู่ระบบ</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login-success'])
const username = ref('')
const password = ref('')

const handleLogin = () => {
  // ตรวจสอบข้อมูลเหมือนเดิมที่คุณตั้งค่าไว้
  if (username.value === 'admin' && password.value === '1234') {
    emit('login-success')
  } else {
    alert('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง')
  }
}
</script>

<style scoped>
/* 🎨 พื้นหลังสีครีมเบจเพื่อให้เข้ากับหน้า Dashboard */
.login-full-page { 
  height: 100vh; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  background-color: #F4F3F0; /* */
  font-family: 'Sarabun', sans-serif;
}

/* 📦 กล่อง Login แบบขอบมนจัดๆ (Bento Style) */
.login-box-design { 
  width: 100%;
  max-width: 450px; 
  padding: 60px 45px; 
  border-radius: 50px; /* */
  background: white;
  text-align: center; 
  box-shadow: 0 20px 60px rgba(0,0,0,0.03); /* */
  display: flex;
  flex-direction: column;
  align-items: center; /* 🌟 จัดกึ่งกลางแนวนอนทุกอย่างในกล่อง */
}

/* 🖼️ จัดโลโก้ให้อยู่ตรงกลาง */
.login-logo { 
  width: 100px;
  height: auto;
  display: block;
  margin: 0 auto 25px auto; /* 🌟 จัดกึ่งกลางเป๊ะด้วย margin auto */
}

.login-box-design h2 {
  font-weight: 900;
  color: #1A1A1A;
  margin-bottom: 35px;
  letter-spacing: 1px;
}

.input-group {
  width: 100%;
}

/* ⌨️ ช่อง Input แบบนุ่มๆ */
.login-box-design input { 
  width: 100%; 
  padding: 18px 25px; 
  margin-bottom: 15px; 
  border-radius: 20px; 
  border: 1px solid #F0EFEA; 
  background-color: #F8F7F2; 
  box-sizing: border-box; 
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.login-box-design input:focus {
  border-color: #4D5B4A;
  background-color: #ffffff;
}

/* 🔘 ปุ่มกดสีเดียวกับ Dashboard */
.btn-login-navy { 
  width: 100%; 
  padding: 18px; 
  background: #4D5B4A; /* สี Sage Green ตามที่คุณชอบ */
  color: white; 
  border: none; 
  border-radius: 20px; 
  cursor: pointer; 
  font-weight: 800;
  font-size: 18px;
  margin-top: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(77, 91, 74, 0.2);
}

.btn-login-navy:hover {
  background: #3D4B3A;
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(77, 91, 74, 0.3);
}
</style>