const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors()); 
app.use(express.json()); 

// เชื่อมต่อฐานข้อมูล11 (ใช้ Port 3307 ตามที่คุณตั้งค่าไว้)
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306, 
    user: 'root',
    password: '', 
    database: 'hrm_db' 
});

db.connect((err) => {
    if (err) {
        console.error('❌ เชื่อมต่อฐานข้อมูลไม่สำเร็จ:', err);
        return;
    }
    console.log('✅ เชื่อมต่อฐานข้อมูล MySQL สำเร็จแล้ว! พร้อมลุย');
});

// ============================================
// API ข้อมูลพนักงาน (ของเดิมของคุณ)
// ============================================

// API ดึงข้อมูลพนักงาน
app.get('/api/employees', (req, res) => {
    db.query("SELECT * FROM tbl_employees", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results); 
    });
});

// API เพิ่มพนักงาน
app.post('/api/employees', (req, res) => {
    const { 
        emp_id, prefix, first_name_th, last_name_th, 
        emp_type, dept_id, pos_id, start_date, base_salary 
    } = req.body;
    
    const citizen_id = req.body.citizen_id || '0000000000000'; 
    const phone = req.body.phone || '000-000-0000';

    const sql = `INSERT INTO tbl_employees 
        (emp_id, prefix, first_name_th, last_name_th, citizen_id, phone, emp_type, dept_id, pos_id, start_date, base_salary, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')`;

    const values = [
        emp_id, prefix, first_name_th, last_name_th, 
        citizen_id, phone, emp_type, dept_id, pos_id, 
        start_date, base_salary
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('❌ บันทึกไม่สำเร็จเพราะ:', err.sqlMessage);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json({ message: '✅ บันทึกพนักงานใหม่สำเร็จ!', id: result.insertId });
    });
});

// ============================================
// 🌟 API ใหม่ที่เพิ่มเข้ามา สำหรับ "จัดการการลา" 🌟
// ============================================

// API 1: ดึงข้อมูลการลาทั้งหมด (ใช้แสดงในตารางหน้าแรก)
// API 1: ดึงข้อมูลการลาทั้งหมด (เชื่อมข้อมูลชื่อและแผนกให้ด้วย)
app.get('/api/leaves', (req, res) => {
    // ใช้คำสั่ง JOIN เพื่อดึงชื่อพนักงาน และ ชื่อแผนก ออกมาด้วย
    const sql = `
        SELECT 
            l.*, 
            e.first_name_th, 
            e.last_name_th, 
            e.dept_id, 
            d.dept_name 
        FROM tbl_leaves l
        LEFT JOIN tbl_employees e ON l.emp_id = e.emp_id
        LEFT JOIN tbl_departments d ON e.dept_id = d.dept_id
        ORDER BY l.start_date DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results); 
    });
});

// API 2: เพิ่มข้อมูลใบลาใหม่ลง Database
app.post('/api/leaves', (req, res) => {
    const { emp_id, leave_type_id, start_date, end_date, reason } = req.body;
    
    // สร้างรหัสใบลาแบบสุ่ม (เช่น L0012)
    const leave_id = 'L' + Math.floor(1000 + Math.random() * 9000);

    const sql = `INSERT INTO tbl_leaves 
        (leave_id, emp_id, leave_type_id, start_date, end_date, reason, status) 
        VALUES (?, ?, ?, ?, ?, ?, 'Pending')`;

    // ค่าพวกแผนก (dept_id) ตำแหน่ง (pos_id) ไม่จำเป็นต้องบันทึกลง tbl_leaves เพราะสามารถ Join กับ tbl_employees ทีหลังได้
    const values = [leave_id, emp_id, leave_type_id, start_date, end_date, reason];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('❌ บันทึกการลาไม่สำเร็จ:', err.sqlMessage);
            return res.status(500).json({ success: false, message: err.sqlMessage });
        }
        res.json({ success: true, message: '✅ ส่งใบลาสำเร็จ!' });
    });
});

// เปลี่ยนจาก UPDATE leaves เป็น UPDATE tbl_leaves
app.put('/api/leaves/:id', (req, res) => {
    const leaveId = req.params.id;
    const { status } = req.body;

    // แก้ไขตรงนี้ครับ เติม tbl_ เข้าไปข้างหน้า leaves
    const sql = "UPDATE tbl_leaves SET status = ? WHERE leave_id = ?";
    
    db.query(sql, [status, leaveId], (err, result) => {
        if (err) {
            console.error('❌ SQL Error:', err.sqlMessage); // ดู Error จริงใน Terminal
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตฐานข้อมูล" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ไม่พบรหัสใบลาที่ระบุ" });
        }
        res.json({ message: "อัปเดตสถานะเรียบร้อยแล้ว", status: status });
    });
});

// ============================================
// เปิด Server
// ============================================
app.listen(3000, () => {
    console.log('🚀 เซิร์ฟเวอร์รันที่ http://localhost:3000');
});