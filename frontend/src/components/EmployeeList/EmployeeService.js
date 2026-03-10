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

  // ➕ เพิ่มพนักงานใหม่
  async addEmployee(employeeData) {
    try {
      const config = (employeeData instanceof FormData) 
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : { headers: { 'Content-Type': 'application/json' } }
      return await axios.post(`${API_BASE_URL}/employees`, employeeData, config)
    } catch (error) {
      // ดักจับ Error เพื่อส่งต่อให้หน้า UI แสดงผล
      console.error("Add Error:", error.response?.data || error.message)
      throw error
    }
  },

  // 📝 แก้ไขข้อมูลพนักงาน
  async updateEmployee(emp_id, employeeData) {
    try {
      const config = (employeeData instanceof FormData) 
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : { headers: { 'Content-Type': 'application/json' } }

      return await axios.put(`${API_BASE_URL}/employees/${emp_id}`, employeeData, config)
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message)
      throw error
    }
  },

  // ❌ ลบพนักงาน
  async deleteEmployee(emp_id) {
    try {
      return await axios.delete(`${API_BASE_URL}/employees/${emp_id}`)
    } catch (error) {
      console.error("Delete Error:", error)
      throw error
    }
  }
}