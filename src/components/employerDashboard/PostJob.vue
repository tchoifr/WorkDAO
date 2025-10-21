<template>
  <section class="p-6 transition-colors duration-500">
    <div
      class="rounded-lg shadow p-6 space-y-4 transition"
      :class="darkMode
        ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
        : 'bg-white border border-gray-200'"
    >
      <input
        type="text"
        placeholder="Titre du poste"
        class="w-full px-3 py-2 rounded border transition"
        :class="darkMode
          ? 'bg-[#0d2f42] border-[#00BFFF]/30 text-gray-100 placeholder-gray-400 focus:border-[#00BFFF]/60'
          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'"
      />

      <textarea
        placeholder="Description du poste..."
        rows="5"
        class="w-full px-3 py-2 rounded border transition"
        :class="darkMode
          ? 'bg-[#0d2f42] border-[#00BFFF]/30 text-gray-100 placeholder-gray-400 focus:border-[#00BFFF]/60'
          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'"
      ></textarea>

      <input
        type="number"
        placeholder="Budget en $WORK"
        class="w-full px-3 py-2 rounded border transition"
        :class="darkMode
          ? 'bg-[#0d2f42] border-[#00BFFF]/30 text-gray-100 placeholder-gray-400 focus:border-[#00BFFF]/60'
          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'"
      />

      <button
        class="px-4 py-2 rounded font-semibold transition"
        :class="darkMode
          ? 'bg-[#00BFFF] text-black hover:bg-[#33cfff]'
          : 'bg-indigo-600 text-white hover:bg-indigo-700'"
      >
        Publier
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject } from "vue"

// ✅ Récupération du dark mode depuis EmployerDashboard.vue
const darkMode = inject("darkMode", false)
</script>
