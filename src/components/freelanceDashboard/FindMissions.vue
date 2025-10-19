<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold mb-4 text-indigo-700">🔍 Trouver des missions</h2>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
      <div
        v-for="mission in missions"
        :key="mission.id"
        class="bg-white rounded-lg shadow hover:shadow-xl border transition"
      >
        <img :src="mission.image" alt="Mission" class="w-full h-40 object-cover rounded-t-lg" />
        <div class="p-5">
          <h3 class="font-semibold text-gray-800 text-lg mb-2">{{ mission.title }}</h3>
          <p class="text-gray-600 text-sm mb-3">{{ mission.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-indigo-600 font-semibold">{{ mission.price }} $WORK</span>
            <button class="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">
              Postuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ missions: any[] }>()
</script>
