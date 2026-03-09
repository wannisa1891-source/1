<template>
  <div class="modal-overlay">

    <div class="modal-box">

      <h3>
        {{ editShift ? "แก้ไขตารางเวร" : "เพิ่มตารางเวร" }}
      </h3>

      <div class="form-group">
        <label>วันที่</label>
        <input type="date" v-model="form.date" />
      </div>

      <div class="form-group">
        <label>ชื่อบุคลากร</label>
        <input
          type="text"
          v-model="form.name"
          placeholder="กรอกชื่อ"
        />
      </div>

      <div class="form-group">
        <label>เวร</label>
        <select v-model="form.shift">
          <option value="">เลือกเวร</option>
          <option value="เช้า">เช้า</option>
          <option value="บ่าย">บ่าย</option>
          <option value="ดึก">ดึก</option>
        </select>
      </div>

      <div class="form-group">
        <label>แผนก</label>
        <select v-model="form.department">
          <option value="">เลือกแผนก</option>
          <option value="ER">ER</option>
          <option value="ICU">ICU</option>
          <option value="OPD">OPD</option>
        </select>
      </div>

      <div class="modal-actions">

        <!-- delete -->
        <button
          v-if="editShift"
          class="btn-delete"
          @click="deleteSchedule"
        >
          ลบ
        </button>

        <button
          class="btn-cancel"
          @click="$emit('close')"
        >
          ปิด
        </button>

        <button
          class="btn-save"
          @click="saveSchedule"
        >
          บันทึก
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { reactive, watch } from "vue"

const props = defineProps({
  selectedDate: Date,
  editShift: Object
})

const emit = defineEmits([
  "close",
  "saved",
  "deleted"
])

const form = reactive({
  id: null,
  date: "",
  name: "",
  shift: "",
  department: ""
})

function formatDate(date){

  if(!date) return ""

  const d = new Date(date)

  return d.toISOString().split("T")[0]

}

watch(
  () => props.selectedDate,
  (newDate) => {

    if(!props.editShift){
      form.date = formatDate(newDate)
    }

  },
  { immediate:true }
)

watch(
  () => props.editShift,
  (shift)=>{

    if(!shift) return

    form.id = shift.id
    form.name = shift.name
    form.shift = shift.shift
    form.department = shift.department
    form.date = formatDate(shift.date)

  },
  { immediate:true }
)

function saveSchedule(){

  if (!form.name || !form.shift || !form.department) {
    alert("กรอกข้อมูลให้ครบ")
    return
  }

  const data = {
    id: form.id,
    name: form.name,
    shift: form.shift,
    date: form.date,
    department: form.department
  }

  emit("saved", data)

}

function deleteSchedule(){

  if(!confirm("ต้องการลบเวรนี้หรือไม่")) return

  emit("deleted", form.id)

}
</script>

<style scoped>

.modal-overlay{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.4);
  display:flex;
  align-items:center;
  justify-content:center;
}

.modal-box{
  background:white;
  padding:22px;
  width:360px;
  border-radius:10px;
}

.form-group{
  margin-bottom:12px;
  display:flex;
  flex-direction:column;
}

.form-group input,
.form-group select{
  padding:7px;
  border:1px solid #e2e8f0;
  border-radius:5px;
}

.modal-actions{
  display:flex;
  justify-content:flex-end;
  gap:10px;
  margin-top:18px;
}

.btn-cancel{
  background:#e5e7eb;
  border:none;
  padding:6px 14px;
  border-radius:4px;
  cursor:pointer;
}

.btn-save{
  background:#3b82f6;
  color:white;
  border:none;
  padding:6px 14px;
  border-radius:4px;
  cursor:pointer;
}

.btn-delete{
  background:#ef4444;
  color:white;
  border:none;
  padding:6px 14px;
  border-radius:4px;
  margin-right:auto;
  cursor:pointer;
}

</style>