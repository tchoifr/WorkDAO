<template>
  <main class="min-h-screen bg-[#031d28] text-white">
    <!-- 🌐 HEADER -->
    <section
      class="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
    >
      <img
        :src="Reseaux"
        alt="WorkDAO Background"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div
        class="absolute inset-0 bg-gradient-to-b from-black/70 via-[#031d28]/80 to-[#0a2431]/90"
      ></div>

      <div class="relative z-10 px-6 max-w-5xl">
        <h1
          class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-[#38BDF8] drop-shadow-[0_0_10px_#38BDF8]"
        >
          🌍 DAO Social Hub
        </h1>

        <p class="text-lg md:text-2xl text-gray-200 mb-10 leading-relaxed">
          Retrouvez toutes les actualités WorkDAO sur Facebook, Instagram, X et Telegram.
        </p>

        <button
          @click="fetchAllPosts"
          class="px-8 py-3 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-lg transition shadow-[0_0_10px_#00BFFF]"
        >
          🔄 Actualiser les publications
        </button>
      </div>

      <div
        class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#031d28] to-transparent"
      ></div>
    </section>

    <!-- 🟦 FACEBOOK -->
    <SocialSection title="📘 Facebook" :posts="facebookPosts" :loading="loading" />

    <!-- 🟪 INSTAGRAM -->
    <SocialSection title="📸 Instagram" :posts="instagramPosts" :loading="loading" />

    <!-- 🖤 X (Twitter) -->
    <SocialSection title="🐦 X (Twitter)" :posts="xPosts" :loading="loading" />

    <!-- 💬 TELEGRAM -->
    <section class="py-16 px-6 md:px-12 max-w-6xl mx-auto">
      <h2
        class="text-3xl font-bold mb-8 text-[#38BDF8] drop-shadow-[0_0_8px_#38BDF8] text-center"
      >
        💬 Telegram — Communautés DAO dans le monde
      </h2>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-200">
        <div
          v-for="group in telegramGroups"
          :key="group.country"
          class="bg-[#0a2431] border border-[#00BFFF]/30 rounded-lg p-5 hover:border-[#00BFFF]/60 transition"
        >
          <h3 class="text-lg font-semibold mb-2 text-[#00BFFF]">
            {{ group.country }}
          </h3>
          <ul class="space-y-1 text-sm">
            <li v-for="link in group.links" :key="link">
              <a
                :href="link"
                target="_blank"
                class="text-[#38BDF8] hover:underline"
              >
                🔗 {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import Reseaux from "../assets/reseaux.jpg"
import dao from "../assets/dao.jpg"
import staking from "../assets/staking.jpg"
import nft from "../assets/nft.webp"
import connect from "../assets/connect.jpg"
import wallet from "../assets/wallet.jpg"
import logo from "../assets/logo.png"
import SocialSection from "../../src/components/SocialSection.vue"

interface SocialPost {
  id: string
  author: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  date: string
}

const loading = ref(true)
const facebookPosts = ref<SocialPost[]>([])
const instagramPosts = ref<SocialPost[]>([])
const xPosts = ref<SocialPost[]>([])

const telegramGroups = ref([
  { country: "🇫🇷 France", links: ["https://t.me/WorkDAO_France", "https://t.me/StakingDAO_FR", "https://t.me/NFTDAO_FR"] },
  { country: "🇺🇸 USA", links: ["https://t.me/WorkDAO_USA", "https://t.me/StakingDAO_USA", "https://t.me/NFTDAO_USA"] },
  { country: "🇨🇦 Canada", links: ["https://t.me/WorkDAO_CA", "https://t.me/StakingDAO_CA", "https://t.me/NFTDAO_CA"] },
  { country: "🇯🇵 Japon", links: ["https://t.me/WorkDAO_JP", "https://t.me/StakingDAO_JP", "https://t.me/NFTDAO_JP"] },
  { country: "🇧🇷 Brésil", links: ["https://t.me/WorkDAO_BR", "https://t.me/StakingDAO_BR", "https://t.me/NFTDAO_BR"] },
  { country: "🇩🇪 Allemagne", links: ["https://t.me/WorkDAO_DE", "https://t.me/StakingDAO_DE", "https://t.me/NFTDAO_DE"] },
])

const fetchAllPosts = async () => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 800))

  facebookPosts.value = [
    { id: "1", author: "WorkDAO", content: "🚀 Nouvelle fonctionnalité : création automatique de smart contracts !", image: dao, likes: 230, comments: 45, shares: 20, date: "2025-10-21" },
    { id: "2", author: "StakingDAO", content: "💎 Staking $WORK ouvert — soutenez la gouvernance du DAO.", image: staking, likes: 310, comments: 52, shares: 28, date: "2025-10-18" },
    { id: "3", author: "NFTDAO", content: "🖼️ Une nouvelle série de NFT utilitaires vient de sortir.", image: nft, likes: 180, comments: 19, shares: 12, date: "2025-10-14" },
    { id: "4", author: "WalletConnect", content: "🔗 Connectez votre wallet pour accéder au dashboard.", image: connect, likes: 205, comments: 26, shares: 15, date: "2025-10-12" },
    { id: "5", author: "DecentralWallet", content: "🌐 Vos actifs, votre contrôle. Découvrez notre wallet décentralisé.", image: wallet, likes: 150, comments: 15, shares: 9, date: "2025-10-09" },
    { id: "6", author: "WorkDAO Labs", content: "⚙️ WorkDAO Labs dévoile son nouveau programme d’incubation Web3.", image: logo, likes: 175, comments: 24, shares: 11, date: "2025-10-05" },
  ]

  instagramPosts.value = facebookPosts.value.map((p) => ({
    ...p,
    author: "WorkDAO IG",
    content: p.content.replace("🚀", "✨").replace("💎", "🔥"),
  }))

  xPosts.value = facebookPosts.value.map((p) => ({
    ...p,
    author: "WorkDAO X",
    content: p.content.replace("⚙️", "🧠").replace("🌐", "💫"),
  }))

  loading.value = false
}

onMounted(() => fetchAllPosts())
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}
</style>
