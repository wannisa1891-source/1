// ===================================
// Training Page JS - Mock Data
// ===================================

const trainingData = [
    { id: 1, name: 'นายสมศักดิ์ ดีมาก', dept: 'แผนกฉุกเฉิน', course: 'การพยาบาลผู้ป่วยวิกฤต', date: '2026-01-15', hours: 6, location: 'โรงแรมมิราเคิล แกรนด์ กรุงเทพฯ', organizer: 'สภาการพยาบาล', hasCert: true },
    { id: 2, name: 'นางสาวนภา สุขใจ', dept: 'แผนกพยาบาล', course: 'การดูแลผู้ป่วยโรคหัวใจ', date: '2026-01-20', hours: 8, location: 'โรงพยาบาลจุฬาลงกรณ์', organizer: 'ราชวิทยาลัยอายุรแพทย์', hasCert: true },
    { id: 3, name: 'นายสมชาย มานะ', dept: 'แผนกศัลยกรรม', course: 'เทคนิคการผ่าตัดส่องกล้อง', date: '2025-12-10', hours: 16, location: 'ศิริราชพยาบาล', organizer: 'ราชวิทยาลัยศัลยแพทย์', hasCert: true },
    { id: 4, name: 'นางวิไล ดีงาม', dept: 'แผนกเภสัชกรรม', course: 'ความปลอดภัยในการใช้ยา', date: '2025-11-25', hours: 4, location: 'โรงแรมเซ็นทาราแกรนด์', organizer: 'สภาเภสัชกรรม', hasCert: false },
    { id: 5, name: 'นางสาวพิมพ์ใจ ศรีสุข', dept: 'แผนกพยาบาล', course: 'การพยาบาลผู้ป่วยเด็ก', date: '2025-10-18', hours: 6, location: 'โรงพยาบาลเด็ก', organizer: 'กรมการแพทย์', hasCert: true },
    { id: 6, name: 'นายอนุชา มีสุข', dept: 'แผนกอายุรกรรม', course: 'การวินิจฉัยโรคเบาหวาน', date: '2025-09-05', hours: 8, location: 'โรงแรมพูลแมน กรุงเทพฯ', organizer: 'สมาคมโรคเบาหวาน', hasCert: true },
    { id: 7, name: 'นางกมลา สวยงาม', dept: 'แผนกสูตินรีเวช', course: 'การดูแลมารดาและทารก', date: '2025-08-20', hours: 12, location: 'โรงพยาบาลรามาธิบดี', organizer: 'ราชวิทยาลัยสูตินรีแพทย์', hasCert: true },
    { id: 8, name: 'นายบุญมี ทองดี', dept: 'แผนกรังสีวิทยา', course: 'เทคนิค MRI ขั้นสูง', date: '2025-07-12', hours: 10, location: 'โรงพยาบาลศิริราช', organizer: 'สมาคมรังสีวิทยา', hasCert: false },
];

let filteredTraining = [...trainingData];

function renderTrainingGrid(data) {
    const grid = document.getElementById('trainingGrid');
    if (!data.length) {
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg><h3>ไม่พบข้อมูลการอบรม</h3></div>`;
        return;
    }
    grid.innerHTML = data.map(t => `
    <div class="card" style="transition:transform 0.2s ease" onmouseenter="this.style.transform='translateY(-3px)'" onmouseleave="this.style.transform=''">
      <div style="padding:20px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:16px">
          <div>
            <div style="font-size:15px;font-weight:700;color:var(--text-primary);margin-bottom:4px">${t.course}</div>
            <div style="font-size:12px;color:var(--text-muted)">${t.organizer}</div>
          </div>
          ${t.hasCert ? `<span class="badge badge-success" style="flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> มีใบประกาศ</span>` : `<span class="badge badge-gray" style="flex-shrink:0">ไม่มีใบประกาศ</span>`}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
          <div style="background:var(--bg-primary);border-radius:var(--radius-md);padding:10px">
            <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">วันที่อบรม</div>
            <div style="font-size:13px;font-weight:600;color:var(--text-primary)">${formatThaiDate(t.date)}</div>
          </div>
          <div style="background:var(--bg-primary);border-radius:var(--radius-md);padding:10px">
            <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">ชั่วโมง</div>
            <div style="font-size:13px;font-weight:600;color:var(--accent-primary)">${t.hours} ชั่วโมง</div>
          </div>
        </div>
        <div style="background:var(--bg-primary);border-radius:var(--radius-md);padding:10px;margin-bottom:14px">
          <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">สถานที่</div>
          <div style="font-size:13px;color:var(--text-secondary)">${t.location}</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid var(--border-light)">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white">${t.name.replace(/^(นาย|นาง|นางสาว)\s*/, '').charAt(0)}</div>
            <div>
              <div style="font-size:12px;font-weight:600;color:var(--text-primary)">${t.name}</div>
              <div style="font-size:11px;color:var(--text-muted)">${t.dept}</div>
            </div>
          </div>
          ${t.hasCert ? `<button class="btn btn-secondary btn-sm" onclick="showToast('ดาวน์โหลดใบประกาศนียบัตร (จะเชื่อมกับ Backend)', 'info')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> ดาวน์โหลด</button>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function filterTraining(search) {
    const q = search.toLowerCase();
    filteredTraining = trainingData.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.course.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q)
    );
    renderTrainingGrid(filteredTraining);
}

function filterByYear(year) {
    if (!year) { filteredTraining = [...trainingData]; }
    else {
        const be = parseInt(year);
        filteredTraining = trainingData.filter(t => {
            const d = new Date(t.date);
            return (d.getFullYear() + 543) === be;
        });
    }
    renderTrainingGrid(filteredTraining);
}

function showFileName(input) {
    const el = document.getElementById('fileName');
    if (input.files.length > 0) {
        el.textContent = '📎 ' + input.files[0].name;
    }
}

function handleDrop(e) {
    e.preventDefault();
    document.getElementById('dropZone').classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        document.getElementById('fileName').textContent = '📎 ' + files[0].name;
    }
}

function saveTraining() {
    closeModal('addTrainingModal');
    showToast('✓ บันทึกประวัติการอบรมเรียบร้อย', 'success');
}

document.addEventListener('DOMContentLoaded', () => renderTrainingGrid(trainingData));
