<template>
  <section class="p-6 transition-colors duration-500">
    <div
      class="rounded-lg shadow-lg p-6 space-y-6 transition border"
      :class="darkMode
        ? 'bg-[#0a2431] border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
        : 'bg-white border-gray-200 hover:border-indigo-200'"
    >
      <!-- Full Name -->
      <label class="block">
        <span
          class="font-medium"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-700'"
        >
          Full Name
        </span>
        <input
          v-model="name"
          type="text"
          placeholder="François Giorgi"
          class="mt-2 w-full rounded px-3 py-2 border transition focus:outline-none"
          :class="darkMode
            ? 'bg-[#09202c] border-[#00BFFF]/30 text-gray-100 focus:border-[#00BFFF]'
            : 'bg-white border-gray-300 text-gray-800 focus:border-indigo-500'"
        />
      </label>

      <!-- Email -->
      <label class="block">
        <span
          class="font-medium"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-700'"
        >
          Email Address
        </span>
        <input
          v-model="email"
          type="email"
          placeholder="francois@workdao.io"
          class="mt-2 w-full rounded px-3 py-2 border transition focus:outline-none"
          :class="darkMode
            ? 'bg-[#09202c] border-[#00BFFF]/30 text-gray-100 focus:border-[#00BFFF]'
            : 'bg-white border-gray-300 text-gray-800 focus:border-indigo-500'"
        />
      </label>

      <!-- Connected Wallet -->
      <div>
        <span
          class="font-medium"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-700'"
        >
          Connected Wallet
        </span>

        <div
          class="mt-2 flex items-center justify-between rounded border px-3 py-2 transition"
          :class="darkMode
            ? 'bg-[#09202c] border-[#00BFFF]/30 text-gray-100'
            : 'bg-gray-50 border-gray-300 text-gray-700'"
        >
          <span>{{ wallet }}</span>
          <button
            @click="toggleWallet"
            class="text-sm font-semibold px-3 py-1 rounded transition"
            :class="wallet
              ? (darkMode
                ? 'bg-red-500/80 hover:bg-red-500 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white')
              : (darkMode
                ? 'bg-[#00BFFF]/80 hover:bg-[#00BFFF] text-gray-900'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white')"
          >
            {{ wallet ? 'Disconnect' : 'Connect Wallet' }}
          </button>
        </div>
      </div>

      <!-- Theme Selector -->
      <div>
        <h3
          class="text-lg font-semibold mb-3"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
        >
          🌗 Préférences d’affichage
        </h3>

        <div class="flex items-center gap-3">
          <span class="text-sm font-medium"
            >Mode actuel :
            <span
              :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'"
              >{{ darkMode ? 'Dark' : 'Light' }}</span
            ></span
          >
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

      <!-- Save Button -->
      <div class="pt-2">
        <button
          @click="saveSettings"
          class="px-6 py-2 rounded font-semibold transition flex items-center gap-2"
          :class="darkMode
            ? 'bg-[#00BFFF]/90 hover:bg-[#00BFFF] text-gray-900'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'"
        >
          <span v-if="!saving">💾 Save Changes</span>
          <span v-else>⏳ Saving...</span>
        </button>

        <p
          v-if="saved"
          class="mt-3 text-sm"
          :class="darkMode ? 'text-green-400' : 'text-green-600'"
        >
          ✅ Settings successfully updated!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"

const darkMode = inject("darkMode", ref(false))

const name = ref("François Giorgi")
const email = ref("francois@workdao.io")
const wallet = ref("0x1234...ABCD")
const selectedTheme = ref(darkMode.value ? "dark" : "light")

const saving = ref(false)
const saved = ref(false)

const toggleWallet = () => {
  wallet.value = wallet.value ? "" : "0x1234...ABCD"
}

const setTheme = (theme: "dark" | "light") => {
  darkMode.value = theme === "dark"
  localStorage.setItem("darkMode", darkMode.value ? "true" : "false")
}

const saveSettings = async () => {
  saving.value = true
  saved.value = false
  await new Promise((r) => setTimeout(r, 1000))
  saving.value = false
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
}
</script>
