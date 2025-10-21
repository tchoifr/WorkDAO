<template>
  <nav
    class="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 border-t shadow-md md:hidden z-50"
    :class="darkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'"
  >
    <button
      v-for="item in menu"
      :key="item.key"
      @click="activeSection = item.key"
      class="flex flex-col items-center text-xs transition"
      :class="activeSection === item.key
        ? (darkMode ? 'text-[#00BFFF]' : 'text-indigo-600')
        : (darkMode ? 'text-gray-400' : 'text-gray-500')"
    >
      <span class="text-xl mb-1">{{ item.icon }}</span>
      {{ item.label }}
    </button>
  </nav>
</template>

<script setup>
defineProps({
  menu: Array,
  activeSection: Object,
  darkMode: Boolean
})
</script>
