//ตัวเชื่อมต่อ API (ดึงข้อมูล/เพิ่ม/ลบ พนักงาน)
import axios from 'axios'
const API_BASE_URL = 'http://localhost:3000/api'
export const employeeService = {
  async fetchEmployees() {
    const response = await axios.get(`${API_BASE_URL}/employees`)
    return response.data.employees || response.data || []
  },
  async addEmployee(employeeData) {
    return await axios.post(`${API_BASE_URL}/employees`, employeeData)
  }
  // เพิ่มฟังก์ชัน update หรือ delete ได้ที่นี่ในอนาคต
}