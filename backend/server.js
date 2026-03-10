const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors()); 
app.use(express.json()); 
app.use('/uploads', express.static('uploads'));

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
                console.log('⚠️ สลับไปลอง Port 3307');
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

// ➕ แก้ไขส่วน POST: เพิ่มพนักงานใหม่ (ให้รับฟิลด์ใหม่ๆ ได้)
app.post('/api/employees', upload.single('image'), (req, res) => {
    const data = req.body;
    const imageName = req.file ? req.file.filename : null;
    
    // ดึงค่า citizen_id และ phone มาพักไว้
    const citizen_id = data.id_card || data.citizen_id || '0000000000000'; 
    const phone = data.phone || '';

    // เพิ่มคอลัมน์ใหม่ๆ ลงใน SQL Insert
    const sql = `INSERT INTO tbl_employees 
        (emp_id, prefix, first_name_th, last_name_th, first_name_en, last_name_en, 
         birth_date, gender, address, citizen_id, phone, emp_type, 
         dept_id, pos_id, start_date, base_salary, status, image) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active', ?)`;

    // เรียงลำดับตัวแปรให้ตรงกับ ?
    const values = [
        data.emp_id, 
        data.prefix, 
        data.first_name_th, 
        data.last_name_th,
        data.first_name_en || '', 
        data.last_name_en || '', 
        data.birth_date || null, 
        data.gender || 'ชาย', 
        data.address || '',
        citizen_id, 
        phone, 
        data.emp_type, 
        data.dept_id, 
        data.pos_id, 
        data.start_date || null, 
        data.base_salary || 0, 
        imageName
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Insert Error:", err.sqlMessage);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json({ message: '✅ บันทึกพนักงานใหม่สำเร็จ!' });
    });
});

// 📝 แก้ไขส่วน PUT: แก้ไขข้อมูลพนักงาน (ปรับชื่อคอลัมน์รูปภาพให้ตรงกัน)
app.put('/api/employees/:id', upload.single('image'), (req, res) => {
    const empId = req.params.id; 
    const data = req.body;
    const imageName = req.file ? req.file.filename : data.image;

    const sql = `UPDATE tbl_employees SET 
        prefix = ?, 
        first_name_th = ?, 
        last_name_th = ?, 
        first_name_en = ?, 
        last_name_en = ?, 
        birth_date = ?, 
        gender = ?, 
        address = ?, 
        citizen_id = ?, 
        phone = ?, 
        emp_type = ?, 
        dept_id = ?, 
        pos_id = ?, 
        start_date = ?, 
        base_salary = ?, 
        image = ? 
        WHERE emp_id = ?`; // *** เปลี่ยน profile_img เป็น image ให้ตรงกับตาราง ***

    const values = [
        data.prefix, 
        data.first_name_th, 
        data.last_name_th, 
        data.first_name_en,
        data.last_name_en, 
        data.birth_date,   
        data.gender,       
        data.address,      
        data.id_card || data.citizen_id, 
        data.phone, 
        data.emp_type, 
        data.dept_id, 
        data.pos_id, 
        data.start_date, 
        data.base_salary, 
        imageName,         
        empId               
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Update Error:", err.sqlMessage);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json({ message: '✅ แก้ไขสำเร็จ!' });
    });
});

// ✅ เพิ่มกลับมา: ค้นหาพนักงาน (สำหรับหน้าย้ายพนักงาน)
app.get('/api/staff-search', (req, res) => {
    const query = req.query.q;
    const sql = `SELECT e.emp_id as id, CONCAT(e.prefix, e.first_name_th, ' ', e.last_name_th) as name, p.pos_name as pos, d.dept_name as dept, e.base_salary as salary FROM tbl_employees e LEFT JOIN tbl_positions p ON e.pos_id = p.pos_id LEFT JOIN tbl_departments d ON e.dept_id = d.dept_id WHERE e.first_name_th LIKE ? OR e.emp_id LIKE ?`;
    db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// ✅ เพิ่มกลับมา: ดึงพนักงานแยกตามแผนก (สำหรับผังองค์กร)
app.get('/api/employees/dept/:deptId', (req, res) => {
    const sql = `SELECT e.*, p.pos_name FROM tbl_employees e LEFT JOIN tbl_positions p ON e.pos_id = p.pos_id WHERE e.dept_id = ? AND e.status = 'Active'`;
    db.query(sql, [req.params.deptId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ============================================
// API Leaves & Transfers
// ============================================
app.get('/api/leaves', (req, res) => {
    const sql = `SELECT l.*, e.first_name_th, e.last_name_th, d.dept_name FROM tbl_leaves l LEFT JOIN tbl_employees e ON l.emp_id = e.emp_id LEFT JOIN tbl_departments d ON e.dept_id = d.dept_id ORDER BY l.start_date DESC`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results); 
    });
});
// ✅ เพิ่มกลับมา: บันทึกใบลา & อัปเดตสถานะลา
app.post('/api/leaves', (req, res) => {
    const { emp_id, leave_type_id, start_date, end_date, reason } = req.body;
    const leave_id = 'L' + Date.now().toString().slice(-4);
    db.query("INSERT INTO tbl_leaves (leave_id, emp_id, leave_type_id, start_date, end_date, reason, status) VALUES (?,?,?,?,?,?,'Pending')", [leave_id, emp_id, leave_type_id, start_date, end_date, reason], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});
app.put('/api/leaves/:id', (req, res) => {
    db.query("UPDATE tbl_leaves SET status = ? WHERE leave_id = ?", [req.body.status, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});
app.post('/api/transfers', upload.single('order_file'), (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const fileName = req.file ? req.file.filename : null; 
        const transfer_id = 'TRF' + Date.now().toString().slice(-8);
        const sql = `INSERT INTO tbl_transfers (transfer_id, order_no, order_date, subject, transfer_type, effective_date, emp_id, old_dept_id, new_dept_id, old_position, new_position, order_file, old_salary, new_salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [transfer_id, data.orderNo, data.orderDate, data.title, 'แต่งตั้งโยกย้าย', data.orderDate, data.empId, data.oldDeptId, data.newDeptId, data.oldPos, data.newPos, fileName, data.oldSalary, data.newSalary], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        });
    } catch (e) { res.status(400).send('Invalid data'); }
});

// ============================================
// Master Data
// ============================================
app.get('/api/departments', (req, res) => {
    db.query("SELECT * FROM tbl_departments ORDER BY dept_id", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.map(d => ({ ...d, isOpen: false })));
    });
});
app.get('/api/positions', (req, res) => {
    db.query("SELECT * FROM tbl_positions", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});