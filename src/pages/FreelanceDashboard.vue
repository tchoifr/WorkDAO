<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- SIDEBAR -->
    <aside class="w-64 bg-white border-r shadow-md hidden md:flex flex-col justify-between">
      <div>
        <div class="p-6 border-b">
          <div class="flex flex-col items-center text-center">
            <img
              :src="avatar"
              alt="avatar"
              class="w-24 h-24 rounded-full mb-3 border-2 border-indigo-500 shadow-md"
            />
            <h2 class="text-lg font-semibold text-indigo-600">François Giorgi</h2>
            <p class="text-sm text-gray-500">Développeuse Web3</p>
          </div>
        </div>

        <nav class="p-6 space-y-4">
          <button
            v-for="item in menu"
            :key="item.key"
            @click="activeSection = item.key"
            class="flex items-center w-full text-left px-3 py-2 rounded hover:bg-indigo-50 transition"
            :class="activeSection === item.key ? 'text-indigo-600 font-semibold bg-indigo-50' : 'text-gray-700'"
          >
            <span class="text-lg mr-2">{{ item.icon }}</span>
            {{ item.label }}
          </button>
        </nav>
      </div>

      <!-- WALLET BALANCE -->
      <div class="bg-indigo-50 border-t p-4 text-center">
        <h3 class="text-gray-500 text-sm mb-1">Solde $WORK</h3>
        <p class="text-2xl font-bold text-indigo-600">{{ balance.toFixed(2) }}</p>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 overflow-y-auto">
      <header class="bg-white shadow-sm p-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-indigo-600">
          {{ currentTitle }}
        </h1>
      </header>

      <!-- RECAP GLOBAL -->
      <div v-if="activeSection === 'dashboard'" class="p-6 space-y-10">
        <!-- STATS -->
        <section class="grid md:grid-cols-3 gap-6">
          <div class="bg-white shadow-md rounded-lg p-5 border-t-4 border-indigo-500">
            <h3 class="text-gray-500">Missions actives</h3>
            <p class="text-3xl font-bold text-indigo-600">{{ missions.length }}</p>
            <p class="text-sm text-gray-400 mt-1">En cours ou en attente</p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-5 border-t-4 border-green-500">
            <h3 class="text-gray-500">Total gagné</h3>
            <p class="text-3xl font-bold text-green-600">{{ totalWork.toFixed(2) }} $WORK</p>
            <p class="text-sm text-gray-400 mt-1">30 derniers jours</p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-5 border-t-4 border-yellow-500">
            <h3 class="text-gray-500">NFT obtenus</h3>
            <p class="text-3xl font-bold text-yellow-600">{{ nfts.length }}</p>
            <p class="text-sm text-gray-400 mt-1">Compétences validées</p>
          </div>
        </section>

        <!-- MISSION / PAIEMENT -->
        <section class="grid md:grid-cols-2 gap-6">
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-indigo-700 mb-4">📋 Dernières missions</h2>
            <ul class="divide-y">
              <li v-for="mission in missions" :key="mission.id" class="py-3 flex justify-between">
                <div>
                  <p class="font-medium text-gray-800">{{ mission.title }}</p>
                  <p class="text-sm text-gray-500">{{ mission.price }} $WORK</p>
                </div>
                <span
                  :class="mission.status === 'Terminé' ? 'text-green-600' : 'text-yellow-600'"
                  class="font-semibold text-sm"
                >{{ mission.status }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-indigo-700 mb-4">💰 Paiements récents</h2>
            <ul class="divide-y">
              <li v-for="p in payments" :key="p.id" class="py-3 flex justify-between">
                <div>
                  <p class="font-medium text-gray-800">{{ p.mission }}</p>
                  <p class="text-sm text-gray-500">{{ p.date }}</p>
                </div>
                <span
                  :class="p.status === 'Terminé' ? 'text-green-600' : 'text-yellow-600'"
                  class="font-semibold"
                >{{ p.amount }} $WORK</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- MESSAGES / NFT -->
        <section class="grid md:grid-cols-2 gap-6">
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-indigo-700 mb-4">💬 Derniers messages</h2>
            <ul class="divide-y">
              <li v-for="msg in messages" :key="msg.id" class="py-3">
                <p class="text-gray-800 font-medium">{{ msg.from }}</p>
                <p class="text-sm text-gray-500">{{ msg.text }}</p>
              </li>
            </ul>
          </div>

          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-indigo-700 mb-4">🏅 Derniers NFT</h2>
            <div class="flex space-x-4">
              <div
                v-for="nft in nfts"
                :key="nft.id"
                class="flex flex-col items-center bg-indigo-50 rounded-lg p-4 w-28 shadow-sm"
              >
                <img :src="nft.image" alt="NFT" class="w-12 h-12 mb-2" />
                <p class="text-sm font-medium text-indigo-700 text-center">{{ nft.name }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- AUTRES SECTIONS -->
      <transition name="fade" mode="out-in">
        <component v-if="activeSection !== 'dashboard'" :is="currentComponent" :missions="missions" :key="activeSection" />
      </transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import avatar from "../assets/avatar.webp"

import DashboardStats from "../components/freelanceDashboard/DashboardStats.vue"
import FindMissions from "../components/freelanceDashboard/FindMissions.vue"
import Messages from "../components/freelanceDashboard/Messages.vue"
import MyProjects from "../components/freelanceDashboard/MyProjects.vue"
import Payments from "../components/freelanceDashboard/Payments.vue"
import BadgesNFT from "../components/freelanceDashboard/BadgesNFT.vue"
import Settings from "../components/freelanceDashboard/Settings.vue"
import crypto from "../assets/crypto.webp"
const menu = [
  { key: "dashboard", label: "Tableau de bord", icon: "🏠" },
  { key: "find", label: "Trouver des missions", icon: "🔍" },
  { key: "messages", label: "Messages", icon: "💬" },
  { key: "projects", label: "Mes projets", icon: "💼" },
  { key: "payments", label: "Paiements", icon: "💰" },
  { key: "nft", label: "Badges NFT", icon: "🏅" },
  { key: "settings", label: "Paramètres", icon: "⚙️" },
]

const activeSection = ref("dashboard")
const balance = ref(1420.75)

const missions = ref([
  { id: 1, title: "Smart Contract ERC-721", price: 320, status: "Terminé", image: crypto },
  { id: 2, title: "Intégration Wallet", price: 180, status: "En cours", image: crypto },
  { id: 3, title: "Audit Solidity", price: 500, status: "En attente", image: crypto },
])

const payments = ref([
  { id: 1, date: "2025-10-12", mission: "Smart Contract ERC-721", amount: 320, status: "Terminé" },
  { id: 2, date: "2025-10-14", mission: "Intégration MetaMask", amount: 180, status: "En attente" },
])

const messages = ref([
  { id: 1, from: "DevCorp Agency", text: "Votre audit Solidity a été validé 🎉" },
  { id: 2, from: "Polygon Team", text: "Merci pour la mise à jour du contrat !" },
])

const nfts = ref([
  { id: 1, name: "Expert Solidity", image: crypto },
  { id: 2, name: "Full-Stack Web3", image: crypto },
])

const totalWork = computed(() => payments.value.reduce((acc, p) => acc + p.amount, 0))

const currentComponent = computed(() => {
  switch (activeSection.value) {
    case "find": return FindMissions
    case "messages": return Messages
    case "projects": return MyProjects
    case "payments": return Payments
    case "nft": return BadgesNFT
    case "settings": return Settings
    default: return DashboardStats
  }
})

const currentTitle = computed(() => {
  const item = menu.find((m) => m.key === activeSection.value)
  return item ? item.icon + " " + item.label : "🏠 Tableau de bord"
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 768px) {
  aside {
    display: none;
  }
}
</style>
