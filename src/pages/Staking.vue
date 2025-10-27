<template>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 text-white overflow-hidden fade-in"
  >
    <!-- Image de fond -->
    <img
      src="../assets/staking.jpg"
      alt="WorkDAO Staking"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <!-- Overlay global de la charte -->
    <div class="absolute inset-0 hero-overlay"></div>

    <!-- Contenu principal -->
    <div class="relative z-10 max-w-4xl">
      <!-- Titre -->
      <h1 v-html="texts.title"></h1>

      <!-- Sous-titre -->
      <p
        class="text-lg md:text-xl text-[var(--color-text-dim)] max-w-2xl mx-auto mb-12 leading-relaxed"
        v-html="texts.subtitle"
      ></p>

      <!-- Section Gouvernance -->
      <div class="card-glow backdrop-blur-xl p-8 text-left space-y-4">
        <h2>{{ texts.sectionGovernance.title }}</h2>
        <p v-html="texts.sectionGovernance.description"></p>

        <ul class="list-disc ml-6 space-y-2 text-[var(--color-text-dim)]">
          <li
            v-for="(rule, i) in texts.sectionGovernance.list"
            :key="i"
            v-html="rule"
          ></li>
        </ul>
      </div>

      <!-- Section Récompenses -->
      <div class="card-glow backdrop-blur-xl p-8 text-left space-y-4 mt-12">
        <h2>{{ texts.sectionRewards.title }}</h2>
        <p v-html="texts.sectionRewards.description"></p>

        <ul class="list-disc ml-6 space-y-2 text-[var(--color-text-dim)]">
          <li
            v-for="(item, i) in texts.sectionRewards.list"
            :key="i"
            v-html="item"
          ></li>
        </ul>
      </div>
    </div>

    <!-- Dégradé bas -->
    <div
      class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-bg)] to-transparent"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useLanguage } from "../store/useLanguage"
import { stakingTextsEn } from "../variables/pages/en/staking"
import { stakingTextsFr } from "../variables/pages/fr/staking"

const { currentLang } = useLanguage()

// ✅ Texte dynamique selon la langue
const texts = computed(() =>
  currentLang.value === "en" ? stakingTextsEn.texts : stakingTextsFr.texts
)
</script>

<style scoped>
section {
  animation: fadeIn 1.2s ease-out;
}

h2 {
  text-shadow: 0 0 6px var(--color-secondary);
}
</style>
