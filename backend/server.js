const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// สร้างตัวแอปพลิเคชันขึ้นมา
const app = express();
app.use(cors()); // อนุญาตให้หน้าบ้านคุยกับหลังบ้านได้
app.use(express.json()); // ให้หลังบ้านอ่านข้อมูลแบบ JSON ได้

// ตั้งค่าการเชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',      // ปกติถ้าใช้ XAMPP จะเป็น 'root'
    password: '',      // ปกติถ้าใช้ XAMPP รหัสผ่านจะว่างไว้
    database: 'hrm_db' // เปลี่ยนเป็นชื่อ Database ที่คุณสร้างไว้ใน phpMyAdmin
});

// เช็กว่าฐานข้อมูลเชื่อมติดไหม
db.connect((err) => {
    if (err) {
        console.error('❌ เชื่อมต่อฐานข้อมูลไม่สำเร็จ:', err);
        return;
    }
    console.log('✅ เชื่อมต่อฐานข้อมูล MySQL สำเร็จแล้ว! พร้อมทำงาน');
});

// สร้างเส้นทาง (Route) ทดสอบว่าเซิร์ฟเวอร์ทำงานปกติไหม
app.get('/', (req, res) => {
    res.send('ยินดีต้อนรับสู่ระบบหลังบ้าน (Backend) ของโปรเจกต์ HRM โรงพยาบาล');
});

// สั่งให้เซิร์ฟเวอร์เปิดรอรับคำสั่งที่ช่องทาง (Port) 3000
app.listen(3000, () => {
    console.log('🚀 เซิร์ฟเวอร์รันอยู่บน http://localhost:3000');
});