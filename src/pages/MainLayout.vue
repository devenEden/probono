<template>
  <div v-if="authStore.gettingCurrentUser" class="layout-wrapper">
    <AppLoader message="PLEASE WAIT AS WE SET YOU UP..." />
  </div>
  <div v-else class="layout-wrapper">
    <div class="layout-sidebar">
      <AppSideBar />
    </div>
    <div class="layout-main-container">
      <AppFooterHeader />
      <div class="layout-main">
        <RouterView />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import AppFooter from '@/components/AppFooter.vue'
import AppFooterHeader from '@/components/AppHeader.vue'
import AppLoader from '@/components/AppLoader.vue'
import AppSideBar from '@/components/AppSideBar.vue'
import firebaseAuth from '@/firebase/firebaseAuth'
import { useAuthStore } from '@/stores'
import { onAuthStateChanged } from 'firebase/auth'
import { RouterView, useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

authStore.setGettingCurrentUser(true)
const unSubscribe = onAuthStateChanged(firebaseAuth, (user) => {
  authStore.setAuthIsReady(true)
  authStore.setCurrentUser(user)

  if (!user) {
    router.push({ name: 'login' })
  }
  authStore.gettingCurrentUser = false
  unSubscribe()
})
</script>

<style lang="scss" scoped></style>
