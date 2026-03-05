<template>
 <div class="login-page">

  <div class="login-card">

    <div class="login-title">
      🏥 Welcome 
    </div>

    <div class="input-group">
      <span class="icon">📧</span>
      <input placeholder="username">
    </div>

    <div class="input-group">
      <span class="icon">🔒</span>
      <input type="password" placeholder="Password">
    </div>

    <div class="options">
      <label>
        <input type="checkbox"> Remember me
      </label>

      <a>Forgot password?</a>
    </div>

    <button class="login-btn">
      Login
    </button>

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

/* ===== Page Background ===== */

.login-page{
  height:100vh;
  width:100%;

  display:flex;
  align-items:center;
  justify-content:center;

  background-size:cover;
  background-position:center;

  animation: slideBg 15s infinite;
}

@keyframes slideBg{

  0%{
    background-image:url("/src/assets/1.jpg");
  }

  33%{
    background-image:url("/src/assets/2.jpg");
  }

  66%{
    background-image:url("/src/assets/3.jpg");
  }

  100%{
    background-image:url("/src/assets/4.jpg");
  }

}

/* overlay */

.login-page::before{
  content:"";
  position:absolute;
  inset:0;

  background:linear-gradient(
    135deg,
    rgba(0,30,60,0.8),
    rgba(0,90,150,0.6)
  );
}

/* ===== Login Card ===== */

.login-card{
  width:420px;
  padding:45px;

  border-radius:20px;

  background:rgba(255,255,255,0.95);

  backdrop-filter: blur(10px);

  box-shadow:
  0 20px 50px rgba(0,0,0,0.25);

  position:relative;
  z-index:2;
}

/* title */

.login-title{
  font-size:28px;
  font-weight:700;

  color:#1e293b;
  margin-bottom:30px;
}

/* ===== Inputs ===== */

.input-group{
  display:flex;
  align-items:center;

  background:#f1f5f9;

  border-radius:12px;

  padding:12px 14px;
  margin-bottom:18px;

  transition:0.2s;
}

.input-group:focus-within{
  background:#e0f2fe;
  border:1px solid #38bdf8;
}

.icon{
  margin-right:10px;
  font-size:18px;
}

.input-group input{
  border:none;
  background:transparent;

  outline:none;
  width:100%;

  font-size:14px;
}

/* options */

.options{
  display:flex;
  justify-content:space-between;
  font-size:13px;

  margin-bottom:20px;
}

/* login button */

.login-btn{
  width:100%;
  padding:14px;

  border:none;
  border-radius:12px;

  background:linear-gradient(
  135deg,
  #0ea5e9,
  #2563eb
  );

  color:white;
  font-weight:600;

  cursor:pointer;

  transition:0.2s;
}

.login-btn:hover{
  transform:translateY(-2px);
  box-shadow:0 10px 25px rgba(37,99,235,0.4);
}

</style>