<template>
  <div class="hrm-app-container">

    <header class="hrm-header">
      <h1 class="main-title">จัดการข้อมูลแผนก</h1>

      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="ค้นหาแผนก...">
        <span class="search-btn">🔍</span>
      </div>
    </header>

    <div class="hrm-main-layout">

      <!-- Sidebar -->
      <aside class="hrm-sidebar">

        <div class="sidebar-content">

          <h2 class="sidebar-header">ข้อมูลแผนก</h2>

          <p class="hospital-name">
            โรงพยาบาลชะอำ (รวม {{ totalCapacity }} อัตรา)
          </p>

          <nav class="dept-nav">

            <div
              v-for="dept in filteredDepts"
              :key="dept.dept_id"
              class="dept-item"
            >

              <div
                :class="['dept-label',{active:selectedDeptId===dept.dept_id}]"
                @click="selectDept(dept)"
              >

                <span class="arrow">
                  {{ dept.sub_dept ? (dept.isOpen?'▼':'▶') : '•' }}
                </span>

                {{ dept.dept_name }}

              </div>

              <ul v-if="dept.isOpen && dept.sub_dept" class="sub-dept-list">

                <li class="sub-item active-sub">
                  • {{ dept.sub_dept }}
                </li>

              </ul>

            </div>

          </nav>

        </div>

      </aside>

      <!-- Main -->
      <main class="hrm-content">

        <!-- Summary -->
        <section class="summary-section">

          <h3 class="section-title">สรุปภาพรวม</h3>

          <div class="summary-grid">

            <div class="summary-card card-blue">
              <p>แผนกที่ขาดคน</p>
              <h3>{{ globalSummary.understaffedCount }} แห่ง</h3>
            </div>

            <div class="summary-card card-gold">
              <p>ตำแหน่งว่างรวม</p>
              <h3>{{ globalSummary.totalVacant }} อัตรา</h3>
            </div>

          </div>

        </section>

        <!-- Detail -->
        <section class="detail-section">

          <div class="detail-card">

            <h3 class="card-inner-title">รายละเอียดพนักงาน</h3>

            <div class="filter-row">

              <div class="input-group">

                <label>แผนก:</label>

                <select v-model="selectedDeptId" class="custom-select">

                  <option
                    v-for="d in departmentList"
                    :key="d.dept_id"
                    :value="d.dept_id"
                  >
                    {{ d.dept_name }}
                  </option>

                </select>

              </div>

              <div class="input-group">

                <label>สังกัดหลัก:</label>

                <input
                  type="text"
                  :value="activeDeptName"
                  disabled
                  class="custom-input-disabled"
                >

              </div>

            </div>

            <div class="stats-row">

              <div class="stat-box">
                <p>กรอบอัตรากำลัง</p>
                <div class="val">{{ activeCapacity }} คน</div>
              </div>

              <div class="stat-box">
                <p>คนครองตำแหน่ง</p>
                <div class="val">{{ currentStaff.length }} คน</div>
              </div>

              <div class="stat-box">
                <p>คงเหลือ (ว่าง)</p>
                <div class="val text-red">{{ vacantCount }} อัตรา</div>
              </div>

            </div>

            <!-- Table -->

            <div class="table-container">

              <table class="hrm-table">

                <thead>

                  <tr>
                    <th>เลขที่</th>
                    <th>ชื่อตำแหน่ง</th>
                    <th>ผู้ครองตำแหน่ง</th>
                    <th class="text-center">จัดการ</th>
                  </tr>

                </thead>

                <tbody>

                  <tr
                    v-for="emp in currentStaff"
                    :key="emp.emp_id"
                  >

                    <td>{{ emp.position_no }}</td>

                    <td>{{ emp.pos_name }}</td>

                    <td class="font-bold">
                      {{ emp.prefix }}{{ emp.first_name_th }} {{ emp.last_name_th }}
                    </td>

                    <td class="text-center">
                      <button class="btn-edit">
                        จัดการ
                      </button>
                    </td>

                  </tr>

                  <tr
                    v-for="n in vacantCount"
                    :key="'v'+n"
                    class="empty-row"
                  >

                    <td>-</td>
                    <td>-</td>

                    <td class="text-orange">
                      -- ตำแหน่งว่าง --
                    </td>

                    <td class="text-center">
                      <button class="btn-add">
                        รับเข้า
                      </button>
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </main>

    </div>

  </div>
</template>

<script setup>

import {ref,computed,onMounted,watch} from "vue"
import axios from "axios"

const departmentList = ref([])
const employees = ref([])

const selectedDeptId = ref(null)
const searchQuery = ref("")

onMounted(async()=>{

  const dept = await axios.get("http://localhost:3000/api/departments")

  departmentList.value = dept.data.map(d=>({
    ...d,
    isOpen:false
  }))

  if(departmentList.value.length){

    selectedDeptId.value = departmentList.value[0].dept_id
    departmentList.value[0].isOpen=true

  }

  loadEmployees()

})

async function loadEmployees(){

  if(!selectedDeptId.value)return

  const res = await axios.get(
    "http://localhost:3000/api/employees/dept/"+selectedDeptId.value
  )

  employees.value = res.data

}

watch(selectedDeptId,loadEmployees)

function selectDept(dept){

  departmentList.value.forEach(d=>d.isOpen=false)

  dept.isOpen=true

  selectedDeptId.value=dept.dept_id

}

const filteredDepts = computed(()=>{

  return departmentList.value.filter(d=>
    d.dept_name.includes(searchQuery.value)
  )

})

const activeDept = computed(()=>
  departmentList.value.find(d=>d.dept_id===selectedDeptId.value)
)

const activeDeptName = computed(()=>activeDept.value?.dept_name || "")

const activeCapacity = computed(()=>activeDept.value?.capacity || 0)

const currentStaff = computed(()=>employees.value)

const vacantCount = computed(()=>{
  return Math.max(0,activeCapacity.value-currentStaff.value.length)
})

const totalCapacity = computed(()=>{

  return departmentList.value.reduce(
    (a,b)=>a+(b.capacity||0),0
  )

})

const globalSummary = computed(()=>{

  let under=0
  let totalV=0

  departmentList.value.forEach(d=>{

    const cur = employees.value.filter(
      e=>e.dept_id===d.dept_id
    ).length

    if(d.capacity>cur){

      under++

      totalV += d.capacity-cur

    }

  })

  return{
    understaffedCount:under,
    totalVacant:totalV
  }

})

</script>

<style scoped>

body{
margin:0;
font-family:'Sarabun',sans-serif;
background:#f5f6fa;
}

.hrm-app-container{
padding:25px;
}

.hrm-header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:25px;
}

.main-title{
font-size:30px;
font-weight:800;
color:#1a1a1a;
}

.search-box{
display:flex;
align-items:center;
border:1px solid #ddd;
border-radius:10px;
padding:6px 15px;
background:white;
box-shadow:0 3px 8px rgba(0,0,0,0.08);
}

.search-box input{
border:none;
outline:none;
padding:8px;
width:220px;
font-family:'Sarabun';
}

.hrm-main-layout{
display:grid;
grid-template-columns:320px 1fr;
gap:25px;
}

.hrm-sidebar{
background:linear-gradient(180deg,#c2a882,#b79c73);
border-radius:18px;
padding:25px;
color:white;
min-height:80vh;
box-shadow:0 8px 20px rgba(0,0,0,0.15);
}

.sidebar-header{
font-size:22px;
text-align:center;
border-bottom:1px solid rgba(255,255,255,0.3);
padding-bottom:15px;
}

.hospital-name{
font-size:14px;
margin:10px 0 20px;
text-align:center;
}

.dept-label{
padding:12px;
cursor:pointer;
border-radius:8px;
margin-bottom:5px;
font-weight:600;
color:black;
display:flex;
align-items:center;
transition:0.2s;
}

.dept-label:hover{
background:rgba(255,255,255,0.2);
}

.dept-label.active{
background:white;
color:#333;
}

.summary-grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:20px;
margin-bottom:25px;
}

.summary-card{
padding:25px;
border-radius:15px;
color:white;
box-shadow:0 6px 18px rgba(0,0,0,0.15);
}

.card-blue{
background:#004d99;
}

.card-gold{
background:#b39b4d;
}

.summary-card h3{
font-size:34px;
margin:10px 0 0;
}

.detail-card{
background:white;
border-radius:15px;
padding:25px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.stats-row{
display:flex;
gap:15px;
margin-bottom:25px;
}

.stat-box{
flex:1;
border-radius:12px;
padding:20px;
text-align:center;
background:#fafafa;
border:1px solid #eee;
}

.stat-box .val{
font-size:24px;
font-weight:bold;
margin-top:10px;
}

.hrm-table{
width:100%;
border-collapse:collapse;
margin-top:15px;
}

.hrm-table th{
background:#003366;
color:white;
padding:15px;
text-align:left;
}

.hrm-table td{
padding:15px;
border-bottom:1px solid #f0f0f0;
}

.hrm-table tr:hover{
background:#f5f7fb;
}

.empty-row{
background:#fffaf0;
}

.btn-edit{
background:#003366;
color:white;
border:none;
padding:8px 16px;
border-radius:6px;
cursor:pointer;
}

.btn-add{
background:#28a745;
color:white;
border:none;
padding:8px 16px;
border-radius:6px;
cursor:pointer;
}

.text-red{
color:#dc3545;
}

.text-orange{
color:#fd7e14;
font-weight:bold;
}

</style>