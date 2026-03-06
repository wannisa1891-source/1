// template และstyle
<template>
  <div class="emp-modern-wrapper">
    </div>
</template>
<script setup>
defineProps([
  'showForm', 'searchQuery', 'selectedDept', 'selectedPos', 
  'filteredEmployees', 'departmentList', 'positionList', 'employees'
])
defineEmits(['update:searchQuery', 'update:selectedDept', 'update:selectedPos', 'openForm', 'closeForm', 'submit'])
</script>

<style scoped>
.emp-modern-wrapper { 
  padding: 35px 20px 20px 20px; 
  animation: fadeIn 0.4s ease-in-out; 
  background: #ffffff !important; /* พื้นหลังให้เป็นสีขาว */
  min-height: 100vh; 
}
.premium-glass-card { background: #ffffff; border-radius: 20px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); padding: 30px; border: 1px solid #f1f5f9; }
.bg-light-gray { background: #f8fafc; }
.card-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.card-title { margin: 0; font-size: 22px; color: #1e293b; font-weight: 700; }
.w-100 { flex: 1; }
.border-bottom-dark { border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; }
.action-bar-modern { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 15px; }
.search-pill { display: flex; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 50px; padding: 8px 20px; width: 350px; }
.search-input-clean { border: none; background: transparent; outline: none; width: 100%; margin-left: 10px; color: #334155; }
.filter-group { display: flex; align-items: center; gap: 12px; }
.select-modern { border: 1px solid #e2e8f0; background: #ffffff; padding: 8px 15px; border-radius: 10px; outline: none; cursor: pointer; color: #334155;}
.btn-primary-add { background: #c5a073; color: white; border: none; padding: 10px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 12px rgba(197, 160, 115, 0.3); }
.btn-primary-add:hover { background: #b58d5c; transform: translateY(-2px); }
.btn-outline-back { background: white; color: #475569; border: 1px solid #cbd5e1; padding: 8px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: 0.2s; }
.btn-outline-back:hover { background: #f1f5f9; }
.table-responsive { overflow-x: auto; border-radius: 12px; border: 1px solid #f1f5f9; }
.premium-table { width: 100%; border-collapse: collapse; text-align: left; }
.premium-table th { background: #f8fafc; color: #64748b; padding: 16px 20px; border-bottom: 2px solid #e2e8f0; }
.premium-table td { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; color: #1e293b; font-weight: 600; }
.avatar-circle { width: 45px; height: 45px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.badge-success { background: #dcfce7; color: #166534; padding: 6px 14px; border-radius: 50px; font-size: 13px; font-weight: 700; }
.pagination-modern { display: flex; justify-content: space-between; align-items: center; margin-top: 25px; }
.page-btn { background: white; border: 1px solid #e2e8f0; padding: 8px 14px; border-radius: 8px; cursor: pointer; color: #475569; font-weight: 600; }
.page-btn.active { background: #c5a073; color: white; border-color: #c5a073; }
.form-section-box { background: #ffffff; border-radius: 15px; padding: 25px; margin-bottom: 20px; border: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(255, 0, 0, 0.02); }
.section-title { margin-top: 0; font-size: 18px; color: #334155; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 20px; }
.form-flex-layout { display: flex; gap: 30px; }
.photo-upload-area { width: 140px; }
.photo-placeholder { width: 120px; height: 150px; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-weight: 600; background: #f8fafc; }
.form-grid-2 { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 15px 25px; }
.form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px 25px; }
.input-wrapper { display: flex; align-items: center; gap: 10px; }
.input-wrapper.full-width { grid-column: span 2; }
.input-wrapper label { width: 160px; text-align: right; color: #1b0000; font-size: 14px; font-weight: 600; }
.input-modern { 
  flex: 1; 
  padding: 8px 15px; 
  border: 1px solid #cbd5e1; 
  border-radius: 10px; 
  outline: none; 
  font-family: inherit; 
  background: #f8fafc;
  color: #334155;
  transition: 0.3s; 
}
.input-modern:focus { border-color: #c5a073; box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.1); }
.form-action-buttons { display: flex; justify-content: center; gap: 20px; margin-top: 35px; padding-bottom: 20px; }
.btn-cancel-modern { background: #ffffff; color: #475569; border: 2px solid #cbd5e1; padding: 12px 40px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.2s; }
.btn-save-modern { background: #22c55e; color: white; border: none; padding: 12px 50px; border-radius: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); transition: 0.2s; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>