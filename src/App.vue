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

// ✅ Masquer Navbar/Footer sur certaines routes
const hideLayout = computed(() => {
  const hiddenRoutes = ['/freelance', '/employer']
  return hiddenRoutes.includes(route.path)
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#0a0a0a] text-white relative overflow-hidden">
    <!-- Loader global -->
    <Loader :visible="loading" />

    <!-- Navbar -->
    <Navbar v-if="!hideLayout" :is-relative="false" />

    <!-- Contenu principal -->
    <main class="flex-1 relative overflow-hidden">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer v-if="!hideLayout" />
  </div>
</template>
