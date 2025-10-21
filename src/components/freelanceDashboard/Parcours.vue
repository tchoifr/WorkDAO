<template>
  <section class="p-6 transition-colors duration-500">
    <div
      class="rounded-lg shadow-lg p-6 space-y-6 border transition"
      :class="darkMode
        ? 'bg-[#0a2431] border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
        : 'bg-white border-gray-200 hover:border-indigo-200'"
    >

      <!-- ABOUT -->
      <div>
        <h3
          class="text-lg font-semibold mb-2"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
        >
          👤 About Me
        </h3>
        <p :class="darkMode ? 'text-gray-300' : 'text-gray-700'">
          Passionate Web3 developer specialized in smart contract development and decentralized applications.
          Experienced in Solidity, TypeScript, and blockchain integrations across Ethereum and Polygon networks.
        </p>
      </div>

      <!-- PROFESSIONAL EXPERIENCE -->
      <div>
        <div class="flex justify-between items-center mb-3">
          <h3
            class="text-lg font-semibold"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
          >
            💼 Professional Experience
          </h3>

          <!-- BUTTON TO TOGGLE FORM -->
          <button
            @click="showForm = !showForm"
            class="px-3 py-1 text-sm rounded font-semibold transition"
            :class="darkMode
              ? 'bg-[#00BFFF]/80 hover:bg-[#00BFFF] text-gray-900'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'"
          >
            {{ showForm ? 'Cancel' : '➕ Add Experience' }}
          </button>
        </div>

        <!-- EXPERIENCE FORM -->
        <form
          v-if="showForm"
          @submit.prevent="addExperience"
          class="space-y-3 p-4 rounded border transition"
          :class="darkMode
            ? 'bg-[#09202c] border-[#00BFFF]/30'
            : 'bg-indigo-50 border-indigo-200'"
        >
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium" :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-700'">Job Title</label>
              <input
                v-model="newExp.title"
                type="text"
                required
                placeholder="Smart Contract Developer"
                class="w-full mt-1 rounded px-3 py-2 border focus:outline-none transition"
                :class="darkMode
                  ? 'bg-[#0a2431] border-[#00BFFF]/30 text-gray-100 focus:border-[#00BFFF]'
                  : 'bg-white border-gray-300 text-gray-800 focus:border-indigo-500'"
              />
            </div>

            <div>
              <label class="text-sm font-medium" :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-700'">Company</label>
              <input
                v-model="newExp.company"
                type="text"
                required
                placeholder="Web3 Labs"
                class="w-full mt-1 rounded px-3 py-2 border focus:outline-none transition"
                :class="darkMode
                  ? 'bg-[#0a2431] border-[#00BFFF]/30 text-gray-100 focus:border-[#00BFFF]'
                  : 'bg-white border-gray-300 text-gray-800 focus:border-indigo-500'"
              />
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium" :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-700'">Year</label>
              <input
                v-model="newExp.year"
                type="text"
                required
                placeholder="2025 - Present"
                class="w-full mt-1 rounded px-3 py-2 border focus:outline-none transition"
                :class="darkMode
                  ? 'bg-[#0a2431] border-[#00BFFF]/30 text-gray-100 focus:border-[#00BFFF]'
                  : 'bg-white border-gray-300 text-gray-800 focus:border-indigo-500'"
              />
            </div>

            <div>
              <label class="text-sm font-medium" :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-700'">Description</label>
              <input
                v-model="newExp.description"
                type="text"
                required
                placeholder="Developed ERC-721 contract for NFT marketplace"
                class="w-full mt-1 rounded px-3 py-2 border focus:outline-none transition"
                :class="darkMode
                  ? 'bg-[#0a2431] border-[#00BFFF]/30 text-gray-100 focus:border-[#00BFFF]'
                  : 'bg-white border-gray-300 text-gray-800 focus:border-indigo-500'"
              />
            </div>
          </div>

          <button
            type="submit"
            class="mt-2 px-4 py-2 rounded font-semibold transition"
            :class="darkMode
              ? 'bg-[#00BFFF]/90 hover:bg-[#00BFFF] text-gray-900'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'"
          >
            ✅ Add Experience
          </button>
        </form>

        <!-- EXPERIENCE LIST -->
        <ul class="space-y-4 mt-4">
          <li
            v-for="exp in experiences"
            :key="exp.id"
            class="border-l-4 pl-4 transition"
            :class="darkMode ? 'border-[#00BFFF]/60' : 'border-indigo-400'"
          >
            <div class="flex justify-between items-center">
              <h4 class="font-semibold" :class="darkMode ? 'text-gray-100' : 'text-gray-800'">{{ exp.title }}</h4>
              <span class="text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">{{ exp.year }}</span>
            </div>
            <p :class="darkMode ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'">{{ exp.company }}</p>
            <p :class="darkMode ? 'text-gray-400 text-sm mt-1' : 'text-gray-500 text-sm mt-1'">{{ exp.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"
const darkMode = inject("darkMode", false)

// ✅ Fake base data
const experiences = ref([
  {
    id: 1,
    title: "Smart Contract Developer",
    company: "Polygon Labs",
    year: "2024 - Present",
    description: "Developed ERC-721/1155 contracts and optimized gas usage for NFT minting systems."
  },
  {
    id: 2,
    title: "Web3 Frontend Engineer",
    company: "DAO Collective",
    year: "2023 - 2024",
    description: "Built decentralized dashboards and integrated MetaMask, WalletConnect, and ENS features."
  }
])

// Form state
const showForm = ref(false)
const newExp = ref({
  title: "",
  company: "",
  year: "",
  description: ""
})

// ✅ Add experience
const addExperience = () => {
  if (!newExp.value.title || !newExp.value.company || !newExp.value.year) return
  experiences.value.push({
    id: Date.now(),
    title: newExp.value.title,
    company: newExp.value.company,
    year: newExp.value.year,
    description: newExp.value.description
  })
  newExp.value = { title: "", company: "", year: "", description: "" }
  showForm.value = false
}
</script>
