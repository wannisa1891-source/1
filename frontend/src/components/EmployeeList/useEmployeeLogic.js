// ส่วนคำนวณการค้นหา/กรอง และจัดการ Master Data
import { ref, computed } from 'vue'
import { employeeService } from './EmployeeService'

export function useEmployeeLogic(employees, refreshCallback) {
  const searchQuery = ref('')
  const selectedDept = ref('')
  const selectedPos = ref('')
  const selectedStatus = ref('')

  // --- 1. Master Data: ข้อมูลอ้างอิงสำหรับ Dropdown ---
  const departmentList = ref([
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

  const positionList = ref([
    { id: 'P001', name: 'พยาบาลวิชาชีพ' },
    { id: 'P002', name: 'นายแพทย์' },
    { id: 'P003', name: 'เภสัชกร' },
    { id: 'P004', name: 'ทันตแพทย์' },
    { id: 'P005', name: 'นักเทคนิคการแพทย์' },
    { id: 'P006', name: 'เจ้าพนักงานรังสีการแพทย์' },
    { id: 'P007', name: 'เจ้าพนักงานธุรการ' },
    { id: 'P008', name: 'นักกายภาพบำบัด' },
    { id: 'P009', name: 'นักวิเคราะห์นโยบายและแผน' },
    { id: 'P010', name: 'โภชนากร' }
  ])

  const employmentTypes = ref(['พนักงานประจำ', 'พนักงานชั่วคราว', 'ลูกจ้างรายวัน'])

  // --- 2. Helper Functions: แปลง ID เป็นชื่อเพื่อแสดงผลในตาราง ---
  const getDeptName = (id) => {
    return departmentList.value.find(d => d.id === id)?.name || 'ไม่ระบุ'
  }

  const getPosName = (id) => {
    return positionList.value.find(p => p.id === id)?.name || 'ไม่ระบุ'
  }

  // --- 3. Filter Logic: การกรองข้อมูลพนักงาน ---
  const filteredEmployees = computed(() => {
    if (!employees.value) return []
    
    return employees.value.filter(emp => {
      // ค้นหาจากชื่อ-นามสกุล หรือรหัส
      const q = searchQuery.value.toLowerCase()
      const matchSearch = !q || 
        (emp.emp_id && emp.emp_id.toLowerCase().includes(q)) || 
        (emp.first_name_th && emp.first_name_th.includes(q)) ||
        (emp.last_name_th && emp.last_name_th.includes(q))    

      // กรองตาม Dropdown
      const matchDept = !selectedDept.value || emp.dept_id === selectedDept.value
      const matchPos = !selectedPos.value || emp.pos_id === selectedPos.value
      const matchStatus = !selectedStatus.value || (emp.status || 'Active') === selectedStatus.value

      return matchSearch && matchDept && matchPos && matchStatus
    })
  })

  // --- 4. CRUD Logic: ฟังก์ชันลบพนักงาน ---
  const removeEmployee = async (emp_id) => {
    if (confirm(`คุณต้องการลบพนักงานรหัส ${emp_id} ใช่หรือไม่?`)) {
      try {
        await employeeService.deleteEmployee(emp_id)
        alert('ลบข้อมูลสำเร็จ')
        if (refreshCallback) refreshCallback() // เรียก fetchAll() ในตัวรวม
      } catch (error) {
        alert('ลบไม่สำเร็จ: ' + (error.response?.data?.error || error.message))
      }
    }
  }

  // ส่งค่าที่จำเป็นออกไปใช้งาน
  return {
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
  }
}