<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from '../src/components/Navbar.vue'
import Footer from '../src/components/Footer.vue'
import Loader from '../src/components/Loader.vue'

const loading = ref(true)
const router = useRouter()
const route = useRoute()

// Loader logique
onMounted(() => {
  setTimeout(() => (loading.value = false), 800)

  router.beforeEach((_to, _from, next) => {
    loading.value = true
    next()
  })
  router.afterEach(() => {
    setTimeout(() => (loading.value = false), 500)
  })
})

// ✅ Vérifie si la page actuelle est un dashboard
const isDashboardPage = computed(() =>
  ['EmployerDashboard', 'FreelanceDashboard'].includes(route.name as string)
)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#0a0a0a] text-white relative overflow-hidden">
    <!-- Loader global -->
    <Loader :visible="loading" />

    <!-- Navbar -->
    <Navbar :is-relative="isDashboardPage" />

    <!-- Contenu principal -->
    <main class="flex-1 relative overflow-hidden">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- 🤖 Assistant global -->
  </div>
</template>
