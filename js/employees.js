// ===================================
// Employees Page JS - Mock Data
// ===================================

const COLORS = [
    'linear-gradient(135deg,#6366f1,#8b5cf6)',
    'linear-gradient(135deg,#f59e0b,#f97316)',
    'linear-gradient(135deg,#10b981,#059669)',
    'linear-gradient(135deg,#ef4444,#dc2626)',
    'linear-gradient(135deg,#06b6d4,#0891b2)',
    'linear-gradient(135deg,#a855f7,#7c3aed)',
    'linear-gradient(135deg,#ec4899,#db2777)',
];

const employees = [
    { id: 'EMP-0001', name: 'นางสาวนภา สุขใจ', dept: 'แผนกพยาบาล', position: 'พยาบาลวิชาชีพ', startDate: '2015-03-01', dob: '1988-06-15', gender: 'หญิง', phone: '081-234-5678', email: 'napa@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0002', name: 'นายสมชาย มานะ', dept: 'แผนกศัลยกรรม', position: 'แพทย์', startDate: '2012-07-15', dob: '1980-02-20', gender: 'ชาย', phone: '082-345-6789', email: 'somchai@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0003', name: 'นางวิไล ดีงาม', dept: 'แผนกเภสัชกรรม', position: 'เภสัชกร', startDate: '2018-01-10', dob: '1990-09-05', gender: 'หญิง', phone: '083-456-7890', email: 'wilai@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0004', name: 'นายประยุทธ์ ใจดี', dept: 'แผนกอายุรกรรม', position: 'แพทย์', startDate: '2010-05-20', dob: '1975-11-30', gender: 'ชาย', phone: '084-567-8901', email: 'prayut@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0005', name: 'นางสาวพิมพ์ใจ ศรีสุข', dept: 'แผนกพยาบาล', position: 'พยาบาลวิชาชีพ', startDate: '2019-08-01', dob: '1993-04-12', gender: 'หญิง', phone: '085-678-9012', email: 'pimjai@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0006', name: 'นายอนุชา มีสุข', dept: 'แผนกอายุรกรรม', position: 'แพทย์', startDate: '2008-11-15', dob: '1972-07-25', gender: 'ชาย', phone: '086-789-0123', email: 'anucha@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0007', name: 'นางรัตนา ใจงาม', dept: 'แผนกเภสัชกรรม', position: 'เภสัชกร', startDate: '2016-04-01', dob: '1985-03-18', gender: 'หญิง', phone: '087-890-1234', email: 'rattana@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0008', name: 'นางมาลี สุขสันต์', dept: 'แผนกพยาบาล', position: 'หัวหน้าพยาบาล', startDate: '1995-06-01', dob: '1964-09-30', gender: 'หญิง', phone: '088-901-2345', email: 'malee@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0009', name: 'นายสุรชัย วงศ์ดี', dept: 'แผนกอายุรกรรม', position: 'แพทย์อาวุโส', startDate: '1998-02-15', dob: '1963-12-10', gender: 'ชาย', phone: '089-012-3456', email: 'surachai@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0010', name: 'นางสาวกาญจนา รักดี', dept: 'แผนกเภสัชกรรม', position: 'เภสัชกรอาวุโส', startDate: '1997-09-01', dob: '1964-05-22', gender: 'หญิง', phone: '090-123-4567', email: 'kanjana@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0011', name: 'นายบุญมี ทองดี', dept: 'แผนกรังสีวิทยา', position: 'นักรังสีการแพทย์', startDate: '1999-03-20', dob: '1963-08-15', gender: 'ชาย', phone: '091-234-5678', email: 'boonmee@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0012', name: 'นางสาวสุดา มีสุข', dept: 'แผนกกุมารเวชกรรม', position: 'พยาบาลวิชาชีพ', startDate: '2020-01-15', dob: '1995-07-08', gender: 'หญิง', phone: '092-345-6789', email: 'suda@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0013', name: 'นายสมศักดิ์ ดีมาก', dept: 'แผนกฉุกเฉิน', position: 'แพทย์', startDate: '2017-06-01', dob: '1987-01-14', gender: 'ชาย', phone: '093-456-7890', email: 'somsak@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0014', name: 'นางกมลา สวยงาม', dept: 'แผนกสูตินรีเวช', position: 'พยาบาลวิชาชีพ', startDate: '2014-09-01', dob: '1986-11-20', gender: 'หญิง', phone: '094-567-8901', email: 'kamala@hospital.go.th', status: 'ปฏิบัติงาน' },
    { id: 'EMP-0015', name: 'นายวิชัย ขยันดี', dept: 'แผนกศัลยกรรม', position: 'ผู้ช่วยพยาบาล', startDate: '2021-03-01', dob: '1998-04-25', gender: 'ชาย', phone: '095-678-9012', email: 'wichai@hospital.go.th', status: 'ปฏิบัติงาน' },
];

let filteredEmployees = [...employees];

function getInitial(name) {
    const parts = name.replace(/^(นาย|นาง|นางสาว)\s*/, '');
    return parts.charAt(0);
}

function getColor(index) {
    return COLORS[index % COLORS.length];
}

function renderTable(data) {
    const tbody = document.getElementById('employeeTableBody');
    if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><h3>ไม่พบข้อมูลพนักงาน</h3><p>ลองเปลี่ยนเงื่อนไขการค้นหา</p></div></td></tr>`;
        return;
    }
    tbody.innerHTML = data.map((emp, i) => {
        const idx = employees.indexOf(emp);
        const statusClass = emp.status === 'ปฏิบัติงาน' ? 'badge-success' : emp.status === 'ลาออก' ? 'badge-danger' : 'badge-gray';
        return `
    <tr>
      <td>
        <div class="td-name">
          <div class="td-avatar" style="background:${getColor(idx)}">${getInitial(emp.name)}</div>
          <div class="td-name-text">
            <span class="td-name-main">${emp.name}</span>
            <span class="td-name-sub">${emp.email}</span>
          </div>
        </div>
      </td>
      <td><span style="font-family:monospace;font-size:12px;color:var(--text-muted)">${emp.id}</span></td>
      <td>${emp.dept}</td>
      <td>${emp.position}</td>
      <td>${formatThaiDate(emp.startDate)}</td>
      <td><span class="badge ${statusClass}">${emp.status}</span></td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn btn-secondary btn-sm" onclick="viewEmployee(${idx})">ดูประวัติ</button>
          <button class="btn btn-secondary btn-sm" onclick="showToast('ฟีเจอร์แก้ไขจะเชื่อมกับ Backend', 'info')">แก้ไข</button>
        </div>
      </td>
    </tr>`;
    }).join('');
}

function filterEmployees() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const dept = document.getElementById('deptFilter').value;
    const status = document.getElementById('statusFilter').value;
    filteredEmployees = employees.filter(e => {
        const matchSearch = e.name.toLowerCase().includes(search) || e.id.toLowerCase().includes(search);
        const matchDept = !dept || e.dept === dept;
        const matchStatus = !status || e.status === status;
        return matchSearch && matchDept && matchStatus;
    });
    renderTable(filteredEmployees);
}

function viewEmployee(idx) {
    const emp = employees[idx];
    document.getElementById('viewEmpTitle').textContent = emp.name;
    document.getElementById('viewEmpContent').innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;padding:20px;background:var(--bg-primary);border-radius:var(--radius-lg)">
      <div style="width:64px;height:64px;border-radius:50%;background:${getColor(idx)};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:white;flex-shrink:0">${getInitial(emp.name)}</div>
      <div>
        <div style="font-size:18px;font-weight:700;color:var(--text-primary)">${emp.name}</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-top:2px">${emp.position} · ${emp.dept}</div>
        <div style="margin-top:8px"><span class="badge badge-success">${emp.status}</span></div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">รหัสพนักงาน</div><div style="font-size:14px;color:var(--text-primary);font-family:monospace">${emp.id}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">วันเกิด</div><div style="font-size:14px;color:var(--text-primary)">${formatThaiDate(emp.dob)} (${calcAge(emp.dob)} ปี)</div></div>
      <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">เพศ</div><div style="font-size:14px;color:var(--text-primary)">${emp.gender}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">วันที่เริ่มงาน</div><div style="font-size:14px;color:var(--text-primary)">${formatThaiDate(emp.startDate)}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">โทรศัพท์</div><div style="font-size:14px;color:var(--text-primary)">${emp.phone}</div></div>
      <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">อีเมล</div><div style="font-size:14px;color:var(--text-primary)">${emp.email}</div></div>
    </div>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border-color)">
      <div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:12px">ลิงก์ด่วน</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="closeModal('viewEmployeeModal');window.location.href='leaves.html'">ประวัติการลา</button>
        <button class="btn btn-secondary btn-sm" onclick="closeModal('viewEmployeeModal');window.location.href='training.html'">ประวัติอบรม</button>
        <button class="btn btn-secondary btn-sm" onclick="closeModal('viewEmployeeModal');window.location.href='transfers.html'">ประวัติย้ายแผนก</button>
        <button class="btn btn-secondary btn-sm" onclick="closeModal('viewEmployeeModal');window.location.href='licenses.html'">ใบประกอบวิชาชีพ</button>
      </div>
    </div>
  `;
    openModal('viewEmployeeModal');
}

function addEmployee() {
    closeModal('addEmployeeModal');
    showToast('✓ เพิ่มพนักงานใหม่เรียบร้อย (ข้อมูลสมมติ)', 'success');
}

document.addEventListener('DOMContentLoaded', () => {
    renderTable(employees);
});
