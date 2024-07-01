import './assets/base.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-noir/theme.css'
import BadgeDirective from 'primevue/badgedirective'
import money from 'v-money3'
import ToastService from 'primevue/toastservice';

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  ripple: true
})
app.use(ToastService)
app.use(money)
app.directive('badge', BadgeDirective)
app.mount('#app')
