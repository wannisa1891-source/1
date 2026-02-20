// ===================================
// Leaves Page JS - Mock Data
// ===================================

const leaveData = [
    { id: 1, name: 'นางสาวนภา สุขใจ', dept: 'แผนกพยาบาล', type: 'ลาพักผ่อน', start: '2026-02-18', end: '2026-02-20', days: 3, reason: 'พักผ่อนส่วนตัว', status: 'รออนุมัติ', approvedBy: '', approvedDate: '' },
    { id: 2, name: 'นางวิไล ดีงาม', dept: 'แผนกเภสัชกรรม', type: 'ลากิจ', start: '2026-02-21', end: '2026-02-21', days: 1, reason: 'ธุระส่วนตัว', status: 'รออนุมัติ', approvedBy: '', approvedDate: '' },
    { id: 3, name: 'นายประยุทธ์ ใจดี', dept: 'แผนกอายุรกรรม', type: 'ลาป่วย', start: '2026-02-19', end: '2026-02-20', days: 2, reason: 'ไข้หวัด', status: 'รออนุมัติ', approvedBy: '', approvedDate: '' },
    { id: 4, name: 'นายสมชาย มานะ', dept: 'แผนกศัลยกรรม', type: 'ลาพักผ่อน', start: '2026-02-25', end: '2026-02-28', days: 4, reason: 'เดินทางท่องเที่ยว', status: 'รออนุมัติ', approvedBy: '', approvedDate: '' },
    { id: 5, name: 'นางสาวสุดา มีสุข', dept: 'แผนกกุมารเวชกรรม', type: 'ลากิจ', start: '2026-02-22', end: '2026-02-22', days: 1, reason: 'ไปธนาคาร', status: 'รออนุมัติ', approvedBy: '', approvedDate: '' },
    { id: 6, name: 'นายสมศักดิ์ ดีมาก', dept: 'แผนกฉุกเฉิน', type: 'ลาพักผ่อน', start: '2026-02-10', end: '2026-02-14', days: 5, reason: 'พักผ่อน', status: 'อนุมัติ', approvedBy: 'ผู้ดูแลระบบ', approvedDate: '2026-02-08' },
    { id: 7, name: 'นางกมลา สวยงาม', dept: 'แผนกสูตินรีเวช', type: 'ลาป่วย', start: '2026-02-05', end: '2026-02-06', days: 2, reason: 'ปวดหัว', status: 'อนุมัติ', approvedBy: 'ผู้ดูแลระบบ', approvedDate: '2026-02-04' },
    { id: 8, name: 'นายวิชัย ขยันดี', dept: 'แผนกศัลยกรรม', type: 'ลาพักผ่อน', start: '2026-01-20', end: '2026-01-24', days: 5, reason: 'ท่องเที่ยว', status: 'อนุมัติ', approvedBy: 'ผู้ดูแลระบบ', approvedDate: '2026-01-18' },
    { id: 9, name: 'นางสาวพิมพ์ใจ ศรีสุข', dept: 'แผนกพยาบาล', type: 'ลาพักผ่อน', start: '2026-01-15', end: '2026-01-17', days: 3, reason: 'ธุระส่วนตัว', status: 'ปฏิเสธ', approvedBy: 'ผู้ดูแลระบบ', approvedDate: '2026-01-13', rejectReason: 'ช่วงนั้นพนักงานไม่เพียงพอ' },
    { id: 10, name: 'นายอนุชา มีสุข', dept: 'แผนกอายุรกรรม', type: 'ลาไปต่างประเทศ', start: '2026-01-10', end: '2026-01-12', days: 3, reason: 'ประชุมวิชาการ', status: 'ปฏิเสธ', approvedBy: 'ผู้ดูแลระบบ', approvedDate: '2026-01-08', rejectReason: 'ไม่มีเอกสารประกอบ' },
];

const typeColors = {
    'ลาพักผ่อน': 'badge-info',
    'ลาป่วย': 'badge-danger',
    'ลากิจ': 'badge-warning',
    'ลาคลอด': 'badge-purple',
    'ลาอุปสมบท': 'badge-purple',
    'ลาไปต่างประเทศ': 'badge-gray',
};

function renderLeaves() {
    const all = document.getElementById('leaveTableBody');
    const pending = document.getElementById('pendingTableBody');
    const approved = document.getElementById('approvedTableBody');
    const rejected = document.getElementById('rejectedTableBody');

    all.innerHTML = leaveData.map(l => {
        const sc = l.status === 'อนุมัติ' ? 'badge-success' : l.status === 'ปฏิเสธ' ? 'badge-danger' : 'badge-warning';
        return `<tr>
      <td><div class="td-name-text"><span class="td-name-main">${l.name}</span><span class="td-name-sub">${l.dept}</span></div></td>
      <td><span class="badge ${typeColors[l.type] || 'badge-gray'}">${l.type}</span></td>
      <td>${formatThaiDate(l.start)} – ${formatThaiDate(l.end)}</td>
      <td style="text-align:center">${l.days} วัน</td>
      <td style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.reason}</td>
      <td><span class="badge ${sc}">${l.status}</span></td>
      <td>${l.status === 'รออนุมัติ' ? `<div style="display:flex;gap:6px"><button class="btn-approve" onclick="approveLeave(${l.id})">อนุมัติ</button><button class="btn-reject" onclick="rejectLeave(${l.id})">ปฏิเสธ</button></div>` : '<span style="color:var(--text-muted);font-size:12px">ดำเนินการแล้ว</span>'}</td>
    </tr>`;
    }).join('');

    pending.innerHTML = leaveData.filter(l => l.status === 'รออนุมัติ').map(l => `<tr>
    <td><div class="td-name-text"><span class="td-name-main">${l.name}</span><span class="td-name-sub">${l.dept}</span></div></td>
    <td><span class="badge ${typeColors[l.type] || 'badge-gray'}">${l.type}</span></td>
    <td>${formatThaiDate(l.start)} – ${formatThaiDate(l.end)}</td>
    <td style="text-align:center">${l.days} วัน</td>
    <td>${l.reason}</td>
    <td><div style="display:flex;gap:6px"><button class="btn-approve" onclick="approveLeave(${l.id})">อนุมัติ</button><button class="btn-reject" onclick="rejectLeave(${l.id})">ปฏิเสธ</button></div></td>
  </tr>`).join('');

    approved.innerHTML = leaveData.filter(l => l.status === 'อนุมัติ').map(l => `<tr>
    <td><div class="td-name-text"><span class="td-name-main">${l.name}</span><span class="td-name-sub">${l.dept}</span></div></td>
    <td><span class="badge ${typeColors[l.type] || 'badge-gray'}">${l.type}</span></td>
    <td>${formatThaiDate(l.start)} – ${formatThaiDate(l.end)}</td>
    <td style="text-align:center">${l.days} วัน</td>
    <td>${l.approvedBy}</td>
    <td>${formatThaiDate(l.approvedDate)}</td>
  </tr>`).join('');

    rejected.innerHTML = leaveData.filter(l => l.status === 'ปฏิเสธ').map(l => `<tr>
    <td><div class="td-name-text"><span class="td-name-main">${l.name}</span><span class="td-name-sub">${l.dept}</span></div></td>
    <td><span class="badge ${typeColors[l.type] || 'badge-gray'}">${l.type}</span></td>
    <td>${formatThaiDate(l.start)} – ${formatThaiDate(l.end)}</td>
    <td style="color:var(--accent-danger)">${l.rejectReason || '-'}</td>
  </tr>`).join('');
}

function approveLeave(id) {
    const leave = leaveData.find(l => l.id === id);
    if (leave) {
        leave.status = 'อนุมัติ';
        leave.approvedBy = 'ผู้ดูแลระบบ';
        leave.approvedDate = new Date().toISOString().split('T')[0];
        renderLeaves();
        showToast(`✓ อนุมัติใบลาของ ${leave.name} แล้ว`, 'success');
    }
}

function rejectLeave(id) {
    const leave = leaveData.find(l => l.id === id);
    if (leave) {
        leave.status = 'ปฏิเสธ';
        leave.rejectReason = 'ไม่ผ่านเงื่อนไข';
        renderLeaves();
        showToast(`✗ ปฏิเสธใบลาของ ${leave.name}`, 'error');
    }
}

function submitLeave() {
    closeModal('addLeaveModal');
    showToast('✓ ยื่นใบลาเรียบร้อย รอการอนุมัติ', 'success');
}

document.addEventListener('DOMContentLoaded', renderLeaves);
