<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold mb-4 text-indigo-700">🏅 Mes badges NFT</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div v-for="nft in nfts" :key="nft.id" class="bg-white rounded-lg shadow p-4 text-center border">
        <img :src="nft.image" class="w-20 h-20 mx-auto mb-3" />
        <h3 class="text-indigo-600 font-semibold">{{ nft.name }}</h3>
        <p class="text-sm text-gray-500">{{ nft.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import nft from "../../assets/nft.webp"
import nft2 from "../../assets/nft2.jpg"
const nfts = [
  { id: 1, name: "Expert Solidity", description: "5 smart contracts validés", image: nft },
  { id: 2, name: "Full-Stack Web3", description: "Projets complets livrés", image: nft2 },
]
</script>
