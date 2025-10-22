import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import MainView from '@/views/MainView.vue'
import BackofficeView from '@/views/Backoffice/AdminView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: MainView },
  { path: '/backoffice', component: BackofficeView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
