<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] transition-opacity"
  >
    <div class="flex flex-col items-center">
      <!-- Cercle animé -->
      <div
        class="w-16 h-16 border-4 border-t-transparent border-[#00BFFF] rounded-full animate-spin drop-shadow-[0_0_15px_#00BFFF]"
      ></div>
      <p class="mt-6 text-[#38BDF8] font-semibold text-lg tracking-wide">
        Loading...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>
