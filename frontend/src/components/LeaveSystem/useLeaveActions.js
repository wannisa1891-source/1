//จัดการคำสั่ง
// เมื่อกด "ส่งใบลา" หรือกด "อนุมัติ" จัดการเรื่องเงื่อนไข-แจ้งเตือน
import { ref } from 'vue'
import { leaveService } from './LeaveService'
export function useLeaveActions(fetchCallback) {
  const isSubmitting = ref(false)
  const submitNewLeave = async (data) => {
    if(!data.start_date || !data.end_date || !data.emp_id) {
      alert('กรุณากรอกรหัสพนักงานและเลือกวันที่ลา')
      return false
    }
    isSubmitting.value = true
    try {
      await leaveService.submitLeave(data)
      alert('ส่งใบลาเรียบร้อยแล้ว!')
      await fetchCallback()
      return true
    } catch (error) {
      alert('บันทึกไม่ได้: ' + (error.response?.data?.message || 'ระบบขัดข้อง'))
      return false
    } finally {
      isSubmitting.value = false
    }
  }
  
  const updateLeaveStatus = async (leaveId, newStatus) => {
    if (!confirm(`ยืนยันการ ${newStatus === 'Approved' ? 'อนุมัติ' : 'ปฏิเสธ'} ?`)) return false
    try {
      await leaveService.updateStatus(leaveId, newStatus)
      alert('บันทึกสำเร็จ!')
      await fetchCallback()
      return true
    } catch (error) {
      alert('ล้มเหลว: ' + (error.response?.data?.message || 'ติดต่อ Server ไม่ได้'))
      return false
    }
  }
  return { isSubmitting, submitNewLeave, updateLeaveStatus }
}