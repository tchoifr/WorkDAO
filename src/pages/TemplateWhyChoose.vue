<template>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 text-white overflow-hidden mt-10"
  >
    <!-- 🌌 Background animé -->
    <div
      class="absolute inset-0 animate-bgMove bg-gradient-to-br from-[#031d28] via-[#052a40] to-[#00bfff20]"
    ></div>

    <!-- Image de fond dynamique -->
    <img
      :src="backgroundUrl"
      alt="WorkDAO Feature"
      class="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
    />

    <!-- Overlay foncé -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/70 via-[#031d28]/80 to-[#0a2431]/90"
    ></div>

    <!-- 🌐 Contenu principal -->
    <div class="relative z-10 max-w-5xl">
      <!-- Header -->
      <h1
        v-if="texts"
        class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-[#38BDF8] drop-shadow-[0_0_10px_#38BDF8]"
        v-html="texts.header.title"
      ></h1>

      <p
        v-if="texts"
        class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-16 leading-relaxed"
        v-html="texts.header.description"
      ></p>

      <!-- 💎 Carte principale -->
      <div
        v-if="texts"
        class="bg-white/10 backdrop-blur-xl border border-[#00BFFF]/30 rounded-2xl shadow-[0_0_25px_#00BFFF40] p-8 max-w-3xl mx-auto text-left text-gray-100 space-y-4"
      >
        <h2 class="text-2xl font-semibold text-[#00BFFF] mb-4">
          {{ texts.card.title }}
        </h2>

        <ul class="list-disc ml-6 space-y-3 text-gray-300 leading-relaxed">
          <li v-for="(point, i) in texts.card.points" :key="i">{{ point }}</li>
        </ul>

        <p class="text-gray-400 text-sm mt-4">{{ texts.card.note }}</p>
      </div>

      <!-- 🚧 Si la page n'existe pas -->
      <div v-else class="text-center py-20 text-gray-300">
        <h2 class="text-4xl mb-4 text-[#38BDF8] font-bold">
          🚧 Page not found
        </h2>
        <p>The feature you're looking for does not exist yet.</p>
      </div>

      <!-- 🔙 Bouton retour vers la section Features -->
      <button
        @click="goBackToFeatures"
        class="mt-12 px-8 py-3 border border-[#00BFFF]/60 text-[#00BFFF] rounded-full font-semibold hover:bg-[#00BFFF] hover:text-black transition-all duration-300 hover:shadow-[0_0_25px_#00BFFF80] hover:-translate-y-1"
      > 
        ← {{ currentLang === 'fr' ? 'Retour aux fonctionnalités' : 'Back to Features' }}
      </button>
    </div>

    <!-- Dégradé inférieur -->
    <div
      class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#031d28] to-transparent"
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

// ✅ On garde l'objet entier pour éviter les soucis d'inférence
const { currentLang } = useLanguage()


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
    return new URL(`../assets/whychoose/${id.value}-bg.jpg`, import.meta.url)
      .href
  } catch {
    return new URL("../assets/header.jpg", import.meta.url).href
  }
})

// 🔙 Retour fluide vers la section "Features" de la Home
const goBackToFeatures = async () => {
  await router.push("/") // Retour à la page d'accueil
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
  text-shadow: 0 0 8px #00bfff80;
}

/* 🌌 Animation d'apparition */
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

/* 🌐 Fond animé néon DAO */
@keyframes bgMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-bgMove {
  background-size: 200% 200%;
  animation: bgMove 18s ease-in-out infinite;
}
</style>
