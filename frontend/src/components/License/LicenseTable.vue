<template>

<div class="filters">

<input placeholder="Search provider..." />

<select>
<option>All Departments</option>
<option>1</option>
<option>2</option>
</select>

<button>Status</button>

</div>

<table class="license-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>License Type</th>
      <th>Expiry Date</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="license in licenses" :key="license.id">
      <td>{{ license.name }}</td>
      <td>{{ license.type }}</td>
      <td>{{ license.expiry }}</td>
      <td :class="license.status">{{ license.status }}</td>
      <td>
        <button>View</button>
        <button>Edit</button>
      </td>
    </tr>
  </tbody>
</table>

</template>

<script setup>

import { ref } from 'vue'

const licenses = ref([
  { id: 1, name: 'John Doe', type: 'Medical License', expiry: '2024-12-31', status: 'valid' },
  { id: 2, name: 'Jane Smith', type: 'Nursing License', expiry: '2024-11-15', status: 'expiring' },
  { id: 3, name: 'Bob Johnson', type: 'Pharmacy License', expiry: '2024-10-20', status: 'expired' }
])

</script>

<style scoped>

.filters{
display:flex;
gap:10px;
margin-bottom:20px;
}

input{
padding:10px;
border-radius:8px;
border:1px solid #ddd;
}

select{
padding:10px;
border-radius:8px;
}

.license-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.license-table th,
.license-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.license-table th {
  background: #f5f7fb;
  font-weight: bold;
}

.license-table .valid {
  color: green;
}

.license-table .expiring {
  color: orange;
}

.license-table .expired {
  color: red;
}

.license-table button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>