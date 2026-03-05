<template>
  <div class="split-container">

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
      <div class="bear-card">
        <div class="bear-ears"></div>

        <div class="login-box-design">
          <img src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png" class="login-logo">
          <h2 class="system-title">HOSPITAL HRM</h2>

          <input v-model="username" placeholder="Username" class="bear-input">
          <input v-model="password" type="password" placeholder="Password" class="bear-input">

          <button @click="handleLogin" class="btn-login-sage">
            เข้าสู่ระบบ
          </button>
        </div>
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
.split-container {
  display: flex;
  height: 100vh;
}

/* ===== Left Slide ===== */
.left-panel {
  flex: 1;
  position: relative;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-image 1s ease-in-out;
}

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
.right-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
}

.bear-card {
  position: relative;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bear-ears::before,
.bear-ears::after {
  content: "";
  position: absolute;
  top: -40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #EFE9D9;
  z-index: 1;
}

.bear-ears::before {
  left: 15px;
  background: radial-gradient(circle, #8D5B3E 42%, #EFE9D9 43%);
}

.bear-ears::after {
  right: 15px;
  background: radial-gradient(circle, #8D5B3E 42%, #EFE9D9 43%);
}

.login-box-design {
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 60px 45px;
  border-radius: 80px 80px 115px 115px;
  background: #EFE9D9;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0,0,0,0.06);
}

.login-logo {
  width: 95px;
  margin-bottom: 15px;
}

.system-title {
  font-weight: 800;
  margin-bottom: 35px;
}

.bear-input {
  width: 100%;
  padding: 18px 25px;
  margin-bottom: 15px;
  border-radius: 20px;
  border: none;
  background-color: #BCC3D1;
  font-size: 16px;
}

.btn-login-sage {
  width: 100%;
  padding: 18px;
  background: #4A5644;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 800;
  cursor: pointer;
}

.btn-login-sage:hover {
  background: #3A4634;
}

</style>