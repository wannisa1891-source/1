//ตัวเชื่อม API คุยกับหลังบ้าน ส่งข้อมูลไป-รับข้อมูลกลับ
//ใช้ axios เพื่อไปดึงข้อมูลจาก Database หรือส่งข้อมูลใหม่ไปบันทึก 
import axios from 'axios'
const API_BASE_URL = 'http://localhost:3000/api'
export const leaveService = {
  async fetchLeaves() {
    const response = await axios.get(`${API_BASE_URL}/leaves`)
    return response.data || []
  },
  async submitLeave(data) {
    return await axios.post(`${API_BASE_URL}/leaves`, data)
  },
  async updateStatus(leaveId, status) {
    return await axios.put(`${API_BASE_URL}/leaves/${leaveId}`, { status })
  }
}