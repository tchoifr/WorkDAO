<template>
  <!-- Hero Section -->
  <section
    class="relative h-screen flex items-center justify-center text-center text-white overflow-hidden fade-in"
  >
    <!-- Image de fond -->
    <img
      src="../assets/header.jpg"
      alt="WorkDAO Background"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <!-- Overlay fixe sombre -->
    <div class="absolute inset-0 hero-overlay"></div>

    <!-- Contenu principal -->
    <div class="relative z-10 px-6 max-w-5xl">
      <h1 v-html="texts.header.title"></h1>

      <p class="mb-10" v-html="texts.header.subtitle"></p>

      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink to="/login" class="btn-primary">
          {{ texts.header.btnFreelancer }}
        </RouterLink>

        <RouterLink to="/login" class="btn-primary">
          {{ texts.header.btnEmployer }}
        </RouterLink>
      </div>
    </div>

    <!-- Dégradé inférieur -->
    <div
      class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-bg)] to-transparent"
    ></div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-20 bg-[var(--color-bg)] text-white">
    <div class="container mx-auto px-6 text-center">
      <h2>{{ texts.features.title }}</h2>

      <div class="grid md:grid-cols-3 gap-10">
        <RouterLink
          v-for="(item, i) in texts.features.cards"
          :key="i"
          :to="featureLinks[i]"
          class="card-glow"
        >
          <h3 class="text-xl font-bold mb-2 text-[var(--color-secondary)]">
            {{ item.title }}
          </h3>
          <p>{{ item.text }}</p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { computed, Ref } from "vue"
import { useLanguage } from "../store/useLanguage"
import { homeTextsEn } from "../variables/pages/en/home"
import { homeTextsFr } from "../variables/pages/fr/home"

const { currentLang } = useLanguage() as { currentLang: Ref<"en" | "fr"> }

// ✅ Texte dynamique selon la langue
const texts = computed(() =>
  currentLang.value === "en" ? homeTextsEn : homeTextsFr
)

// 🔗 Routes des cartes
const featureLinks = [
  "/whychoose/decentralized",
  "/whychoose/securedByBlockchain",
  "/whychoose/rewarding",
  "/whychoose/daoGovernance",
  "/whychoose/noMiddlemen",
  "/whychoose/sovereignIdentity",
  "/whychoose/globalMarketplace",
  "/whychoose/totalFreedom",
  "/whychoose/maximumSecurity",
  "/whychoose/communityRevolution"
]
</script>

<style scoped>
section:first-of-type {
  animation: fadeIn 1s ease-out;
}
</style>
