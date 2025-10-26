<template>
  <section class="p-6 transition-colors duration-500">
    <h2
      class="text-xl font-semibold mb-6"
      :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
    >
      ⚙️ Paramètres du compte
    </h2>

    <div
      class="rounded-lg shadow p-6 space-y-6 transition"
      :class="darkMode
        ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
        : 'bg-white border border-gray-200'"
    >
      <!-- 👤 Informations personnelles -->
      <div>
        <h3
          class="text-lg font-semibold mb-3"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
        >
          👤 Informations personnelles
        </h3>

        <div v-if="currentUser" class="grid md:grid-cols-2 gap-4">
          <label class="block">
            <span
              class="font-medium"
              :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
              >Nom d'utilisateur</span
            >
            <input
              type="text"
              v-model="currentUser.username"
              placeholder="Nom utilisateur"
              class="mt-1 block w-full rounded px-3 py-2 border transition"
              :class="inputClass"
              readonly
            />
          </label>

          <label class="block">
            <span
              class="font-medium"
              :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
              >Rôle</span
            >
            <input
              type="text"
              v-model="currentUser.role"
              placeholder="Rôle"
              class="mt-1 block w-full rounded px-3 py-2 border transition"
              :class="inputClass"
              readonly
            />
          </label>
        </div>
        <p v-else class="text-gray-400">Chargement des informations...</p>
      </div>

      <hr :class="darkMode ? 'border-[#00BFFF]/20' : 'border-gray-200'" />

      <!-- 💼 Wallet -->
      <div v-if="currentUser">
        <h3
          class="text-lg font-semibold mb-3"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
        >
          💼 Mon wallet
        </h3>

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <p
              class="font-mono text-sm truncate"
              :class="darkMode ? 'text-gray-300' : 'text-gray-800'"
            >
              {{ currentUser.walletAddress || 'Aucun wallet connecté' }}
            </p>
            <p
              class="text-xs"
              :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >
              Réseau : {{ currentUser.network || 'Non spécifié' }}
            </p>
            <p
              class="text-xs mt-1"
              :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >
              💰 SolBalance : {{ currentUser.solBalance || '0.00' }} — 
              Ξ EthBalance : {{ currentUser.ethBalance || '0.00' }} — 
              ⚙ WorkBalance : {{ currentUser.workBalance || '0.00' }}
            </p>
          </div>

          <div class="flex gap-2">
            <button
              @click="copyWallet"
              class="px-3 py-1 rounded font-medium text-sm transition"
              :class="darkMode
                ? 'bg-[#00BFFF]/10 border border-[#00BFFF]/40 text-[#00BFFF] hover:bg-[#00BFFF]/20'
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'"
            >
              📋 Copier
            </button>
          </div>
        </div>
      </div>

      <hr :class="darkMode ? 'border-[#00BFFF]/20' : 'border-gray-200'" />

      <!-- 🌗 Préférences -->
      <div>
        <h3
          class="text-lg font-semibold mb-3"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
        >
          🌗 Préférences d’affichage
        </h3>

        <div class="flex items-center gap-3">
          <span class="text-sm font-medium">
            Mode actuel :
            <span :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'">
              {{ darkMode ? 'Dark' : 'Light' }}
            </span>
          </span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="darkMode" class="sr-only peer" />
            <div
              class="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#00BFFF] transition"
            ></div>
            <span
              class="absolute left-0 top-0 h-6 w-6 bg-white rounded-full shadow transform transition peer-checked:translate-x-6"
            ></span>
          </label>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject, computed, onMounted } from 'vue'
import { UsersStore } from '../../store/usersStore'

// 🧩 Store
const usersStore = UsersStore()
const darkMode = inject('darkMode', false)

// Charger les utilisateurs au montage
onMounted(() => {
  usersStore.fetchUsers()
})

// Sélection du premier utilisateur (exemple)
const currentUser = computed(() => usersStore.users[0])

// ✅ Classes dynamiques pour les inputs
const inputClass = computed(() =>
  darkMode
    ? 'bg-[#0d2f42] border-[#00BFFF]/30 text-gray-100 placeholder-gray-400 focus:border-[#00BFFF]/60'
    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'
)

// Copier le wallet
const copyWallet = async () => {
  if (currentUser.value?.walletAddress) {
    await navigator.clipboard.writeText(currentUser.value.walletAddress)
    alert('Adresse copiée dans le presse-papiers ✅')
  }
}
</script>
