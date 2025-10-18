import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import FreelanceDashboard from '@/pages/FreelanceDashboard.vue'
import EmployerDashboard from '@/pages/EmployerDashboard.vue'
import DAO from '@/pages/DAO.vue'
import Staking from '@/pages/Staking.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/freelance', component: FreelanceDashboard },
  { path: '/employer', component: EmployerDashboard },
  { path: '/dao', component: DAO },
  { path: '/staking', component: Staking },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
