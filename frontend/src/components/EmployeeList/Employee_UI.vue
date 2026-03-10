<template>
  <div class="emp-modern-wrapper">
    <div v-if="!showForm" class="premium-glass-card fade-in">
      <div class="card-header-flex">
        <h2 class="card-title">ทะเบียนบุคลากร</h2>
        <button @click="$emit('open-form')" class="btn-primary-add">
          <span class="icon">➕</span> เพิ่มพนักงานใหม่
        </button>
      </div>

      <div class="action-bar-modern">
        <div class="search-pill">
          <span class="search-icon">🔍</span>
          <input 
            :value="searchQuery" 
            @input="$emit('update:searchQuery', $event.target.value)"
            type="text" 
            placeholder="ค้นหาชื่อ, นามสกุล หรือรหัส..." 
            class="search-input-clean"
          >
        </div>
        <div class="filter-group">
          <span class="filter-label">ตัวกรอง:</span>
          <select :value="selectedDept" @change="$emit('update:selectedDept', $event.target.value)" class="select-modern">
            <option value="">ทุกกลุ่มงาน (แผนก)</option>
            <option v-for="dept in departmentList" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
          </select>
          <select :value="selectedPos" @change="$emit('update:selectedPos', $event.target.value)" class="select-modern">
            <option value="">ทุกตำแหน่ง</option>
            <option v-for="pos in positionList" :key="pos.id" :value="pos.id">{{ pos.name }}</option>
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="premium-table">
          <thead>
            <tr>
              <th>รูปภาพ</th>
              <th>รหัส / ชื่อ-นามสกุล</th>
              <th>ตำแหน่ง / แผนก</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in filteredEmployees" :key="emp.emp_id">
              <td>
                <div class="avatar-circle">
                  <img v-if="emp.image" :src="getServerImageUrl(emp.image)" class="avatar-img" />
                  <span v-else>👤</span>
                </div>
              </td>
              <td>
                <div class="fw-bold">{{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}</div>
                <div style="font-size: 11px; color: #94a3b8;">{{ emp.emp_id }}</div>
              </td>
              <td>
                <div>{{ getPosName(emp.pos_id) }}</div>
                <div class="text-muted" style="font-size: 12px;">{{ getDeptName(emp.dept_id) }}</div>
              </td>
              <td><span class="badge-success">● {{ emp.status || 'Active' }}</span></td>
              <td>
                <div style="display: flex; gap: 8px;">
                  <button @click="$emit('edit-employee', emp)" class="btn-action edit" title="แก้ไข">✏️</button>
                  <button @click="$emit('delete-employee', emp.emp_id)" class="btn-action delete" title="ลบ">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="premium-glass-card fade-in">
      <div class="card-header-flex border-bottom-dark">
        <h2 class="card-title">{{ isEditing ? 'แก้ไขข้อมูลพนักงาน' : 'เพิ่มพนักงานใหม่' }}</h2>
        <button @click="handleCancel" class="btn-outline-back">⬅ ย้อนกลับ</button>
      </div>
      <div class="form-section-box">
        <h3 class="section-title">ข้อมูลพื้นฐาน</h3>
        <div class="form-flex-layout">
          <div class="photo-upload-area">
            <div class="photo-placeholder" @click="$refs.fileInput.click()">
              <img v-if="localPreview" :src="localPreview" class="preview-img" />
              <img v-else-if="formData.image" :src="getServerImageUrl(formData.image)" class="preview-img" />
              <span v-else>📷 เลือกรูป</span>
            </div>
            <input type="file" ref="fileInput" style="display: none" accept="image/*" @change="onFileChange">
            <button type="button" class="btn-upload-small" @click="$refs.fileInput.click()">เปลี่ยนรูปภาพ</button>
          </div>

          <div class="form-grid-2">
            <div class="input-wrapper">
              <label>รหัสพนักงาน :</label>
              <input type="text" class="input-modern" v-model="formData.emp_id" :disabled="isEditing">
            </div>
            <div class="input-wrapper">
              <label>เลขบัตรประชาชน :</label>
              <input type="text" class="input-modern" v-model="formData.id_card">
            </div>
            <div class="input-wrapper">
              <label>กลุ่มงาน (แผนก) :</label>
              <select class="input-modern" v-model="formData.dept_id">
                <option value="">-- เลือกกลุ่มงาน --</option>
                <option v-for="dept in departmentList" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
              </select>
            </div>
            <div class="input-wrapper">
              <label>ตำแหน่ง :</label>
              <select class="input-modern" v-model="formData.pos_id">
                <option value="">-- เลือกตำแหน่ง --</option>
                <option v-for="pos in positionList" :key="pos.id" :value="pos.id">{{ pos.name }}</option>
              </select>
            </div>
            <div class="input-wrapper">
              <label>ประเภทการจ้าง :</label>
              <select class="input-modern" v-model="formData.emp_type">
                <option v-for="type in employmentTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
            <div class="input-wrapper">
  <label>วันที่เริ่มงาน :</label>
  <input type="date" class="input-modern" v-model="formData.start_date">
</div>

<div class="input-wrapper">
  <label>เงินเดือนพื้นฐาน :</label>
  <input type="number" class="input-modern" v-model="formData.base_salary" placeholder="0.00">
</div>

<div class="input-wrapper">
  <label>เบอร์โทรศัพท์ :</label>
  <input type="text" class="input-modern" v-model="formData.phone">
</div>
          </div>
        </div>
      </div>
      <div class="form-action-buttons">
        <button @click="handleCancel" class="btn-cancel-modern">ยกเลิก</button>
        <button @click="$emit('submit')" class="btn-save-modern">บันทึกข้อมูล</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps([
  'showForm', 'searchQuery', 'selectedDept', 'selectedPos', 
  'filteredEmployees', 'departmentList', 'positionList', 
  'employmentTypes', 'formData', 'isEditing',
  'getDeptName', 'getPosName'
])

const emit = defineEmits([
  'update:searchQuery', 'update:selectedDept', 'update:selectedPos', 
  'open-form', 'close-form', 'submit', 'edit-employee', 'delete-employee',
  'file-selected' // <--- เพิ่ม Event ใหม่สำหรับส่งไฟล์ภาพ
])

// 1. จัดการรูปภาพ
const fileInput = ref(null)
const localPreview = ref(null)

// ฟังก์ชันดึง URL รูปภาพจาก Server (ปรับ port ตาม backend ของคุณ)
const getServerImageUrl = (name) => {
  if (!name) return ''
  // หากเป็นชื่อไฟล์เฉยๆ ให้ดึงจากโฟลเดอร์ uploads ของ server
  return `http://localhost:3000/uploads/${name}`
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    // สร้างภาพตัวอย่าง
    localPreview.value = URL.createObjectURL(file)
    // ส่งไฟล์จริง (Object) ไปยัง EmployeeList เพื่อใช้ส่ง API แบบ FormData
    emit('file-selected', file)
  }
}

const handleCancel = () => {
  localPreview.value = null
  emit('close-form')
}

// Reset preview เมื่อมีการเปลี่ยนพนักงานที่จะแก้ไข หรือเปิดฟอร์มใหม่
watch(() => props.showForm, (newVal) => {
  if (!newVal) localPreview.value = null
})
</script>

<style scoped>
/* --- Style เดิมของคุณ และเพิ่มส่วนอัปโหลด --- */
.emp-modern-wrapper { padding: 35px 20px; animation: fadeIn 0.4s ease-in-out; background: #ffffff !important; min-height: 100vh; }
.premium-glass-card { background: #ffffff; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); padding: 30px; border: 1px solid #f1f5f9; }
.card-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.card-title { margin: 0; font-size: 22px; color: #1e293b; font-weight: 700; }
.action-bar-modern { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; gap: 15px; flex-wrap: wrap; }
.search-pill { display: flex; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 50px; padding: 8px 20px; width: 350px; }
.search-input-clean { border: none; background: transparent; outline: none; width: 100%; margin-left: 10px; }
.filter-group { display: flex; align-items: center; gap: 12px; }
.select-modern { border: 1px solid #e2e8f0; background: #ffffff; padding: 8px 15px; border-radius: 10px; }
.btn-primary-add { background: #c5a073; color: white; border: none; padding: 10px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(197,160,115,0.3); }
.btn-outline-back { background: white; color: #475569; border: 1px solid #cbd5e1; padding: 8px 20px; border-radius: 10px; cursor: pointer; }
.table-responsive { overflow-x: auto; border-radius: 12px; border: 1px solid #f1f5f9; }
.premium-table { width: 100%; border-collapse: collapse; text-align: left; }
.premium-table th { background: #f8fafc; color: #64748b; padding: 16px 20px; border-bottom: 2px solid #e2e8f0; }
.premium-table td { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; color: #1e293b; }
.avatar-circle { width: 45px; height: 45px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid #e2e8f0; }
.avatar-img { width: 100%; height: 100%; object-fit: cover; }

/* ส่วน Photo Upload */
.photo-upload-area { display: flex; flex-direction: column; align-items: center; gap: 10px; width: 140px; }
.photo-placeholder { width: 120px; height: 150px; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #f8fafc; overflow: hidden; cursor: pointer; transition: 0.3s; }
.photo-placeholder:hover { border-color: #c5a073; background: #f1f5f9; }
.preview-img { width: 100%; height: 100%; object-fit: cover; }
.btn-upload-small { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 4px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; }

.badge-success { background: #dcfce7; color: #166534; padding: 6px 14px; border-radius: 50px; font-size: 13px; font-weight: 700; }
.btn-action { border: none; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.btn-action.edit { background: #fef9c3; color: #854d0e; }
.btn-action.delete { background: #fee2e2; color: #991b1b; }
.form-section-box { background: #ffffff; border-radius: 15px; padding: 25px; margin-bottom: 20px; border: 1px solid #e2e8f0; }
.section-title { font-size: 18px; color: #334155; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 20px; }
.form-flex-layout { display: flex; gap: 30px; }
.form-grid-2 { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 15px 25px; }
.input-wrapper { display: flex; align-items: center; gap: 10px; }
.input-wrapper label { width: 160px; text-align: right; font-size: 14px; font-weight: 600; }
.input-modern { flex: 1; padding: 8px 15px; border: 1px solid #cbd5e1; border-radius: 10px; background: #f8fafc; }
.form-action-buttons { display: flex; justify-content: center; gap: 20px; margin-top: 35px; }
.btn-cancel-modern { background: #ffffff; border: 2px solid #cbd5e1; padding: 12px 40px; border-radius: 12px; font-weight: bold; cursor: pointer; }
.btn-save-modern { background: #22c55e; color: white; border: none; padding: 12px 50px; border-radius: 12px; font-weight: bold; cursor: pointer; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>