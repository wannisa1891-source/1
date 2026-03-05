<template>
  <div class="split-container":style="{
    backgroundImage: `url(${slides[currentSlide].image})`
  }"
  >

    <!-- ฝั่งซ้าย (Slide Banner) -->
    <div
      class="left-panel"
      :style="{
        backgroundImage: `url(${slides[currentSlide].image})`
      }"
    >
      <div class="overlay"></div>

      <div class="left-content">
        <h1>{{ slides[currentSlide].title }}</h1>
        <p>{{ slides[currentSlide].desc }}</p>
      </div>
    </div>

    <!-- ฝั่งขวา -->
    <div class="right-panel">

  <div class="login-card">

    <h2 class="welcome-title">Welcome Back!</h2>
    <p class="welcome-sub">
      Log in to start managing your hospital staff
    </p>

    <label>Email</label>
    <div class="input-group">
      <span class="icon">🩺</span>
      <input v-model="username" placeholder="Enter your email">
    </div>

    <label>Password</label>
    <div class="input-group">
      <span class="icon">🔐</span>
      <input v-model="password" type="password" placeholder="Enter password">
    </div>

    <div class="login-options">
      <label class="remember">
        <input type="checkbox"> Remember me
      </label>
      <span class="forgot">Forgot Password?</span>
    </div>

    <button @click="handleLogin" class="login-btn">
      Login
    </button>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['login-success'])  // 👈 เพิ่มบรรทัดนี้

import img1 from '../assets/1.jpg'
import img2 from '../assets/2.jpg'
import img3 from '../assets/3.jpg'
import img4 from '../assets/4.jpg'
import img5 from '../assets/5.jpg'
import img6 from '../assets/6.jpg'

const username = ref('')
const password = ref('')
const currentSlide = ref(0)

const slides = [
  { image: img1, title: 'Welcome to HRM', desc: 'Manage your hospital staff efficiently' },
  { image: img2, title: 'Smart Staff Management', desc: 'Organize schedules easily' },
  { image: img3, title: 'Modern Healthcare System', desc: 'Professional HR tools' },
  { image: img4, title: 'Modern Healthcare System', desc: 'Professional HR tools' },
  { image: img5, title: 'Modern Healthcare System', desc: 'Professional HR tools' },
  { image: img6, title: 'Modern Healthcare System', desc: 'Professional HR tools' }
]

onMounted(() => {
  setInterval(() => {
    currentSlide.value =
      (currentSlide.value + 1) % slides.length
  }, 4000)
})

const handleLogin = () => {
  emit('login-success')   // 🔥 กดแล้วไป Dashboard ทันที
}
</script>

<style scoped>

/* ===== Layout ===== */
.split-container{
  height:100vh;
  width:100%;

  display:flex;
  align-items:center;
  justify-content:flex-end;

  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
}

/* ===== Left Slide ===== */


.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
}

.left-content {
  position: relative;
  color: white;
  text-align: left;
  max-width: 400px;
  z-index: 2;
}

.left-content h1 {
  font-size: 32px;
  margin-bottom: 15px;
}

/* ===== Right Panel ===== */
.right-panel{
  width:500px;
  display:flex;
  justify-content:center;
  align-items:center;
  background:transparent;   /* สำคัญ */
}

/* Card */

.login-card{
  width:420px;
  padding:45px;

  margin-right:120px;

  background:rgba(255,255,255,0.92);
  backdrop-filter:blur(10px);

  border-radius:18px;

  box-shadow:
  0 30px 80px rgba(0,0,0,0.35);
}

/* Title */

.welcome-title{
  font-size:28px;
  font-weight:800;
  margin-bottom:6px;
}

.welcome-sub{
  color:#7a8894;
  font-size:14px;
  margin-bottom:30px;
}

/* Label */

label{
  font-size:13px;
  font-weight:600;
  margin-bottom:6px;
  display:block;
  color:#444;
}

/* Inputs */

.input-group{
  display:flex;
  align-items:center;

  border:1px solid #e3e6ea;
  border-radius:8px;

  padding:12px 14px;
  margin-bottom:18px;

  background:white;
}

.input-group input{
  border:none;
  outline:none;
  width:100%;
  font-size:14px;
  margin-left:8px;
}

.icon{
  font-size:16px;
}

/* Options */

.login-options{
  display:flex;
  justify-content:space-between;
  align-items:center;

  font-size:13px;
  margin-bottom:20px;
}

.forgot{
  color:#5b7cff;
  cursor:pointer;
}

/* Button */

.login-btn{
  width:100%;
  padding:14px;

  background:black;
  color:white;

  border:none;
  border-radius:8px;

  font-size:15px;
  font-weight:700;

  cursor:pointer;
}

.login-btn:hover{
  opacity:0.9;
}
</style>