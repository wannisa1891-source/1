<template>
  <div class="modal-overlay">

    <div class="modal-box">

      <h3>เพิ่มตารางเวร</h3>

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

        <button class="btn-cancel" @click="$emit('close')">
          ปิด
        </button>

        <button class="btn-save" @click="saveSchedule">
          บันทึก
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { reactive, watch } from "vue"

const props = defineProps({
  selectedDate: String
})

const emit = defineEmits([
  "close",
  "saved"
])

const form = reactive({
  date: "",
  name: "",
  shift: "",
  department: ""
})

watch(
  () => props.selectedDate,
  (newDate) => {
    form.date = newDate
  },
  { immediate: true }
)

function saveSchedule() {

  if (!form.name || !form.shift || !form.department) {
    alert("กรอกข้อมูลให้ครบ")
    return
  }

  const newSchedule = {
    id: Date.now(),
    name: form.name,
    shift: form.shift,
    date: form.date,
    department: form.department
  }

  console.log("save schedule", newSchedule)

  emit("saved", newSchedule)

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
  padding:20px;
  width:350px;
  border-radius:8px;
}

.form-group{
  margin-bottom:12px;
  display:flex;
  flex-direction:column;
}

.form-group input,
.form-group select{
  padding:6px;
}

.modal-actions{
  display:flex;
  justify-content:flex-end;
  gap:10px;
  margin-top:15px;
}

.btn-cancel{
  background:#ccc;
  border:none;
  padding:6px 12px;
}

.btn-save{
  background:#3b82f6;
  color:white;
  border:none;
  padding:6px 12px;
}

</style>