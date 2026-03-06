//คำนวณตัวเลขสรุป
//นับว่าวันนี้มีคนลาป่วยกี่คน? มีรายการรออนุมัติค้างอยู่กี่รายการ?
import { computed } from 'vue'
export function useLeaveCounter(leaves) {
  const sickTodayCount = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return leaves.value.filter(l => {
      const startDate = l.start_date?.substring(0, 10) || ''
      const endDate = l.end_date?.substring(0, 10) || ''
      return l.leave_type_id === 'L01' && 
             today >= startDate && today <= endDate &&
             l.status === 'Approved'
    }).length
  })
  const pendingCount = computed(() => {
    return leaves.value.filter(l => l.status === 'Pending').length
  })
  return { sickTodayCount, pendingCount }
}