//ตัวรวม
<script setup>
import { ref, onMounted } from 'vue'
import { employeeService } from './EmployeeService'
import { useEmployeeLogic } from './useEmployeeLogic'
import Employee_UI from './Employee_UI.vue'
const props = defineProps(['employees']) // รับมาจาก App.vue (ถ้ามี)
const localEmployees = ref([])
const showForm = ref(false)
// ใช้ Logic การกรอง
const { searchQuery, selectedDept, selectedPos, filteredEmployees } = useEmployeeLogic(localEmployees)
const fetchAll = async () => {
  localEmployees.value = await employeeService.fetchEmployees()
}
onMounted(fetchAll)
</script>
<template>
  <Employee_UI 
    :showForm="showForm"
    :employees="localEmployees"
    :filteredEmployees="filteredEmployees"
    v-model:searchQuery="searchQuery"
    v-model:selectedDept="selectedDept"
    v-model:selectedPos="selectedPos"
    @openForm="showForm = true"
    @closeForm="showForm = false"
    @refresh="fetchAll"
  />
</template>