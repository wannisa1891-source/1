<template>
  <section class="dashboard-area">
    <div class="top-stat-grid">
      <div class="stat-card-v2 brown">
        <p>บุคลากรทั้งหมด</p>
        <h2>{{ employees.length }}</h2>
      </div>
      <div class="stat-card-v2 gold">
        <p>ลางานวันนี้</p>
        <h2>0</h2>
      </div>
      <div class="stat-card-v2 brown">
        <p>อัตรากำลังว่าง</p>
        <h2>5</h2>
      </div>
    </div>

    <div class="dashboard-card">
      <div class="card-head">
        <h2>รายชื่อพนักงานล่าสุด</h2>
        <button class="btn-plus-emp">+ เพิ่มพนักงานใหม่</button>
      </div>
      <table class="modern-table">
        <thead>
          <tr><th>รูป</th><th>ชื่อ-นามสกุล</th><th>ตำแหน่ง</th><th>แผนก</th><th>สถานะ</th></tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.emp_id">
            <td><div class="small-avt">👤</div></td>
            <td>{{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}</td>
            <td>{{ emp.pos_id }}</td>
            <td>{{ emp.dept_id }}</td>
            <td><span class="badge-active">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
defineProps(['employees'])
</script>

<style scoped>
.top-stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px; }
.stat-card-v2 { padding: 30px; border-radius: 22px; text-align: center; color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.15); }
.stat-card-v2.brown { background: #bcaaa4; }
.stat-card-v2.gold { background: #c5a073; }
.stat-card-v2 h2 { font-size: 40px; margin: 10px 0 0; }
.dashboard-card { background: white; padding: 35px; border-radius: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.card-head { display: flex; justify-content: space-between; margin-bottom: 25px; }
.btn-plus-emp { background: #34495e; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; }
.modern-table { width: 100%; border-collapse: collapse; }
.modern-table th { text-align: left; padding: 15px; background: #f8fafc; color: #64748b; }
.modern-table td { padding: 15px; border-bottom: 1px solid #f1f5f9; }
.badge-active { color: #22c55e; font-weight: 600; }
.small-avt { width: 35px; height: 35px; background: #eee; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
</style>