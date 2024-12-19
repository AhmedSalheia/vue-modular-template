import { createRouter, createWebHistory } from 'vue-router'
import modules from './modules'

const routes = modules.loadRoutes()

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
