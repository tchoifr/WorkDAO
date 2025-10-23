<template>
  <section class="p-6 transition-colors duration-500">
    <div
      class="rounded-lg shadow-lg p-6 space-y-6 border transition"
      :class="darkMode
        ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60 hover:shadow-[#00BFFF]/20'
        : 'bg-white border border-gray-200 hover:shadow-xl'"
    >
      <!-- 🏷️ Titre -->
      <div>
        <label class="block text-sm font-semibold mb-1"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
        >
          Titre du poste
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Ex : Développeur Smart Contract Solidity"
          class="w-full px-4 py-2 rounded-md border transition"
          :class="darkMode
            ? 'bg-[#0d2f42] border-[#00BFFF]/30 text-gray-100 placeholder-gray-400 focus:border-[#00BFFF]'
            : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'"
        />
      </div>

      <!-- 📂 Catégorie -->
      <div>
        <label class="block text-sm font-semibold mb-1"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
        >
          Catégorie
        </label>
        <select
          v-model="form.category"
          class="w-full px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none shadow-sm"
          :class="darkMode
            ? 'bg-[#031d28] text-white border border-[#00BFFF]/40 focus:border-[#00BFFF]'
            : 'bg-white text-gray-800 border border-gray-300 focus:border-indigo-500'"
        >
          <option value="">Sélectionnez une catégorie</option>
          <option value="Développement">Développement</option>
          <option value="Design">Design</option>
          <option value="Communication">Communication</option>
          <option value="Juridique">Juridique</option>
          <option value="Traduction">Traduction</option>
          <option value="Support">Support</option>
        </select>
      </div>

      <!-- 📝 Description -->
      <div>
        <label class="block text-sm font-semibold mb-1"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
        >
          Description
        </label>
        <textarea
          v-model="form.description"
          rows="5"
          placeholder="Décrivez la mission, les objectifs et les attentes..."
          class="w-full px-4 py-2 rounded-md border transition resize-none"
          :class="darkMode
            ? 'bg-[#0d2f42] border-[#00BFFF]/30 text-gray-100 placeholder-gray-400 focus:border-[#00BFFF]'
            : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'"
        ></textarea>
      </div>

      <!-- ⏱️ Durée & Budget -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Durée -->
        <div>
          <label class="block text-sm font-semibold mb-1"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
          >
            Durée estimée
          </label>
          <div class="flex gap-2">
            <input
              v-model.number="form.duration"
              type="number"
              min="1"
              placeholder="Ex : 2"
              class="w-1/2 px-3 py-2 rounded-md border transition"
              :class="darkMode
                ? 'bg-[#0d2f42] border-[#00BFFF]/30 text-gray-100 placeholder-gray-400 focus:border-[#00BFFF]'
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'"
            />
            <select
              v-model="form.durationType"
              class="w-1/2 px-3 py-2 rounded-md text-sm transition"
              :class="darkMode
                ? 'bg-[#031d28] text-white border border-[#00BFFF]/40 focus:border-[#00BFFF]'
                : 'bg-white text-gray-800 border border-gray-300 focus:border-indigo-500'"
            >
              <option value="jours">Jour(s)</option>
              <option value="semaines">Semaine(s)</option>
              <option value="mois">Mois</option>
            </select>
          </div>
        </div>

        <!-- Budget -->
        <div>
          <label class="block text-sm font-semibold mb-1"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
          >
            Budget (en $WORK)
          </label>
          <input
            v-model.number="form.budget"
            type="number"
            placeholder="Ex : 500"
            class="w-full px-4 py-2 rounded-md border transition"
            :class="darkMode
              ? 'bg-[#0d2f42] border-[#00BFFF]/30 text-gray-100 placeholder-gray-400 focus:border-[#00BFFF]'
              : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'"
          />
        </div>
      </div>

      <!-- 🧠 Compétences -->
      <div>
        <label class="block text-sm font-semibold mb-1"
          :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
        >
          Compétences requises
        </label>

        <div class="flex flex-wrap gap-2 mb-2">
          <span
            v-for="(skill, index) in form.skills"
            :key="index"
            @click="removeSkill(index)"
            class="text-xs font-medium px-2 py-1 rounded cursor-pointer"
            :class="darkMode
              ? 'bg-[#00BFFF]/10 text-[#00BFFF] hover:bg-[#00BFFF]/20'
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'"
          >
            {{ skill }} ✕
          </span>
        </div>

        <div class="flex gap-2">
          <input
            v-model="newSkill"
            type="text"
            placeholder="Ajouter une compétence..."
            class="flex-1 px-3 py-2 rounded-md border transition"
            @keyup.enter="addSkill"
            :class="darkMode
              ? 'bg-[#0d2f42] border-[#00BFFF]/30 text-gray-100 placeholder-gray-400 focus:border-[#00BFFF]'
              : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'"
          />
          <button
            @click="addSkill"
            class="px-4 py-2 rounded font-semibold transition"
            :class="darkMode
              ? 'bg-[#00BFFF] text-black hover:bg-[#33cfff]'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'"
          >
            Ajouter
          </button>
        </div>
      </div>

      <!-- 🗓️ Date de publication automatique -->
      <div class="text-sm italic" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
        📅 Date de publication : <b>{{ today }}</b>
      </div>

      <!-- ✅ Bouton Publier -->
      <div class="pt-3 text-right">
        <button
          @click="submitPost"
          class="px-6 py-2 rounded font-semibold transition"
          :class="darkMode
            ? 'bg-[#00BFFF] text-black hover:bg-[#33cfff]'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'"
        >
          Publier le job
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"

const darkMode = inject("darkMode", false)

interface JobForm {
  title: string
  category: string
  description: string
  duration: number | null
  durationType: string
  budget: number | null
  skills: string[]
}

const today = new Date().toLocaleDateString("fr-FR")

const form = ref<JobForm>({
  title: "",
  category: "",
  description: "",
  duration: null,
  durationType: "jours",
  budget: null,
  skills: [],
})

const newSkill = ref("")

const addSkill = (): void => {
  const skill = newSkill.value.trim()
  if (skill && !form.value.skills.includes(skill)) {
    form.value.skills.push(skill)
    newSkill.value = ""
  }
}

const removeSkill = (index: number): void => {
  form.value.skills.splice(index, 1)
}

const submitPost = (): void => {
  const durationText =
    form.value.duration && form.value.durationType
      ? `${form.value.duration} ${form.value.durationType}`
      : "Non spécifiée"

  const newJob = {
    ...form.value,
    duration: durationText,
    postedAt: today,
    id: Date.now(),
    hash: "0x" + Math.random().toString(16).slice(2, 10) + "...",
    applications: [],
  }

  console.log("✅ Nouveau job créé :", newJob)
  // 👉 Ici tu pourras l’envoyer à ton store ou backend
}
</script>

<style scoped>
input,
textarea,
select {
  outline: none;
}
</style>
