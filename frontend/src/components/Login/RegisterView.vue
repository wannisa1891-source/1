<template>
  <div
    class="register-wrapper"
    :style="{
      backgroundImage: `url(${slides[currentSlide].image})`
    }"
  >
    <div class="overlay"></div>

    <div class="register-panel">
      <!-- Header -->
      <div class="register-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png"
          class="register-logo"
        />
        <h2 class="system-title">HOSPITAL HRM</h2>
        <p class="subtitle">สมัครสมาชิกระบบ Human Resource Management</p>
      </div>

      <!-- Step Indicator -->
      <div class="step-indicator">
        <div
          v-for="(step, idx) in steps"
          :key="idx"
          class="step-item"
          :class="{ active: currentStep === idx, completed: currentStep > idx }"
          @click="goToStep(idx)"
        >
          <div class="step-circle">
            <span v-if="currentStep > idx">✓</span>
            <span v-else>{{ idx + 1 }}</span>
          </div>
          <span class="step-label">{{ step }}</span>
        </div>
      </div>

      <!-- Error Messages -->
      <transition name="fade">
        <div v-if="errors.length" class="error-box">
          <div class="error-icon">⚠️</div>
          <ul>
            <li v-for="(err, i) in errors" :key="i">{{ err }}</li>
          </ul>
        </div>
      </transition>

      <!-- Success Message -->
      <transition name="fade">
        <div v-if="successMessage" class="success-box">
          <div class="success-icon">✅</div>
          <p>{{ successMessage }}</p>
        </div>
      </transition>

      <!-- Step 1: Account Information -->
      <div v-show="currentStep === 0" class="form-section">
        <h3 class="section-title">
          <span class="section-icon">🔐</span>
          ข้อมูลบัญชีผู้ใช้
        </h3>

        <div class="input-row">
          <div class="input-group">
            <label>Username <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">👤</span>
              <input
                v-model="form.username"
                placeholder="กรอกชื่อผู้ใช้"
                @blur="checkUsername"
              />
            </div>
            <span v-if="usernameStatus === 'taken'" class="field-error">
              ❌ Username นี้ถูกใช้แล้ว
            </span>
            <span v-if="usernameStatus === 'available'" class="field-success">
              ✅ Username นี้สามารถใช้ได้
            </span>
          </div>
        </div>

        <div class="input-row">
          <div class="input-group">
            <label>Email <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">📧</span>
              <input
                v-model="form.email"
                type="email"
                placeholder="example@hospital.com"
                @blur="validateEmailField"
              />
            </div>
            <span v-if="emailError" class="field-error">
              ❌ {{ emailError }}
            </span>
          </div>
        </div>

        <div class="input-row two-cols">
          <div class="input-group">
            <label>Password <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">🔒</span>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="กรอกรหัสผ่าน"
              />
              <span class="toggle-pass" @click="showPassword = !showPassword">
                {{ showPassword ? '🙈' : '👁️' }}
              </span>
            </div>
            <!-- Password Strength -->
            <div v-if="form.password" class="password-strength">
              <div class="strength-bar">
                <div
                  class="strength-fill"
                  :style="{ width: passwordStrength.percent + '%' }"
                  :class="passwordStrength.level"
                ></div>
              </div>
              <span class="strength-text" :class="passwordStrength.level">
                {{ passwordStrength.text }}
              </span>
            </div>
          </div>

          <div class="input-group">
            <label>Confirm Password <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">🔒</span>
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="ยืนยันรหัสผ่าน"
              />
              <span class="toggle-pass" @click="showConfirmPassword = !showConfirmPassword">
                {{ showConfirmPassword ? '🙈' : '👁️' }}
              </span>
            </div>
            <span
              v-if="form.confirmPassword && form.password !== form.confirmPassword"
              class="field-error"
            >
              ❌ รหัสผ่านไม่ตรงกัน
            </span>
            <span
              v-if="form.confirmPassword && form.password === form.confirmPassword && form.password"
              class="field-success"
            >
              ✅ รหัสผ่านตรงกัน
            </span>
          </div>
        </div>
      </div>

      <!-- Step 2: Employee Information -->
      <div v-show="currentStep === 1" class="form-section">
        <h3 class="section-title">
          <span class="section-icon">📋</span>
          ข้อมูลพนักงาน
        </h3>

        <div class="input-row two-cols">
          <div class="input-group">
            <label>รหัสพนักงาน <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">🏷️</span>
              <input v-model="form.employeeId" placeholder="EMP-XXXX" />
            </div>
          </div>

          <div class="input-group">
            <label>เพศ <span class="required">*</span></label>
            <div class="input-field select-field">
              <span class="field-icon">⚧</span>
              <select v-model="form.gender">
                <option value="" disabled>เลือกเพศ</option>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
                <option value="other">อื่น ๆ</option>
              </select>
            </div>
          </div>
        </div>

        <div class="input-row two-cols">
          <div class="input-group">
            <label>ชื่อ <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">✏️</span>
              <input v-model="form.firstName" placeholder="กรอกชื่อ" />
            </div>
          </div>

          <div class="input-group">
            <label>นามสกุล <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">✏️</span>
              <input v-model="form.lastName" placeholder="กรอกนามสกุล" />
            </div>
          </div>
        </div>

        <div class="input-row two-cols">
          <div class="input-group">
            <label>วันเกิด <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">📅</span>
              <input v-model="form.dateOfBirth" type="date" />
            </div>
          </div>

          <div class="input-group">
            <label>เบอร์โทรศัพท์ <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">📱</span>
              <input v-model="form.phone" placeholder="0XX-XXX-XXXX" />
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Work Information -->
      <div v-show="currentStep === 2" class="form-section">
        <h3 class="section-title">
          <span class="section-icon">💼</span>
          ข้อมูลการทำงาน
        </h3>

        <div class="input-row two-cols">
          <div class="input-group">
            <label>ตำแหน่ง <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">🎯</span>
              <input v-model="form.position" placeholder="กรอกตำแหน่ง" />
            </div>
          </div>

          <div class="input-group">
            <label>แผนก <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">🏢</span>
              <input v-model="form.department" placeholder="กรอกแผนก" />
            </div>
          </div>
        </div>

        <div class="input-row two-cols">
          <div class="input-group">
            <label>วันที่เริ่มงาน <span class="required">*</span></label>
            <div class="input-field">
              <span class="field-icon">📅</span>
              <input v-model="form.startDate" type="date" />
            </div>
          </div>

          <div class="input-group">
            <label>ประเภทพนักงาน <span class="required">*</span></label>
            <div class="input-field select-field">
              <span class="field-icon">📝</span>
              <select v-model="form.employeeType">
                <option value="" disabled>เลือกประเภท</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Role / Permission -->
      <div v-show="currentStep === 3" class="form-section">
        <h3 class="section-title">
          <span class="section-icon">🛡️</span>
          สิทธิ์การใช้งานระบบ
        </h3>

        <div class="role-selector">
          <div
            v-for="role in roles"
            :key="role.value"
            class="role-card"
            :class="{ selected: form.role === role.value }"
            @click="form.role = role.value"
          >
            <div class="role-icon">{{ role.icon }}</div>
            <div class="role-info">
              <h4>{{ role.label }}</h4>
              <p>{{ role.desc }}</p>
            </div>
            <div class="role-check" v-if="form.role === role.value">✓</div>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="action-buttons">
        <button
          v-if="currentStep > 0"
          class="btn btn-secondary"
          @click="prevStep"
        >
          ← ย้อนกลับ
        </button>

        <button
          v-if="currentStep < steps.length - 1"
          class="btn btn-primary"
          @click="nextStep"
        >
          ถัดไป →
        </button>

        <button
          v-if="currentStep === steps.length - 1"
          class="btn btn-success"
          @click="submitForm"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="spinner"></span>
          {{ isSubmitting ? 'กำลังสมัคร...' : '🚀 สมัครสมาชิก' }}
        </button>

        <button class="btn btn-cancel" @click="$emit('go-login')">
          ยกเลิก
        </button>
      </div>

      <!-- Footer -->
      <div class="register-footer">
        <p>
          มีบัญชีอยู่แล้ว?
          <a href="#" @click.prevent="$emit('go-login')">เข้าสู่ระบบ</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import img1 from '../../assets/1.jpg'
import img2 from '../../assets/2.jpg'
import img3 from '../../assets/3.jpg'
import img4 from '../../assets/4.jpg'
import img5 from '../../assets/5.jpg'
import img6 from '../../assets/6.jpg'

const emit = defineEmits(['go-login', 'register-success'])

const slides = [
  { image: img1 },
  { image: img2 },
  { image: img3 },
  { image: img4 },
  { image: img5 },
  { image: img6 }
]

const currentSlide = ref(0)
let slideInterval = null

onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 4000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

const steps = ['บัญชีผู้ใช้', 'ข้อมูลพนักงาน', 'ข้อมูลการทำงาน', 'สิทธิ์ระบบ']
const currentStep = ref(0)
const errors = ref([])
const successMessage = ref('')
const isSubmitting = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const usernameStatus = ref('') // '', 'taken', 'available'
const emailError = ref('')

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  employeeId: '',
  firstName: '',
  lastName: '',
  gender: '',
  dateOfBirth: '',
  phone: '',
  position: '',
  department: '',
  startDate: '',
  employeeType: '',
  role: ''
})

const roles = [
  {
    value: 'admin',
    label: 'Admin',
    icon: '👑',
    desc: 'ผู้ดูแลระบบ – มีสิทธิ์เข้าถึงทุกส่วนของระบบ'
  },
  {
    value: 'hr',
    label: 'HR',
    icon: '📊',
    desc: 'ฝ่ายทรัพยากรบุคคล – จัดการข้อมูลพนักงานและรายงาน'
  },
  {
    value: 'employee',
    label: 'Employee',
    icon: '👤',
    desc: 'พนักงานทั่วไป – ดูข้อมูลส่วนตัวและลางาน'
  }
]

// Simulated taken usernames
const takenUsernames = ['admin', 'hr', 'test', 'user']

const passwordStrength = computed(() => {
  const pwd = form.value.password
  if (!pwd) return { percent: 0, level: '', text: '' }

  let score = 0
  if (pwd.length >= 6) score++
  if (pwd.length >= 10) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  if (score <= 1) return { percent: 20, level: 'weak', text: 'อ่อน' }
  if (score <= 2) return { percent: 40, level: 'fair', text: 'พอใช้' }
  if (score <= 3) return { percent: 60, level: 'good', text: 'ดี' }
  if (score <= 4) return { percent: 80, level: 'strong', text: 'แข็งแกร่ง' }
  return { percent: 100, level: 'excellent', text: 'ยอดเยี่ยม' }
})

const checkUsername = () => {
  if (!form.value.username) {
    usernameStatus.value = ''
    return
  }
  if (takenUsernames.includes(form.value.username.toLowerCase())) {
    usernameStatus.value = 'taken'
  } else {
    usernameStatus.value = 'available'
  }
}

const validateEmailField = () => {
  if (!form.value.email) {
    emailError.value = ''
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    emailError.value = 'รูปแบบ Email ไม่ถูกต้อง'
  } else {
    emailError.value = ''
  }
}

const validateStep = (step) => {
  const errs = []

  if (step === 0) {
    if (!form.value.username) errs.push('กรุณากรอก Username')
    if (usernameStatus.value === 'taken') errs.push('Username นี้ถูกใช้แล้ว')
    if (!form.value.email) errs.push('กรุณากรอก Email')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (form.value.email && !emailRegex.test(form.value.email)) {
      errs.push('รูปแบบ Email ไม่ถูกต้อง')
    }
    if (!form.value.password) errs.push('กรุณากรอก Password')
    if (form.value.password && form.value.password.length < 6) {
      errs.push('Password ต้องมีอย่างน้อย 6 ตัวอักษร')
    }
    if (!form.value.confirmPassword) errs.push('กรุณายืนยัน Password')
    if (form.value.password !== form.value.confirmPassword) {
      errs.push('Password ไม่ตรงกัน')
    }
  }

  if (step === 1) {
    if (!form.value.employeeId) errs.push('กรุณากรอกรหัสพนักงาน')
    if (!form.value.firstName) errs.push('กรุณากรอกชื่อ')
    if (!form.value.lastName) errs.push('กรุณากรอกนามสกุล')
    if (!form.value.gender) errs.push('กรุณาเลือกเพศ')
    if (!form.value.dateOfBirth) errs.push('กรุณากรอกวันเกิด')
    if (!form.value.phone) errs.push('กรุณากรอกเบอร์โทรศัพท์')
  }

  if (step === 2) {
    if (!form.value.position) errs.push('กรุณากรอกตำแหน่ง')
    if (!form.value.department) errs.push('กรุณากรอกแผนก')
    if (!form.value.startDate) errs.push('กรุณากรอกวันที่เริ่มงาน')
    if (!form.value.employeeType) errs.push('กรุณาเลือกประเภทพนักงาน')
  }

  if (step === 3) {
    if (!form.value.role) errs.push('กรุณาเลือกสิทธิ์การใช้งาน')
  }

  return errs
}

const nextStep = () => {
  const errs = validateStep(currentStep.value)
  if (errs.length) {
    errors.value = errs
    return
  }
  errors.value = []
  currentStep.value++
}

const prevStep = () => {
  errors.value = []
  currentStep.value--
}

const goToStep = (idx) => {
  // Only allow going to completed steps
  if (idx < currentStep.value) {
    errors.value = []
    currentStep.value = idx
  }
}

const submitForm = async () => {
  const errs = validateStep(currentStep.value)
  if (errs.length) {
    errors.value = errs
    return
  }

  errors.value = []
  isSubmitting.value = true

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  isSubmitting.value = false
  successMessage.value = 'สมัครสมาชิกสำเร็จ! กำลังไปหน้าเข้าสู่ระบบ...'

  setTimeout(() => {
    emit('go-login')
  }, 2000)
}
</script>

<style scoped>
/* ========== Wrapper & Background ========== */
.register-wrapper {
  min-height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: background-image 1s ease-in-out;
  padding: 30px 20px;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 40, 80, 0.75),
    rgba(0, 120, 200, 0.45)
  );
}

/* ========== Panel ========== */
.register-panel {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 720px;
  padding: 35px 40px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.6s ease-out;
  color: #fff;
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ========== Header ========== */
.register-header {
  text-align: center;
  margin-bottom: 25px;
}

.register-logo {
  width: 60px;
  display: block;
  margin: 0 auto 8px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.system-title {
  font-weight: 800;
  font-size: 22px;
  letter-spacing: 2px;
  margin: 0;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin: 4px 0 0;
}

/* ========== Step Indicator ========== */
.step-indicator {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s ease;
  min-width: 80px;
}

.step-item.active {
  opacity: 1;
}

.step-item.completed {
  opacity: 0.85;
  cursor: pointer;
}

.step-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.step-item.active .step-circle {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border-color: transparent;
  box-shadow: 0 0 15px rgba(37, 99, 235, 0.5);
}

.step-item.completed .step-circle {
  background: linear-gradient(135deg, #10b981, #059669);
  border-color: transparent;
}

.step-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

.step-item.active .step-label {
  color: #fff;
  font-weight: 600;
}

/* ========== Error/Success Box ========== */
.error-box {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 18px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.error-box ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.error-box li {
  font-size: 13px;
  color: #fca5a5;
  margin-bottom: 3px;
}

.error-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.success-box {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 18px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.success-box p {
  margin: 0;
  font-size: 14px;
  color: #6ee7b7;
  font-weight: 600;
}

.success-icon {
  font-size: 20px;
}

/* ========== Form Section ========== */
.form-section {
  margin-bottom: 10px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e0e7ff;
}

.section-icon {
  font-size: 20px;
}

/* ========== Input Rows ========== */
.input-row {
  margin-bottom: 14px;
}

.input-row.two-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.input-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 5px;
}

.required {
  color: #f87171;
}

.input-field {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 10px 12px;
  transition: all 0.3s ease;
}

.input-field:focus-within {
  border-color: #60a5fa;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.2);
}

.field-icon {
  margin-right: 8px;
  font-size: 16px;
  flex-shrink: 0;
}

.input-field input,
.input-field select {
  border: none;
  background: none;
  width: 100%;
  font-size: 14px;
  color: #fff;
  outline: none;
}

.input-field input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.input-field select {
  cursor: pointer;
}

.input-field select option {
  background: #1e293b;
  color: #fff;
}

.select-field select {
  appearance: none;
  -webkit-appearance: none;
}

.toggle-pass {
  cursor: pointer;
  font-size: 16px;
  margin-left: 6px;
  user-select: none;
}

.field-error {
  display: block;
  font-size: 12px;
  color: #fca5a5;
  margin-top: 4px;
}

.field-success {
  display: block;
  font-size: 12px;
  color: #6ee7b7;
  margin-top: 4px;
}

/* ========== Password Strength ========== */
.password-strength {
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease, background 0.3s ease;
}

.strength-fill.weak {
  background: #ef4444;
}
.strength-fill.fair {
  background: #f97316;
}
.strength-fill.good {
  background: #eab308;
}
.strength-fill.strong {
  background: #22c55e;
}
.strength-fill.excellent {
  background: #10b981;
}

.strength-text {
  font-size: 11px;
  font-weight: 600;
}
.strength-text.weak {
  color: #fca5a5;
}
.strength-text.fair {
  color: #fdba74;
}
.strength-text.good {
  color: #fde047;
}
.strength-text.strong {
  color: #86efac;
}
.strength-text.excellent {
  color: #6ee7b7;
}

/* ========== Role Cards ========== */
.role-selector {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.role-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 2px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.role-card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(96, 165, 250, 0.3);
  transform: translateX(4px);
}

.role-card.selected {
  background: rgba(37, 99, 235, 0.15);
  border-color: #2563eb;
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.2);
}

.role-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.role-info h4 {
  margin: 0 0 3px;
  font-size: 15px;
  font-weight: 700;
}

.role-info p {
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.role-check {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  from {
    transform: translateY(-50%) scale(0);
  }
  to {
    transform: translateY(-50%) scale(1);
  }
}

/* ========== Buttons ========== */
.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-primary {
  flex: 1;
  justify-content: center;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-success {
  flex: 1;
  justify-content: center;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-success:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-cancel {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.btn-cancel:hover {
  background: rgba(239, 68, 68, 0.25);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ========== Footer ========== */
.register-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.register-footer a {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.register-footer a:hover {
  color: #93c5fd;
  text-decoration: underline;
}

/* ========== Transition ========== */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ========== Responsive ========== */
@media (max-width: 600px) {
  .register-panel {
    padding: 24px 20px;
  }

  .input-row.two-cols {
    grid-template-columns: 1fr;
  }

  .step-indicator {
    gap: 4px;
  }

  .step-label {
    font-size: 10px;
  }

  .step-circle {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
}
</style>
