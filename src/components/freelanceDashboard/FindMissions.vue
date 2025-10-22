<template>
  <section class="p-6 transition-colors duration-500">
    <!-- 🔎 Barre de recherche + filtres -->
    <div class="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <!-- Barre de recherche -->
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher un métier, une mission ou un domaine..."
        class="w-full md:w-2/3 px-4 py-3 rounded-full text-center text-base font-medium transition focus:outline-none shadow-md"
        :class="darkMode
          ? 'bg-[#031d28] text-white border border-[#00BFFF]/40 focus:border-[#00BFFF] placeholder-gray-400'
          : 'bg-white text-gray-800 border border-gray-300 focus:border-indigo-500 placeholder-gray-500'"
      />

      <!-- Sélecteur de catégorie -->
      <select
        v-model="selectedCategory"
        class="w-full md:w-1/3 px-4 py-3 rounded-full text-base font-medium transition focus:outline-none shadow-md"
        :class="darkMode
          ? 'bg-[#031d28] text-white border border-[#00BFFF]/40 focus:border-[#00BFFF]'
          : 'bg-white text-gray-800 border border-gray-300 focus:border-indigo-500'"
      >
        <option value="">Toutes les catégories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <!-- 🔹 Liste filtrée -->
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
      <div
        v-for="mission in filteredMissions"
        :key="mission.id"
        class="rounded-lg shadow-lg hover:shadow-xl border transition transform hover:-translate-y-1"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white border-gray-200 hover:border-indigo-300'"
      >
        <img
          :src="mission.image"
          alt="Mission"
          class="w-full h-40 object-cover rounded-t-lg"
        />

        <div class="p-5">
          <h3
            class="font-semibold text-lg mb-2"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
          >
            {{ mission.title }}
          </h3>

          <p
            class="text-sm mb-3"
            :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ mission.description }}
          </p>

          <div class="flex justify-between items-center text-sm mb-2">
            <span
              class="px-2 py-1 rounded-full"
              :class="darkMode ? 'bg-[#00BFFF]/20 text-[#00BFFF]' : 'bg-indigo-100 text-indigo-600'"
            >
              {{ mission.category }}
            </span>
            <span
              :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
            >
              {{ mission.status }}
            </span>
          </div>

          <div class="flex justify-between items-center">
            <span
              class="font-semibold"
              :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'"
            >
              {{ mission.price }} $WORK
            </span>

            <button
              class="px-3 py-1 rounded transition font-medium"
              :class="darkMode
                ? 'bg-[#00BFFF]/20 text-[#00BFFF] hover:bg-[#00BFFF]/30'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'"
            >
              Postuler
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔻 Aucun résultat -->
    <div
      v-if="filteredMissions.length === 0"
      class="text-center text-gray-400 mt-10 text-lg"
    >
      Aucun résultat pour "<span class="text-[#00BFFF]">{{ searchTerm }}</span>"
      dans <span class="text-[#00BFFF]">{{ selectedCategory || 'toutes les catégories' }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue"
import crypto from "../../assets/crypto.webp"

const darkMode = inject("darkMode", false)
const searchTerm = ref("")
const selectedCategory = ref("")

// ✅ Toutes les catégories disponibles
const categories = [
  "Développement",
  "Design",
  "Communication",
  "Juridique",
  "Traduction",
  "Support"
]

// ✅ Liste complète de métiers internationaux WorkDAO
const missions = ref([
  // --- DÉVELOPPEMENT & BLOCKCHAIN ---
  { id: 1, title: "Développeur Solidity", description: "Création de smart contracts ERC-20 / ERC-721 / DAO.", category: "Développement", price: 600, status: "Disponible", image: crypto },
  { id: 2, title: "Développeur Full Stack Web3", description: "DApp intégrée (Vue + Solidity + Wallet).", category: "Développement", price: 850, status: "Disponible", image: crypto },
  { id: 3, title: "Auditeur Smart Contracts", description: "Analyse de sécurité et optimisation du code on-chain.", category: "Développement", price: 750, status: "Disponible", image: crypto },
  { id: 4, title: "Intégrateur Wallet", description: "Connexion MetaMask, WalletConnect et Coinbase.", category: "Développement", price: 300, status: "Disponible", image: crypto },
  { id: 5, title: "DevOps Blockchain", description: "Déploiement de nœuds et CI/CD Web3.", category: "Développement", price: 500, status: "Disponible", image: crypto },

  // --- DESIGN & CRÉATION ---
  { id: 6, title: "UI/UX Designer Web3", description: "Interfaces DAO futuristes et dashboards DeFi.", category: "Design", price: 400, status: "Disponible", image: crypto },
  { id: 7, title: "Illustrateur NFT", description: "Création de collections NFT et visuels on-chain.", category: "Design", price: 500, status: "Disponible", image: crypto },
  { id: 8, title: "Graphiste Motion 3D", description: "Animations holographiques pour univers Web3.", category: "Design", price: 550, status: "Disponible", image: crypto },
  { id: 9, title: "Brand Designer", description: "Création d'identité visuelle DAO et charte Work.", category: "Design", price: 350, status: "Disponible", image: crypto },

  // --- COMMUNICATION & MARKETING ---
  { id: 10, title: "Community Manager", description: "Gestion Discord, X et Telegram DAO.", category: "Communication", price: 250, status: "Disponible", image: crypto },
  { id: 11, title: "Rédacteur Technique Web3", description: "Articles éducatifs sur la blockchain.", category: "Communication", price: 300, status: "Disponible", image: crypto },
  { id: 12, title: "Spécialiste SEO Web3", description: "Optimisation pour moteurs décentralisés.", category: "Communication", price: 400, status: "Disponible", image: crypto },
  { id: 13, title: "Growth Hacker Crypto", description: "Acquisition et campagnes virales DAO.", category: "Communication", price: 500, status: "Disponible", image: crypto },

  // --- JURIDIQUE & GOUVERNANCE ---
  { id: 14, title: "Consultant DAO", description: "Création de modèles de gouvernance décentralisée.", category: "Juridique", price: 650, status: "Disponible", image: crypto },
  { id: 15, title: "Juriste Crypto", description: "Conformité KYC/AML et fiscalité Web3.", category: "Juridique", price: 800, status: "Disponible", image: crypto },
  { id: 16, title: "Arbitre Décentralisé", description: "Résolution de litiges on-chain DAO.", category: "Juridique", price: 300, status: "Disponible", image: crypto },
  { id: 17, title: "Analyste de Trésorerie DAO", description: "Suivi et audit des fonds on-chain.", category: "Juridique", price: 400, status: "Disponible", image: crypto },

  // --- TRADUCTION & SUPPORT ---
  { id: 18, title: "Traducteur Technique", description: "Traduction EN–FR des documents DAO.", category: "Traduction", price: 180, status: "Disponible", image: crypto },
  { id: 19, title: "Support DAO Multilingue", description: "Assistance utilisateurs WorkDAO.", category: "Support", price: 150, status: "Disponible", image: crypto },
  { id: 20, title: "Rédacteur de Documentation", description: "Guides utilisateurs et docs techniques.", category: "Support", price: 250, status: "Disponible", image: crypto },
])

// ✅ Filtrage combiné recherche + catégorie
const filteredMissions = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  const cat = selectedCategory.value

  return missions.value.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(term) || m.description.toLowerCase().includes(term)
    const matchesCategory = !cat || m.category === cat
    return matchesSearch && matchesCategory
  })
})
</script>
