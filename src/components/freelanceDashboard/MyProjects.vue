<template>
  <section class="p-6 transition-colors duration-500">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        class="rounded-lg overflow-hidden border shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
        :class="
          darkMode
            ? 'bg-[#0a2431] border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
            : 'bg-white border-gray-200 hover:border-indigo-300'
        "
      >
        <img
          :src="project.image"
          alt="project"
          class="w-full h-40 object-contain bg-gray-50 dark:bg-[#09202c]"
        />
        <div class="p-5">
          <h3
            class="text-lg font-semibold mb-1"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
          >
            {{ project.title }}
          </h3>

          <p
            class="text-sm mb-3"
            :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ project.description }}
          </p>

          <div class="flex justify-between items-center">
            <span
              class="text-sm font-medium"
              :class="{
                'text-green-400': project.status === 'Completed' && darkMode,
                'text-green-600': project.status === 'Completed' && !darkMode,
                'text-yellow-400': project.status === 'Ongoing' && darkMode,
                'text-yellow-600': project.status === 'Ongoing' && !darkMode,
                'text-red-400': project.status === 'Pending' && darkMode,
                'text-red-600': project.status === 'Pending' && !darkMode,
              }"
            >
              {{ project.status }}
            </span>

            <span
              class="font-semibold text-sm"
              :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'"
            >
              {{ project.earnings }} $WORK
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject } from "vue"
import missionImg from "../../assets/mission.png"

const darkMode = inject("darkMode", false)

const projects = [
  {
    id: 1,
    title: "Smart Contract NFT Collection",
    description: "Development of a full ERC-721 contract on Polygon.",
    status: "Completed",
    earnings: 450,
    image: missionImg,
  },
  {
    id: 2,
    title: "Wallet Integration + Web3 Front",
    description: "MetaMask connection and display of user balances.",
    status: "Ongoing",
    earnings: 320,
    image: missionImg,
  },
  {
    id: 3,
    title: "DAO Interface + Governance",
    description: "Creation of a decentralized voting DApp.",
    status: "Pending",
    earnings: 280,
    image: missionImg,
  },
]
</script>
