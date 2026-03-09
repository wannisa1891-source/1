<script setup>
import { ref, onMounted, reactive } from 'vue'
import { employeeService } from './EmployeeService'
import { useEmployeeLogic } from './useEmployeeLogic'
import Employee_UI from './Employee_UI.vue'

// 1. สถานะหลัก
const localEmployees = ref([])
const showForm = ref(false)
const isEditing = ref(false)

// *** แก้ที่ 1: เพิ่ม selectedFile ไว้เก็บ Object ไฟล์รูปภาพที่เลือกจากหน้าจอ ***
const selectedFile = ref(null) 

// 2. ข้อมูลในฟอร์ม
const formData = reactive({
  emp_id: '',
  id_card: '',
  prefix: 'นาย',
  first_name_th: '',
  last_name_th: '',
  dept_id: '',
  pos_id: '',
  emp_type: 'พนักงานประจำ', // ต้องมีบรรทัดนี้!
  status: 'Active',
  image: '' // ต้องมีบรรทัดนี้!
})

// 3. ดึงข้อมูลพนักงานทั้งหมด
const fetchAll = async () => {
  localEmployees.value = await employeeService.fetchEmployees()
}

// 4. ดึง Logic การคำนวณและ Master Data มาใช้งาน
const { 
  searchQuery, 
  selectedDept, 
  selectedPos, 
  selectedStatus,
  departmentList,    
  positionList,      
  employmentTypes,    
  filteredEmployees,
  removeEmployee,
  getDeptName,       
  getPosName         
} = useEmployeeLogic(localEmployees, fetchAll)

// ฟังก์ชันรับไฟล์ที่ส่งขึ้นมาจาก Employee_UI (เมื่อมีการเลือกรูป)
const onFileSelected = (file) => {
  selectedFile.value = file
}

// *** แก้ที่ 3: ปรับปรุง handleSave ให้ใช้ FormData เพื่อให้ส่งรูปภาพได้จริง ***
const handleSave = async () => {
  try {
    // สร้างตะกร้าข้อมูลแบบ FormData (ส่งได้ทั้งตัวหนังสือและไฟล์)
    const payload = new FormData()
    
    // นำข้อมูลตัวหนังสือจาก formData ใส่ลงใน payload
    Object.keys(formData).forEach(key => {
      payload.append(key, formData[key])
    })

    // ถ้ามีการเลือกไฟล์รูปภาพใหม่ ให้ใส่ลงในช่อง 'image'
    if (selectedFile.value) {
      payload.append('image', selectedFile.value)
    }

    if (isEditing.value) {
      await employeeService.updateEmployee(formData.emp_id, payload)
      alert('แก้ไขข้อมูลสำเร็จ')
    } else {
      await employeeService.addEmployee(payload)
      alert('เพิ่มพนักงานสำเร็จ')
    }

    showForm.value = false
    selectedFile.value = null // ล้างไฟล์ที่ค้างอยู่หลังบันทึก
    fetchAll() // โหลดรายการใหม่
  } catch (error) {
    console.error('Save Error:', error)
    alert('บันทึกไม่สำเร็จ: ' + (error.response?.data?.error || error.message))
  }
}

// 6. เตรียมข้อมูลเมื่อกดปุ่ม "แก้ไข"
const prepareEdit = (emp) => {
  isEditing.value = true
  selectedFile.value = null // ล้างรูปภาพที่อาจเลือกค้างไว้ก่อนหน้า
  Object.assign(formData, emp)
  showForm.value = true
}

// 7. ล้างข้อมูลเมื่อกดปุ่ม "เพิ่มพนักงานใหม่"
const prepareAdd = () => {
  isEditing.value = false
  selectedFile.value = null
  Object.assign(formData, {
    emp_id: '', 
    id_card: '', 
    prefix: 'นาย', 
    first_name_th: '', 
    last_name_th: '',
    dept_id: '', 
    pos_id: '', 
    emp_type: 'พนักงานประจำ',
    status: 'Active',
    image: ''
  })
  showForm.value = true
}

onMounted(fetchAll)
</script>

<template>
  <Employee_UI 
    :showForm="showForm"
    :isEditing="isEditing"
    :employees="localEmployees"
    :filteredEmployees="filteredEmployees"
    :formData="formData"
    :departmentList="departmentList"
    :positionList="positionList"
    :employmentTypes="employmentTypes"
    :getDeptName="getDeptName"
    :getPosName="getPosName"  
    
    v-model:searchQuery="searchQuery"
    v-model:selectedDept="selectedDept"
    v-model:selectedPos="selectedPos"
    v-model:selectedStatus="selectedStatus"
    
    @open-form="prepareAdd"
    @close-form="showForm = false"
    @edit-employee="prepareEdit"
    @delete-employee="removeEmployee"
    @submit="handleSave"
    @refresh="fetchAll"
    @file-selected="onFileSelected" 
  />
</template>