//จัดการการค้นหาและตัวกรอง
import { ref, computed } from 'vue'
export function useLeaveFilter(leaves) {
  const searchText = ref('')
  const selectedDept = ref('all')
  const selectedStatus = ref('all')
  const selectedLeaveType = ref('all')
  const filteredLeaves = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return leaves.value.filter(leave => {
      const fullName = `${leave.first_name_th} ${leave.last_name_th}`.toLowerCase()
      const search = searchText.value.toLowerCase()
      const matchSearch = (leave.emp_id || '').toLowerCase().includes(search) ||
                          fullName.includes(search) ||
                          (leave.reason || '').toLowerCase().includes(search)
      const matchStatus = selectedStatus.value === 'all' || leave.status === selectedStatus.value
      const matchDept = selectedDept.value === 'all' || leave.dept_id === selectedDept.value
      let matchSickToday = true
      if (selectedLeaveType.value === 'L01') {
        const startDate = leave.start_date?.substring(0, 10) || ''
        const endDate = leave.end_date?.substring(0, 10) || ''
        matchSickToday = leave.leave_type_id === 'L01' && today >= startDate && today <= endDate
      }

      return matchSearch && matchStatus && matchDept && matchSickToday
    })
  })

  const filterByCard = (type) => {
    if (type === 'sick') {
      selectedStatus.value = 'Approved'
      selectedLeaveType.value = 'L01'
      searchText.value = ''
    } else if (type === 'pending') {
      selectedStatus.value = 'Pending'
      selectedLeaveType.value = 'all'
      searchText.value = ''
    } else {
      selectedStatus.value = 'all'
      selectedDept.value = 'all'
      selectedLeaveType.value = 'all'
      searchText.value = ''
    }
  }

  return { searchText, selectedDept, selectedStatus, selectedLeaveType, filteredLeaves, filterByCard }
}