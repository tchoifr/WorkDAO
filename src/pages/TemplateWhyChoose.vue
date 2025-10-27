<template>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 text-white overflow-hidden mt-10 fade-in"
  >
    <!-- 🌌 Fond animé -->
    <div
      class="absolute inset-0 animate-bgMove bg-gradient-to-br from-[var(--color-bg)] via-[#052a40] to-[var(--color-accent)]/20"
    ></div>

    <!-- Image de fond -->
    <img
      :src="backgroundUrl"
      alt="WorkDAO Feature"
      class="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
    />

    <!-- Overlay global -->
    <div class="absolute inset-0 hero-overlay"></div>

    <!-- 🌐 Contenu principal -->
    <div class="relative z-10 max-w-5xl">
      <!-- Header -->
      <h1
        v-if="texts"
        v-html="texts.header.title"
      ></h1>

      <p
        v-if="texts"
        class="text-lg md:text-xl text-[var(--color-text-dim)] max-w-3xl mx-auto mb-16 leading-relaxed"
        v-html="texts.header.description"
      ></p>

      <!-- 💎 Carte principale -->
      <div
        v-if="texts"
        class="card-glow backdrop-blur-xl p-8 max-w-3xl mx-auto text-left text-[var(--color-text-dim)] space-y-4"
      >
        <h2>{{ texts.card.title }}</h2>

        <ul class="list-disc ml-6 space-y-3">
          <li v-for="(point, i) in texts.card.points" :key="i">{{ point }}</li>
        </ul>

        <p class="text-sm mt-4 opacity-80">{{ texts.card.note }}</p>
      </div>

      <!-- 🚧 Si la page n'existe pas -->
      <div v-else class="text-center py-20 text-[var(--color-text-dim)]">
        <h2 class="text-4xl mb-4 text-[var(--color-primary)] font-bold">
          🚧 Page not found
        </h2>
        <p>The feature you're looking for does not exist yet.</p>
      </div>

      <!-- 🔙 Bouton retour vers "Features" -->
      <button
        @click="goBackToFeatures"
        class="btn-primary mt-12 hover:-translate-y-1 transition-all duration-300"
      >
        ← {{ currentLang === 'fr' ? 'Retour aux fonctionnalités' : 'Back to Features' }}
      </button>
    </div>

    <!-- Dégradé inférieur -->
    <div
      class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-bg)] to-transparent"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { computed, type Ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useLanguage } from "../store/useLanguage"
import { whyChooseTextsEn } from "../variables/pages/en/whychoose"
import { whyChooseTextsFr } from "../variables/pages/fr/whychoose"

const route = useRoute()
const router = useRouter()

const { currentLang } = useLanguage() as { currentLang: Ref<"en" | "fr"> }

// 🌍 Texte dynamique selon la langue
const allTexts = computed(() =>
  currentLang.value === "en" ? whyChooseTextsEn : whyChooseTextsFr
)

// 🔑 ID dynamique depuis l'URL
const id = computed(() => route.params.id as string)

// 🧠 Récupération sécurisée du contenu
const texts = computed(() => {
  const key = id.value as keyof typeof allTexts.value
  return allTexts.value[key]
})

// 🖼️ Image de fond dynamique
const backgroundUrl = computed(() => {
  try {
    return new URL(`../assets/whychoose/${id.value}-bg.jpg`, import.meta.url).href
  } catch {
    return new URL("../assets/header.jpg", import.meta.url).href
  }
})

// 🔙 Retour fluide vers la section "Features"
const goBackToFeatures = async () => {
  await router.push("/")
  setTimeout(() => {
    const target = document.querySelector("#features")
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, 600)
}
</script>

<style scoped>
section {
  animation: fadeIn 1.2s ease-out;
}

h2 {
  text-shadow: 0 0 8px var(--color-secondary);
}

/* 🌌 Animation fond DAO */
@keyframes bgMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-bgMove {
  background-size: 200% 200%;
  animation: bgMove 18s ease-in-out infinite;
}
</style>
