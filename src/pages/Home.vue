<template>
  <!-- 🟦 Hero Section -->
  <section
    class="relative min-h-screen flex flex-col items-center text-center text-white overflow-hidden pt-24 pb-16"
  >
    <!-- Image de fond -->
    <img
      src="../assets/header.jpg"
      alt="WorkDAO Background"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <!-- Overlay global -->
    <div class="absolute inset-0 hero-overlay"></div>

    <!-- Contenu principal -->
    <div class="relative z-10 px-6 max-w-5xl mt-32">
      <h1
        class="font-extrabold mb-6 leading-tight text-[var(--color-primary)] text-5xl sm:text-5xl md:text-6xl lg:text-7xl"
        v-html="texts.header.title"
      ></h1>

      <p
        class="text-base sm:text-lg md:text-2xl text-[var(--color-text-dim)] mb-10 leading-relaxed"
        v-html="texts.header.subtitle"
      ></p>

      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink to="/login" class="btn-primary">
          {{ texts.header.btnFreelancer }}
        </RouterLink>

        <RouterLink to="/login" class="btn-primary">
          {{ texts.header.btnEmployer }}
        </RouterLink>
      </div>
    </div>

    <!-- Dégradé bas -->
    <div
      class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-bg)] to-transparent"
    ></div>
  </section>

  <!-- 🧩 Features Section -->
  <section id="features" class="py-20 bg-[var(--color-bg)] text-white fade-in">
    <div class="container mx-auto px-6 text-center">
      <h2>{{ texts.features.title }}</h2>

      <div class="grid md:grid-cols-3 gap-10 mt-12">
        <RouterLink
          v-for="(item, i) in texts.features.cards"
          :key="i"
          :to="featureLinks[i]"
          class="card-glow hover:shadow-[var(--glow-secondary)] block p-6 rounded-xl transition backdrop-blur-xl"
        >
          <h3 class="text-xl font-bold mb-2 text-[var(--color-secondary)]">
            {{ item.title }}
          </h3>
          <p class="text-[var(--color-text-dim)] leading-relaxed">
            {{ item.text }}
          </p>
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

const texts = computed(() =>
  currentLang.value === "en" ? homeTextsEn : homeTextsFr
)

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
