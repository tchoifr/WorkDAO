<template>
  <section class="p-6 transition-colors duration-500">
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
      <div
        v-for="mission in missions"
        :key="mission.id"
        class="rounded-lg shadow-lg hover:shadow-xl border transition transform hover:-translate-y-1"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white border-gray-200 hover:border-indigo-300'"
      >
        <img
          :src="mission.image"
          alt="Mission"
          class="w-full h-40 object-cover rounded-t-lg"
        />

        <div class="p-5">
          <h3
            class="font-semibold text-lg mb-2"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
          >
            {{ mission.title }}
          </h3>

          <p
            class="text-sm mb-3"
            :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ mission.description }}
          </p>

          <div class="flex justify-between items-center">
            <span
              class="font-semibold"
              :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'"
            >
              {{ mission.price }} $WORK
            </span>

            <button
              class="px-3 py-1 rounded transition font-medium"
              :class="darkMode
                ? 'bg-[#00BFFF]/20 text-[#00BFFF] hover:bg-[#00BFFF]/30'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'"
            >
              Postuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject } from "vue"

// ✅ Récupération du darkMode depuis FreelanceDashboard
const darkMode = inject("darkMode", false)

defineProps<{ missions: any[] }>()
</script>
