<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold text-indigo-700 mb-6">👥 Candidatures reçues</h2>

    <div v-for="job in jobs" :key="job.id" class="mb-10">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">
        {{ job.title }} — <span class="text-indigo-600">{{ job.budget }} $WORK</span>
      </h3>

      <div v-if="filteredApplications(job.id).length" class="space-y-4">
        <div
          v-for="app in filteredApplications(job.id)"
          :key="app.id"
          class="bg-white shadow rounded-lg p-5 border hover:shadow-md transition"
        >
          <div class="flex items-center mb-3">
            <img
              :src="app.avatar"
              alt="avatar"
              class="w-12 h-12 rounded-full mr-4 object-cover border"
            />
            <div>
              <p class="font-semibold text-gray-800">{{ app.freelancer }}</p>
              <p class="text-sm text-gray-500">Proposition : {{ app.bid }} $WORK</p>
            </div>
          </div>

          <p class="text-gray-600 text-sm mb-3">{{ app.proposal }}</p>

          <div class="flex justify-between items-center">
            <span
              class="text-sm font-semibold"
              :class="{
                'text-yellow-600': app.status === 'En attente',
                'text-green-600': app.status === 'Acceptée',
                'text-red-600': app.status === 'Refusée'
              }"
            >
              {{ app.status }}
            </span>

            <div class="space-x-2">
              <button
                class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                @click="updateStatus(app.id, 'Acceptée')"
              >
                ✅ Accepter
              </button>
              <button
                class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                @click="updateStatus(app.id, 'Refusée')"
              >
                ❌ Refuser
              </button>
            </div>
          </div>
        </div>
      </div>

      <p v-else class="text-gray-400 text-sm">Aucune candidature pour ce job.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"

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
