<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold mb-4 text-indigo-700">💼 Mes projets</h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-white shadow-lg rounded-lg overflow-hidden border hover:shadow-xl transition"
      >
        <img
          :src="project.image"
          alt="project"
          class="w-full h-40 object-contain"
        />
        <div class="p-5">
          <h3 class="text-lg font-semibold text-gray-800 mb-1">
            {{ project.title }}
          </h3>
          <p class="text-gray-600 text-sm mb-3">
            {{ project.description }}
          </p>
          <div class="flex justify-between items-center">
            <span
              class="text-sm font-medium"
              :class="{
                'text-green-600': project.status === 'Terminé',
                'text-yellow-600': project.status === 'En cours',
                'text-red-600': project.status === 'En attente',
              }"
              >{{ project.status }}</span
            >
            <span class="text-indigo-600 font-semibold text-sm"
              >{{ project.earnings }} $WORK</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import missionImg from "../../assets/mission.png"
const projects = [
  {
    id: 1,
    title: "Smart Contract NFT Collection",
    description: "Développement d’un contrat ERC-721 complet sur Polygon.",
    status: "Terminé",
    earnings: 450,
    image: missionImg,
  },
  {
    id: 2,
    title: "Intégration Wallet + Front Web3",
    description: "Connexion MetaMask et affichage des soldes utilisateur.",
    status: "En cours",
    earnings: 320,
    image: missionImg,
  },
  {
    id: 3,
    title: "Interface DAO + Gouvernance",
    description: "Création d’une DApp de vote décentralisé.",
    status: "En attente",
    earnings: 280,
    image: missionImg,
  },
]
</script>
