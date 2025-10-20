<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold text-indigo-700 mb-6">📋 Mes annonces</h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="job in jobs"
        :key="job.id"
        class="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition flex flex-col justify-between"
      >
        <!-- Titre + Statut -->
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-lg font-semibold text-indigo-700">{{ job.title }}</h3>
          <span
            class="px-3 py-1 text-xs rounded-full font-semibold uppercase"
            :class="{
              'bg-green-100 text-green-700': job.status === 'Ouverte',
              'bg-yellow-100 text-yellow-700': job.status === 'En cours',
              'bg-red-100 text-red-700': job.status === 'Fermée',
              'bg-gray-100 text-gray-600': job.status === 'En attente'
            }"
          >
            {{ job.status }}
          </span>
        </div>

        <!-- Description -->
        <p class="text-gray-600 text-sm mb-4 line-clamp-3">
          {{ job.description }}
        </p>

        <!-- Détails du job -->
        <div class="text-sm text-gray-500 space-y-1 mb-4">
          <p>📅 <b>Publié le :</b> {{ job.postedAt }}</p>
          <p>⏱️ <b>Durée estimée :</b> {{ job.duration }}</p>
          <p>💼 <b>Type :</b> {{ job.contractType }}</p>
        </div>

        <!-- Compétences -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="skill in job.skills"
            :key="skill"
            class="bg-indigo-50 text-indigo-700 text-xs font-medium px-2 py-1 rounded"
          >
            {{ skill }}
          </span>
        </div>

        <!-- Budget + Hash -->
        <div class="flex justify-between items-center mt-auto">
          <p class="text-indigo-600 font-bold text-lg">{{ job.budget }} $WORK</p>
          <p class="text-[11px] text-gray-400 font-mono truncate w-32" title="Hash blockchain">
            {{ job.hash }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ jobs: any[] }>()
</script>

<style scoped>
/* Empêche les descriptions trop longues d'étirer la carte */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
