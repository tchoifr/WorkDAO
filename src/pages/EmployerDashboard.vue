<template>
  <div
    :class="[
      'flex min-h-screen transition-colors duration-500',
      darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'
    ]"
  >
    <!-- SIDEBAR -->
    <aside
      class="w-64 border-r shadow-md hidden md:flex flex-col justify-between transition-all duration-500"
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
            <h2
              class="text-lg font-semibold"
              :class="darkMode ? 'text-[#38BDF8]' : 'text-indigo-600'"
            >
              Jean Dupont
            </h2>
            <p :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-sm">
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
              ? (darkMode ? 'bg-white/10 text-[#00BFFF] font-semibold' : 'text-indigo-600 font-semibold bg-indigo-50')
              : (darkMode ? 'text-gray-300 hover:bg-white/10 hover:text-[#00BFFF]' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600')"
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
        <h3 :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-sm mb-1">
          Budget $WORK
        </h3>
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

        <!-- 🌓 Dark/Light switch -->
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium">{{ darkMode ? 'Dark mode' : 'Light mode' }}</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="darkMode" class="sr-only peer" />
            <div
              class="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00BFFF]"
            ></div>
          </label>
        </div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import avatar from "../assets/avatar.webp"
import DashboardOverview from "../components/employerDashboard/DashboardOverview.vue"
import PostJob from "../components/employerDashboard/PostJob.vue"
import MyJobs from "../components/employerDashboard/MyJobs.vue"
import Applications from "../components/employerDashboard/Applications.vue"
import Payments from "../components/employerDashboard/Payments.vue"
import Messages from "../components/employerDashboard/Messages.vue"
import Settings from "../components/employerDashboard/Settings.vue"

// 🌓 DARK MODE
const darkMode = ref(localStorage.getItem("darkMode") === "true")
watch(darkMode, (v) => localStorage.setItem("darkMode", v ? "true" : "false"))

const menu = [
  { key: "dashboard", label: "Vue d’ensemble", icon: "🏠" },
  { key: "post", label: "Créer une annonce", icon: "📝" },
  { key: "jobs", label: "Mes annonces", icon: "📋" },
  { key: "apps", label: "Candidatures", icon: "👥" },
  { key: "payments", label: "Paiements", icon: "💰" },
  { key: "messages", label: "Messages", icon: "💬" },
  { key: "settings", label: "Paramètres", icon: "⚙️" },
]

const activeSection = ref("dashboard")
const balance = ref(3100.25)

const jobs = ref([
  {
    id: 1,
    title: "Développeur Solidity Senior",
    description:
      "Nous recherchons un développeur Solidity expérimenté pour créer un smart contract ERC-721 complexe pour notre plateforme NFT.",
    budget: 800,
    duration: "10 jours",
    status: "Ouverte",
    skills: ["Solidity", "Hardhat", "Ethereum", "IPFS", "React Web3"],
    postedAt: "2025-10-15",
    contractType: "Freelance / Remote",
    hash: "0x9cfa23b...f82b1",
  },
  {
    id: 2,
    title: "UI/UX Designer Web3",
    description: "Mission de design pour une DApp Web3 moderne et intuitive.",
    budget: 500,
    duration: "7 jours",
    status: "En cours",
    skills: ["Figma", "TailwindCSS", "UI/UX", "Web3 Design", "Responsive"],
    postedAt: "2025-10-10",
    contractType: "Freelance / Télétravail total",
    hash: "0xa7fbe01...de25c",
  },
])

const applications = ref([
  {
    id: 1,
    jobId: 1,
    freelancer: "Lucas Bernard",
    avatar: avatar,
    proposal:
      "Je peux livrer un smart contract ERC-721 complet avec audit de sécurité sous 8 jours.",
    bid: 780,
    status: "En attente",
  },
  {
    id: 2,
    jobId: 1,
    freelancer: "Emma Laurent",
    avatar: avatar,
    proposal: "Audit complet du code Solidity et intégration front-end React.",
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

@media (max-width: 768px) {
  aside {
    display: none;
  }
}
</style>
