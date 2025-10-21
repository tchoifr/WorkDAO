<template>
  <section class="p-6 transition-colors duration-500">
    <div
      class="rounded-lg shadow divide-y transition"
      :class="darkMode
        ? 'bg-[#0a2431] divide-gray-700 border border-[#00BFFF]/30'
        : 'bg-white divide-gray-200 border border-gray-200'"
    >
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="flex items-start justify-between p-4 transition"
        :class="darkMode
          ? 'hover:bg-[#09202c]'
          : 'hover:bg-gray-50'"
      >
        <div class="flex space-x-3">
          <img
            :src="msg.avatar"
            alt="avatar"
            class="w-12 h-12 rounded-full border shadow-sm"
            :class="darkMode ? 'border-[#00BFFF]/40' : 'border-indigo-200'"
          />

          <div>
            <h3
              class="font-semibold"
              :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
            >
              {{ msg.from }}
            </h3>

            <p
              class="text-sm"
              :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
            >
              {{ msg.text }}
            </p>

            <span
              class="text-xs"
              :class="darkMode ? 'text-gray-400' : 'text-gray-400'"
            >
              {{ msg.time }}
            </span>
          </div>
        </div>

        <button
          class="text-sm font-medium transition"
          :class="darkMode
            ? 'text-[#00BFFF] hover:text-[#38BDF8]'
            : 'text-indigo-600 hover:text-indigo-800'"
        >
          Répondre
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject } from "vue"

// ✅ Récupère le mode sombre depuis FreelanceDashboard
const darkMode = inject("darkMode", false)

const messages = [
  {
    id: 1,
    from: "DevCorp Agency",
    text: "Bonjour Lisa, pouvez-vous livrer la mise à jour du smart contract avant mardi ?",
    time: "Il y a 2h",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    from: "Polygon Team",
    text: "Merci pour votre travail sur le déploiement — excellent rendu ! 🎉",
    time: "Hier",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    from: "DAO Collective",
    text: "Votre proposition de contrat DAO est validée. On passe au vote !",
    time: "Il y a 3 jours",
    avatar: "https://randomuser.me/api/portraits/men/57.jpg",
  },
]
</script>
