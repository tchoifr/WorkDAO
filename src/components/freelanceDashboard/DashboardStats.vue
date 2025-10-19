<template>
  <section class="p-6 grid md:grid-cols-3 gap-6">
    <div class="bg-white shadow-md rounded-lg p-5 border-t-4 border-indigo-500">
      <h3 class="text-gray-500">Missions actives</h3>
      <p class="text-3xl font-bold text-indigo-600">{{ missions.length }}</p>
    </div>
    <div class="bg-white shadow-md rounded-lg p-5 border-t-4 border-green-500">
      <h3 class="text-gray-500">Paiements en attente</h3>
      <p class="text-3xl font-bold text-green-600">2</p>
    </div>
    <div class="bg-white shadow-md rounded-lg p-5 border-t-4 border-yellow-500">
      <h3 class="text-gray-500">NFT obtenus</h3>
      <p class="text-3xl font-bold text-yellow-600">5</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ missions: any[] }>()
</script>
