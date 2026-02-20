// ===================================
// Retirement Page JS - Mock Data
// ===================================

const retirementData = [
    { name: 'นางมาลี สุขสันต์', dept: 'แผนกพยาบาล', position: 'หัวหน้าพยาบาล', dob: '1964-09-30', retireDate: '2026-09-30', quotaStatus: 'ยังไม่ขอ' },
    { name: 'นายสุรชัย วงศ์ดี', dept: 'แผนกอายุรกรรม', position: 'แพทย์อาวุโส', dob: '1963-12-10', retireDate: '2026-10-01', quotaStatus: 'ยังไม่ขอ' },
    { name: 'นางสาวกาญจนา รักดี', dept: 'แผนกเภสัชกรรม', position: 'เภสัชกรอาวุโส', dob: '1964-05-22', retireDate: '2026-11-01', quotaStatus: 'อยู่ระหว่างดำเนินการ' },
    { name: 'นายบุญมี ทองดี', dept: 'แผนกรังสีวิทยา', position: 'นักรังสีการแพทย์', dob: '1963-08-15', retireDate: '2026-12-01', quotaStatus: 'ยังไม่ขอ' },
    { name: 'นางประนอม ใจดี', dept: 'แผนกพยาบาล', position: 'พยาบาลวิชาชีพ', dob: '1963-03-18', retireDate: '2026-03-18', quotaStatus: 'อนุมัติแล้ว' },
    { name: 'นายวิรัตน์ สุขใจ', dept: 'แผนกศัลยกรรม', position: 'แพทย์', dob: '1963-06-25', retireDate: '2026-06-25', quotaStatus: 'ยังไม่ขอ' },
    { name: 'นางสาวลัดดา มีสุข', dept: 'แผนกกุมารเวชกรรม', position: 'พยาบาลวิชาชีพ', dob: '1963-01-10', retireDate: '2026-01-10', quotaStatus: 'อนุมัติแล้ว' },
    { name: 'นายสมพงษ์ ทองดี', dept: 'แผนกฉุกเฉิน', position: 'แพทย์', dob: '1963-07-20', retireDate: '2026-07-20', quotaStatus: 'อยู่ระหว่างดำเนินการ' },
];

function renderRetirement() {
    const tbody = document.getElementById('retirementTableBody');
    const today = new Date();

    tbody.innerHTML = retirementData.map((r, i) => {
        const age = calcAge(r.dob);
        const retireDate = new Date(r.retireDate);
        const daysLeft = Math.ceil((retireDate - today) / (1000 * 60 * 60 * 24));
        const monthsLeft = Math.ceil(daysLeft / 30);

        let urgencyClass = '';
        let daysText = '';
        if (daysLeft < 0) {
            daysText = 'เกษียณแล้ว';
            urgencyClass = 'badge-gray';
        } else if (daysLeft <= 90) {
            daysText = `${daysLeft} วัน`;
            urgencyClass = 'badge-danger';
        } else if (daysLeft <= 180) {
            daysText = `${monthsLeft} เดือน`;
            urgencyClass = 'badge-warning';
        } else {
            daysText = `${monthsLeft} เดือน`;
            urgencyClass = 'badge-info';
        }

        const quotaClass = r.quotaStatus === 'อนุมัติแล้ว' ? 'badge-success' : r.quotaStatus === 'อยู่ระหว่างดำเนินการ' ? 'badge-warning' : 'badge-danger';
        const colors = ['linear-gradient(135deg,#6366f1,#8b5cf6)', 'linear-gradient(135deg,#f59e0b,#f97316)', 'linear-gradient(135deg,#10b981,#059669)', 'linear-gradient(135deg,#06b6d4,#0891b2)', 'linear-gradient(135deg,#a855f7,#7c3aed)', 'linear-gradient(135deg,#ec4899,#db2777)'];

        return `<tr>
      <td>
        <div class="td-name">
          <div class="td-avatar" style="background:${colors[i % colors.length]}">${r.name.replace(/^(นาย|นาง|นางสาว)\s*/, '').charAt(0)}</div>
          <span class="td-name-main">${r.name}</span>
        </div>
      </td>
      <td>${r.dept}</td>
      <td>${r.position}</td>
      <td>${formatThaiDate(r.dob)}</td>
      <td style="text-align:center"><span style="font-weight:700;color:var(--text-primary)">${age}</span> ปี</td>
      <td>${formatThaiDate(r.retireDate)}</td>
      <td><span class="badge ${urgencyClass}">${daysText}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="badge ${quotaClass}">${r.quotaStatus}</span>
          ${r.quotaStatus === 'ยังไม่ขอ' ? `<button class="btn btn-secondary btn-sm" onclick="requestQuota('${r.name}')">ขอโควตา</button>` : ''}
        </div>
      </td>
    </tr>`;
    }).join('');
}

function requestQuota(name) {
    const emp = retirementData.find(r => r.name === name);
    if (emp) {
        emp.quotaStatus = 'อยู่ระหว่างดำเนินการ';
        renderRetirement();
        showToast(`✓ ส่งคำขอโควตาตำแหน่งทดแทน ${name} แล้ว`, 'success');
    }
}

document.addEventListener('DOMContentLoaded', renderRetirement);
