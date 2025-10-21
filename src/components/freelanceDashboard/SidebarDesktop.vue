<template>
  <aside
    class="w-64 border-r shadow-md hidden md:flex flex-col justify-between"
    :class="darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
  >
    <div>
      <div class="p-6 border-b" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
        <div class="flex flex-col items-center text-center">
          <img
            :src="avatar"
            alt="avatar"
            class="w-24 h-24 rounded-full mb-3 border-2 border-indigo-500 shadow-md"
          />
          <h2 :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'" class="text-lg font-semibold">
            François Giorgi
          </h2>
          <p :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="text-sm">
            Développeuse Web3
          </p>
        </div>
      </div>

      <nav class="p-6 space-y-4">
        <button
          v-for="item in menu"
          :key="item.key"
          @click="activeSection = item.key"
          class="flex items-center w-full text-left px-3 py-2 rounded transition"
          :class="activeSection === item.key
            ? (darkMode
              ? 'bg-[#0a2431] text-[#00BFFF] font-semibold border border-[#00BFFF]/40'
              : 'text-indigo-600 font-semibold bg-indigo-50')
            : (darkMode
              ? 'text-gray-300 hover:bg-[#0a2431] hover:text-[#00BFFF]'
              : 'text-gray-700 hover:bg-indigo-50')"
        >
          <span class="text-lg mr-2">{{ item.icon }}</span>
          {{ item.label }}
        </button>
      </nav>
    </div>

    <div
      class="border-t p-4 text-center"
      :class="darkMode ? 'bg-[#0a2431] border-[#00BFFF]/30' : 'bg-indigo-50 border-gray-200'"
    >
      <h3 :class="darkMode ? 'text-gray-300' : 'text-gray-500'" class="text-sm mb-1">Solde $WORK</h3>
      <p :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'" class="text-2xl font-bold">
        {{ balance.toFixed(2) }}
      </p>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  menu: Array,
  activeSection: Object,
  darkMode: Boolean,
  balance: Number,
  avatar: String,
})
</script>
