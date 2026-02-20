// ===================================
// HRM System - Global App JS
// ===================================

// Set current date
function setCurrentDate() {
    const el = document.getElementById('currentDate');
    if (!el) return;
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    el.textContent = now.toLocaleDateString('th-TH', options);
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
    } else {
        sidebar.classList.toggle('collapsed');
    }
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// Approve item (dashboard)
function approveItem(btn, type) {
    const item = btn.closest('.approval-item');
    item.style.opacity = '0.5';
    item.style.pointerEvents = 'none';
    setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.maxHeight = '0';
        item.style.padding = '0';
        item.style.overflow = 'hidden';
        setTimeout(() => item.remove(), 300);
    }, 200);
    showToast(`✓ อนุมัติ${type}เรียบร้อยแล้ว`, 'success');
}

// Reject item (dashboard)
function rejectItem(btn) {
    const item = btn.closest('.approval-item');
    item.style.opacity = '0.5';
    item.style.pointerEvents = 'none';
    setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.maxHeight = '0';
        item.style.padding = '0';
        item.style.overflow = 'hidden';
        setTimeout(() => item.remove(), 300);
    }, 200);
    showToast('✗ ปฏิเสธคำขอแล้ว', 'error');
}

// Set active nav item
function setActiveNav() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    const navMap = {
        'index.html': 'nav-dashboard',
        '': 'nav-dashboard',
        'departments.html': 'nav-departments',
        'positions.html': 'nav-positions',
        'employees.html': 'nav-employees',
        'licenses.html': 'nav-licenses',
        'transfers.html': 'nav-transfers',
        'leaves.html': 'nav-leaves',
        'resignations.html': 'nav-resignations',
        'training.html': 'nav-training',
        'retirement.html': 'nav-retirement',
        'approvals.html': 'nav-approvals',
    };
    const activeId = navMap[filename];
    if (activeId) {
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        const activeEl = document.getElementById(activeId);
        if (activeEl) activeEl.classList.add('active');
    }
}

// Tab system
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabGroup = btn.closest('[data-tabs]') || btn.parentElement;
            const target = btn.dataset.tab;
            tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const panelContainer = document.querySelector('[data-tab-panels]') || document;
            panelContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            const panel = document.getElementById(`tab-${target}`);
            if (panel) panel.classList.add('active');
        });
    });
}

// Modal system
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// Close sidebar on mobile overlay click
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('mobile-open')) {
            if (!sidebar.contains(e.target) && !e.target.closest('.mobile-menu-btn')) {
                sidebar.classList.remove('mobile-open');
            }
        }
    }
});

// Animate quota bars on load
function animateQuotaBars() {
    const bars = document.querySelectorAll('.quota-bar');
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Format Thai date
function formatThaiDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

// Calculate age
function calcAge(dob) {
    if (!dob) return '-';
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}

// Days until date
function daysUntil(dateStr) {
    const target = new Date(dateStr);
    const today = new Date();
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    setActiveNav();
    initTabs();
    animateQuotaBars();
});
