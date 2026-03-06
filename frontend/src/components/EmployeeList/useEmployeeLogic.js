//ส่วนคำนวณการค้นหา/กรอง
import { ref, computed } from 'vue'
export function useEmployeeLogic(employees) {
  const searchQuery = ref('')
  const selectedDept = ref('')
  const selectedPos = ref('')
  const filteredEmployees = computed(() => {
    return employees.value.filter(emp => {
      const fullName = `${emp.first_name_th} ${emp.last_name_th}`.toLowerCase()
      const search = searchQuery.value.toLowerCase()   
      const matchSearch = (emp.emp_id || '').toLowerCase().includes(search) || 
                          fullName.includes(search)
      const matchDept = !selectedDept.value || emp.dept_id === selectedDept.value
      const matchPos = !selectedPos.value || emp.position_id === selectedPos.value
      return matchSearch && matchDept && matchPos
    })
  })
  return { searchQuery, selectedDept, selectedPos, filteredEmployees }
}