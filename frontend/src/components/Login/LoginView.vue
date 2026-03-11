<template>
  <div
    class="login-wrapper"
    :style="{
      backgroundImage: `url(${slides[currentSlide].image})`
    }"
  >
    <div class="overlay"></div>

    <div class="login-panel">

      <div class="logo-area">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png"
          class="login-logo"
        />
        <h2 class="system-title">HOSPITAL HRM</h2>
        <p class="subtitle">
          Human Resource Management System
        </p>
      </div>

      <div class="input-group">
        <span class="icon">👤</span>
        <input v-model="username" placeholder="Username"/>
      </div>

      <div class="input-group">
        <span class="icon">🔒</span>
        <input v-model="password" type="password" placeholder="Password"/>
      </div>

      <button @click="login" class="login-button">
        เข้าสู่ระบบ
      </button>

      <div class="divider">
        <span>หรือ</span>
      </div>

      <button @click="$emit('go-register')" class="signin-button">
        ✨ Sign In / สมัครสมาชิก
      </button>

      <div class="register-link">
        <p>
          ยังไม่มีบัญชี?
          <a href="#" @click.prevent="$emit('go-register')">สมัครสมาชิกที่นี่</a>
        </p>
      </div>

      <div class="footer">
        <p>Hospital Management Platform</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loginUser } from '../../services/authService'

const emit = defineEmits(['login-success', 'go-register'])

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

const login = async () => {

  const result = await loginUser(
    username.value,
    password.value
  )

  if(result.success){
    emit('login-success')
  }else{
    alert("Username หรือ Password ไม่ถูกต้อง")
  }

}
</script>

<style scoped>

.login-wrapper{
  height:100vh;
  width:100%;
  background-size:cover;
  background-position:center;
  display:flex;
  justify-content:center;
  align-items:center;
  position:relative;
  transition:background-image 1s ease-in-out;
}

.overlay{
  position:absolute;
  width:100%;
  height:100%;
  background:linear-gradient(
    135deg,
    rgba(0,40,80,0.6),
    rgba(0,120,200,0.3)
  );
}

.login-panel{

  width:320px;
  padding:40px;

  border-radius:16px;

  background: rgba(255,255,255,0.05);   /* ใสเกือบหมด */
  backdrop-filter: blur(12px);          /* glass effect */

  border:1px solid rgba(255,255,255,0.15); /* กรอบบางมาก */

  box-shadow:0 8px 30px rgba(0,0,0,0.2);

  text-align:center;

}
@keyframes fadeIn{
  from{
    transform:translateY(30px);
    opacity:0;
  }
  to{
    transform:translateY(0);
    opacity:1;
  }
}

.logo-area h2{
  margin:10px 0 0;
  font-weight:700;
}

.subtitle{
  font-size:13px;
  color: #000;
  margin-bottom:25px;
}

.login-logo{
  width:80px;
}

.input-group{
  display:flex;
  align-items:center;
  background:#f5f7fb;
  border-radius:10px;
  padding:10px;
  margin-bottom:15px;
}

.icon{
  margin-right:8px;
}

.input-group input{
  border:none;
  background:none;
  width:100%;
  font-size:15px;
}

.input-group input:focus{
  outline:none;
}

.login-button{

  width:100%;
  padding:13px;

  border:none;
  border-radius:10px;

  background:linear-gradient(
    135deg,
    #002D55,
    #2563eb
  );

  color:white;
  font-weight:600;

  cursor:pointer;

  transition:0.25s;
}

.login-button:hover{
  transform:translateY(-2px);
  box-shadow:0 8px 20px rgba(0,0,0,0.25);
}

/* Divider */
.divider{
  display:flex;
  align-items:center;
  margin:18px 0;
  gap:12px;
}
.divider::before,
.divider::after{
  content:'';
  flex:1;
  height:1px;
  background:rgba(255,255,255,0.25);
}
.divider span{
  font-size:12px;
  color:rgba(255,255,255,0.6);
  white-space:nowrap;
}

/* Sign In Button */
.signin-button{
  width:100%;
  padding:13px;
  border:2px solid rgba(255,255,255,0.25);
  border-radius:10px;
  background:rgba(255,255,255,0.08);
  backdrop-filter:blur(6px);
  color:white;
  font-weight:600;
  font-size:15px;
  cursor:pointer;
  transition:all 0.3s ease;
  letter-spacing:0.5px;
}
.signin-button:hover{
  background:rgba(255,255,255,0.18);
  border-color:rgba(96,165,250,0.5);
  transform:translateY(-2px);
  box-shadow:0 8px 20px rgba(96,165,250,0.2);
}

/* Register Link */
.register-link{
  text-align:center;
  margin-top:16px;
  font-size:13px;
  color:rgba(255,255,255,0.6);
}
.register-link a{
  color:#60a5fa;
  text-decoration:none;
  font-weight:600;
  transition:color 0.2s;
}
.register-link a:hover{
  color:#93c5fd;
  text-decoration:underline;
}

.footer{
  margin-top:16px;
  font-size:12px;
  color:rgba(255,255,255,0.5);
}
.logo-area{
  text-align:center;
  margin-bottom:25px;
}

.login-logo{
  width:70px;
  display:block;
  margin:0 auto 10px auto;
}

.system-title{
  font-weight:700;
  letter-spacing:1px;
}
</style>