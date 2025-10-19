<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold text-indigo-700 mb-6">💬 Messages</h2>

    <!-- Messages confirmés -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">✅ Messages confirmés</h3>
      <div
        v-for="msg in messagesGrouped.confirmed"
        :key="msg.id"
        class="bg-white rounded-lg shadow p-4 mb-3 border-l-4 border-green-500"
      >
        <p class="text-gray-800 text-sm"><b>{{ msg.from }}</b> : {{ msg.text }}</p>
        <p class="text-xs text-gray-400 mt-1">{{ msg.date }}</p>
      </div>
    </div>

    <!-- Messages en attente -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">⏳ Messages en attente</h3>
      <div
        v-for="msg in messagesGrouped.pending"
        :key="msg.id"
        class="bg-white rounded-lg shadow p-4 mb-3 border-l-4 border-yellow-500"
      >
        <p class="text-gray-800 text-sm"><b>{{ msg.from }}</b> : {{ msg.text }}</p>
        <p class="text-xs text-gray-400 mt-1">{{ msg.date }}</p>
      </div>
    </div>

    <!-- Messages en attente de retour -->
    <div>
      <h3 class="text-lg font-semibold text-gray-800 mb-3">💬 En attente de retour</h3>
      <div
        v-for="msg in messagesGrouped.awaitingResponse"
        :key="msg.id"
        class="bg-white rounded-lg shadow p-4 mb-3 border-l-4 border-indigo-500"
      >
        <p class="text-gray-800 text-sm"><b>{{ msg.from }}</b> : {{ msg.text }}</p>
        <p class="text-xs text-gray-400 mt-1">{{ msg.date }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"

const messagesGrouped = ref({
  confirmed: [
    {
      id: 1,
      from: "Smart Escrow Bot",
      text: "Le paiement de 350 $WORK à Emma Laurent a été confirmé ✅",
      date: "2025-10-11",
    },
  ],
  pending: [
    {
      id: 2,
      from: "System Web3",
      text: "Le paiement du projet 'Audit Web3' est en attente de validation on-chain.",
      date: "2025-10-15",
    },
  ],
  awaitingResponse: [
    {
      id: 3,
      from: "Noah Dupuis",
      text: "Merci de confirmer la réception du paiement pour 'Intégration Wallet'.",
      date: "2025-10-16",
    },
    {
      id: 4,
      from: "Alice Dubreuil",
      text: "En attente de confirmation de virement pour la mission 'DApp Accueil'.",
      date: "2025-10-17",
    },
  ],
})
</script>
