<template>
  <section class="p-6 transition-colors duration-500">
    <div class="grid auto-rows-fr sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 🧩 Carte d’offre -->
      <div
        v-for="job in jobs"
        :key="job.id"
        class="shadow-lg rounded-lg p-6 border transition flex flex-col justify-between min-w-[300px]"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60 hover:shadow-[#00BFFF]/20'
          : 'bg-white hover:shadow-xl border-gray-200'"
      >
        <!-- Titre + Statut -->
        <div class="flex justify-between items-start mb-3">
          <h3
            class="text-lg font-semibold"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
          >
            {{ job.title }}
          </h3>
          <span
            class="px-3 py-1 text-xs rounded-full font-semibold uppercase"
            :class="{
              'bg-green-100 text-green-700': !darkMode && job.status === 'Ouverte',
              'bg-yellow-100 text-yellow-700': !darkMode && job.status === 'En cours',
              'bg-red-100 text-red-700': !darkMode && job.status === 'Fermée',
              'bg-gray-100 text-gray-600': !darkMode && job.status === 'En attente',
              'bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/30': darkMode
            }"
          >
            {{ job.status }}
          </span>
        </div>

        <!-- Description -->
        <p
          class="text-sm mb-4 line-clamp-3"
          :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
        >
          {{ job.description }}
        </p>

        <!-- Détails -->
        <div
          class="text-sm space-y-1 mb-4"
          :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
        >
          <p>📅 <b>Publié le :</b> {{ job.postedAt }}</p>
          <p>⏱️ <b>Durée estimée :</b> {{ job.duration }}</p>
          <p>💼 <b>Type :</b> {{ job.contractType }}</p>
        </div>

        <!-- Compétences -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="skill in job.skills"
            :key="skill"
            class="text-xs font-medium px-2 py-1 rounded"
            :class="darkMode
              ? 'bg-[#00BFFF]/10 text-[#00BFFF]'
              : 'bg-indigo-50 text-indigo-700'"
          >
            {{ skill }}
          </span>
        </div>

        <!-- 💬 Candidatures (compteur uniquement) -->
        <div
          class="mt-4 mb-2 flex items-center justify-start"
          :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
        >
          <p class="font-semibold">
            👥 {{ job.applications.length }}
            candidature<span v-if="job.applications.length > 1">s</span>
          </p>
        </div>

        <!-- Budget + Hash -->
        <div class="flex justify-between items-center mt-auto pt-4 border-t">
          <p
            class="font-bold text-lg"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'"
          >
            {{ job.budget }} $WORK
          </p>
          <p
            class="text-[11px] font-mono truncate w-32"
            :class="darkMode ? 'text-gray-400' : 'text-gray-400'"
            title="Hash blockchain"
          >
            {{ job.hash }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"

interface Candidate {
  id: number
  name: string
  experience: string
  avatar: string
  appliedAt: string
}

interface Job {
  id: number
  title: string
  description: string
  postedAt: string
  duration: string
  contractType: string
  status: "Ouverte" | "En cours" | "Fermée" | "En attente"
  budget: number
  hash: string
  skills: string[]
  applications: Candidate[]
}

const darkMode = inject("darkMode", false)

const jobs = ref<Job[]>([
  {
    id: 1,
    title: "Développeur Smart Contract Solidity",
    description: "Développement d’un smart contract ERC-721 pour la marketplace NFT.",
    postedAt: "2025-10-15",
    duration: "2 semaines",
    contractType: "Freelance",
    status: "Ouverte",
    budget: 500,
    hash: "0xa12b...93f9",
    skills: ["Solidity", "Hardhat", "Ethers.js"],
    applications: Array.from({ length: 18 }).map((_, i) => ({
      id: i + 100,
      name: `Candidat ${i + 1}`,
      experience: `${Math.floor(Math.random() * 5) + 1} ans - Dev Web3`,
      avatar: `https://randomuser.me/api/portraits/${i % 2 ? "men" : "women"}/${i + 20}.jpg`,
      appliedAt: `2025-10-${String(i + 1).padStart(2, "0")}`,
    })),
  },
  {
    id: 2,
    title: "UI/UX Designer Web3",
    description: "Création d’interfaces responsives pour dApps.",
    postedAt: "2025-10-20",
    duration: "1 mois",
    contractType: "Freelance",
    status: "En cours",
    budget: 350,
    hash: "0xc77a...e11a",
    skills: ["Figma", "Tailwind", "UX Research"],
    applications: [],
  },
])
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive cards */
section > .grid > div {
  min-width: 300px;
}
</style>
