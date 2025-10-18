<template>
  <header class="bg-indigo-600 text-white py-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center px-4">
      <h1 class="text-2xl font-bold tracking-wide">WorkDAO</h1>
      <nav class="space-x-6">
        <RouterLink to="/" class="hover:text-indigo-200">Accueil</RouterLink>
        <RouterLink to="/dao" class="hover:text-indigo-200">DAO</RouterLink>
        <RouterLink to="/staking" class="hover:text-indigo-200">Staking</RouterLink>
        <RouterLink to="/login" class="hover:text-indigo-200">Connexion</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
