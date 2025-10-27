<template>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 text-white overflow-hidden mt-10 fade-in"
  >
    <!-- Image de fond -->
    <img
      src="../assets/dao.jpg"
      alt="WorkDAO Governance"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <!-- Overlay global de la charte -->
    <div class="absolute inset-0 hero-overlay"></div>

    <div class="relative z-10 max-w-5xl">
      <!-- Header -->
      <h1 v-html="texts.header.title"></h1>

      <p
        class="text-lg md:text-xl text-[var(--color-text-dim)] max-w-3xl mx-auto mb-16 leading-relaxed"
        v-html="texts.header.description"
      ></p>

      <!-- Access Rules -->
      <div class="card-glow backdrop-blur-xl p-8 max-w-3xl mx-auto mb-20">
        <h2>{{ texts.accessRules.title }}</h2>
        <ul class="text-left space-y-3 leading-relaxed text-[var(--color-text-dim)]">
          <li
            v-for="(item, i) in texts.accessRules.list"
            :key="i"
            v-html="item"
          ></li>
        </ul>
      </div>

      <!-- Governance Charter -->
      <div class="card-glow backdrop-blur-lg p-8 text-left space-y-6 mb-20">
        <h2 class="text-center">{{ texts.charter.title }}</h2>

        <div v-for="(rule, index) in texts.charter.rules" :key="index" class="space-y-2">
          <h3 class="text-xl font-semibold text-[var(--color-secondary)]">
            {{ rule.title }}
          </h3>

          <p
            v-if="rule.text"
            class="ml-4 text-[var(--color-text-dim)] leading-relaxed"
            v-html="rule.text"
          ></p>

          <ul
            v-if="rule.list"
            class="list-disc ml-8 text-[var(--color-text-dim)] leading-relaxed"
          >
            <li v-for="(li, i) in rule.list" :key="i">{{ li }}</li>
          </ul>
        </div>
      </div>

      <!-- DAO Panels -->
      <div class="grid md:grid-cols-2 gap-10">
        <!-- Active Proposals -->
        <div class="card-glow backdrop-blur-lg p-8 transition hover:shadow-[var(--glow-secondary)]">
          <h2>{{ texts.proposals.title }}</h2>
          <ul class="text-left space-y-3 text-[var(--color-text-dim)]">
            <li
              v-for="(item, i) in texts.proposals.items"
              :key="i"
              v-html="item"
            ></li>
          </ul>
          <p class="text-sm text-gray-400 mt-4" v-html="texts.proposals.note"></p>
        </div>

        <!-- Voting History -->
        <div class="card-glow backdrop-blur-lg p-8 transition hover:shadow-[var(--glow-secondary)]">
          <h2>{{ texts.votes.title }}</h2>
          <p class="text-[var(--color-text-dim)] mb-4">{{ texts.votes.description }}</p>
          <ul class="text-left space-y-3 text-[var(--color-text-dim)]">
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

    <!-- Dégradé inférieur -->
    <div
      class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-bg)] to-transparent"
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
  text-shadow: 0 0 6px var(--color-secondary);
}
</style>
