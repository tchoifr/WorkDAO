<template>
  <section class="p-6 transition-colors duration-500">
    <div
      class="rounded-lg shadow-lg p-6 border transition space-y-6"
      :class="darkMode
        ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60 hover:shadow-[#00BFFF]/20'
        : 'bg-white border border-gray-200 hover:shadow-xl'">

      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold" :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'">
          📋 Mes Jobs publiés
        </h2>

        <button
          @click="refreshJobs"
          class="px-4 py-2 rounded font-semibold flex items-center gap-2 transition"
          :disabled="jobsStore.loading"
          :class="darkMode
            ? 'bg-[#00BFFF]/10 border border-[#00BFFF]/40 text-[#00BFFF] hover:bg-[#00BFFF]/20'
            : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'">
          🔄 Rafraîchir
        </button>
      </div>

      <div v-if="jobsStore.loading" class="text-center py-6 text-gray-500 animate-pulse">
        Chargement des jobs...
      </div>

      <div v-if="jobsStore.error" class="text-center py-4 text-red-500 font-semibold">
        ❌ {{ jobsStore.error }}
      </div>

      <div
        v-if="!jobsStore.loading && jobsStore.recruiterJobs.length"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div
          v-for="job in jobsStore.recruiterJobs"
          :key="job.id"
          class="rounded-lg border shadow-md p-5 flex flex-col justify-between transition hover:scale-[1.01]"
          :class="darkMode
            ? 'bg-[#0d2f42] border-[#00BFFF]/30 hover:border-[#00BFFF]/50'
            : 'bg-white border-gray-200 hover:border-indigo-200'">

          <div>
            <h3 class="text-lg font-semibold mb-2 truncate"
              :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'">
              {{ job.title }}
            </h3>

            <p class="text-sm mb-3 line-clamp-3"
              :class="darkMode ? 'text-gray-300' : 'text-gray-700'">
              {{ job.description }}
            </p>

            <div class="text-xs flex flex-wrap gap-2 mb-3 items-center">
              <span
                class="px-2 py-1 rounded font-medium"
                :class="darkMode
                  ? 'bg-[#00BFFF]/10 text-[#00BFFF]'
                  : 'bg-indigo-50 text-indigo-700'">
                💰 {{ job.budget }} {{ job.currency }}
              </span>

              <select
                v-model="job.status"
                @change="updateStatus(job.id, job.status)"
                class="text-xs font-medium px-2 py-1 border rounded focus:outline-none transition"
                :class="darkMode
                  ? 'bg-[#0d2f42] border-[#00BFFF]/40 text-[#00BFFF]'
                  : 'bg-white border-gray-300 text-indigo-700'">
                <option value="open">Ouvert</option>
                <option value="in_progress">En cours</option>
                <option value="closed">Fermé</option>
              </select>
            </div>

            <div class="text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
              📅 {{ formatDate(job.createdAt) }}
            </div>

            <div v-if="job.category" class="mt-2 text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-600'">
              🏷️ Catégorie : <b>{{ job.category }}</b>
            </div>

            <div v-if="job.duration" class="mt-1 text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-600'">
              ⏱️ Durée : {{ job.duration }}
            </div>

            <div v-if="job.skills?.length" class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="(skill, i) in job.skills"
                :key="i"
                class="text-xs px-2 py-1 rounded"
                :class="darkMode
                  ? 'bg-[#00BFFF]/10 text-[#00BFFF]'
                  : 'bg-indigo-50 text-indigo-700'">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="mt-5 text-right">
            <button
              @click="confirmDelete(job.id)"
              class="px-3 py-1 text-xs font-semibold rounded transition-all"
              :disabled="jobsStore.loading"
              :class="darkMode
                ? 'bg-red-500/20 border border-red-400/30 text-red-400 hover:bg-red-500/30'
                : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'">
              🗑 Supprimer
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="!jobsStore.loading && !jobsStore.recruiterJobs.length"
        class="text-center py-10 text-gray-500 italic">
        Aucun job publié pour le moment.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, inject } from 'vue'
import { useJobsStore } from '../../store/jobsStore'

const jobsStore = useJobsStore()
const darkMode = inject<boolean>('darkMode', false)

onMounted(async () => {
  await jobsStore.fetchRecruiterJobs()
})

const refreshJobs = async () => {
  await jobsStore.fetchRecruiterJobs()
}

const updateStatus = async (id: string, newStatus: string) => {
  try {
    await jobsStore.updateJobStatus(id, newStatus)
  } catch (e) {
    console.error('❌ Erreur mise à jour statut :', e)
  }
}

const confirmDelete = async (id: string) => {
  if (!window.confirm('⚠️ Es-tu sûr de vouloir supprimer cette annonce ?')) return
  try {
    await jobsStore.deleteJob(id)
    alert('✅ Annonce supprimée avec succès !')
  } catch (e) {
    console.error('❌ Erreur suppression :', e)
    alert("❌ Erreur lors de la suppression de l'annonce.")
  }
}

const formatDate = (isoString: string | null) => {
  if (!isoString) return 'Date inconnue'
  return new Date(isoString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
