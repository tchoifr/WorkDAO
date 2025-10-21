<template>
  <footer class="bg-gray-900 text-gray-300 py-6">
    <div class="container mx-auto text-center">
      <p class="text-sm" v-html="footer.text1"></p>
      <p class="text-xs mt-1" v-html="footer.text2"></p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { footerTextsEn } from "../variables/components/en/footer"

const { footer } = footerTextsEn
</script>
