<template>
  <header
    id="navBar"
    :class="[
      'w-full z-50 py-4 px-6 shadow-md flex justify-between items-center transition-all duration-300 backdrop-blur-lg',
      isRelative ? 'relative bg-white/5' : 'fixed top-0 left-0 bg-white/10'
    ]"
  >
    <!-- Logo -->
    <RouterLink
      to="/"
      class="text-2xl font-extrabold tracking-wide text-[#00BFFF] drop-shadow-[0_0_6px_#00BFFF]"
    >
<img :src="logo" alt="Logo" class="h-10" />
    </RouterLink>

    <!-- Liens desktop -->
    <nav class="hidden md:flex space-x-4">
      <RouterLink
        to="/"
        class="px-5 py-2 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-sm transition shadow-[0_0_10px_#00BFFF]"
      >
        🏠 Accueil
      </RouterLink>

      <RouterLink
        to="/dao"
        class="px-5 py-2 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-sm transition shadow-[0_0_10px_#00BFFF]"
      >
        ⚙️ DAO
      </RouterLink>

      <RouterLink
        to="/staking"
        class="px-5 py-2 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-sm transition shadow-[0_0_10px_#00BFFF]"
      >
        💎 Staking
      </RouterLink>

      <RouterLink
        to="/login"
        class="px-5 py-2 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-sm transition shadow-[0_0_10px_#00BFFF]"
      >
        🔐 Connexion
      </RouterLink>
    </nav>

    <!-- Bouton mobile -->
    <button
      @click="menuOpen = !menuOpen"
      class="md:hidden text-[#00BFFF] focus:outline-none text-2xl"
    >
      ☰
    </button>

    <!-- Menu mobile -->
    <transition name="fade">
      <div
        v-if="menuOpen"
        class="absolute top-full left-0 w-full bg-black/80 backdrop-blur-lg text-center py-6 flex flex-col gap-4 text-white"
      >
        <RouterLink
          to="/"
          @click="menuOpen = false"
          class="px-6 py-2 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-sm transition shadow-[0_0_10px_#00BFFF]"
        >
          🏠 Accueil
        </RouterLink>

        <RouterLink
          to="/dao"
          @click="menuOpen = false"
          class="px-6 py-2 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-sm transition shadow-[0_0_10px_#00BFFF]"
        >
          ⚙️ DAO
        </RouterLink>

        <RouterLink
          to="/staking"
          @click="menuOpen = false"
          class="px-6 py-2 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-sm transition shadow-[0_0_10px_#00BFFF]"
        >
          💎 Staking
        </RouterLink>

        <RouterLink
          to="/login"
          @click="menuOpen = false"
          class="px-6 py-2 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-sm transition shadow-[0_0_10px_#00BFFF]"
        >
          🔐 Connexion
        </RouterLink>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logo from '../assets/logo.png'

const menuOpen = ref(false)
const route = useRoute()

// ✅ Si on est sur une page Dashboard, on met la nav en "relative"
const isRelative = computed(() =>
  ['EmployerDashboard', 'FreelanceDashboard'].includes(route.name as string)
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
