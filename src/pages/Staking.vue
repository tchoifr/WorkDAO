<template>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 text-white overflow-hidden"
  >
    <!-- Background Image -->
    <img
      src="../assets/staking.jpg"
      alt="WorkDAO Staking"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/70 via-[#031d28]/80 to-[#0a2431]/90"
    ></div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-4xl">
      <!-- Title -->
      <h1
        class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-[#38BDF8] drop-shadow-[0_0_10px_#38BDF8]"
        v-html="texts.title"
      ></h1>

      <!-- Subtitle -->
      <p
        class="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 leading-relaxed"
        v-html="texts.subtitle"
      ></p>

      <!-- Governance Section -->
      <div
        class="bg-white/10 backdrop-blur-xl border border-[#00BFFF]/30 rounded-2xl shadow-[0_0_20px_#00BFFF40] p-8 text-gray-100 text-left space-y-4"
      >
        <h2 class="text-2xl font-semibold text-[#00BFFF] mb-3">
          {{ texts.sectionGovernance.title }}
        </h2>
        <p v-html="texts.sectionGovernance.description"></p>

        <ul class="list-disc ml-6 space-y-2">
          <li
            v-for="(rule, i) in texts.sectionGovernance.list"
            :key="i"
            v-html="rule"
          ></li>
        </ul>
      </div>

      <!-- Rewards Section -->
      <div
        class="mt-12 bg-white/10 backdrop-blur-xl border border-[#00BFFF]/30 rounded-2xl shadow-[0_0_20px_#00BFFF40] p-8 text-gray-100 text-left space-y-4"
      >
        <h2 class="text-2xl font-semibold text-[#00BFFF] mb-3">
          {{ texts.sectionRewards.title }}
        </h2>
        <p v-html="texts.sectionRewards.description"></p>

        <ul class="list-disc ml-6 space-y-2">
          <li
            v-for="(item, i) in texts.sectionRewards.list"
            :key="i"
            v-html="item"
          ></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Gradient -->
    <div
      class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#031d28] to-transparent"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useLanguage } from "../store/useLanguage"
import { stakingTextsEn } from "../variables/pages/en/staking"
import { stakingTextsFr } from "../variables/pages/fr/staking"

const { currentLang } = useLanguage()

// ✅ Sélection automatique de la langue
const texts = computed(() =>
  currentLang.value === "en" ? stakingTextsEn.texts : stakingTextsFr.texts
)
</script>

<style scoped>
section {
  animation: fadeIn 1.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
