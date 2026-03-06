<template>
  <div
    class="login-wrapper"
    :style="{
      backgroundImage: `url(${slides[currentSlide].image})`
    }"
  >

    <div class="overlay"></div>

    <!-- Glass Login Panel -->
    <div class="login-panel">

      <img
        src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png"
        class="login-logo"
      />

      <h2 class="system-title">HOSPITAL HRM</h2>

      <input
        v-model="username"
        placeholder="Username"
        class="login-input"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="login-input"
      />

      <button
        @click="handleLogin"
        class="login-button"
      >
        เข้าสู่ระบบ
      </button>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['login-success'])

import img1 from '../../assets/1.jpg'
import img2 from '../../assets/2.jpg'
import img3 from '../../assets/3.jpg'
import img4 from '../../assets/4.jpg'
import img5 from '../../assets/5.jpg'
import img6 from '../../assets/6.jpg'

const username = ref('')
const password = ref('')
const currentSlide = ref(0)

const slides = [
  { image: img1 },
  { image: img2 },
  { image: img3 },
  { image: img4 },
  { image: img5 },
  { image: img6 }
]

onMounted(() => {
  setInterval(() => {
    currentSlide.value =
      (currentSlide.value + 1) % slides.length
  }, 4000)
})

const handleLogin = () => {
  emit('login-success')
}
</script>

<style scoped>

/* ===== Full Screen Background ===== */

.login-wrapper{
  height:100vh;
  width:100%;
  background-size:cover;
  background-position:center;
  display:flex;
  justify-content:center;
  align-items:center;
  transition:background-image 1s ease;
}

/* ===== Dark Overlay ===== */

.overlay{
  position:absolute;
  inset:0;
  background:rgba(0,0,0,0.45);
}

/* ===== Glass Login Panel ===== */

.login-panel{
  position:relative;
  z-index:2;

  width:360px;

  padding:45px;

  border-radius:30px;

  background:rgba(255,255,255,0.15);

  backdrop-filter:blur(15px);

  box-shadow:0 25px 50px rgba(0,0,0,0.25);

  display:flex;
  flex-direction:column;
  align-items:center;
}

/* ===== Logo ===== */

.login-logo{
  width:80px;
  margin-bottom:10px;
}

.system-title{
  color:white;
  margin-bottom:30px;
  font-weight:700;
}

/* ===== Inputs ===== */

.login-input{
  width:100%;
  padding:14px;
  margin-bottom:15px;

  border:none;
  border-radius:12px;

  font-size:15px;
}

/* ===== Button ===== */

.login-button{
  width:100%;
  padding:14px;

  border:none;
  border-radius:12px;

  background:#002D55;

  color:white;
  font-weight:700;

  cursor:pointer;
}

.login-button:hover{
  background:#1c619d;
}

</style>  