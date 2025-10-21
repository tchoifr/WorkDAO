<template>
  <section class="p-6 transition-colors duration-500">
       <!-- 🕒 Paiements en cours -->
    <div class="mb-8">
      <h3
        class="text-lg font-semibold mb-3"
        :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
      >
        🕒 Paiements en cours
      </h3>

      <div
        v-for="p in paymentsInProgress"
        :key="p.id"
        class="rounded-lg shadow p-5 mb-3 border-l-4 transition"
        :class="darkMode
          ? 'bg-[#0a2431] border-l-yellow-400 border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white border-l-yellow-400 hover:shadow-lg'"
      >
        <div class="flex justify-between items-center">
          <div>
            <p
              class="font-medium"
              :class="darkMode ? 'text-gray-100' : 'text-gray-800'"
            >
              {{ p.mission }}
            </p>
            <p
              class="text-sm"
              :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >
              Freelance : {{ p.freelancer }}
            </p>
          </div>
          <p
            class="font-semibold"
            :class="darkMode ? 'text-yellow-300' : 'text-yellow-600'"
          >
            {{ p.amount }} $WORK
          </p>
        </div>
        <p
          class="text-xs mt-2"
          :class="darkMode ? 'text-gray-400' : 'text-gray-400'"
        >
          Statut : En validation blockchain
        </p>
      </div>
    </div>

    <!-- ✅ Paiements effectués -->
    <div class="mb-8">
      <h3
        class="text-lg font-semibold mb-3"
        :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
      >
        ✅ Paiements effectués
      </h3>

      <div
        v-for="p in paymentsCompleted"
        :key="p.id"
        class="rounded-lg shadow p-5 mb-3 border-l-4 transition"
        :class="darkMode
          ? 'bg-[#0a2431] border-l-green-400 border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white border-l-green-400 hover:shadow-lg'"
      >
        <div class="flex justify-between items-center">
          <div>
            <p
              class="font-medium"
              :class="darkMode ? 'text-gray-100' : 'text-gray-800'"
            >
              {{ p.mission }}
            </p>
            <p
              class="text-sm"
              :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >
              Freelance : {{ p.freelancer }}
            </p>
          </div>
          <p
            class="font-semibold"
            :class="darkMode ? 'text-green-300' : 'text-green-600'"
          >
            {{ p.amount }} $WORK
          </p>
        </div>
        <p
          class="text-xs mt-2"
          :class="darkMode ? 'text-gray-400' : 'text-gray-400'"
        >
          Effectué le {{ p.date }}
        </p>
      </div>
    </div>

    <!-- ⏳ Paiements en attente -->
    <div class="mb-8">
      <h3
        class="text-lg font-semibold mb-3"
        :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
      >
        ⏳ Paiements en attente
      </h3>

      <div
        v-for="p in paymentsPending"
        :key="p.id"
        class="rounded-lg shadow p-5 mb-3 border-l-4 transition"
        :class="darkMode
          ? 'bg-[#0a2431] border-l-[#00BFFF] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white border-l-indigo-400 hover:shadow-lg'"
      >
        <div class="flex justify-between items-center">
          <div>
            <p
              class="font-medium"
              :class="darkMode ? 'text-gray-100' : 'text-gray-800'"
            >
              {{ p.mission }}
            </p>
            <p
              class="text-sm"
              :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >
              Freelance : {{ p.freelancer }}
            </p>
          </div>
          <p
            class="font-semibold"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'"
          >
            {{ p.amount }} $WORK
          </p>
        </div>
        <p
          class="text-xs mt-2"
          :class="darkMode ? 'text-gray-400' : 'text-gray-400'"
        >
          Créé le {{ p.date }}
        </p>
      </div>
    </div>

    <!-- 💬 Historique des messages -->
    <div>
      <h3
        class="text-lg font-semibold mb-3"
        :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
      >
        💬 Historique de messages
      </h3>

      <div
        class="rounded-lg shadow divide-y transition"
        :class="darkMode
          ? 'bg-[#0a2431] divide-gray-700 border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white divide-gray-200'"
      >
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="p-4 flex justify-between items-start transition"
          :class="darkMode ? 'hover:bg-[#0d2f42]' : 'hover:bg-gray-50'"
        >
          <div>
            <p
              class="text-sm"
              :class="darkMode ? 'text-gray-100' : 'text-gray-800'"
            >
              <b>{{ msg.from }}</b> : {{ msg.text }}
            </p>
            <p
              class="text-xs mt-1"
              :class="darkMode ? 'text-gray-400' : 'text-gray-400'"
            >
              {{ msg.date }}
            </p>
          </div>
          <span
            class="font-semibold text-xs uppercase"
            :class="{
              'text-green-400': darkMode && msg.type === 'confirmation',
              'text-yellow-300': darkMode && msg.type === 'alert',
              'text-red-400': darkMode && msg.type === 'error',
              'text-green-600': !darkMode && msg.type === 'confirmation',
              'text-yellow-600': !darkMode && msg.type === 'alert',
              'text-red-600': !darkMode && msg.type === 'error'
            }"
          >
            {{ msg.type }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"

// ✅ Récupère le darkMode depuis EmployerDashboard.vue
const darkMode = inject("darkMode", false)

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
