const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors()); 
app.use(express.json()); 

// เชื่อมต่อฐานข้อมูล11 (ใช้ Port 3307 ตามที่คุณตั้งค่าไว้)
const db = mysql.createConnection({
    host: 'localhost',
    port: 3307, 
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

// API ดึงข้อมูลพนักงาน
app.get('/api/employees', (req, res) => {
    db.query("SELECT * FROM tbl_employees", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results); 
    });
});

// API เพิ่มพนักงาน (แก้ไขให้บันทึกผ่านแน่นอน)
app.post('/api/employees', (req, res) => {
    const { 
        emp_id, prefix, first_name_th, last_name_th, 
        emp_type, dept_id, pos_id, start_date, base_salary 
    } = req.body;
    
    // *** สำคัญมาก: ใส่ค่าสมมติให้ฟิลด์ที่ Database บังคับห้ามว่าง ***
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

app.listen(3000, () => {
    console.log('🚀 เซิร์ฟเวอร์รันที่ http://localhost:3000');
});