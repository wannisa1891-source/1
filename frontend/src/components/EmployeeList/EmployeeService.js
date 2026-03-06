// ตัวเชื่อมต่อ API (ดึงข้อมูล/เพิ่ม/ลบ พนักงาน)
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

export const employeeService = {
  // 🔍 ดึงข้อมูลพนักงานทั้งหมด
  async fetchEmployees() {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`)
      return response.data.employees || response.data || []
    } catch (error) {
      console.error("Fetch Error:", error)
      throw error
    }
  },

  // ➕ เพิ่มพนักงานใหม่ (เช็ค FormData เพื่อรองรับการอัปโหลดรูปภาพ)
  async addEmployee(employeeData) {
    // *** แก้ไข: เช็คว่าเป็น FormData หรือไม่ ***
    const config = (employeeData instanceof FormData) 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : { headers: { 'Content-Type': 'application/json' } }
    
    return await axios.post(`${API_BASE_URL}/employees`, employeeData, config)
  },

  // 📝 แก้ไขข้อมูลพนักงาน (เช็ค FormData กรณีมีการเปลี่ยนรูปภาพ)
  async updateEmployee(emp_id, employeeData) {
    // *** แก้ไข: เช็คว่าเป็น FormData หรือไม่ ***
    const config = (employeeData instanceof FormData) 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : { headers: { 'Content-Type': 'application/json' } }

    return await axios.put(`${API_BASE_URL}/employees/${emp_id}`, employeeData, config)
  },

  // ❌ ลบพนักงาน
  async deleteEmployee(emp_id) {
    return await axios.delete(`${API_BASE_URL}/employees/${emp_id}`)
  }
}