<script setup lang="ts">
import Navbar from '../src/components/Navbar.vue'
import Footer from '../src/components/Footer.vue'
</script>

<template>
  <!-- Conteneur global -->
  <div class="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
    <!-- Navbar -->
    <Navbar />

    <!-- Zone principale -->
    <main class="flex-1 relative overflow-hidden">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style>
/* Arrière-plan global : noir profond + dégradé subtil */
body {
  margin: 0;
  background-color: #0a0a0a;
  color: #f8fafc;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* Optionnel : effet "lueur bleue" en fond général */
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

/* Transition fluide entre pages */
main {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
</style>
