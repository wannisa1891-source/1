const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors()); 
app.use(express.json()); 

// 1. ตั้งค่าการเข้าถึงโฟลเดอร์รูปภาพ (เพื่อให้หน้าเว็บดึงรูปไปโชว์ได้)
app.use('/uploads', express.static('uploads'));

// 2. ตั้งค่าการเก็บรูปภาพ (Multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir); 
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

// 3. การตั้งค่าฐานข้อมูล
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'hrm_db'
};

let db;
function connectDatabase(port) {
    const connection = mysql.createConnection({ ...dbConfig, port: port });
    connection.connect((err) => {
        if (err) {
            if (port === 3306) {
                console.log('⚠️ Port 3306 เข้าไม่ได้... กำลังสลับไปลอง Port 3307');
                connectDatabase(3307);
            } else {
                console.error('❌ เชื่อมต่อไม่ได้:', err.sqlMessage);
            }
            return;
        }
        db = connection;
        console.log(`✅ เชื่อมต่อฐานข้อมูลสำเร็จ! (Port: ${port})`);
    });
}
connectDatabase(3306);

// ============================================
// API Employees (จัดการข้อมูลพนักงาน)
// ============================================

app.get('/api/employees', (req, res) => {
    db.query("SELECT * FROM tbl_employees ORDER BY emp_id DESC", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results); 
    });
});

// ✅ แก้ไข: API เพิ่มพนักงาน (รองรับรูปภาพ)
app.post('/api/employees', upload.single('image'), (req, res) => {
    const { 
        emp_id, prefix, first_name_th, last_name_th, 
        emp_type, dept_id, pos_id, start_date, base_salary 
    } = req.body;
    
    // รับชื่อไฟล์จาก multer
    const imageName = req.file ? req.file.filename : null;

    const citizen_id = req.body.citizen_id || '0000000000000'; 
    const phone = req.body.phone || '000-000-0000';

    const sql = `INSERT INTO tbl_employees 
        (emp_id, prefix, first_name_th, last_name_th, citizen_id, phone, emp_type, dept_id, pos_id, start_date, base_salary, status, image) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active', ?)`;

    const values = [emp_id, prefix, first_name_th, last_name_th, citizen_id, phone, emp_type, dept_id, pos_id, start_date, base_salary, imageName];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('❌ บันทึกไม่สำเร็จ:', err.sqlMessage);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json({ message: '✅ บันทึกพนักงานใหม่สำเร็จ!', fileName: imageName });
    });
});

// ============================================
// API อื่นๆ (Leaves, Transfers, Departments)
// ============================================

app.get('/api/leaves', (req, res) => {
    const sql = `SELECT l.*, e.first_name_th, e.last_name_th, e.dept_id, d.dept_name FROM tbl_leaves l LEFT JOIN tbl_employees e ON l.emp_id = e.emp_id LEFT JOIN tbl_departments d ON e.dept_id = d.dept_id ORDER BY l.start_date DESC`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results); 
    });
});

app.post('/api/transfers', upload.single('order_file'), (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const fileName = req.file ? req.file.filename : null; 
        const transfer_id = 'TRF' + Date.now().toString().slice(-8);
        const sql = `INSERT INTO tbl_transfers (transfer_id, order_no, order_date, subject, transfer_type, effective_date, emp_id, old_dept_id, new_dept_id, old_position, new_position, order_file, old_salary, new_salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [transfer_id, data.orderNo, data.orderDate, data.title || 'ย้าย', 'แต่งตั้งโยกย้าย', data.orderDate, data.empId, data.oldDeptId || null, data.newDeptId || null, data.oldPos, data.newPos, fileName, parseFloat(data.oldSalary) || 0, parseFloat(data.newSalary) || 0];
        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, message: 'บันทึกสำเร็จ' });
        });
    } catch (error) {
        res.status(400).json({ success: false, message: 'ข้อมูลไม่ถูกต้อง' });
    }
});

app.get('/api/departments', (req, res) => {
    db.query("SELECT dept_id, dept_name, sub_dept, capacity FROM tbl_departments ORDER BY dept_id", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.map(d => ({ ...d, isOpen: false })));
    });
});

app.get('/api/positions', (req, res) => {
    db.query("SELECT pos_id, pos_name FROM tbl_positions", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.put('/api/employees/:id', upload.single('image'), (req, res) => {
    const empId = req.params.id; 
    const data = req.body;
    
    // 1. ตรวจสอบชื่อไฟล์ (ถ้าไม่มีรูปใหม่ ให้ใช้ชื่อรูปเดิมจากฐานข้อมูล)
    // หน้าจอส่งชื่อรูปเดิมมาในตัวแปร data.image
    const imageName = req.file ? req.file.filename : data.image;

    // 2. แก้จาก profile_img=? เป็น image=? (ให้ตรงกับชื่อในฐานข้อมูลคุณ)
    const sql = `UPDATE tbl_employees SET 
        prefix=?, first_name_th=?, last_name_th=?, citizen_id=?, 
        phone=?, emp_type=?, dept_id=?, pos_id=?, 
        start_date=?, base_salary=?, image=? 
        WHERE emp_id=?`;

    const values = [
        data.prefix, 
        data.first_name_th, 
        data.last_name_th, 
        data.id_card || data.citizen_id,
        data.phone, 
        data.emp_type, 
        data.dept_id, 
        data.pos_id, 
        data.start_date, 
        data.base_salary, 
        imageName, // ชื่อไฟล์ใหม่หรือชื่อเดิม
        empId
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('❌ แก้ไขพังเพราะ:', err.sqlMessage);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json({ message: '✅ แก้ไขข้อมูลและรูปภาพสำเร็จแล้ว!' });
    });
});

// ============================================
// START SERVER (มีแค่อันเดียวท้ายไฟล์)
// ============================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});