<template>
  <div class="card mb-0 mb-2 border-0 bg-primary-50 p-2 rounded">
    <div class="grid">
      <div class="col-6"><span class="text-sm text-primary"> Online </span></div>
      <div class="col-6">
        <div class="flex justify-content-end pe-1">
          <span> ... </span>
        </div>
      </div>
    </div>
    <div class="flex justify-content-center">
      <h1 class="pi pi-user my-2" style="font-size: 3.5rem"></h1>
    </div>
    <h5 class="text-center mb-0">Feta Deven</h5>
    <p class="text-center mt-0">{{ authStore.currentUser.email }}</p>
  </div>
  <Menu :model="items" class="w-full md:w-60 border-0">
    <template #submenulabel="{ item }">
      <small class="text-gray-900 text-md font-bold text-uppercase">{{ item.label }}</small>
    </template>
    <template #item="{ item, props }">
      <a class="flex items-center ml-3" v-bind="props.action">
        <small :class="item.icon" />
        <small class="text-sm">{{ item.label }}</small>
      </a>
    </template>
  </Menu>
</template>

<script setup>
import { useAuthStore } from '@/stores'
import { Menu } from 'primevue'
import { ref } from 'vue'
const authStore = useAuthStore()

const items = ref([
  {
    label: 'HOME',
    items: [
      {
        label: 'Dashboard',
        icon: 'pi pi-plus',
      },
    ],
  },
  {
    label: 'ADMINISTRATION',
    items: [
      {
        label: 'Sectors',
        icon: 'pi pi-cog',
      },
      {
        label: 'Funding Opportunities',
        icon: 'pi pi-cog',
      },
      {
        label: 'Projects',
        icon: 'pi pi-cog',
      },
      {
        label: 'Strategic Plans',
        icon: 'pi pi-cog',
      },
    ],
  },
  {
    label: 'HUMAN RESOURCE',
    items: [
      {
        label: 'Staff',
        icon: 'pi pi-cog',
      },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      {
        label: 'Budgets',
        icon: 'pi pi-cog',
      },
      {
        label: 'Requisitions',
        icon: 'pi pi-sign-out',
      },
    ],
  },
])
</script>

<style lang="scss" scoped></style>
