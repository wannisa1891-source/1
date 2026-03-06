<template>
  <div class="page">

    <LicenseHeader />

    <LicenseAlert />

    <LicenseStats />

    <LicenseTable />

  </div>
</template>

<script setup>

import LicenseHeader from "./LicenseHeader.vue"
import LicenseAlert from "./LicenseAlert.vue"
import LicenseStats from "./LicenseStats.vue"
import LicenseTable from "./LicenseTable.vue"

</script>

<style>

.page{
  padding:30px;
  background:#f5f7fb;
}

</style>