const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors()); 
app.use(express.json()); 

// การตั้งค่าฐานข้อมูลเบื้องต้น
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'hrm_db'
};

let db; // ตัวแปรสำหรับเก็บการเชื่อมต่อ

// ฟังก์ชันสำหรับลองเชื่อมต่อพอร์ตแบบสลับอัตโนมัติ
function connectDatabase(port) {
    const connection = mysql.createConnection({ ...dbConfig, port: port });

    connection.connect((err) => {
        if (err) {
            if (port === 3306) {
                // ถ้า 3306 เข้าไม่ได้ (เครื่องคุณ) ให้ข้ามมาลอง 3307
                console.log('⚠️ Port 3306 เข้าไม่ได้... กำลังสลับไปลอง Port 3307');
                connectDatabase(3307);
            } else {
                // ถ้าทั้ง 3306 และ 3307 ยังไม่ได้อีก แสดงว่าปัญหาอื่น (เช่น ลืมเปิด MySQL หรือรหัสผิด)
                console.error('❌ เชื่อมต่อไม่ได้ทั้ง 3306 และ 3307:', err.sqlMessage);
            }
            return;
        }
        db = connection; // เก็บการเชื่อมต่อที่สำเร็จไว้ใช้งานใน API
        console.log(`✅ เชื่อมต่อฐานข้อมูลสำเร็จ! (ใช้ Port: ${port})`);
    });
}

// เริ่มรันการเชื่อมต่อ (เริ่มที่ 3306 ก่อนเสมอ)
connectDatabase(3306);

// ============================================
// API ทั้งหมด (คงเดิมตามที่คุณเขียนไว้)
// ============================================

app.get('/api/employees', (req, res) => {
    db.query("SELECT * FROM tbl_employees", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results); 
    });
});

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

    const values = [emp_id, prefix, first_name_th, last_name_th, citizen_id, phone, emp_type, dept_id, pos_id, start_date, base_salary];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('❌ บันทึกไม่สำเร็จ:', err.sqlMessage);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json({ message: '✅ บันทึกพนักงานใหม่สำเร็จ!', id: result.insertId });
    });
});

app.get('/api/leaves', (req, res) => {
    const sql = `
        SELECT l.*, e.first_name_th, e.last_name_th, e.dept_id, d.dept_name 
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

app.post('/api/leaves', (req, res) => {
    const { emp_id, leave_type_id, start_date, end_date, reason } = req.body;
    const leave_id = 'L' + Math.floor(1000 + Math.random() * 9000);
    const sql = `INSERT INTO tbl_leaves (leave_id, emp_id, leave_type_id, start_date, end_date, reason, status) 
                VALUES (?, ?, ?, ?, ?, ?, 'Pending')`;
    const values = [leave_id, emp_id, leave_type_id, start_date, end_date, reason];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: err.sqlMessage });
        res.json({ success: true, message: '✅ ส่งใบลาสำเร็จ!' });
    });
});

app.put('/api/leaves/:id', (req, res) => {
    const leaveId = req.params.id;
    const { status } = req.body;
    const sql = "UPDATE tbl_leaves SET status = ? WHERE leave_id = ?";
    db.query(sql, [status, leaveId], (err, result) => {
        if (err) return res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดต" });
        res.json({ message: "อัปเดตสถานะเรียบร้อยแล้ว", status: status });
    });
});

app.listen(3000, () => {
    console.log('🚀 เซิร์ฟเวอร์รันที่ http://localhost:3000');
});