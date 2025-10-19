<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold text-indigo-700 mb-6">💰 Paiements & Escrow</h2>

    <!-- Paiements en cours -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">🕒 Paiements en cours</h3>
      <div
        v-for="p in paymentsInProgress"
        :key="p.id"
        class="bg-white rounded-lg shadow p-5 mb-3 border-l-4 border-yellow-400"
      >
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-gray-800">{{ p.mission }}</p>
            <p class="text-sm text-gray-500">Freelance : {{ p.freelancer }}</p>
          </div>
          <p class="text-yellow-600 font-semibold">{{ p.amount }} $WORK</p>
        </div>
        <p class="text-xs text-gray-400 mt-2">Statut : En validation blockchain</p>
      </div>
    </div>

    <!-- Paiements terminés -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">✅ Paiements effectués</h3>
      <div
        v-for="p in paymentsCompleted"
        :key="p.id"
        class="bg-white rounded-lg shadow p-5 mb-3 border-l-4 border-green-400"
      >
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-gray-800">{{ p.mission }}</p>
            <p class="text-sm text-gray-500">Freelance : {{ p.freelancer }}</p>
          </div>
          <p class="text-green-600 font-semibold">{{ p.amount }} $WORK</p>
        </div>
        <p class="text-xs text-gray-400 mt-2">Effectué le {{ p.date }}</p>
      </div>
    </div>

    <!-- Paiements en attente -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">⏳ Paiements en attente</h3>
      <div
        v-for="p in paymentsPending"
        :key="p.id"
        class="bg-white rounded-lg shadow p-5 mb-3 border-l-4 border-indigo-400"
      >
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-gray-800">{{ p.mission }}</p>
            <p class="text-sm text-gray-500">Freelance : {{ p.freelancer }}</p>
          </div>
          <p class="text-indigo-600 font-semibold">{{ p.amount }} $WORK</p>
        </div>
        <p class="text-xs text-gray-400 mt-2">Créé le {{ p.date }}</p>
      </div>
    </div>

    <!-- Messages liés aux paiements -->
    <div>
      <h3 class="text-lg font-semibold text-gray-800 mb-3">💬 Historique de messages</h3>
      <div class="bg-white rounded-lg shadow divide-y">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="p-4 flex justify-between items-start hover:bg-gray-50 transition"
        >
          <div>
            <p class="text-sm text-gray-800"><b>{{ msg.from }}</b> : {{ msg.text }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ msg.date }}</p>
          </div>
          <span
            :class="{
              'text-green-600': msg.type === 'confirmation',
              'text-yellow-600': msg.type === 'alert',
              'text-red-600': msg.type === 'error'
            }"
            class="font-semibold text-xs uppercase"
          >
            {{ msg.type }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"

// ✅ Paiements effectués
const paymentsCompleted = ref([
  {
    id: 1,
    mission: "Développement Smart Contract ERC-20",
    freelancer: "Emma Laurent",
    amount: 350,
    date: "2025-10-10",
  },
  {
    id: 2,
    mission: "Design Interface DAO",
    freelancer: "Marc Cohen",
    amount: 220,
    date: "2025-10-11",
  },
])

// 🕒 Paiements en cours
const paymentsInProgress = ref([
  {
    id: 3,
    mission: "Audit de sécurité Web3",
    freelancer: "Sophie Martin",
    amount: 500,
    date: "2025-10-15",
  },
])

// ⏳ Paiements en attente
const paymentsPending = ref([
  {
    id: 4,
    mission: "Intégration Wallet et Dashboard",
    freelancer: "Noah Dupuis",
    amount: 280,
    date: "2025-10-16",
  },
  {
    id: 5,
    mission: "Création de la page d'accueil DApp",
    freelancer: "Alice Dubreuil",
    amount: 300,
    date: "2025-10-17",
  },
])

// 💬 Messages liés aux paiements
const messages = ref([
  {
    id: 1,
    from: "Emma Laurent",
    text: "Le paiement pour le contrat ERC-20 a bien été reçu ✅",
    date: "2025-10-11",
    type: "confirmation",
  },
  {
    id: 2,
    from: "Smart Escrow Bot",
    text: "Le paiement du projet 'Audit Web3' est en cours de validation on-chain.",
    date: "2025-10-15",
    type: "alert",
  },
  {
    id: 3,
    from: "Noah Dupuis",
    text: "Merci de confirmer le transfert pour 'Intégration Wallet'.",
    date: "2025-10-16",
    type: "alert",
  },
])
</script>
