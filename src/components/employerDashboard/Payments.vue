<template>
  <section class="p-6 transition-colors duration-500 space-y-10">
    <!-- 🕒 Paiements en cours -->
    <div>
      <h3
        class="text-lg font-semibold mb-4"
        :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
      >
        🕒 Paiements en cours
      </h3>

      <div
        v-for="p in paymentsInProgress"
        :key="p.id"
        class="rounded-lg shadow p-5 mb-4 border-l-4 transition"
        :class="darkMode
          ? 'bg-[#0a2431] border-l-yellow-400 border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white border-l-yellow-400 hover:shadow-lg'"
      >
        <div class="flex justify-between items-center mb-2">
          <div>
            <p class="font-medium" :class="darkMode ? 'text-gray-100' : 'text-gray-800'">
              {{ p.mission }}
            </p>
            <p class="text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
              Freelance : {{ p.freelancer }}
            </p>
          </div>
          <p class="font-semibold" :class="darkMode ? 'text-yellow-300' : 'text-yellow-600'">
            {{ p.amount }} $WORK
          </p>
        </div>

        <p class="text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-400'">
          💰 Date de paiement prévue : <b>{{ p.paymentDate }}</b>
        </p>

        <div class="flex gap-2 mt-3">
          <button
            v-if="isPaymentDue(p.paymentDate)"
            @click="validatePayment(p.id)"
            class="px-4 py-1 text-sm rounded font-semibold transition"
            :class="darkMode
              ? 'bg-green-500 hover:bg-green-400 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'"
          >
            ✅ Valider le paiement
          </button>

          <button
            v-if="isPaymentDue(p.paymentDate)"
            @click="refusePayment(p.id)"
            class="px-4 py-1 text-sm rounded font-semibold transition"
            :class="darkMode
              ? 'bg-red-500 hover:bg-red-400 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'"
          >
            ❌ Refuser (Litige)
          </button>

          <p
            v-else
            class="text-xs italic"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
          >
            ⏳ En attente de la date de paiement
          </p>
        </div>
      </div>
    </div>

    <!-- ✅ Paiements effectués -->
    <div>
      <h3
        class="text-lg font-semibold mb-4"
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
            <p class="font-medium" :class="darkMode ? 'text-gray-100' : 'text-gray-800'">
              {{ p.mission }}
            </p>
            <p class="text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
              Freelance : {{ p.freelancer }}
            </p>
          </div>
          <p class="font-semibold" :class="darkMode ? 'text-green-300' : 'text-green-600'">
            {{ p.amount }} $WORK
          </p>
        </div>
        <p class="text-xs mt-2" :class="darkMode ? 'text-gray-400' : 'text-gray-400'">
          Effectué le {{ p.date }}
        </p>
      </div>
    </div>

    <!-- ⚠️ Litiges -->
    <div v-if="disputes.length">
      <h3
        class="text-lg font-semibold mb-4"
        :class="darkMode ? 'text-[#FF6B6B]' : 'text-red-700'"
      >
        ⚠️ Litiges en cours
      </h3>

      <div
        v-for="d in disputes"
        :key="d.id"
        class="rounded-lg shadow p-5 mb-3 border-l-4 transition"
        :class="darkMode
          ? 'bg-[#2a0a0a] border-l-red-400 border border-[#ff6b6b]/40'
          : 'bg-red-50 border-l-red-400'"
      >
        <p class="font-medium" :class="darkMode ? 'text-red-300' : 'text-red-700'">
          {{ d.mission }}
        </p>
        <p class="text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-600'">
          Freelance : {{ d.freelancer }}
        </p>
        <p class="text-xs mt-2" :class="darkMode ? 'text-gray-500' : 'text-gray-500'">
          💬 Statut : Mission refusée — en attente de médiation.
        </p>
      </div>
    </div>

    <!-- 💬 Historique des messages -->
    <div>
      <h3
        class="text-lg font-semibold mb-3"
        :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
      >
        💬 Historique des messages
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
            <p class="text-sm" :class="darkMode ? 'text-gray-100' : 'text-gray-800'">
              <b>{{ msg.from }}</b> : {{ msg.text }}
            </p>
            <p class="text-xs mt-1" :class="darkMode ? 'text-gray-400' : 'text-gray-400'">
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

const darkMode = inject<boolean>("darkMode", false)

// --- Types ---
interface Payment {
  id: number
  mission: string
  freelancer: string
  amount: number
  paymentDate?: string // pour paiements en cours
  date?: string // pour paiements effectués
}

interface Message {
  id: number
  from: string
  text: string
  date: string
  type: "confirmation" | "alert" | "error"
}

// --- Données principales ---
const paymentsCompleted = ref<Payment[]>([
  {
    id: 1,
    mission: "Développement Smart Contract ERC-20",
    freelancer: "Emma Laurent",
    amount: 350,
    date: "2025-10-10",
  },
])

const paymentsInProgress = ref<Payment[]>([
  {
    id: 2,
    mission: "Audit de sécurité Web3",
    freelancer: "Sophie Martin",
    amount: 500,
    paymentDate: "2025-10-25",
  },
])

const disputes = ref<Payment[]>([])

const messages = ref<Message[]>([
  {
    id: 1,
    from: "Emma Laurent",
    text: "Le paiement ERC-20 a bien été reçu ✅",
    date: "2025-10-11",
    type: "confirmation",
  },
])

// --- Fonctions ---
const isPaymentDue = (date?: string): boolean => {
  if (!date) return false
  const today = new Date().toISOString().split("T")[0]
  return date <= today
}

const validatePayment = (id: number): void => {
  const p = paymentsInProgress.value.find((x) => x.id === id)
  if (!p) return

  paymentsCompleted.value.push({
    ...p,
    date: new Date().toISOString().split("T")[0],
  })
  paymentsInProgress.value = paymentsInProgress.value.filter((x) => x.id !== id)

  messages.value.unshift({
    id: Date.now(),
    from: "Système WorkDAO",
    text: `Le paiement pour '${p.mission}' a été validé.`,
    date: new Date().toLocaleDateString("fr-FR"),
    type: "confirmation",
  })
}

const refusePayment = (id: number): void => {
  const p = paymentsInProgress.value.find((x) => x.id === id)
  if (!p) return

  disputes.value.push({ ...p })
  paymentsInProgress.value = paymentsInProgress.value.filter((x) => x.id !== id)

  messages.value.unshift({
    id: Date.now(),
    from: "Système WorkDAO",
    text: `Litige ouvert pour '${p.mission}' — paiement refusé.`,
    date: new Date().toLocaleDateString("fr-FR"),
    type: "error",
  })
}
</script>
