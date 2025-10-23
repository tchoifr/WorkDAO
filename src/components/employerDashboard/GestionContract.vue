<template>
  <section class="p-6 transition-colors duration-500">
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <h2
        class="text-xl font-semibold"
        :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
      >
        📜 Contract Management
      </h2>

      <!-- 🔹 Bouton visible -->
      <button
        @click="toggleForm"
        class="flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition shadow-sm"
        :class="darkMode
          ? 'bg-[#00BFFF]/20 text-[#00BFFF] hover:bg-[#00BFFF]/30 border border-[#00BFFF]/40'
          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'"
      >
        ➕ New Contract
      </button>
    </div>

    <!-- ✅ LISTE DES CONTRATS -->
    <div v-if="!showForm" class="space-y-4">
      <div
        v-for="c in contracts"
        :key="c.id"
        class="rounded-lg shadow p-5 border-l-4 transition"
        :class="[
          darkMode
            ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
            : 'bg-white border-gray-200 hover:shadow-lg',
          c.status === 'Active'
            ? 'border-l-green-400'
            : c.status === 'Pending'
            ? 'border-l-yellow-400'
            : c.status === 'Dispute'
            ? 'border-l-red-400'
            : 'border-l-gray-400'
        ]"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3
              class="font-semibold text-lg"
              :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
            >
              {{ c.title }}
            </h3>
            <p
              class="text-sm mb-1"
              :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
            >
              Freelancer: <b>{{ c.freelancer }}</b>
            </p>
            <p
              class="text-sm"
              :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >
              {{ c.description }}
            </p>
          </div>

          <p
            class="font-semibold text-right"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'"
          >
            {{ c.amount }} $WORK
          </p>
        </div>

        <div class="flex justify-between mt-3 text-sm">
          <p :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
            Duration: {{ c.duration }}
          </p>
          <p
            :class="[
              'font-semibold',
              c.status === 'Active'
                ? darkMode
                  ? 'text-green-400'
                  : 'text-green-600'
                : c.status === 'Pending'
                ? darkMode
                  ? 'text-yellow-400'
                  : 'text-yellow-600'
                : c.status === 'Dispute'
                ? darkMode
                  ? 'text-red-400'
                  : 'text-red-600'
                : 'text-gray-400'
            ]"
          >
            {{ c.status }}
          </p>
        </div>
      </div>
    </div>

    <!-- 🧾 FORMULAIRE DE CRÉATION -->
    <transition name="fade">
      <FormCreationContract
        v-if="showForm"
        @cancel="toggleForm"
        @save="addContract"
      />
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"
import FormCreationContract from "./FormCreationContract.vue"

const darkMode = inject("darkMode", false)

// 🧩 Modèle de contrat
interface Contract {
  id: number
  title: string
  freelancer: string
  description: string
  duration: string
  hours: number
  amount: number
  missions: string[]
  status: "Active" | "Pending" | "Completed" | "Dispute"
}

// 🧱 Données
const contracts = ref<Contract[]>([
  {
    id: 1,
    title: "Smart Contract Audit",
    freelancer: "Emma Laurent",
    description: "Audit of ERC-721 contract for NFT marketplace.",
    duration: "2 weeks",
    hours: 40,
    amount: 500,
    missions: ["Review contract", "Check gas efficiency", "Deliver report"],
    status: "Active",
  },
])

// 🔁 Formulaire visible ou non
const showForm = ref(false)
const toggleForm = () => (showForm.value = !showForm.value)

// ✅ Ajout d’un contrat
const addContract = (newContract: Contract) => {
  contracts.value.push(newContract)
  showForm.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
