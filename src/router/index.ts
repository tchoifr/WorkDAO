import { createRouter, createWebHistory } from 'vue-router'

// --- Pages principales ---
import Home from '../pages/Home.vue'
import FreelanceDashboard from '../pages/FreelanceDashboard.vue'
import EmployerDashboard from '../pages/EmployerDashboard.vue'
import DAO from '../pages/DAO.vue'
import Staking from '../pages/Staking.vue'
import Login from '../pages/Login.vue'
import FacebookPosts from '../pages/SocialHub.vue'

// --- Nouveau template unique pour les pages WhyChoose ---
import TemplateWhyChoose from '../pages/TemplateWhyChoose.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/freelance', name: 'FreelanceDashboard', component: FreelanceDashboard },
  { path: '/employer', name: 'EmployerDashboard', component: EmployerDashboard },
  { path: '/dao', name: 'DAO', component: DAO },
  { path: '/staking', name: 'Staking', component: Staking },
  { path: '/facebook-posts', name: 'FacebookPosts', component: FacebookPosts },
  { path: '/login', name: 'Login', component: Login },

  // --- Une seule route dynamique pour toutes les pages WhyChoose ---
  {
    path: '/whychoose/:id',
    name: 'WhyChooseDynamic',
    component: TemplateWhyChoose,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  },
})

// ✅ Garde de navigation
router.beforeEach((to, from, next) => {
  const publicPages = [
    '/', 
    '/login', 
    '/dao', 
    '/staking', 
    '/facebook-posts'
  ]

  // 🔓 Toutes les pages /whychoose/... sont publiques
  const isWhyChoosePage = to.path.startsWith('/whychoose')

  const user = JSON.parse(localStorage.getItem('currentUser') || 'null')

  // 🔓 Autoriser les pages publiques et WhyChoose
  if (publicPages.includes(to.path) || isWhyChoosePage) return next()

  // 🔐 Si non connecté → vers /login
  if (!user) return next('/login')

  // 🧠 Redirection selon le rôle
  if (to.path === '/freelance' && user.role !== 'freelance') return next('/')
  if (to.path === '/employer' && user.role !== 'recruteur') return next('/')

  next()
})

export default router
