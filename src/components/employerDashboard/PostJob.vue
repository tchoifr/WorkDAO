<template>
  <section class="p-6 transition-colors duration-500">
    <div
      class="rounded-lg shadow-lg p-6 space-y-6 border transition"
      :class="darkMode
        ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60 hover:shadow-[#00BFFF]/20'
        : 'bg-white border border-gray-200 hover:shadow-xl'"
    >
      <h2 class="text-xl font-semibold" :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'">
        📝 Créer un job
      </h2>

      <!-- 🏷️ Titre -->
      <div>
        <label :class="labelClass">Titre du poste</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Ex : Développeur Smart Contract Solidity"
          class="w-full px-4 py-2 rounded-md border transition"
          :class="inputClass"
        />
      </div>

      <!-- 📂 Catégorie -->
      <div>
        <label :class="labelClass">Catégorie</label>
        <select
          v-model="form.category"
          class="w-full px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none shadow-sm"
          :class="selectClass"
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
        <label :class="labelClass">Description</label>
        <textarea
          v-model="form.description"
          rows="5"
          placeholder="Décrivez la mission, les objectifs et les attentes..."
          class="w-full px-4 py-2 rounded-md border transition resize-none"
          :class="inputClass"
        ></textarea>
      </div>

      <!-- ⏱️ Durée & Budget -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label :class="labelClass">Durée estimée</label>
          <div class="flex gap-2">
            <input
              v-model.number="form.duration"
              type="number"
              min="1"
              placeholder="Ex : 2"
              class="w-1/2 px-3 py-2 rounded-md border transition"
              :class="inputClass"
            />
            <select
              v-model="form.durationType"
              class="w-1/2 px-3 py-2 rounded-md text-sm transition"
              :class="selectClass"
            >
              <option value="jours">Jour(s)</option>
              <option value="semaines">Semaine(s)</option>
              <option value="mois">Mois</option>
            </select>
          </div>
        </div>

        <div>
          <label :class="labelClass">Budget (WORK)</label>
          <input
            v-model.number="form.budget"
            type="number"
            placeholder="Ex : 800"
            class="w-full px-4 py-2 rounded-md border transition"
            :class="inputClass"
          />
        </div>
      </div>

      <!-- 🧠 Compétences -->
      <div>
        <label :class="labelClass">Compétences requises</label>

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
            :class="inputClass"
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

      <!-- ✅ Bouton Publier -->
      <div class="pt-3 text-right">
        <button
          @click="submitJob"
          class="px-6 py-2 rounded font-semibold transition"
          :class="darkMode
            ? 'bg-[#00BFFF] text-black hover:bg-[#33cfff]'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'"
        >
          Publier le job
        </button>
      </div>

      <div v-if="message" class="text-green-500 font-semibold">{{ message }}</div>
      <div v-if="error" class="text-red-500 font-semibold">{{ error }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { useJobsStore } from '../../store/jobsStore'

const jobsStore = useJobsStore()
const darkMode = inject('darkMode', false)

interface JobForm {
  title: string
  category: string
  description: string
  duration: number | null
  durationType: string
  budget: number | null
  skills: string[]
}

const form = ref<JobForm>({
  title: '',
  category: '',
  description: '',
  duration: null,
  durationType: 'jours',
  budget: null,
  skills: [],
})

const newSkill = ref('')
const message = ref<string | null>(null)
const error = ref<string | null>(null)

const labelClass = computed(() =>
  darkMode ? 'block text-sm font-semibold mb-1 text-[#00BFFF]' : 'block text-sm font-semibold mb-1 text-indigo-700'
)

const inputClass = computed(() =>
  darkMode
    ? 'bg-[#0d2f42] border-[#00BFFF]/30 text-gray-100 placeholder-gray-400 focus:border-[#00BFFF]'
    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500'
)

const selectClass = computed(() =>
  darkMode
    ? 'bg-[#031d28] text-white border border-[#00BFFF]/40 focus:border-[#00BFFF]'
    : 'bg-white text-gray-800 border border-gray-300 focus:border-indigo-500'
)

// ➕ Ajouter compétence
const addSkill = (): void => {
  const skill = newSkill.value.trim()
  if (skill && !form.value.skills.includes(skill)) {
    form.value.skills.push(skill)
    newSkill.value = ''
  }
}

// ❌ Supprimer compétence
const removeSkill = (index: number): void => {
  form.value.skills.splice(index, 1)
}

// 📨 Soumission du job
const submitJob = async (): Promise<void> => {
  try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

    if (!currentUser || !currentUser.id) {
      error.value = '❌ Impossible de publier : utilisateur non connecté.'
      return
    }

    const payload = {
      recruiterId: currentUser.id,
      title: form.value.title.trim(),
      description: form.value.description.trim(),
      budget: String(form.value.budget ?? '0'),
      currency: 'WORK',
      status: 'open',
      category: form.value.category || '',
      duration: form.value.duration
        ? `${form.value.duration} ${form.value.durationType}`
        : '',
      skills: form.value.skills ?? [],
    }

    console.log('📤 Envoi du payload à l’API :', payload)

    const job = await jobsStore.createJob(payload)

    console.log('✅ Job créé depuis le backend :', job)
    message.value = `✅ Job "${job.title}" créé avec succès !`
    error.value = null

    form.value = {
      title: '',
      category: '',
      description: '',
      duration: null,
      durationType: 'jours',
      budget: null,
      skills: [],
    }
  } catch (e) {
    console.error('❌ Erreur création job :', e)
    error.value = jobsStore.error || 'Erreur lors de la création du job.'
    message.value = null
  }
}
</script>
