<template>
  <!-- Hero Section -->
  <section
    class="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
  >
    <!-- Background Image -->
    <img
      src="../assets/header.jpg"
      alt="WorkDAO Background"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <!-- Blue Neon Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/70 via-[#031d28]/80 to-[#0a2431]/90"
    ></div>

    <!-- Main Content -->
    <div class="relative z-10 px-6 max-w-5xl">
      <h1
        class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-[#38BDF8] drop-shadow-[0_0_10px_#38BDF8]"
        v-html="texts.header.title"
      ></h1>

      <p
        class="text-lg md:text-2xl text-gray-200 mb-10 leading-relaxed"
        v-html="texts.header.subtitle"
      ></p>

      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink
          to="/login"
          class="px-8 py-3 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-lg transition shadow-[0_0_10px_#00BFFF]"
        >
          {{ texts.header.btnFreelancer }}
        </RouterLink>

        <RouterLink
          to="/login"
          class="px-8 py-3 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-lg transition shadow-[0_0_10px_#00BFFF]"
        >
          {{ texts.header.btnEmployer }}
        </RouterLink>
      </div>
    </div>

    <!-- Bottom Gradient -->
    <div
      class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#031d28] to-transparent"
    ></div>
  </section>

 <!-- Features Section -->
<section id="features" class="bg-[#031d28] text-white py-20">
  <div class="container mx-auto px-6 text-center">
    <h2
      class="text-3xl font-bold mb-12 text-[#38BDF8] drop-shadow-[0_0_6px_#38BDF8]"
    >
      {{ texts.features.title }}
    </h2>

    <div class="grid md:grid-cols-3 gap-10">
      <!-- Cartes dynamiques -->
      <RouterLink
        v-for="(item, i) in texts.features.cards"
        :key="i"
        :to="featureLinks[i]"
        class="bg-[#0a2431] p-6 rounded-xl shadow-lg border border-[#00BFFF]/30 hover:border-[#00BFFF]/60 hover:shadow-[0_0_20px_#00BFFF80] transition block"
      >
        <h3 class="text-xl font-bold mb-2 text-[#00BFFF]">
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

// 🔗 Correspondance des 10 cartes avec les routes
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

section:first-of-type {
  animation: fadeIn 1s ease-out;
}
</style>
