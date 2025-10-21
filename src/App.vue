<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../src/components/Navbar.vue'
import Footer from '../src/components/Footer.vue'
import Loader from '../src/components/Loader.vue'

const loading = ref(true)
const router = useRouter()

onMounted(() => {
  // Loader initial
  setTimeout(() => (loading.value = false), 800)

  // Router hooks : loader sur chaque changement de page
  router.beforeEach((_to, _from, next) => {
    loading.value = true
    next()
  })
  router.afterEach(() => {
    setTimeout(() => (loading.value = false), 500)
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#0a0a0a] text-white relative overflow-hidden">
    <!-- Loader global -->
    <Loader :visible="loading" />

    <!-- Navbar -->
    <Navbar />

    <!-- Contenu principal -->
    <main class="flex-1 relative overflow-hidden">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: #0a0a0a;
  color: #f8fafc;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

body::before {
  content: "";
  position: fixed;
  top: -200px;
  left: -200px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(0,191,255,0.15) 0%, transparent 70%);
  filter: blur(120px);
  z-index: -1;
  pointer-events: none;
}

main {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
</style>
