<template>

<div class="stats">

<div class="card">
<h3>142</h3>
<p>Total Staff</p>
</div>

<div class="card">
<h3>318</h3>
<p>Valid License</p>
</div>

<div class="card">
<h3>8</h3>
<p>Expiring Soon</p>
</div>

<div class="card">
<h3>12</h3>
<p>Renew Completed</p>
</div>

</div>

</template>

<style scoped>

.stats{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:20px;
margin-bottom:25px;
}

.card{
background:white;
padding:20px;
border-radius:10px;
box-shadow:0 2px 6px rgba(0,0,0,0.1);
}

</style>