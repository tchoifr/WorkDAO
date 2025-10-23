<template>
  <div
    :class="[
      'flex min-h-screen transition-colors duration-500',
      darkMode ? 'dark bg-[#0a2431] text-gray-100' : 'bg-gray-100 text-gray-800'
    ]"
  >
    <!-- SIDEBAR (DESKTOP) -->
    <aside
      class="w-64 border-r shadow-md hidden md:flex flex-col justify-between transition-all duration-500"
      :class="darkMode 
        ? 'bg-[#0a2431] border-[#00BFFF]/30' 
        : 'bg-white border-gray-200'"
    >
      <div>
        <div class="p-6 border-b" :class="darkMode ? 'border-[#00BFFF]/30' : 'border-gray-200'">
          <div class="flex flex-col items-center text-center">
            <img
              :src="avatar"
              alt="avatar"
              class="w-24 h-24 rounded-full mb-3 border-2 border-[#00BFFF] shadow-md"
            />
            <h2
              class="text-lg font-semibold"
              :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'"
            >
              Jean Dupont
            </h2>
            <p :class="darkMode ? 'text-gray-300' : 'text-gray-500'" class="text-sm">
              Recruteur Web3
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
                ? 'bg-[#00BFFF]/10 text-[#00BFFF] font-semibold border border-[#00BFFF]/50' 
                : 'text-indigo-600 font-semibold bg-indigo-50')
              : (darkMode 
                ? 'text-gray-300 hover:bg-[#00BFFF]/10 hover:text-[#00BFFF]' 
                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600')"
          >
            <span class="text-lg mr-2">{{ item.icon }}</span>
            {{ item.label }}
          </button>
        </nav>
      </div>

      <!-- BUDGET -->
      <div
        class="border-t p-4 text-center transition"
        :class="darkMode 
          ? 'bg-[#0a2431] border-[#00BFFF]/30 hover:border-[#00BFFF]/60' 
          : 'bg-indigo-50 border-gray-200'"
      >
        <h3 :class="darkMode ? 'text-gray-300' : 'text-gray-500'" class="text-sm mb-1">
          Budget $WORK
        </h3>
        <p :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'" class="text-2xl font-bold">
          {{ balance.toFixed(2) }}
        </p>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 overflow-y-auto pb-20 md:pb-0">
      <header
        class="p-6 flex justify-between items-center shadow-sm border-b"
        :class="darkMode 
          ? 'bg-[#0a2431] border-[#00BFFF]/30' 
          : 'bg-white border-gray-200'"
      >
        <h1 :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'" class="text-2xl font-bold">
          {{ currentTitle }}
        </h1>
      </header>

      <!-- CONTENU PRINCIPAL -->
      <transition name="fade" mode="out-in">
        <component
          :is="currentComponent"
          :key="activeSection"
          :jobs="jobs"
          :applications="applications"
        />
      </transition>
    </main>

    <!-- NAVIGATION MOBILE SCROLLABLE -->
    <nav
      class="fixed bottom-0 left-0 right-0 border-t shadow-md md:hidden z-50"
      :class="darkMode ? 'bg-[#0a2431] border-[#00BFFF]/30 text-gray-200' : 'bg-white border-gray-200 text-gray-700'"
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
import DashboardOverview from "../components/employerDashboard/DashboardOverview.vue"
import PostJob from "../components/employerDashboard/PostJob.vue"
import MyJobs from "../components/employerDashboard/MyJobs.vue"
import Applications from "../components/employerDashboard/Applications.vue"
import Payments from "../components/employerDashboard/Payments.vue"
import Messages from "../components/employerDashboard/Messages.vue"
import Settings from "../components/employerDashboard/Settings.vue"
import GestionContract from "../components/employerDashboard/GestionContract.vue"
import WalletManager from "../components/WalletManager.vue"

// 🌗 DARK MODE
const darkMode = ref(localStorage.getItem("darkMode") === "true")
watch(darkMode, (v) => localStorage.setItem("darkMode", v ? "true" : "false"))
provide("darkMode", darkMode)

const menu = [
  { key: "dashboard", label: "Overview", icon: "🏠" },
  { key: "post", label: "Create Job", icon: "📝" },
  { key: "jobs", label: "Posted Jobs", icon: "📋" },
  { key: "apps", label: "Candidatures", icon: "👥" },
  { key: "payments", label: "Payments", icon: "💰" },
  { key: "messages", label: "Messages", icon: "💬" },
  { key: "contracts", label: "Contract Management", icon: "📜" },
  {key: "wallet", label: "Wallet", icon: "💼" },
  { key: "settings", label: "Settings", icon: "⚙️" },
 

]



const activeSection = ref("dashboard")
const balance = ref(3100.25)

const jobs = ref([
  {
    id: 1,
    title: "Développeur Solidity Senior",
    description: "Création d’un smart contract ERC-721 complexe pour une DApp NFT.",
    budget: 800,
    duration: "10 jours",
    status: "Ouverte",
    skills: ["Solidity", "Hardhat", "Ethereum", "React"],
    postedAt: "2025-10-15",
    contractType: "Freelance / Remote",
  },
  {
    id: 2,
    title: "UI/UX Designer Web3",
    description: "Mission design pour une DApp Web3 moderne et intuitive.",
    budget: 500,
    duration: "7 jours",
    status: "En cours",
    skills: ["Figma", "TailwindCSS", "UI/UX", "Responsive"],
    postedAt: "2025-10-10",
    contractType: "Freelance / Télétravail",
  },
])

const applications = ref([
  {
    id: 1,
    jobId: 1,
    freelancer: "Lucas Bernard",
    avatar,
    proposal: "Je peux livrer un smart contract complet avec audit en 8 jours.",
    bid: 780,
    status: "En attente",
  },
  {
    id: 2,
    jobId: 1,
    freelancer: "Emma Laurent",
    avatar,
    proposal: "Audit du code Solidity et intégration front-end React.",
    bid: 800,
    status: "Acceptée",
  },
])

const currentComponent = computed(() => {
  switch (activeSection.value) {
    case "post": return PostJob
    case "jobs": return MyJobs
    case "apps": return Applications
    case "payments": return Payments
    case "messages": return Messages
    case "wallet": return WalletManager
    case "contracts": return GestionContract
    case "settings": return Settings
    default: return DashboardOverview
  }
})


const currentTitle = computed(() => {
  const item = menu.find((m) => m.key === activeSection.value)
  return item ? `${item.icon} ${item.label}` : "🏠 Vue d’ensemble"
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

/* Nav mobile — masquer la scrollbar */
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
