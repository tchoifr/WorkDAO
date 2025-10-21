<template>
  <div
    :class="[
      'flex min-h-screen transition-colors duration-500',
      darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'
    ]"
  >
    <!-- SIDEBAR -->
    <aside
      class="w-64 border-r shadow-md hidden md:flex flex-col justify-between"
      :class="darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
    >
      <div>
        <div class="p-6 border-b" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
          <div class="flex flex-col items-center text-center">
            <img
              :src="avatar"
              alt="avatar"
              class="w-24 h-24 rounded-full mb-3 border-2 border-indigo-500 shadow-md"
            />
            <h2 :class="darkMode ? 'text-[#38BDF8]' : 'text-indigo-600'" class="text-lg font-semibold">
              François Giorgi
            </h2>
            <p :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-sm">Développeuse Web3</p>
          </div>
        </div>

        <nav class="p-6 space-y-4">
          <button
            v-for="item in menu"
            :key="item.key"
            @click="activeSection = item.key"
            class="flex items-center w-full text-left px-3 py-2 rounded transition"
            :class="activeSection === item.key
              ? (darkMode ? 'bg-white/10 text-[#00BFFF] font-semibold' : 'text-indigo-600 font-semibold bg-indigo-50')
              : (darkMode ? 'text-gray-300 hover:bg-white/10 hover:text-[#00BFFF]' : 'text-gray-700 hover:bg-indigo-50')"
          >
            <span class="text-lg mr-2">{{ item.icon }}</span>
            {{ item.label }}
          </button>
        </nav>
      </div>

      <!-- WALLET BALANCE -->
      <div
        class="border-t p-4 text-center"
        :class="darkMode ? 'bg-gray-800 border-gray-700' : 'bg-indigo-50 border-gray-200'"
      >
        <h3 :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-sm mb-1">Solde $WORK</h3>
        <p :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'" class="text-2xl font-bold">
          {{ balance.toFixed(2) }}
        </p>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 overflow-y-auto">
      <header
        class="p-6 flex justify-between items-center shadow-sm border-b"
        :class="darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
      >
        <h1 :class="darkMode ? 'text-[#38BDF8]' : 'text-indigo-600'" class="text-2xl font-bold">
          {{ currentTitle }}
        </h1>

        <!-- 🌓 Dark/Light switch (EN) -->
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium">{{ darkMode ? 'Dark mode' : 'Light mode' }}</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="darkMode" class="sr-only peer" />
            <div
              class="w-12 h-6 rounded-full bg-gray-300 peer-checked:bg-[#00BFFF] transition-colors"
            ></div>
            <span
              class="absolute left-0 top-0 h-6 w-6 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-6"
            ></span>
          </label>
        </div>
      </header>

      <!-- RECAP GLOBAL -->
      <div v-if="activeSection === 'dashboard'" class="p-6 space-y-10">
        <!-- STATS -->
        <section class="grid md:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border-t-4 border-indigo-500">
            <h3 class="text-gray-500 dark:text-gray-300">Missions actives</h3>
            <p class="text-3xl font-bold text-indigo-600 dark:text-[#00BFFF]">{{ missions.length }}</p>
            <p class="text-sm text-gray-400 mt-1">En cours ou en attente</p>
          </div>
          <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border-t-4 border-green-500">
            <h3 class="text-gray-500 dark:text-gray-300">Total gagné</h3>
            <p class="text-3xl font-bold text-green-600">{{ totalWork.toFixed(2) }} $WORK</p>
            <p class="text-sm text-gray-400 mt-1">30 derniers jours</p>
          </div>
          <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border-t-4 border-yellow-500">
            <h3 class="text-gray-500 dark:text-gray-300">NFT obtenus</h3>
            <p class="text-3xl font-bold text-yellow-600">{{ nfts.length }}</p>
            <p class="text-sm text-gray-400 mt-1">Compétences validées</p>
          </div>
        </section>

        <!-- MISSION / PAIEMENT -->
        <section class="grid md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-indigo-700 dark:text-[#38BDF8] mb-4">📋 Dernières missions</h2>
            <ul class="divide-y" :class="darkMode ? 'divide-gray-700' : 'divide-gray-200'">
              <li v-for="mission in missions" :key="mission.id" class="py-3 flex justify-between">
                <div>
                  <p class="font-medium text-gray-800 dark:text-gray-100">{{ mission.title }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ mission.price }} $WORK</p>
                </div>
                <span
                  :class="mission.status === 'Terminé' ? 'text-green-500' : 'text-yellow-400'"
                  class="font-semibold text-sm"
                >{{ mission.status }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-indigo-700 dark:text-[#38BDF8] mb-4">💰 Paiements récents</h2>
            <ul class="divide-y" :class="darkMode ? 'divide-gray-700' : 'divide-gray-200'">
              <li v-for="p in payments" :key="p.id" class="py-3 flex justify-between">
                <div>
                  <p class="font-medium text-gray-800 dark:text-gray-100">{{ p.mission }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ p.date }}</p>
                </div>
                <span
                  :class="p.status === 'Terminé' ? 'text-green-500' : 'text-yellow-400'"
                  class="font-semibold"
                >{{ p.amount }} $WORK</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- MESSAGES / NFT -->
        <section class="grid md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-indigo-700 dark:text-[#38BDF8] mb-4">💬 Derniers messages</h2>
            <ul class="divide-y" :class="darkMode ? 'divide-gray-700' : 'divide-gray-200'">
              <li v-for="msg in messages" :key="msg.id" class="py-3">
                <p class="text-gray-800 dark:text-gray-100 font-medium">{{ msg.from }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ msg.text }}</p>
              </li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-indigo-700 dark:text-[#38BDF8] mb-4">🏅 Derniers NFT</h2>
            <div class="flex space-x-4">
              <div
                v-for="nft in nfts"
                :key="nft.id"
                class="flex flex-col items-center bg-indigo-50 dark:bg-white/10 rounded-lg p-4 w-28 shadow-sm"
              >
                <img :src="nft.image" alt="NFT" class="w-12 h-12 mb-2" />
                <p class="text-sm font-medium text-indigo-700 dark:text-[#38BDF8] text-center">
                  {{ nft.name }}
                </p>
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
import { ref, computed, watch } from "vue"
import avatar from "../assets/avatar.webp"

import DashboardStats from "../components/freelanceDashboard/DashboardStats.vue"
import FindMissions from "../components/freelanceDashboard/FindMissions.vue"
import Messages from "../components/freelanceDashboard/Messages.vue"
import MyProjects from "../components/freelanceDashboard/MyProjects.vue"
import Payments from "../components/freelanceDashboard/Payments.vue"
import BadgesNFT from "../components/freelanceDashboard/BadgesNFT.vue"
import Settings from "../components/freelanceDashboard/Settings.vue"
import crypto from "../assets/crypto.webp"

const darkMode = ref(localStorage.getItem('darkMode') === 'true')

const menu = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "find", label: "Find Missions", icon: "🔍" },
  { key: "messages", label: "Messages", icon: "💬" },
  { key: "projects", label: "My Projects", icon: "💼" },
  { key: "payments", label: "Payments", icon: "💰" },
  { key: "nft", label: "NFT Badges", icon: "🏅" },
  { key: "settings", label: "Settings", icon: "⚙️" },
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
  return item ? item.icon + " " + item.label : "🏠 Dashboard"
})

watch(darkMode, (v) => localStorage.setItem('darkMode', v ? 'true' : 'false'))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

@media (max-width: 768px) { aside { display: none; } }
#navBar { position: relative !important; }
</style>
