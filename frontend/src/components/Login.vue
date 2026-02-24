<template>
  <div class="login-full-page">
    <div class="login-box-design">
      <img src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png" width="100">
      <h2>HOSPITAL HRM</h2>
      <input v-model="username" placeholder="ชื่อผู้ใช้งาน">
      <input v-model="password" type="password" placeholder="รหัสผ่าน">
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
  if (username.value === 'admin' && password.value === '1234') {
    emit('login-success')
  } else {
    alert('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง')
  }
}
</script>

<style scoped>
.login-full-page { height: 100vh; display: flex; justify-content: center; align-items: center; background: white; }
.login-box-design { width: 400px; padding: 50px; border-radius: 40px; border: 1.5px solid #eee; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
.login-box-design input { width: 100%; padding: 15px; margin-bottom: 15px; border-radius: 12px; border: 1px solid #ddd; box-sizing: border-box; }
.btn-login-navy { width: 100%; padding: 15px; background: #003366; color: white; border: none; border-radius: 12px; cursor: pointer; }
</style>