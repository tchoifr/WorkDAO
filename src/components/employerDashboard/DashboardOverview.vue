<template>
  <section class="p-6 space-y-10">
    <!-- ✅ SECTION STATISTIQUES -->
    <div class="grid md:grid-cols-3 gap-6">
      <div
        class="p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 transition"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white'"
      >
        <h3 :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-500'" class="font-semibold">
          Annonces actives
        </h3>
        <p :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'" class="text-3xl font-bold">
          {{ activeJobsCount }}
        </p>
        <p :class="darkMode ? 'text-gray-300' : 'text-gray-400'" class="text-xs mt-1">
          Sur {{ jobs.length }} annonces publiées
        </p>
      </div>

      <div
        class="p-6 rounded-xl shadow-lg border-t-4 border-green-500 transition"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white'"
      >
        <h3 :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-500'" class="font-semibold">
          Candidatures reçues
        </h3>
        <p :class="darkMode ? 'text-green-400' : 'text-green-600'" class="text-3xl font-bold">
          {{ applications.length }}
        </p>
        <p :class="darkMode ? 'text-gray-300' : 'text-gray-400'" class="text-xs mt-1">
          Toutes annonces confondues
        </p>
      </div>

      <div
        class="p-6 rounded-xl shadow-lg border-t-4 border-yellow-500 transition"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white'"
      >
        <h3 :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-500'" class="font-semibold">
          Budget total estimé
        </h3>
        <p :class="darkMode ? 'text-yellow-400' : 'text-yellow-600'" class="text-3xl font-bold">
          {{ totalBudget }} $WORK
        </p>
        <p :class="darkMode ? 'text-gray-300' : 'text-gray-400'" class="text-xs mt-1">
          Somme de toutes les missions
        </p>
      </div>
    </div>

    <!-- ✅ DERNIÈRES ANNONCES -->
    <div
      class="p-6 rounded-xl shadow-lg transition"
      :class="darkMode
        ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
        : 'bg-white'"
    >
      <h2 :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'" class="text-lg font-semibold mb-4">
        📋 Dernières annonces publiées
      </h2>

      <div v-if="jobs.length" :class="darkMode ? 'divide-gray-700' : 'divide-gray-200'" class="divide-y">
        <div
          v-for="job in jobs.slice(0, 3)"
          :key="job.id"
          class="py-4 flex justify-between items-start transition"
          :class="darkMode ? 'hover:bg-[#0d2f42]' : 'hover:bg-gray-50'"
        >
          <div>
            <h3 :class="darkMode ? 'text-gray-100' : 'text-gray-800'" class="font-semibold">
              {{ job.title }}
            </h3>
            <p :class="darkMode ? 'text-gray-400' : 'text-gray-600'" class="text-sm">
              {{ job.duration }} — {{ job.contractType }}
            </p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="skill in job.skills.slice(0, 3)"
                :key="skill"
                :class="darkMode ? 'bg-[#00BFFF]/10 text-[#00BFFF]' : 'bg-indigo-50 text-indigo-700'"
                class="text-xs px-2 py-1 rounded"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="text-right">
            <p :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'" class="font-semibold">
              {{ job.budget }} $WORK
            </p>
            <span
              class="text-xs font-semibold px-2 py-1 rounded-full"
              :class="{
                'bg-green-100 text-green-700': !darkMode && job.status === 'Ouverte',
                'bg-yellow-100 text-yellow-700': !darkMode && job.status === 'En cours',
                'bg-red-100 text-red-700': !darkMode && job.status === 'Fermée',
                'bg-gray-100 text-gray-600': !darkMode && job.status === 'En attente',
                'bg-[#00BFFF]/10 text-[#00BFFF]': darkMode
              }"
            >
              {{ job.status }}
            </span>
          </div>
        </div>
      </div>
      <p v-else :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-sm">
        Aucune annonce publiée pour le moment.
      </p>
    </div>

    <!-- ✅ DERNIÈRES CANDIDATURES -->
<div
  class="p-6 rounded-xl shadow-lg transition"
  :class="darkMode
    ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
    : 'bg-white border border-gray-200'"
>
  <h2
    :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
    class="text-lg font-semibold mb-4"
  >
    👥 Dernières candidatures reçues
  </h2>

  <div
    v-if="applications.length"
    :class="darkMode ? 'divide-gray-700' : 'divide-gray-200'"
    class="divide-y"
  >
    <div
      v-for="app in applications.slice(0, 3)"
      :key="app.id"
      class="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 transition"
      :class="darkMode ? 'hover:bg-[#0d2f42]' : 'hover:bg-gray-50'"
    >
      <!-- Colonne gauche -->
      <div class="flex items-start sm:items-center">
        <img
          :src="app.avatar"
          alt="avatar"
          class="w-12 h-12 sm:w-10 sm:h-10 rounded-full object-cover border mr-3 flex-shrink-0"
          :class="darkMode ? 'border-[#00BFFF]/30' : 'border-gray-300'"
        />
        <div class="flex flex-col">
          <p
            :class="darkMode ? 'text-gray-100' : 'text-gray-800'"
            class="font-semibold text-sm sm:text-base"
          >
            {{ app.freelancer }}
          </p>
          <p
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            class="text-xs sm:text-sm leading-snug mt-1 break-words max-w-[250px] sm:max-w-xs"
          >
            {{ app.proposal }}
          </p>
        </div>
      </div>

      <!-- Colonne droite -->
      <div class="text-left sm:text-right sm:mt-0 mt-2">
        <p
          :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'"
          class="font-semibold text-sm sm:text-base"
        >
          {{ app.bid }} $WORK
        </p>
        <span
          class="inline-block mt-1 text-xs font-semibold px-2 py-1 rounded-full"
          :class="{
            'bg-yellow-100 text-yellow-700': !darkMode && app.status === 'En attente',
            'bg-green-100 text-green-700': !darkMode && app.status === 'Acceptée',
            'bg-red-100 text-red-700': !darkMode && app.status === 'Refusée',
            'bg-[#00BFFF]/10 text-[#00BFFF]': darkMode
          }"
        >
          {{ app.status }}
        </span>
      </div>
    </div>
  </div>

  <p
    v-else
    :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
    class="text-sm"
  >
    Aucune candidature reçue pour le moment.
  </p>
</div>


    <!-- ✅ ACTIVITÉ RÉCENTE -->
    <div
      class="p-6 rounded-xl shadow-lg transition"
      :class="darkMode
        ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
        : 'bg-white'"
    >
      <h2 :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'" class="text-lg font-semibold mb-4">
        🕓 Activité récente
      </h2>
      <ul :class="darkMode ? 'text-gray-300' : 'text-gray-700'" class="text-sm space-y-2">
        <li>✅ <b>Emma Laurent</b> a été acceptée sur <i>"Développeur Solidity Senior"</i></li>
        <li>💬 Message reçu de <b>Noah Dupuis</b> concernant <i>"UI/UX Designer Web3"</i></li>
        <li>🧾 Paiement validé pour <b>"Design DAO Interface"</b> — 220 $WORK</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue"

// ✅ Si le parent ne fournit pas de valeur, darkMode reste false
const darkMode = inject("darkMode", ref(false))

const props = defineProps<{ jobs: any[]; applications: any[] }>()

const activeJobsCount = computed(() =>
  props.jobs.filter((j) => j.status === "Ouverte" || j.status === "En cours").length
)
const totalBudget = computed(() =>
  props.jobs.reduce((acc, job) => acc + job.budget, 0)
)
</script>
