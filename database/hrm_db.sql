-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Mar 10, 2026 at 04:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_attendances`
--

CREATE TABLE `tbl_attendances` (
  `attendance_id` varchar(10) NOT NULL COMMENT 'รหัสลงเวลา',
  `emp_id` varchar(10) NOT NULL COMMENT 'รหัสพนักงาน',
  `work_date` date NOT NULL COMMENT 'วันที่ทำงาน',
  `time_in` time DEFAULT NULL COMMENT 'เวลาเข้างาน',
  `time_out` time DEFAULT NULL COMMENT 'เวลาออกงาน',
  `status` varchar(20) DEFAULT NULL COMMENT 'สถานะ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_audit_logs`
--

CREATE TABLE `tbl_audit_logs` (
  `log_id` varchar(10) NOT NULL COMMENT 'รหัสบันทึก',
  `user_id` varchar(10) NOT NULL COMMENT 'รหัสผู้ใช้',
  `action_detail` text DEFAULT NULL COMMENT 'การกระทำ',
  `action_date` datetime DEFAULT NULL COMMENT 'วันที่บันทึก'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_departments`
--

CREATE TABLE `tbl_departments` (
  `dept_id` varchar(10) NOT NULL COMMENT 'รหัสแผนก',
  `dept_name` varchar(100) NOT NULL COMMENT 'ชื่อแผนก',
  `sub_dept` varchar(100) DEFAULT NULL COMMENT 'แผนกย่อย',
  `head_emp_id` varchar(10) DEFAULT NULL COMMENT 'หัวหน้าแผนก (จะเพิ่ม Foreign Key ภายหลัง)',
  `capacity` int(11) DEFAULT 0 COMMENT 'อัตรากำลัง'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_departments`
--

INSERT INTO `tbl_departments` (`dept_id`, `dept_name`, `sub_dept`, `head_emp_id`, `capacity`) VALUES
('D001', 'ฝ่ายการพยาบาล', '', NULL, 10),
('D002', 'กลุ่มงานการแพทย์', NULL, NULL, 0),
('D003', 'กลุ่มงานเภสัชกรรมและคุ้มครองผู้บริโภค', NULL, NULL, 0),
('D004', 'กลุ่มงานทันตกรรม', NULL, NULL, 0),
('D005', 'กลุ่มงานเทคนิคการแพทย์', NULL, NULL, 0),
('D006', 'กลุ่มงานรังสีวิทยา', NULL, NULL, 0),
('D007', 'กลุ่มงานบริหารทั่วไป', NULL, NULL, 0),
('D008', 'กลุ่มงานเวชศาสตร์ฟื้นฟู', NULL, NULL, 0),
('D009', 'กลุ่มงานยุทธศาสตร์และสารสนเทศทางการแพทย์', NULL, NULL, 0),
('D010', 'กลุ่มงานโภชนาการ', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employees`
--

CREATE TABLE `tbl_employees` (
  `emp_id` varchar(10) NOT NULL COMMENT 'รหัสพนักงาน',
  `prefix` varchar(30) NOT NULL COMMENT 'คำนำหน้า',
  `first_name_th` varchar(50) NOT NULL COMMENT 'ชื่อภาษาไทย',
  `last_name_th` varchar(50) NOT NULL COMMENT 'นามสกุลภาษาไทย',
  `first_name_en` varchar(50) DEFAULT NULL COMMENT 'ชื่อภาษาอังกฤษ',
  `last_name_en` varchar(50) DEFAULT NULL COMMENT 'นามสกุลภาษาอังกฤษ',
  `citizen_id` char(13) NOT NULL COMMENT 'เลขบัตรประชาชน',
  `birth_date` date DEFAULT NULL COMMENT 'วันเกิด',
  `address_no` varchar(20) DEFAULT NULL COMMENT 'บ้านเลขที่',
  `moo` varchar(5) DEFAULT NULL COMMENT 'หมู่ที่',
  `village` varchar(100) DEFAULT NULL COMMENT 'หมู่บ้าน',
  `soi` varchar(50) DEFAULT NULL COMMENT 'ซอย',
  `road` varchar(50) DEFAULT NULL COMMENT 'ถนน',
  `province_id` int(11) DEFAULT NULL COMMENT 'จังหวัด',
  `district_id` int(11) DEFAULT NULL COMMENT 'อำเภอ',
  `sub_district_id` int(11) DEFAULT NULL COMMENT 'ตำบล',
  `zipcode` char(5) DEFAULT NULL COMMENT 'รหัสไปรษณีย์',
  `phone` varchar(15) NOT NULL COMMENT 'เบอร์โทร',
  `email` varchar(100) DEFAULT NULL COMMENT 'อีเมล',
  `emp_type` varchar(30) NOT NULL COMMENT 'ประเภทการจ้าง',
  `image` varchar(255) DEFAULT NULL,
  `dept_id` varchar(10) NOT NULL COMMENT 'รหัสแผนก',
  `pos_id` varchar(10) NOT NULL COMMENT 'รหัสตำแหน่ง',
  `start_date` date NOT NULL COMMENT 'วันที่เริ่มงาน',
  `status` varchar(10) DEFAULT 'Active' COMMENT 'สถานะ',
  `position_no` varchar(20) DEFAULT NULL COMMENT 'เลขที่ตำแหน่ง',
  `position_level` varchar(30) DEFAULT NULL COMMENT 'ระดับตำแหน่ง',
  `base_salary` decimal(10,2) NOT NULL COMMENT 'เงินเดือนพื้นฐาน',
  `end_date` date DEFAULT NULL COMMENT 'วันที่สิ้นสุดงาน',
  `profile_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_employees`
--

INSERT INTO `tbl_employees` (`emp_id`, `prefix`, `first_name_th`, `last_name_th`, `first_name_en`, `last_name_en`, `citizen_id`, `birth_date`, `address_no`, `moo`, `village`, `soi`, `road`, `province_id`, `district_id`, `sub_district_id`, `zipcode`, `phone`, `email`, `emp_type`, `image`, `dept_id`, `pos_id`, `start_date`, `status`, `position_no`, `position_level`, `base_salary`, `end_date`, `profile_img`) VALUES
('0007', 'นพ.', '444444', '44555', NULL, NULL, '1234567891235', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '081-000-0000', NULL, 'ข้าราชการ', NULL, 'D009', 'P009', '2026-02-06', 'Active', NULL, NULL, 11.00, NULL, NULL),
('1111111', 'นาง', '00000', '11111', NULL, NULL, '0123456789000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '081-000-0000', NULL, 'ข้าราชการ', NULL, 'D010', 'P007', '2026-03-12', 'Active', NULL, NULL, 4.00, NULL, NULL),
('122222', 'นพ.', '1111', '', NULL, NULL, '1111', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '081-000-0000', NULL, 'ข้าราชการ', NULL, 'D001', 'P001', '2026-02-25', 'Active', NULL, NULL, 0.00, NULL, NULL),
('412563', 'นาย', '', '', NULL, NULL, '0000000000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0123456666', NULL, 'พนักงานชั่วคราว', '1773113727989.jpg', 'D001', 'P001', '2026-03-07', 'Active', NULL, NULL, 10000.00, NULL, NULL),
('EMP001', 'นางสาว', 'วรรณวิสา', 'ทดสอบระบบ', NULL, NULL, '1234567890123', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '081-234-5678', NULL, 'ข้าราชการ', NULL, 'D001', 'P001', '2026-01-01', 'Active', NULL, NULL, 25000.00, NULL, NULL),
('EMP003', 'นาย', '666', '667', NULL, NULL, '1234567891288', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '081-000-0000', NULL, 'ข้าราชการ', NULL, 'D001', 'P001', '2026-02-11', 'Active', NULL, NULL, 1000.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_leaves`
--

CREATE TABLE `tbl_leaves` (
  `leave_id` int(11) NOT NULL,
  `emp_id` varchar(10) NOT NULL COMMENT 'รหัสพนักงาน',
  `leave_type_id` varchar(10) NOT NULL COMMENT 'รหัสประเภทการลา',
  `start_date` date NOT NULL COMMENT 'วันที่เริ่มลา',
  `end_date` date NOT NULL COMMENT 'วันที่สิ้นสุดลา',
  `total_days` int(11) DEFAULT NULL COMMENT 'จำนวนวันลา',
  `reason` text DEFAULT NULL COMMENT 'เหตุผล',
  `status` varchar(20) DEFAULT 'Pending' COMMENT 'สถานะ',
  `approver_id` varchar(10) DEFAULT NULL COMMENT 'อนุมัติโดย',
  `approved_date` datetime DEFAULT NULL COMMENT 'วันที่อนุมัติ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_leaves`
--

INSERT INTO `tbl_leaves` (`leave_id`, `emp_id`, `leave_type_id`, `start_date`, `end_date`, `total_days`, `reason`, `status`, `approver_id`, `approved_date`) VALUES
(2, 'EMP003', 'L01', '2026-03-10', '2026-03-11', NULL, 'ป่วย', 'Approved', NULL, NULL),
(3, '0007', 'L01', '2026-03-17', '2026-03-24', NULL, 'ป่วย', 'Approved', NULL, NULL),
(4, '1111111', 'L01', '2026-03-24', '2026-03-31', NULL, 'ป่วย', 'Pending', NULL, NULL),
(9, 'EMP003', 'L01', '2026-03-04', '2026-03-05', NULL, 'อบรม', 'Approved', NULL, NULL),
(10, 'EMP003', 'L03', '2026-03-05', '2026-03-09', NULL, 'เที่ยว', 'Approved', NULL, NULL),
(11, 'EMP003', 'L01', '2026-03-05', '2026-03-06', NULL, 'ป่วย', 'Approved', NULL, NULL),
(12, '1111111', 'L01', '2026-03-05', '2026-03-06', NULL, 'ป่วย', 'Pending', NULL, NULL),
(13, 'EMP001', 'L01', '2026-03-05', '2026-03-06', NULL, 'ลา', 'Pending', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_leave_types`
--

CREATE TABLE `tbl_leave_types` (
  `leave_type_id` varchar(10) NOT NULL COMMENT 'รหัสประเภทการลา',
  `leave_type_name` varchar(100) NOT NULL COMMENT 'ชื่อประเภทการลา',
  `max_days` int(11) DEFAULT NULL COMMENT 'จำนวนวันสูงสุด'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_leave_types`
--

INSERT INTO `tbl_leave_types` (`leave_type_id`, `leave_type_name`, `max_days`) VALUES
('L01', 'ลาป่วย', 30),
('L02', 'ลากิจ', 10),
('L03', 'ลาพักร้อน', 10);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_licenses`
--

CREATE TABLE `tbl_licenses` (
  `license_id` int(11) NOT NULL COMMENT 'รหัสใบประกอบ',
  `emp_id` varchar(10) NOT NULL COMMENT 'รหัสพนักงาน',
  `license_no` varchar(50) DEFAULT NULL COMMENT 'เลขที่ใบประกอบ',
  `expire_date` date DEFAULT NULL COMMENT 'วันหมดอายุ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payrolls`
--

CREATE TABLE `tbl_payrolls` (
  `payroll_id` varchar(10) NOT NULL COMMENT 'รหัสเงินเดือน',
  `emp_id` varchar(10) NOT NULL COMMENT 'รหัสพนักงาน',
  `pay_month` int(11) NOT NULL COMMENT 'เดือน',
  `pay_year` int(11) NOT NULL COMMENT 'ปี',
  `base_salary` decimal(10,2) NOT NULL COMMENT 'เงินเดือนพื้นฐาน',
  `bonus` decimal(10,2) DEFAULT NULL COMMENT 'โบนัส',
  `deduction` decimal(10,2) DEFAULT NULL COMMENT 'หักเงิน',
  `net_total` decimal(10,2) DEFAULT NULL COMMENT 'เงินสุทธิ',
  `pay_date` date DEFAULT NULL COMMENT 'วันที่จ่าย'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_positions`
--

CREATE TABLE `tbl_positions` (
  `pos_id` varchar(10) NOT NULL COMMENT 'รหัสตำแหน่ง',
  `pos_name` varchar(100) NOT NULL COMMENT 'ชื่อตำแหน่ง',
  `pos_type` varchar(50) DEFAULT NULL COMMENT 'ประเภทตำแหน่ง'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_positions`
--

INSERT INTO `tbl_positions` (`pos_id`, `pos_name`, `pos_type`) VALUES
('P001', 'พยาบาลวิชาชีพ', 'สายงานหลัก'),
('P002', 'นายแพทย์ / แพทย์หญิง', NULL),
('P003', 'เภสัชกร', NULL),
('P004', 'ทันตแพทย์', NULL),
('P005', 'นักเทคนิคการแพทย์', NULL),
('P006', 'นักรังสีการแพทย์', NULL),
('P007', 'นักกายภาพบำบัด', NULL),
('P008', 'นักจัดการงานทั่วไป', NULL),
('P009', 'นักวิชาการคอมพิวเตอร์', NULL),
('P010', 'พนักงานช่วยเหลือคนไข้', NULL),
('P011', 'เจ้าพนักงานเวชสถิติ', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transfers`
--

CREATE TABLE `tbl_transfers` (
  `transfer_id` varchar(15) NOT NULL COMMENT 'รหัสประวัติการย้าย',
  `order_no` varchar(30) NOT NULL COMMENT 'เลขที่คำสั่ง',
  `order_date` date NOT NULL COMMENT 'ลงวันที่',
  `subject` varchar(100) NOT NULL COMMENT 'เรื่อง',
  `transfer_type` varchar(30) NOT NULL COMMENT 'ประเภทคำสั่ง',
  `effective_date` date NOT NULL COMMENT 'วันที่มีผล',
  `emp_id` varchar(10) NOT NULL COMMENT 'ผู้ถูกคำสั่ง',
  `old_dept_id` varchar(10) DEFAULT NULL COMMENT 'แผนกเดิม',
  `new_dept_id` varchar(10) DEFAULT NULL COMMENT 'แผนกใหม่',
  `old_position` varchar(50) DEFAULT NULL COMMENT 'ตำแหน่งเดิม',
  `new_position` varchar(50) DEFAULT NULL COMMENT 'ตำแหน่งใหม่',
  `order_file` varchar(255) DEFAULT NULL COMMENT 'URL สแกนไฟล์คำสั่ง',
  `old_level` varchar(30) DEFAULT NULL COMMENT 'ระดับเดิม',
  `new_level` varchar(30) DEFAULT NULL COMMENT 'ระดับใหม่',
  `old_position_no` varchar(20) DEFAULT NULL COMMENT 'เลขที่ตำแหน่งเดิม',
  `new_position_no` varchar(20) DEFAULT NULL COMMENT 'เลขที่ตำแหน่งใหม่',
  `old_salary` decimal(10,2) DEFAULT NULL COMMENT 'เงินเดือนเดิม',
  `new_salary` decimal(10,2) DEFAULT NULL COMMENT 'เงินเดือนใหม่ที่ได้ปรับ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` varchar(10) NOT NULL COMMENT 'รหัสผู้ใช้',
  `emp_id` varchar(10) NOT NULL COMMENT 'รหัสพนักงาน',
  `username` varchar(50) NOT NULL COMMENT 'ชื่อผู้ใช้',
  `password_hash` varchar(255) NOT NULL COMMENT 'รหัสผ่าน',
  `role` varchar(20) NOT NULL COMMENT 'สิทธิ์การใช้งาน',
  `status` varchar(10) DEFAULT 'Active' COMMENT 'สถานะ',
  `created_at` datetime DEFAULT NULL COMMENT 'วันที่สร้าง'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_attendances`
--
ALTER TABLE `tbl_attendances`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `tbl_audit_logs`
--
ALTER TABLE `tbl_audit_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  ADD PRIMARY KEY (`dept_id`),
  ADD KEY `head_emp_id` (`head_emp_id`);

--
-- Indexes for table `tbl_employees`
--
ALTER TABLE `tbl_employees`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `citizen_id` (`citizen_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `dept_id` (`dept_id`),
  ADD KEY `pos_id` (`pos_id`);

--
-- Indexes for table `tbl_leaves`
--
ALTER TABLE `tbl_leaves`
  ADD PRIMARY KEY (`leave_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `leave_type_id` (`leave_type_id`),
  ADD KEY `approver_id` (`approver_id`);

--
-- Indexes for table `tbl_leave_types`
--
ALTER TABLE `tbl_leave_types`
  ADD PRIMARY KEY (`leave_type_id`);

--
-- Indexes for table `tbl_licenses`
--
ALTER TABLE `tbl_licenses`
  ADD PRIMARY KEY (`license_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `tbl_payrolls`
--
ALTER TABLE `tbl_payrolls`
  ADD PRIMARY KEY (`payroll_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `tbl_positions`
--
ALTER TABLE `tbl_positions`
  ADD PRIMARY KEY (`pos_id`);

--
-- Indexes for table `tbl_transfers`
--
ALTER TABLE `tbl_transfers`
  ADD PRIMARY KEY (`transfer_id`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `old_dept_id` (`old_dept_id`),
  ADD KEY `new_dept_id` (`new_dept_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `emp_id` (`emp_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_leaves`
--
ALTER TABLE `tbl_leaves`
  MODIFY `leave_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_licenses`
--
ALTER TABLE `tbl_licenses`
  MODIFY `license_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสใบประกอบ';

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_attendances`
--
ALTER TABLE `tbl_attendances`
  ADD CONSTRAINT `tbl_attendances_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `tbl_employees` (`emp_id`);

--
-- Constraints for table `tbl_audit_logs`
--
ALTER TABLE `tbl_audit_logs`
  ADD CONSTRAINT `tbl_audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`);

--
-- Constraints for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  ADD CONSTRAINT `tbl_departments_ibfk_1` FOREIGN KEY (`head_emp_id`) REFERENCES `tbl_employees` (`emp_id`);

--
-- Constraints for table `tbl_employees`
--
ALTER TABLE `tbl_employees`
  ADD CONSTRAINT `tbl_employees_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `tbl_departments` (`dept_id`),
  ADD CONSTRAINT `tbl_employees_ibfk_2` FOREIGN KEY (`pos_id`) REFERENCES `tbl_positions` (`pos_id`);

--
-- Constraints for table `tbl_leaves`
--
ALTER TABLE `tbl_leaves`
  ADD CONSTRAINT `tbl_leaves_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `tbl_employees` (`emp_id`),
  ADD CONSTRAINT `tbl_leaves_ibfk_2` FOREIGN KEY (`leave_type_id`) REFERENCES `tbl_leave_types` (`leave_type_id`),
  ADD CONSTRAINT `tbl_leaves_ibfk_3` FOREIGN KEY (`approver_id`) REFERENCES `tbl_employees` (`emp_id`);

--
-- Constraints for table `tbl_licenses`
--
ALTER TABLE `tbl_licenses`
  ADD CONSTRAINT `tbl_licenses_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `tbl_employees` (`emp_id`);

--
-- Constraints for table `tbl_payrolls`
--
ALTER TABLE `tbl_payrolls`
  ADD CONSTRAINT `tbl_payrolls_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `tbl_employees` (`emp_id`);

--
-- Constraints for table `tbl_transfers`
--
ALTER TABLE `tbl_transfers`
  ADD CONSTRAINT `tbl_transfers_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `tbl_employees` (`emp_id`),
  ADD CONSTRAINT `tbl_transfers_ibfk_2` FOREIGN KEY (`old_dept_id`) REFERENCES `tbl_departments` (`dept_id`),
  ADD CONSTRAINT `tbl_transfers_ibfk_3` FOREIGN KEY (`new_dept_id`) REFERENCES `tbl_departments` (`dept_id`);

--
-- Constraints for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `tbl_users_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `tbl_employees` (`emp_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
