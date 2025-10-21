import { createRouter, createWebHistory } from 'vue-router'
import Home from '../../src/pages/Home.vue'
import FreelanceDashboard from '../../src/pages/FreelanceDashboard.vue'
import EmployerDashboard from '../../src/pages/EmployerDashboard.vue'
import DAO from '../../src/pages/DAO.vue'
import Staking from '../../src/pages/Staking.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/freelance', name: 'FreelanceDashboard', component: FreelanceDashboard },
  { path: '/employer', name: 'EmployerDashboard', component: EmployerDashboard },
  { path: '/dao', name: 'DAO', component: DAO },
  { path: '/staking', name: 'Staking', component: Staking },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
