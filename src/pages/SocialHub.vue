<template>
  <main class="min-h-screen bg-[var(--color-bg)] text-white fade-in">
    <!-- 🌐 HEADER -->
    <section
      class="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
    >
      <!-- Image de fond -->
      <img
        :src="Reseaux"
        alt="WorkDAO Background"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />

      <!-- Overlay global -->
      <div class="absolute inset-0 hero-overlay"></div>

      <!-- Contenu principal -->
      <div class="relative z-10 px-6 max-w-5xl">
        <h1>🌍 DAO Social Hub</h1>

        <p class="text-lg md:text-2xl text-[var(--color-text-dim)] mb-10 leading-relaxed">
          Retrouvez toutes les actualités WorkDAO sur Facebook, Instagram, X et Telegram.
        </p>

        <button
          @click="fetchAllPosts"
          class="btn-primary"
        >
          🔄 Actualiser les publications
        </button>
      </div>

      <!-- Dégradé bas -->
      <div
        class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-bg)] to-transparent"
      ></div>
    </section>

    <!--  Reseaux -->
    <SocialSection title="📰 Nos publications" :posts="facebookPosts" :loading="loading" />

 
    <!-- 💬 TELEGRAM -->
    <section class="py-16 px-6 md:px-12 max-w-6xl mx-auto text-center">
      <h2>💬 Telegram — Communautés DAO dans le monde</h2>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-[var(--color-text-dim)] mt-10">
        <div
          v-for="group in telegramGroups"
          :key="group.country"
          class="card-glow p-6 transition hover:shadow-[var(--glow-secondary)]"
        >
          <h3 class="text-lg font-semibold mb-2 text-[var(--color-secondary)]">
            {{ group.country }}
          </h3>

          <ul class="space-y-1 text-sm">
            <li v-for="link in group.links" :key="link">
              <a
                :href="link"
                target="_blank"
                class="text-[var(--color-primary)] hover:underline"
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
import nft from "../assets/nft.jpg"
import connect from "../assets/connect.jpg"
import wallet from "../assets/postes/wallet.jpg"
import logo from "../assets/logo.png"
import SocialSection from "../../src/components/SocialSection.vue"

import decentralise from "../assets/postes/decentraliser.jpg";
import blockchain from "../assets/postes/blockchain.jpg";
import recompensant from "../assets/postes/recompenses.jpg";
import gouvernance from "../assets/postes/gouvernance.jpg";
import intermediaires from "../assets/postes/intermediaires.jpg";
import identite from "../assets/postes/identite.jpg";
import marche from "../assets/postes/marche.jpg";
import liberte from "../assets/postes/liberty.jpg";
import securite from "../assets/postes/security.jpg"
import communaute from "../assets/postes/communaute.jpg";

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
  // --- NOUVEAUX POSTS (ordre inversé) ---
  { id: "16", author: "WorkDAO", content: "🔥 WorkDAO, c’est plus qu’une plateforme : c’est une révolution. Ensemble, nous reprenons le contrôle du travail et des règles du jeu.", image: communaute, likes: 420, comments: 65, shares: 38, date: "2025-10-26" },
  { id: "15", author: "CyberSecure Labs", content: "🔒 Vos paiements et contrats sont garantis par des smart contracts vérifiables. La sécurité maximale n’est pas un luxe, c’est la base.", image: securite, likes: 310, comments: 43, shares: 25, date: "2025-10-25" },
  { id: "14", author: "Freedom Network", content: "🕊️ Fini les restrictions. Votre réputation blockchain devient votre carte d’identité professionnelle — la liberté totale enfin réelle.", image: liberte, likes: 355, comments: 50, shares: 30, date: "2025-10-24" },
  { id: "13", author: "GlobalMarket DAO", content: "💼 Un marché global où les talents du monde entier collaborent sans barrières bancaires ni frontières. Bienvenue dans le travail sans limites.", image: marche, likes: 265, comments: 34, shares: 19, date: "2025-10-23" },
  { id: "12", author: "IDNFT Labs", content: "🧠 Votre identité numérique vous appartient. Grâce aux NFTs d’identité, vos compétences et réalisations ne dépendent d’aucune plateforme.", image: identite, likes: 295, comments: 44, shares: 21, date: "2025-10-22" },
  { id: "11", author: "FreeLancers DAO", content: "🚫 Plus d’intermédiaires, plus de commissions injustes. Vous gardez 100% de vos gains. Le travail libre, c’est maintenant.", image: intermediaires, likes: 340, comments: 59, shares: 32, date: "2025-10-21" },
  { id: "10", author: "Community Council", content: "⚖️ La gouvernance DAO, c’est le pouvoir au peuple. Chaque vote compte pour décider du futur de WorkDAO.", image: gouvernance, likes: 310, comments: 48, shares: 26, date: "2025-10-20" },
  { id: "9", author: "WorkDAO", content: "🪙 Vos contributions, vos récompenses. Chaque action dans l’écosystème est gratifiée par des tokens $WORK. Engagez-vous, gagnez, influencez.", image: recompensant, likes: 280, comments: 39, shares: 24, date: "2025-10-19" },
  { id: "8", author: "ChainTrust", content: "💰 Chaque contrat et chaque transaction sont inscrits sur la blockchain. La transparence devient la norme, pas l’exception.", image: blockchain, likes: 320, comments: 47, shares: 20, date: "2025-10-18" },
  { id: "7", author: "WorkDAO", content: "🌐 Aucun gouvernement, aucune entreprise centrale : la communauté fixe ses propres règles. Le futur est décentralisé.", image: decentralise, likes: 250, comments: 40, shares: 28, date: "2025-10-17" },

  // --- TES ANCIENS POSTS (avec ajustements et ordre inversé) ---
  { id: "6", author: "WorkDAO Labs", content: "⚙️ WorkDAO Labs lance un nouveau programme d’incubation Web3 pour soutenir les créateurs et les développeurs de demain.", image: logo, likes: 175, comments: 24, shares: 11, date: "2025-10-16" },
  { id: "5", author: "DecentralWallet", content: "🌐 Prenez le contrôle de vos actifs numériques avec notre wallet décentralisé. Votre argent, vos règles.", image: wallet, likes: 150, comments: 15, shares: 9, date: "2025-10-09" },
  { id: "4", author: "WalletConnect", content: "🔗 Connectez facilement votre wallet et explorez votre tableau de bord WorkDAO en toute sécurité.", image: connect, likes: 205, comments: 26, shares: 15, date: "2025-10-12" },
  { id: "3", author: "NFTDAO", content: "🖼️ Nouvelle collection de NFTs utilitaires disponible ! Débloquez des avantages uniques au sein de la DAO.", image: nft, likes: 180, comments: 19, shares: 12, date: "2025-10-14" },
  { id: "2", author: "StakingDAO", content: "💎 Le staking $WORK est maintenant ouvert. Soutenez la gouvernance et gagnez des récompenses exclusives.", image: staking, likes: 310, comments: 52, shares: 28, date: "2025-10-18" },
  { id: "1", author: "WorkDAO", content: "🚀 Lancement de la création automatique de smart contracts ! Une avancée majeure pour la communauté.", image: dao, likes: 230, comments: 45, shares: 20, date: "2025-10-21" },
];


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
