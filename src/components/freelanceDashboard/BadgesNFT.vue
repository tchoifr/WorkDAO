<template>
  <section class="p-6 transition-colors duration-500">
    <div class="grid md:grid-cols-3 gap-6">
      <div
        v-for="nft in nfts"
        :key="nft.id"
        class="rounded-lg shadow-lg p-5 text-center border transition hover:shadow-xl"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white border-gray-200 hover:border-indigo-300'"
      >
        <img
          :src="nft.image"
          alt="Badge NFT"
          class="w-24 h-24 mx-auto mb-4 rounded-full border shadow-md transition-transform duration-300 hover:scale-105"
          :class="darkMode ? 'border-[#00BFFF]/40' : 'border-gray-300'"
        />
        <h3
          class="font-semibold text-lg"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'"
        >
          {{ nft.name }}
        </h3>
        <p
          class="text-sm mt-1"
          :class="darkMode ? 'text-gray-300' : 'text-gray-500'"
        >
          {{ nft.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject } from "vue"
import nft from "../../assets/nft.webp"
import nft2 from "../../assets/nft2.jpg"

// ✅ Récupération du dark mode depuis FreelanceDashboard
const darkMode = inject("darkMode", false)

const nfts = [
  {
    id: 1,
    name: "Expert Solidity",
    description: "5 smart contracts validés",
    image: nft,
  },
  {
    id: 2,
    name: "Full-Stack Web3",
    description: "Projets complets livrés",
    image: nft2,
  },
]
</script>

<style scoped>
/* Effet de glow subtil sur les badges NFT en mode dark */
.dark img:hover {
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
}
</style>
