<template>
  <section class="p-6 transition-colors duration-500">
    <!-- ✅ Messages confirmés -->
    <div class="mb-8">
      <div
        v-for="msg in messagesGrouped.confirmed"
        :key="msg.id"
        class="rounded-lg shadow p-4 mb-3 border-l-4 transition"
        :class="darkMode
          ? 'bg-[#0a2431] border-l-green-400 border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white border-l-green-500'"
      >
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
    </div>

    <!-- ⏳ Messages en attente -->
    <div class="mb-8">
      <h3
        class="text-lg font-semibold mb-3"
        :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
      >
        ⏳ Messages en attente
      </h3>
      <div
        v-for="msg in messagesGrouped.pending"
        :key="msg.id"
        class="rounded-lg shadow p-4 mb-3 border-l-4 transition"
        :class="darkMode
          ? 'bg-[#0a2431] border-l-yellow-400 border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white border-l-yellow-500'"
      >
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
    </div>

    <!-- 💬 Messages en attente de retour -->
    <div>
      <h3
        class="text-lg font-semibold mb-3"
        :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
      >
        💬 En attente de retour
      </h3>
      <div
        v-for="msg in messagesGrouped.awaitingResponse"
        :key="msg.id"
        class="rounded-lg shadow p-4 mb-3 border-l-4 transition"
        :class="darkMode
          ? 'bg-[#0a2431] border-l-[#00BFFF] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white border-l-indigo-500'"
      >
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"

// ✅ On récupère le dark mode depuis EmployerDashboard
const darkMode = inject("darkMode", false)

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
