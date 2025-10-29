<template>
  <div
    :class="[
      'flex min-h-screen transition-colors duration-500',
      darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'
    ]"
  >
    <!-- SIDEBAR (DESKTOP) -->
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
    <main class="flex-1 overflow-y-auto pb-20 md:pb-0">
      <header
        class="p-6 flex justify-between items-center shadow-sm border-b"
        :class="darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
      >
        <h1 :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'" class="text-2xl font-bold">
          {{ currentTitle }}
        </h1>
      </header>

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

    <!-- NAVIGATION MOBILE SCROLLABLE -->
    <nav
      class="fixed bottom-0 left-0 right-0 border-t shadow-md md:hidden z-50"
      :class="darkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'"
    >
      <div
        class="flex overflow-x-auto no-scrollbar snap-x snap-mandatory px-2 py-2 space-x-4 justify-start"
      >
        <button
          v-for="item in menu"
          :key="item.key"
          @click="activeSection = item.key"
          class="flex flex-col items-center justify-center text-xs flex-shrink-0 min-w-[70px] snap-center"
          :class="activeSection === item.key
            ? (darkMode ? 'text-[#00BFFF] scale-110' : 'text-indigo-600 scale-110')
            : (darkMode ? 'text-gray-400' : 'text-gray-500')"
        >
          <span class="text-2xl mb-1">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide } from "vue"
import avatar from "../assets/avatar.webp"

// ✅ Composants du tableau de bord
import DashboardStats from "../components/freelanceDashboard/DashboardStats.vue"
import FindMissions from "../components/freelanceDashboard/FindMissions.vue"
import MyProjects from "../components/freelanceDashboard/MyProjects.vue"
import Payments from "../components/freelanceDashboard/Payments.vue"
import BadgesNFT from "../components/freelanceDashboard/BadgesNFT.vue"
import Settings from "../components/freelanceDashboard/Settings.vue"
import Parcours from "../components/freelanceDashboard/Parcours.vue"

// ✅ Image utilisée pour les missions
import crypto from "../assets/crypto.webp"

// --- DARK MODE GESTION ---
const darkMode = ref(localStorage.getItem("darkMode") === "true")
provide("darkMode", darkMode)
watch(darkMode, (v) => localStorage.setItem("darkMode", v ? "true" : "false"))

// --- MENU LATÉRAL / NAVIGATION MOBILE ---
const menu = ref([
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "find", label: "Find", icon: "🔍" },
  { key: "messages", label: "Messages", icon: "💬" },
  { key: "projects", label: "Projects", icon: "💼" },
  { key: "payments", label: "Payments", icon: "💰" },
  { key: "nft", label: "NFTs", icon: "🏅" },
  { key: "parcours", label: "Career", icon: "🧭" },
  { key: "settings", label: "Settings", icon: "⚙️" },
])

// --- ÉTAT ACTIF ---
const activeSection = ref("dashboard")
const balance = ref(1420.75)

// --- DONNÉES DYNAMIQUES ---
const missions = ref([
  { id: 1, title: "Smart Contract ERC-721", description: "Développement de contrats NFT WorkDAO.", price: 320, status: "Terminé", image: crypto },
  { id: 2, title: "Intégration Wallet", description: "Connexion WalletConnect et MetaMask pour la dApp.", price: 180, status: "En cours", image: crypto },
  { id: 3, title: "Audit Solidity", description: "Analyse de sécurité des smart contracts ERC-20.", price: 500, status: "En attente", image: crypto },
  { id: 4, title: "UI/UX Designer Web3", description: "Conception d’interfaces futuristes pour le DAO.", price: 260, status: "Disponible", image: crypto },
  { id: 5, title: "Traducteur Technique", description: "Traduction EN → FR des documents de gouvernance.", price: 120, status: "Disponible", image: crypto },
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

// --- SÉLECTION DYNAMIQUE DES COMPOSANTS ---
const currentComponent = computed(() => {
  switch (activeSection.value) {
    case "find": return FindMissions // ✅ le filtre de métiers WorkDAO
    case "projects": return MyProjects
    case "payments": return Payments
    case "nft": return BadgesNFT
    case "settings": return Settings
    case "parcours": return Parcours
    default: return DashboardStats
  }
})

// --- TITRE DYNAMIQUE EN ENTÊTE ---
const currentTitle = computed(() => {
  const item = menu.value.find((m) => m.key === activeSection.value)
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

/* Supprimer la scrollbar horizontale visible sur mobile */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

button {
  transition: transform 0.2s ease, color 0.2s ease;
}
</style>
