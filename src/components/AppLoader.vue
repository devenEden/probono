<script setup>
import Logo from '@/assets/Logo.png'
import { ProgressSpinner } from 'primevue'

defineProps({
  loading: {
    default: false,
    type: Boolean,
  },
  message: {
    type: String,
    default: 'Loading...',
  },
})
</script>

<template>
  <div class="flex min-h-screen justify-content-center align-items-center flex-column">
    <img alt="user header" class="pl-2 mb-0" :src="Logo" />
    <span class="mt-3 text-primary">{{ message }}</span>
    <div class="card mt-3">
      <ProgressSpinner style="height: 40px" />
    </div>
  </div>
</template>
