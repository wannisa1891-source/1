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

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { employeeService } from './EmployeeService'
import { useEmployeeLogic } from './useEmployeeLogic'
import Employee_UI from './Employee_UI.vue'

// 1. สถานะหลัก
const localEmployees = ref([])
const showForm = ref(false)
const isEditing = ref(false)
const selectedFile = ref(null) 

// 2. ข้อมูลในฟอร์ม (เพิ่มฟิลด์ใหม่ให้ครบตามหน้า UI และ Database)
const formData = reactive({
  emp_id: '',
  id_card: '',
  prefix: 'นาย',
  first_name_th: '',
  last_name_th: '',
  first_name_en: '', // <--- เพิ่มใหม่
  last_name_en: '',  // <--- เพิ่มใหม่
  birth_date: '',    // <--- เพิ่มใหม่
  gender: 'ชาย',      // <--- เพิ่มใหม่
  address: '',       // <--- เพิ่มใหม่
  dept_id: '',
  pos_id: '',
  emp_type: 'พนักงานประจำ',
  status: 'Active',
  image: '',
  start_date: '',    // <--- เพิ่มใหม่ (ถ้ายังไม่มี)
  base_salary: 0     // <--- เพิ่มใหม่ (ถ้ายังไม่มี)
})

// 3. ดึงข้อมูลพนักงานทั้งหมด
const fetchAll = async () => {
  localEmployees.value = await employeeService.fetchEmployees()
}

// 4. ดึง Logic การคำนวณและ Master Data
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

const onFileSelected = (file) => {
  selectedFile.value = file
}

// 5. บันทึกข้อมูล
const handleSave = async () => {
  try {
    const payload = new FormData()
    
    // วนลูปเอาข้อมูลจาก formData ใส่ FormData object
    Object.keys(formData).forEach(key => {
      // ป้องกันกรณีค่าเป็น null ให้ส่งเป็นสายอักขระว่างแทน
      const value = formData[key] === null ? '' : formData[key]
      payload.append(key, value)
    })

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
    selectedFile.value = null 
    fetchAll() 
  } catch (error) {
    console.error('Save Error:', error)
    alert('บันทึกไม่สำเร็จ: ' + (error.response?.data?.error || error.message))
  }
}

// 6. เตรียมแก้ไข (Mapping ข้อมูลจาก Database ลง Form)
const prepareEdit = (emp) => {
  isEditing.value = true
  selectedFile.value = null
  
  // ใช้ Object.assign เพื่อ copy ค่าทั้งหมดจาก emp เข้า formData
  // รวมถึงฟิลด์ใหม่ๆ เช่น first_name_en, birth_date ด้วย
  Object.assign(formData, emp)
  
  // จัดการกรณีชื่อตัวแปรไม่ตรงกัน (เช่น citizen_id vs id_card)
  if (emp.citizen_id) formData.id_card = emp.citizen_id
  
  showForm.value = true
}

// 7. เตรียมเพิ่มใหม่ (ล้างข้อมูลให้ว่างทุกช่อง)
const prepareAdd = () => {
  isEditing.value = false
  selectedFile.value = null
  Object.assign(formData, {
    emp_id: '', 
    id_card: '', 
    prefix: 'นาย', 
    first_name_th: '', 
    last_name_th: '',
    first_name_en: '', // <--- ล้างค่า
    last_name_en: '',  // <--- ล้างค่า
    birth_date: '',    // <--- ล้างค่า
    gender: 'ชาย',      // <--- ล้างค่า
    address: '',       // <--- ล้างค่า
    dept_id: '', 
    pos_id: '', 
    emp_type: 'พนักงานประจำ',
    status: 'Active',
    image: '',
    start_date: '',
    base_salary: 0
  })
  showForm.value = true
}

onMounted(fetchAll)
</script>

