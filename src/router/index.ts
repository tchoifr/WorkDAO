import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import FreelanceDashboard from '../pages/FreelanceDashboard.vue'
import EmployerDashboard from '../pages/EmployerDashboard.vue'
import DAO from '../pages/DAO.vue'
import Staking from '../pages/Staking.vue'
import Login from '../pages/Login.vue'
import FacebookPosts from '../pages/SocialHub.vue'

// ✅ Liste des routes
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/freelance', name: 'FreelanceDashboard', component: FreelanceDashboard },
  { path: '/employer', name: 'EmployerDashboard', component: EmployerDashboard },
  { path: '/dao', name: 'DAO', component: DAO },
  { path: '/staking', name: 'Staking', component: Staking },
  { path: '/facebook-posts', name: 'FacebookPosts', component: FacebookPosts },
  { path: '/login', name: 'Login', component: Login },
]


// ✅ Création du router avec le scroll automatique
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  },
})

/* ✅ Garde de navigation :
   - Empêche l’accès à /freelance et /employer si non connecté
   - Redirige selon le rôle du user */
router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login']
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null')

  // Accès public → OK
  if (publicPages.includes(to.path)) return next()

  // Non connecté → vers /login
  if (!user) return next('/login')

  // ✅ Vérifie le rôle pour accéder aux bons dashboards
  if (to.path === '/freelance' && user.role !== 'freelance') return next('/')
  if (to.path === '/employer' && user.role !== 'recruteur') return next('/')

  // ✅ Tout va bien
  next()
})

export default router
