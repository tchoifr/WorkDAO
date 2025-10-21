<template>
  <div class="p-6 space-y-10 transition-colors duration-500">
    <!-- STATS -->
    <section class="grid md:grid-cols-3 gap-6">
      <div
        class="p-5 border-t-4 border-indigo-500 rounded-lg shadow-lg transition"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white'"
      >
        <h3 :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-500'">Active Missions</h3>
        <p :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'" class="text-3xl font-bold">
          {{ missions.length }}
        </p>
        <p :class="darkMode ? 'text-gray-300' : 'text-gray-400'" class="text-sm mt-1">
          Ongoing or pending
        </p>
      </div>

      <div
        class="p-5 border-t-4 border-green-500 rounded-lg shadow-lg transition"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white'"
      >
        <h3 :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-500'">Total Earned</h3>
        <p :class="darkMode ? 'text-green-400' : 'text-green-600'" class="text-3xl font-bold">
          {{ totalWork.toFixed(2) }} $WORK
        </p>
        <p :class="darkMode ? 'text-gray-300' : 'text-gray-400'" class="text-sm mt-1">
          Last 30 days
        </p>
      </div>

      <div
        class="p-5 border-t-4 border-yellow-500 rounded-lg shadow-lg transition"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white'"
      >
        <h3 :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-500'">NFTs Earned</h3>
        <p :class="darkMode ? 'text-yellow-400' : 'text-yellow-600'" class="text-3xl font-bold">
          {{ nfts.length }}
        </p>
        <p :class="darkMode ? 'text-gray-300' : 'text-gray-400'" class="text-sm mt-1">
          Skills validated
        </p>
      </div>
    </section>

    <!-- MISSIONS & PAYMENTS -->
    <section class="grid md:grid-cols-2 gap-6">
      <div
        class="p-6 border-t-4 border-indigo-500 rounded-lg shadow-lg transition"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white'"
      >
        <h2 :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'" class="text-xl font-semibold mb-4">
          📋 Latest Missions
        </h2>
        <ul :class="darkMode ? 'divide-gray-700' : 'divide-gray-200'" class="divide-y">
          <li v-for="mission in missions" :key="mission.id" class="py-3 flex justify-between">
            <div>
              <p :class="darkMode ? 'text-gray-100' : 'text-gray-800'" class="font-medium">
                {{ mission.title }}
              </p>
              <p :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-sm">
                {{ mission.price }} $WORK
              </p>
            </div>
            <span
              :class="mission.status === 'Terminé' ? 'text-green-400' : 'text-yellow-400'"
              class="font-semibold text-sm"
            >
              {{ mission.status }}
            </span>
          </li>
        </ul>
      </div>

      <div
        class="p-6 border-t-4 border-indigo-500 rounded-lg shadow-lg transition"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white'"
      >
        <h2 :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'" class="text-xl font-semibold mb-4">
          💰 Recent Payments
        </h2>
        <ul :class="darkMode ? 'divide-gray-700' : 'divide-gray-200'" class="divide-y">
          <li v-for="p in payments" :key="p.id" class="py-3 flex justify-between">
            <div>
              <p :class="darkMode ? 'text-gray-100' : 'text-gray-800'" class="font-medium">
                {{ p.mission }}
              </p>
              <p :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-sm">{{ p.date }}</p>
            </div>
            <span
              :class="p.status === 'Terminé' ? 'text-green-400' : 'text-yellow-400'"
              class="font-semibold"
            >
              {{ p.amount }} $WORK
            </span>
          </li>
        </ul>
      </div>
    </section>

    <!-- MESSAGES & NFT -->
    <section class="grid md:grid-cols-2 gap-6">
      <div
        class="p-6 border-t-4 border-indigo-500 rounded-lg shadow-lg transition"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white'"
      >
        <h2 :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'" class="text-xl font-semibold mb-4">
          💬 Latest Messages
        </h2>
        <ul :class="darkMode ? 'divide-gray-700' : 'divide-gray-200'" class="divide-y">
          <li v-for="msg in messages" :key="msg.id" class="py-3">
            <p :class="darkMode ? 'text-gray-100' : 'text-gray-800'" class="font-medium">
              {{ msg.from }}
            </p>
            <p :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-sm">
              {{ msg.text }}
            </p>
          </li>
        </ul>
      </div>

      <div
        class="p-6 border-t-4 border-indigo-500 rounded-lg shadow-lg transition"
        :class="darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white'"
      >
        <h2 :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'" class="text-xl font-semibold mb-4">
          🏅 Latest NFTs
        </h2>
        <div class="flex space-x-4">
          <div
            v-for="nft in nfts"
            :key="nft.id"
            :class="darkMode ? 'bg-[#09202c]' : 'bg-indigo-50'"
            class="flex flex-col items-center rounded-lg p-4 w-28 shadow-sm transition"
          >
            <img :src="nft.image" alt="NFT" class="w-12 h-12 mb-2" />
            <p :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'" class="text-sm font-medium text-center">
              {{ nft.name }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue"

const darkMode = inject("darkMode", false)
const props = defineProps<{ missions: any[]; payments: any[]; messages: any[]; nfts: any[] }>()
const totalWork = computed(() => props.payments.reduce((acc, p) => acc + p.amount, 0))
</script>
