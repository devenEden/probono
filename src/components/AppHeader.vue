<script setup>
import { useAuthStore } from '@/stores'
import { Button } from 'primevue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
  await authStore.logoutUser()
  router.push({
    name: 'login',
  })
}

const onMenuToggle = () => {}
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-4 xl:col-2">
      <h4 class="block text-500 font-medium mb-3 mt-3 text-md text-lg font-semibold">
        Pro bono MIS
      </h4>
      <div class="text-900 font-bold text-xl">{{ new Date().toDateString() }}</div>
    </div>
    <div class="col-12 lg:col-4 xl:col-2"></div>
    <div class="col-12 lg:col-4 xl:col-2"></div>
    <div class="col-12 lg:col-6 xl:col-6 pt-5">
      <div class="flex justify-content-end gap-2 align-items-center">
        <!-- <span :class="['text-md font-semibold']">Dark Mode</span>
        <ToggleSwitch /> -->
        <Button variant="text" icon="pi pi-bars" class="" @click="onMenuToggle()" />
        <Button :loading="authStore.loggingOut" size="small" @click="logout">Logout</Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
