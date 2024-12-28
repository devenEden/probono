import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import router from './router'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import { definePreset } from '@primevue/themes'
import { ToastService } from 'primevue'

const app = createApp(App)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{orange.50}', // Lightest orange shade
      100: '{orange.100}', // Very light orange
      200: '{orange.200}', // Light orange
      300: '{orange.300}', // Soft orange
      400: '{orange.400}', // Medium-light orange
      500: '{orange.500}', // Main orange (primary color)
      600: '{orange.600}', // Slightly darker orange
      700: '{orange.700}', // Dark orange
      800: '{orange.800}', // Darker orange
      900: '{orange.900}', // Deepest orange
      950: '{orange.950}', // Extra deep/dark orange, if defined
    },
  },
})

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'p',
      darkModeSelector: 'light',
      cssLayer: true,
    },
  },
})
app.use(ToastService)

app.mount('#app')
