<template>
  <section class="p-6 space-y-10">
    <!-- ✅ SECTION STATISTIQUES -->
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white shadow rounded-lg p-5 border-t-4 border-indigo-500">
        <h3 class="text-gray-500">Annonces actives</h3>
        <p class="text-3xl font-bold text-indigo-600">{{ activeJobsCount }}</p>
        <p class="text-xs text-gray-400 mt-1">Sur {{ jobs.length }} annonces publiées</p>
      </div>
      <div class="bg-white shadow rounded-lg p-5 border-t-4 border-green-500">
        <h3 class="text-gray-500">Candidatures reçues</h3>
        <p class="text-3xl font-bold text-green-600">{{ applications.length }}</p>
        <p class="text-xs text-gray-400 mt-1">Toutes annonces confondues</p>
      </div>
      <div class="bg-white shadow rounded-lg p-5 border-t-4 border-yellow-500">
        <h3 class="text-gray-500">Budget total estimé</h3>
        <p class="text-3xl font-bold text-yellow-600">{{ totalBudget }} $WORK</p>
        <p class="text-xs text-gray-400 mt-1">Somme de toutes les missions</p>
      </div>
    </div>

    <!-- ✅ DERNIÈRES ANNONCES -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-semibold text-indigo-700 mb-4">📋 Dernières annonces publiées</h2>
      <div v-if="jobs.length" class="divide-y">
        <div
          v-for="job in jobs.slice(0, 3)"
          :key="job.id"
          class="py-4 flex justify-between items-start hover:bg-gray-50 transition"
        >
          <div>
            <h3 class="font-semibold text-gray-800">{{ job.title }}</h3>
            <p class="text-sm text-gray-600">{{ job.duration }} — {{ job.contractType }}</p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="skill in job.skills.slice(0, 3)"
                :key="skill"
                class="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="text-right">
            <p class="text-indigo-600 font-semibold">{{ job.budget }} $WORK</p>
            <span
              class="text-xs font-semibold px-2 py-1 rounded-full"
              :class="{
                'bg-green-100 text-green-700': job.status === 'Ouverte',
                'bg-yellow-100 text-yellow-700': job.status === 'En cours',
                'bg-red-100 text-red-700': job.status === 'Fermée',
                'bg-gray-100 text-gray-600': job.status === 'En attente',
              }"
            >
              {{ job.status }}
            </span>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 text-sm">Aucune annonce publiée pour le moment.</p>
    </div>

    <!-- ✅ DERNIÈRES CANDIDATURES -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-semibold text-indigo-700 mb-4">👥 Dernières candidatures reçues</h2>
      <div v-if="applications.length" class="divide-y">
        <div
          v-for="app in applications.slice(0, 3)"
          :key="app.id"
          class="py-4 flex justify-between items-center hover:bg-gray-50 transition"
        >
          <div class="flex items-center">
            <img
              :src="app.avatar"
              alt="avatar"
              class="w-10 h-10 rounded-full object-cover border mr-3"
            />
            <div>
              <p class="font-semibold text-gray-800">{{ app.freelancer }}</p>
              <p class="text-sm text-gray-500 truncate max-w-xs">{{ app.proposal }}</p>
            </div>
          </div>

          <div class="text-right">
            <p class="text-indigo-600 font-semibold">{{ app.bid }} $WORK</p>
            <span
              class="text-xs font-semibold px-2 py-1 rounded-full"
              :class="{
                'bg-yellow-100 text-yellow-700': app.status === 'En attente',
                'bg-green-100 text-green-700': app.status === 'Acceptée',
                'bg-red-100 text-red-700': app.status === 'Refusée'
              }"
            >
              {{ app.status }}
            </span>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 text-sm">Aucune candidature reçue pour le moment.</p>
    </div>

    <!-- ✅ ACTIVITÉ RÉCENTE -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-semibold text-indigo-700 mb-4">🕓 Activité récente</h2>
      <ul class="text-sm text-gray-700 space-y-2">
        <li>✅ <b>Emma Laurent</b> a été acceptée sur <i>"Développeur Solidity Senior"</i></li>
        <li>💬 Message reçu de <b>Noah Dupuis</b> concernant <i>"UI/UX Designer Web3"</i></li>
        <li>🧾 Paiement validé pour <b>"Design DAO Interface"</b> — 220 $WORK</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{ jobs: any[]; applications: any[] }>()

// 🔢 Calculs dynamiques
const activeJobsCount = computed(() =>
  props.jobs.filter((j) => j.status === "Ouverte" || j.status === "En cours").length
)

const totalBudget = computed(() =>
  props.jobs.reduce((acc, job) => acc + job.budget, 0)
)
</script>
