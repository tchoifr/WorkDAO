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
            <h2 class="text-lg font-semibold text-indigo-600">Jean Dupont</h2>
            <p class="text-sm text-gray-500">Recruteur Web3</p>
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
        <h3 class="text-gray-500 text-sm mb-1">Budget $WORK</h3>
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

      <transition name="fade" mode="out-in">
        <component :is="currentComponent" :key="activeSection" :jobs="jobs" :applications="applications" />
      </transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import avatar from "../assets/avatar.webp"
import DashboardOverview from "../components/employerDashboard/DashboardOverview.vue"
import PostJob from "../components/employerDashboard/PostJob.vue"
import MyJobs from "../components/employerDashboard/MyJobs.vue"
import Applications from "../components/employerDashboard/Applications.vue"
import Payments from "../components/employerDashboard/Payments.vue"
import Messages from "../components/employerDashboard/Messages.vue"
import Settings from "../components/employerDashboard/Settings.vue"

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
      "Nous recherchons un développeur Solidity expérimenté pour créer un smart contract ERC-721 complexe pour notre plateforme NFT. Le candidat doit maîtriser la sécurité on-chain, les audits et l’intégration Web3 avec React.",
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
    description:
      "Mission de design pour une DApp Web3. Vous créerez une interface utilisateur moderne et intuitive pour un tableau de bord DAO. Une expérience avec Figma, TailwindCSS et des projets blockchain est un plus.",
    budget: 500,
    duration: "7 jours",
    status: "En cours",
    skills: ["Figma", "TailwindCSS", "UI/UX", "Web3 Design", "Responsive"],
    postedAt: "2025-10-10",
    contractType: "Freelance / Télétravail total",
    hash: "0xa7fbe01...de25c",
  },
  {
    id: 3,
    title: "Fullstack Web3 Developer",
    description:
      "Développement complet d’une application Web3 (Next.js + Solidity + Polygon). Vous devrez intégrer le wallet utilisateur, gérer les paiements $WORK via un escrow, et déployer le smart contract sur testnet.",
    budget: 1200,
    duration: "14 jours",
    status: "Ouverte",
    skills: ["Next.js", "Node.js", "Solidity", "Polygon", "Web3.js"],
    postedAt: "2025-10-13",
    contractType: "Freelance / Remote",
    hash: "0xbc91a12...34fc9",
  },
  {
    id: 4,
    title: "Community Manager Crypto",
    description:
      "Nous recherchons un Community Manager passionné de blockchain pour gérer la communication d’un projet DAO. Animation des réseaux, organisation d’AMA, et rédaction de posts Web3.",
    budget: 400,
    duration: "30 jours",
    status: "Fermée",
    skills: ["Marketing", "Twitter/X", "Discord", "DAO", "Copywriting"],
    postedAt: "2025-09-28",
    contractType: "Freelance / Part-time",
    hash: "0x5b2de89...1a7c3",
  },
  {
    id: 5,
    title: "Développeur Frontend React Web3",
    description:
      "Création d’un tableau de bord utilisateur connecté à MetaMask et affichage des soldes $WORK. Le développeur doit savoir utiliser wagmi + viem et gérer la communication avec un backend Node.js.",
    budget: 600,
    duration: "8 jours",
    status: "En attente",
    skills: ["React", "TypeScript", "wagmi", "viem", "Node.js"],
    postedAt: "2025-10-12",
    contractType: "Freelance / Full remote",
    hash: "0xdfb3c1a...9ef42",
  },
])

// 👥 Candidatures associées à chaque job
const applications = ref([
  {
    id: 1,
    jobId: 1,
    freelancer: "Lucas Bernard",
    avatar: avatar,
    proposal:
      "Je peux livrer un smart contract ERC-721 complet avec audit de sécurité sous 8 jours. J’ai travaillé sur plusieurs projets Polygon.",
    bid: 780,
    status: "En attente",
  },
  {
    id: 2,
    jobId: 1,
    freelancer: "Emma Laurent",
    avatar: avatar,
    proposal:
      "Audit complet du code Solidity et intégration front-end React. Disponible immédiatement.",
    bid: 800,
    status: "Acceptée",
  },
  {
    id: 3,
    jobId: 2,
    freelancer: "Noah Dupuis",
    avatar: avatar,
    proposal:
      "Spécialiste UI/UX pour dApps Web3. J’apporte une expérience utilisateur fluide et moderne, tout en respectant les standards Web3.",
    bid: 490,
    status: "Refusée",
  },
  {
    id: 4,
    jobId: 3,
    freelancer: "Clara Martin",
    avatar: avatar,
    proposal:
      "Développeuse fullstack passionnée, je peux gérer la partie front (Next.js) et les smart contracts (Solidity).",
    bid: 1150,
    status: "En attente",
  },
  {
    id: 5,
    jobId: 5,
    freelancer: "Alex Dubois",
    avatar: avatar,
    proposal:
      "Je maîtrise wagmi et viem. Je peux connecter MetaMask et afficher les transactions $WORK avec sécurité et performance.",
    bid: 580,
    status: "En attente",
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
