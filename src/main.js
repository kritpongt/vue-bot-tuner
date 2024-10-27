// import './assets/main.css'
import './main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import StyleClass from 'primevue/styleclass';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { theme: { preset: Aura } })
app.directive('styleclass', StyleClass)

app.mount('#app')
