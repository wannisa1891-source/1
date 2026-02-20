// ===================================
// Approvals Page JS - Mock Data
// ===================================

const COLORS_A = ['linear-gradient(135deg,#6366f1,#8b5cf6)', 'linear-gradient(135deg,#f59e0b,#f97316)', 'linear-gradient(135deg,#10b981,#059669)', 'linear-gradient(135deg,#ef4444,#dc2626)', 'linear-gradient(135deg,#06b6d4,#0891b2)', 'linear-gradient(135deg,#a855f7,#7c3aed)', 'linear-gradient(135deg,#ec4899,#db2777)'];

let pendingRequests = [
    { id: 1, type: 'leave', name: 'นางสาวนภา สุขใจ', dept: 'แผนกพยาบาล', detail: 'ลาพักผ่อน 3 วัน (18-20 ก.พ. 2569)', reason: 'พักผ่อนส่วนตัว', submitted: '2026-02-17', urgency: 'normal' },
    { id: 2, type: 'transfer', name: 'นายสมชาย มานะ', dept: 'แผนกศัลยกรรม', detail: 'ย้ายแผนก: ศัลยกรรม → อายุรกรรม', reason: 'ต้องการพัฒนาทักษะด้านอายุรกรรม', submitted: '2026-02-16', urgency: 'normal' },
    { id: 3, type: 'leave', name: 'นางวิไล ดีงาม', dept: 'แผนกเภสัชกรรม', detail: 'ลากิจ 1 วัน (21 ก.พ. 2569)', reason: 'ธุระส่วนตัว', submitted: '2026-02-17', urgency: 'normal' },
    { id: 4, type: 'leave', name: 'นายประยุทธ์ ใจดี', dept: 'แผนกอายุรกรรม', detail: 'ลาป่วย 2 วัน (19-20 ก.พ. 2569)', reason: 'ไข้หวัด', submitted: '2026-02-18', urgency: 'urgent' },
    { id: 5, type: 'leave', name: 'นายสมชาย มานะ', dept: 'แผนกศัลยกรรม', detail: 'ลาพักผ่อน 4 วัน (25-28 ก.พ. 2569)', reason: 'เดินทางท่องเที่ยว', submitted: '2026-02-15', urgency: 'normal' },
    { id: 6, type: 'transfer', name: 'นางสาวสุดา มีสุข', dept: 'แผนกกุมารเวชกรรม', detail: 'ย้ายแผนก: กุมารเวชกรรม → สูตินรีเวช', reason: 'ความถนัดและความสนใจ', submitted: '2026-02-14', urgency: 'normal' },
    { id: 7, type: 'leave', name: 'นางสาวสุดา มีสุข', dept: 'แผนกกุมารเวชกรรม', detail: 'ลากิจ 1 วัน (22 ก.พ. 2569)', reason: 'ไปธนาคาร', submitted: '2026-02-17', urgency: 'normal' },
];

function getInitialA(name) {
    return name.replace(/^(นาย|นาง|นางสาว)\s*/, '').charAt(0);
}

function renderRequestCard(req, index) {
    const typeLabel = req.type === 'leave' ? 'ใบลา' : 'ย้ายแผนก';
    const typeBadge = req.type === 'leave' ? 'badge-warning' : 'badge-purple';
    const urgencyHtml = req.urgency === 'urgent' ? `<span class="badge badge-danger animate-pulse" style="font-size:10px">ด่วน</span>` : '';

    return `
  <div class="card mb-3" id="req-${req.id}" style="margin-bottom:12px;transition:all 0.3s ease">
    <div style="padding:18px 20px">
      <div style="display:flex;align-items:flex-start;gap:14px">
        <div style="width:44px;height:44px;border-radius:50%;background:${COLORS_A[index % COLORS_A.length]};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:white;flex-shrink:0">${getInitialA(req.name)}</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            <span style="font-size:15px;font-weight:700;color:var(--text-primary)">${req.name}</span>
            <span class="badge ${typeBadge}">${typeLabel}</span>
            ${urgencyHtml}
          </div>
          <div style="font-size:13px;color:var(--text-secondary);margin-bottom:2px">${req.dept}</div>
          <div style="font-size:14px;color:var(--text-primary);margin-top:8px;padding:10px 14px;background:var(--bg-primary);border-radius:var(--radius-md);border-left:3px solid var(--accent-primary)">${req.detail}</div>
          <div style="font-size:13px;color:var(--text-secondary);margin-top:8px"><strong>เหตุผล:</strong> ${req.reason}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:6px">ยื่นเมื่อ: ${formatThaiDate(req.submitted)}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;flex-shrink:0">
          <button class="btn btn-primary btn-sm" onclick="approveRequest(${req.id})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            อนุมัติ
          </button>
          <button class="btn btn-danger btn-sm" onclick="rejectRequest(${req.id})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ปฏิเสธ
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderAll() {
    const allEl = document.getElementById('allRequestsList');
    const leaveEl = document.getElementById('leaveRequestsList');
    const transferEl = document.getElementById('transferRequestsList');

    if (pendingRequests.length === 0) {
        const empty = `<div class="card"><div class="empty-state"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg><h3>ไม่มีคำขอรออนุมัติ</h3><p>ทุกคำขอได้รับการดำเนินการแล้ว</p></div></div>`;
        allEl.innerHTML = empty;
        leaveEl.innerHTML = empty;
        transferEl.innerHTML = empty;
        return;
    }

    allEl.innerHTML = pendingRequests.map((r, i) => renderRequestCard(r, i)).join('');
    const leaves = pendingRequests.filter(r => r.type === 'leave');
    leaveEl.innerHTML = leaves.length ? leaves.map((r, i) => renderRequestCard(r, i)).join('') : '<div class="card"><div class="empty-state"><h3>ไม่มีใบลารออนุมัติ</h3></div></div>';
    const transfers = pendingRequests.filter(r => r.type === 'transfer');
    transferEl.innerHTML = transfers.length ? transfers.map((r, i) => renderRequestCard(r, i)).join('') : '<div class="card"><div class="empty-state"><h3>ไม่มีคำขอย้ายแผนกรออนุมัติ</h3></div></div>';

    // Update counts
    const countEl = document.getElementById('allCount');
    const notifEl = document.getElementById('notifCount');
    if (countEl) countEl.textContent = pendingRequests.length;
    if (notifEl) notifEl.textContent = pendingRequests.length;
}

function approveRequest(id) {
    const req = pendingRequests.find(r => r.id === id);
    const el = document.getElementById(`req-${id}`);
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateX(20px)';
        setTimeout(() => {
            pendingRequests = pendingRequests.filter(r => r.id !== id);
            renderAll();
        }, 300);
    }
    if (req) showToast(`✓ อนุมัติคำขอของ ${req.name} แล้ว`, 'success');
}

function rejectRequest(id) {
    const req = pendingRequests.find(r => r.id === id);
    const el = document.getElementById(`req-${id}`);
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            pendingRequests = pendingRequests.filter(r => r.id !== id);
            renderAll();
        }, 300);
    }
    if (req) showToast(`✗ ปฏิเสธคำขอของ ${req.name}`, 'error');
}

document.addEventListener('DOMContentLoaded', renderAll);
