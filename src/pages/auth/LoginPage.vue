<template>
  <div v-if="authStore.gettingCurrentUser" class="layout-wrapper">
    <AppLoader message="PLEASE WAIT AS WE SET YOU UP..." />
  </div>
  <div v-else class="layout-wrapper min-h-screen">
    <div class="min-h-screen flex justify-content-center align-items-center w-full">
      <Card style="width: 25rem; overflow: hidden" class="p-3">
        <template #header>
          <img alt="user header" class="pl-2 mb-0" :src="Logo" />
        </template>
        <!-- <template #title>Log In</template> -->
        <template #content>
          <p class="text-primary font-bold mb-5 mt-0">LOG IN TO YOUR ACCOUNT</p>
          <form @submit.prevent="onFormSubmit">
            <div class="grid">
              <div class="col-12">
                <FloatLabel>
                  <InputText id="over_label" class="w-full" v-model="formData.email" />
                  <label for="over_label">
                    <i class="pi pi-user"></i>
                    Email
                  </label>
                </FloatLabel>
                <Message v-if="formErrors?.email" severity="error" size="small" variant="simple">
                  <span class="text-red-900">
                    {{ formErrors?.email }}
                  </span>
                </Message>
              </div>
              <div class="col-12">
                <FloatLabel class="mt-2">
                  <Password v-model="formData.password" fluid id="over_password_label" />
                  <label for="over_password_label"> <i class="pi pi-lock"></i>Password</label>
                </FloatLabel>
                <Message v-if="formErrors?.password" severity="error" size="small" variant="simple">
                  <span class="text-red-900">
                    {{ formErrors?.password }}
                  </span>
                </Message>
              </div>
            </div>
            <Button
              block
              class="mt-3"
              size="small"
              label="Login"
              type="submit"
              :loading="authStore.loggingIn"
            />
          </form>
        </template>
      </Card>
      <Toast position="top-center" />
    </div>
  </div>
</template>

<script setup>
import Logo from '@/assets/Logo.png'
import AppLoader from '@/components/AppLoader.vue'
import firebaseAuth from '@/firebase/firebaseAuth'
import { useAuthStore } from '@/stores'
import { onAuthStateChanged } from 'firebase/auth'
import { Button, Card, InputText, Password, FloatLabel, useToast, Toast, Message } from 'primevue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const authStore = useAuthStore()
const router = useRouter()

const formData = ref({
  password: '',
  email: '',
})
const toast = useToast()
const formErrors = ref({})

const formSchema = z.object({
  email: z.string({}).email({
    message: 'Please enter a valid email',
  }),
  password: z
    .string({
      message: 'Please enter a valid password',
    })
    .min(8, {
      message: 'Password Must be greater than 8 characters',
    }),
})

const onFormSubmit = async () => {
  formErrors.value = {}
  try {
    formSchema.parse(formData.value)

    await authStore.loginUser(formData.value)

    if (!authStore.loginError) {
      return router.push({
        name: 'home',
      })
    } else {
      if (authStore.loginError.message === 'Firebase: Error (auth/invalid-credential).') {
        toast.add({
          severity: 'error',
          summary: 'Log In Error',
          detail: 'Invalid Credentials',
          life: 10000,
        })
      } else {
        toast.add({
          severity: 'error',
          summary: 'Connection Error',
          detail: 'There seems to be a server error, Please try again in a few minutes',
          life: 10000,
        })
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach((err) => {
        const path = err.path[0]
        formErrors.value[path] = err?.message
      })
    }
  }
}

authStore.setGettingCurrentUser(true)
const unSubscribe = onAuthStateChanged(firebaseAuth, (user) => {
  authStore.setAuthIsReady(true)
  authStore.setCurrentUser(user)

  authStore.setGettingCurrentUser(false)
  if (user) {
    router.push({
      name: 'home',
    })
  }
  unSubscribe()
})
</script>

<style lang="scss" scoped></style>
