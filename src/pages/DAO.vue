<template>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 text-white overflow-hidden mt-10"
  >
    <!-- Background -->
    <img
      src="../assets/dao.jpg"
      alt="WorkDAO Governance"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-[#031d28]/80 to-[#0a2431]/90"></div>

    <div class="relative z-10 max-w-5xl">
      <!-- Header -->
      <h1
        class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-[#38BDF8] drop-shadow-[0_0_10px_#38BDF8]"
        v-html="texts.header.title"
      ></h1>

      <p
        class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-16 leading-relaxed"
        v-html="texts.header.description"
      ></p>

      <!-- Access Rules -->
      <div
        class="bg-white/10 backdrop-blur-xl border border-[#00BFFF]/30 rounded-2xl shadow-[0_0_20px_#00BFFF40] p-8 max-w-3xl mx-auto mb-20 text-gray-100"
      >
        <h2 class="text-2xl font-semibold mb-4 text-[#00BFFF]">
          {{ texts.accessRules.title }}
        </h2>
        <ul class="text-left space-y-3 text-gray-200 leading-relaxed">
          <li
            v-for="(item, i) in texts.accessRules.list"
            :key="i"
            v-html="item"
          ></li>
        </ul>
      </div>

      <!-- Governance Charter -->
      <div
        class="bg-white/10 backdrop-blur-lg border border-[#00BFFF]/30 rounded-2xl shadow-[0_0_25px_#00BFFF30] p-8 text-left text-gray-100 space-y-6 mb-20"
      >
        <h2 class="text-3xl font-bold text-[#00BFFF] mb-4 text-center">
          {{ texts.charter.title }}
        </h2>

        <div v-for="(rule, index) in texts.charter.rules" :key="index" class="space-y-2">
          <h3 class="text-xl font-semibold text-[#00BFFF]">
            {{ rule.title }}
          </h3>
          <p
            v-if="rule.text"
            class="ml-4 text-gray-300 leading-relaxed"
            v-html="rule.text"
          ></p>
          <ul
            v-if="rule.list"
            class="list-disc ml-8 text-gray-300 leading-relaxed"
          >
            <li v-for="(li, i) in rule.list" :key="i">{{ li }}</li>
          </ul>
        </div>
      </div>

      <!-- DAO Panels -->
      <div class="grid md:grid-cols-2 gap-10">
        <!-- Active Proposals -->
        <div
          class="bg-white/10 backdrop-blur-lg border border-[#00BFFF]/30 rounded-2xl p-8 hover:shadow-[0_0_20px_#00BFFF60] transition"
        >
          <h2 class="text-2xl font-semibold text-[#00BFFF] mb-4">
            {{ texts.proposals.title }}
          </h2>
          <ul class="text-left space-y-3 text-gray-200">
            <li
              v-for="(item, i) in texts.proposals.items"
              :key="i"
              v-html="item"
            ></li>
          </ul>
          <p class="text-sm text-gray-400 mt-4" v-html="texts.proposals.note"></p>
        </div>

        <!-- Voting History -->
        <div
          class="bg-white/10 backdrop-blur-lg border border-[#00BFFF]/30 rounded-2xl p-8 hover:shadow-[0_0_20px_#00BFFF60] transition"
        >
          <h2 class="text-2xl font-semibold text-[#00BFFF] mb-4">
            {{ texts.votes.title }}
          </h2>
          <p class="text-gray-300 mb-4">{{ texts.votes.description }}</p>
          <ul class="text-left space-y-3 text-gray-200">
            <li
              v-for="(item, i) in texts.votes.list"
              :key="i"
              v-html="item"
            ></li>
          </ul>
          <p class="text-sm text-gray-400 mt-4">{{ texts.votes.note }}</p>
        </div>
      </div>
    </div>

    <!-- Bottom gradient -->
    <div
      class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#031d28] to-transparent"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useLanguage } from "../store/useLanguage"
import { daoTextsEn } from "../variables/pages/en/dao"
import { daoTextsFr } from "../variables/pages/fr/dao"

const { currentLang } = useLanguage()

interface CharterRule {
  title: string
  text?: string
  list?: string[]
}

interface DaoTexts {
  header: any
  accessRules: any
  charter: {
    title: string
    rules: CharterRule[]
  }
  proposals: any
  votes: any
}

const texts = computed<DaoTexts>(() =>
  currentLang.value === "en" ? daoTextsEn : daoTextsFr
)
</script>

<style scoped>
section {
  animation: fadeIn 1.2s ease-out;
}

h3 {
  text-shadow: 0 0 6px #00bfff80;
}

ol {
  list-style: decimal;
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
