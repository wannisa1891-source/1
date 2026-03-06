// เชื่อมทุกหน้าเข้าด้วยกัน
<script setup>
import { ref, onMounted } from 'vue'
// 1. นำเข้า Service (ต้องเป็น leaveService ตัวเล็กตามไฟล์ LeaveService.js)
import { leaveService } from './LeaveService'
// 2. นำเข้า Logic ต่างๆ (ต้องส่งค่า leaves เข้าไปด้วย)
import { useLeaveCounter } from './useLeaveCounter'
import { useLeaveFilter } from './useLeaveFilter'
import { useLeaveActions } from './useLeaveActions'
// 3. นำเข้า UI (ชื่อไฟล์ที่คุณต้องการ)
import Leave_UI from './Leave_UI.vue'
// --- State หลัก ---
const leaves = ref([])
// ใน Leave_System.vue
const departments = ref([
  { id: 'D001', name: 'กลุ่มงานการพยาบาล' },
  { id: 'D002', name: 'กลุ่มงานการแพทย์' },
  { id: 'D003', name: 'กลุ่มงานเภสัชกรรมฯ' },
  { id: 'D004', name: 'กลุ่มงานทันตกรรม' },
  { id: 'D005', name: 'กลุ่มงานเทคนิคการแพทย์' },
  { id: 'D006', name: 'กลุ่มงานรังสีวิทยา' },
  { id: 'D007', name: 'กลุ่มงานบริหารทั่วไป' },
  { id: 'D008', name: 'กลุ่มงานเวชศาสตร์ฟื้นฟู' },
  { id: 'D009', name: 'กลุ่มงานยุทธศาสตร์ฯ' },
  { id: 'D010', name: 'กลุ่มงานโภชนาการ' }
])
const isLoading = ref(false)
// --- เชื่อมต่อ Logic ---
const { sickTodayCount, pendingCount } = useLeaveCounter(leaves)
const { 
  searchText, selectedDept, selectedStatus, 
  filteredLeaves, filterByCard 
} = useLeaveFilter(leaves)
// ฟังก์ชันโหลดข้อมูลใหม่
const fetchAllData = async () => {
  isLoading.value = true
  try {
    const data = await leaveService.fetchLeaves()
    leaves.value = data
  } catch (error) {
    console.error('โหลดข้อมูลไม่สำเร็จ:', error)
  } finally {
    isLoading.value = false
  }
}
// 4. นำเข้า Action (ส่ง fetchAllData ไปเพื่อให้มันโหลดใหม่หลังบันทึก)
const { isSubmitting, submitNewLeave, updateLeaveStatus } = useLeaveActions(fetchAllData)
const goBack = () => {
  window.history.back()
}
onMounted(fetchAllData)
</script>
<template>
  <Leave_UI 
    :leaves="leaves"
    :filteredLeaves="filteredLeaves"
    :sickTodayCount="sickTodayCount"
    :pendingCount="pendingCount"
    :isLoading="isLoading"
    :isSubmitting="isSubmitting"
    :departments="departments" 
    v-model:searchText="searchText"
    v-model:selectedDept="selectedDept"
    v-model:selectedStatus="selectedStatus" 
    @filterCard="filterByCard"
    @submit="submitNewLeave"
    @updateStatus="updateLeaveStatus"
    @goBack="goBack"
  />
</template>