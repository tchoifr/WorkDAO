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
            <h2 :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'" class="text-lg font-semibold">
              François Giorgi
            </h2>
            <p :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-sm">
              Développeuse Web3
            </p>
          </div>
        </div>

        <nav class="p-6 space-y-4">
          <button
            v-for="item in menu"
            :key="item.key"
            @click="activeSection = item.key"
            class="flex items-center w-full text-left px-3 py-2 rounded transition"
            :class="activeSection === item.key
              ? (darkMode
                ? 'bg-[#0a2431] text-[#00BFFF] font-semibold border border-[#00BFFF]/40'
                : 'text-indigo-600 font-semibold bg-indigo-50')
              : (darkMode
                ? 'text-gray-300 hover:bg-[#0a2431] hover:text-[#00BFFF]'
                : 'text-gray-700 hover:bg-indigo-50')"
          >
            <span class="text-lg mr-2">{{ item.icon }}</span>
            {{ item.label }}
          </button>
        </nav>
      </div>

      <!-- WALLET BALANCE -->
      <div
        class="border-t p-4 text-center"
        :class="darkMode ? 'bg-[#0a2431] border-[#00BFFF]/30' : 'bg-indigo-50 border-gray-200'"
      >
        <h3 :class="darkMode ? 'text-gray-300' : 'text-gray-500'" class="text-sm mb-1">Solde $WORK</h3>
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
        <h1 :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'" class="text-2xl font-bold">
          {{ currentTitle }}
        </h1>
      </header>

      <!-- CONTENU DYNAMIQUE -->
      <transition name="fade" mode="out-in">
        <component
          :is="currentComponent"
          :key="activeSection"
          :missions="missions"
          :payments="payments"
          :messages="messages"
          :nfts="nfts"
        />
      </transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide } from "vue"
import avatar from "../assets/avatar.webp"
import DashboardStats from "../components/freelanceDashboard/DashboardStats.vue"
import FindMissions from "../components/freelanceDashboard/FindMissions.vue"
import Messages from "../components/freelanceDashboard/Messages.vue"
import MyProjects from "../components/freelanceDashboard/MyProjects.vue"
import Payments from "../components/freelanceDashboard/Payments.vue"
import BadgesNFT from "../components/freelanceDashboard/BadgesNFT.vue"
import Settings from "../components/freelanceDashboard/Settings.vue"
import crypto from "../assets/crypto.webp"

const darkMode = ref(localStorage.getItem("darkMode") === "true")
provide("darkMode", darkMode)
watch(darkMode, (v) => localStorage.setItem("darkMode", v ? "true" : "false"))

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
  const item = menu.find(m => m.key === activeSection.value)
  return item ? `${item.icon} ${item.label}` : "🏠 Dashboard"
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
