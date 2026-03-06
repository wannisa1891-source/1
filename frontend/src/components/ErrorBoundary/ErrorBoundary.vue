<template>
  <div>
    <div v-if="errored" class="error-fallback">
      <h2>เกิดข้อผิดพลาดในหน้านี้</h2>
      <p>ลองโหลดหน้าใหม่</p>
    </div>

    <slot v-else />
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'

const errored = ref(false)

onErrorCaptured((err, instance, info) => {
  console.error('ErrorBoundary:', err, info)
  errored.value = true
  return false
})
</script>