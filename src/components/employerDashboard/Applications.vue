<template>
  <section class="p-6 transition-colors duration-500">
       <div v-for="job in jobs" :key="job.id" class="mb-10">
      <h3
        class="text-lg font-semibold mb-3"
        :class="darkMode ? 'text-gray-100' : 'text-gray-800'"
      >
        {{ job.title }} —
        <span :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'">
          {{ job.budget }} $WORK
        </span>
      </h3>

      <div v-if="filteredApplications(job.id).length" class="space-y-4">
        <div
          v-for="app in filteredApplications(job.id)"
          :key="app.id"
          class="rounded-lg p-5 border transition shadow-md"
          :class="darkMode
            ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
            : 'bg-white hover:shadow-lg border-gray-200'"
        >
          <div class="flex items-center mb-3">
            <img
              :src="app.avatar"
              alt="avatar"
              class="w-12 h-12 rounded-full mr-4 object-cover border"
              :class="darkMode ? 'border-[#00BFFF]/40' : 'border-gray-300'"
            />
            <div>
              <p
                class="font-semibold"
                :class="darkMode ? 'text-gray-100' : 'text-gray-800'"
              >
                {{ app.freelancer }}
              </p>
              <p
                class="text-sm"
                :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
              >
                Proposition : {{ app.bid }} $WORK
              </p>
            </div>
          </div>

          <p
            class="text-sm mb-3"
            :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ app.proposal }}
          </p>

          <div class="flex justify-between items-center">
            <span
              class="text-sm font-semibold"
              :class="{
                'text-yellow-400': darkMode && app.status === 'En attente',
                'text-green-400': darkMode && app.status === 'Acceptée',
                'text-red-400': darkMode && app.status === 'Refusée',
                'text-yellow-600': !darkMode && app.status === 'En attente',
                'text-green-600': !darkMode && app.status === 'Acceptée',
                'text-red-600': !darkMode && app.status === 'Refusée'
              }"
            >
              {{ app.status }}
            </span>

            <div class="space-x-2">
              <button
                class="px-3 py-1 text-sm rounded transition"
                :class="darkMode
                  ? 'bg-green-500 hover:bg-green-400 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'"
                @click="updateStatus(app.id, 'Acceptée')"
              >
                ✅ Accepter
              </button>
              <button
                class="px-3 py-1 text-sm rounded transition"
                :class="darkMode
                  ? 'bg-red-500 hover:bg-red-400 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'"
                @click="updateStatus(app.id, 'Refusée')"
              >
                ❌ Refuser
              </button>
            </div>
          </div>
        </div>
      </div>

      <p
        class="text-sm"
        :class="darkMode ? 'text-gray-400' : 'text-gray-400'"
        v-else
      >
        Aucune candidature pour ce job.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject } from "vue"

// ✅ On récupère la variable darkMode du EmployerDashboard.vue
const darkMode = inject("darkMode", false)

const props = defineProps<{
  jobs: any[]
  applications: any[]
}>()

const filteredApplications = (jobId: number) => {
  return props.applications.filter((a) => a.jobId === jobId)
}

const updateStatus = (id: number, newStatus: string) => {
  const app = props.applications.find((a) => a.id === id)
  if (app) app.status = newStatus
}
</script>
