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

    <!-- Desktop Links -->
    <nav class="hidden md:flex space-x-4">
      <RouterLink
        v-for="(item, i) in navItems"
        :key="i"
        :to="item.to"
        class="px-5 py-2 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-sm transition shadow-[0_0_10px_#00BFFF]"
      >
        {{ item.icon }} {{ item.label }}
      </RouterLink>
    </nav>

    <!-- Mobile Menu Button -->
    <button
      @click="menuOpen = !menuOpen"
      class="md:hidden text-[#00BFFF] focus:outline-none text-2xl"
    >
      ☰
    </button>

    <!-- Mobile Menu -->
    <transition name="fade">
      <div
        v-if="menuOpen"
        class="absolute top-full left-0 w-full bg-black/80 backdrop-blur-lg text-center py-6 flex flex-col gap-4 text-white"
      >
        <RouterLink
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
          @click="menuOpen = false"
          class="px-6 py-2 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-sm transition shadow-[0_0_10px_#00BFFF]"
        >
          {{ item.icon }} {{ item.label }}
        </RouterLink>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { RouterLink, useRoute } from "vue-router"
import logo from "../assets/logo.png"
import { navbarTextsEn } from "../variables/components/en/navbar"

const { navItems } = navbarTextsEn

const menuOpen = ref(false)
const route = useRoute()

// ✅ Use relative layout on dashboard pages
const isRelative = computed(() =>
  ["EmployerDashboard", "FreelanceDashboard"].includes(route.name as string)
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
