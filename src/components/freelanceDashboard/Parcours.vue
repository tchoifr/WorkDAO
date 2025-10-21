<template>
  <section class="p-6 transition-colors duration-500">
    <div
      class="rounded-2xl shadow-xl p-6 space-y-8 border transition-all duration-500"
      :class="darkMode
        ? 'bg-[#0a2431] border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
        : 'bg-white border-gray-200 hover:border-indigo-200'"
    >

      <!-- 👤 ABOUT -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold" :class="titleClass">👤 About Me</h3>
          <button
            @click="toggleAboutEdit"
            class="px-3 py-1.5 text-sm rounded-md font-semibold shadow transition"
            :class="darkMode
              ? 'bg-[#00BFFF]/80 hover:bg-[#00BFFF] text-gray-900'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'"
          >
            {{ editingAbout ? '💾 Save' : '✏️ Edit' }}
          </button>
        </div>

        <transition name="fade">
          <template v-if="editingAbout">
            <textarea
              v-model="aboutText"
              rows="4"
              class="w-full rounded-lg px-4 py-3 border text-sm leading-relaxed focus:outline-none transition-all resize-none"
              :class="darkMode
                ? 'bg-[#09202c] border-[#00BFFF]/30 text-gray-100 focus:border-[#00BFFF]'
                : 'bg-gray-50 border-gray-300 text-gray-800 focus:border-indigo-500'"
            ></textarea>
          </template>

          <template v-else>
            <p
              class="leading-relaxed text-justify"
              :class="darkMode ? 'text-gray-300' : 'text-gray-700'"
            >
              {{ aboutText }}
            </p>
          </template>
        </transition>
      </div>

      <!-- 💼 EXPERIENCE -->
      <div>
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold" :class="titleClass">
            💼 Professional Experience
          </h3>

          <button
            @click="toggleForm"
            class="px-3 py-1.5 text-sm rounded-md font-semibold shadow transition"
            :class="darkMode
              ? 'bg-[#00BFFF]/80 hover:bg-[#00BFFF] text-gray-900'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'"
          >
            {{ showForm ? 'Cancel' : '➕ Add Experience' }}
          </button>
        </div>

        <!-- FORM -->
        <transition name="fade">
          <form
            v-if="showForm"
            @submit.prevent="saveExperience"
            class="space-y-3 p-5 rounded-lg border transition-all duration-300"
            :class="darkMode
              ? 'bg-[#09202c] border-[#00BFFF]/30'
              : 'bg-indigo-50 border-indigo-200'"
          >
            <div class="grid md:grid-cols-2 gap-4">
              <input v-model="form.title" type="text" placeholder="Job Title" class="input-field" :class="inputClass" required />
              <input v-model="form.company" type="text" placeholder="Company" class="input-field" :class="inputClass" required />
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <input v-model="form.year" type="text" placeholder="2025 - Present" class="input-field" :class="inputClass" required />
              <input v-model="form.description" type="text" placeholder="Short description" class="input-field" :class="inputClass" required />
            </div>

            <button type="submit" class="btn-save" :class="btnClass">
              {{ editId ? '💾 Update Experience' : '✅ Add Experience' }}
            </button>
          </form>
        </transition>

        <!-- EXPERIENCE LIST -->
        <transition-group name="list" tag="ul" class="space-y-4 mt-5">
          <li
            v-for="exp in experiences"
            :key="exp.id"
            class="border-l-4 rounded-lg pl-4 pr-3 py-3 flex justify-between items-start shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300"
            :class="darkMode ? 'border-[#00BFFF]/60 bg-[#09202c]' : 'border-indigo-400 bg-gray-50'"
          >
            <div>
              <h4 :class="darkMode ? 'text-gray-100 font-semibold' : 'text-gray-800 font-semibold'">
                {{ exp.title }}
              </h4>
              <p :class="darkMode ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'">{{ exp.company }}</p>
              <p :class="darkMode ? 'text-gray-400 text-sm mt-1' : 'text-gray-500 text-sm mt-1'">{{ exp.description }}</p>
            </div>

            <div class="flex flex-col items-end gap-2 ml-4">
              <span class="text-xs opacity-70" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">{{ exp.year }}</span>
              <div class="flex gap-2">
                <button @click="editExperience(exp)" class="text-sm hover:scale-110 transition" :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'">✏️</button>
                <button @click="deleteExperience(exp.id)" class="text-sm hover:scale-110 transition" :class="darkMode ? 'text-red-400' : 'text-red-600'">🗑️</button>
              </div>
            </div>
          </li>
        </transition-group>
      </div>

      <!-- 🎓 EDUCATION -->
      <div>
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold" :class="titleClass">🎓 Education</h3>
          <button
            @click="toggleEduForm"
            class="px-3 py-1.5 text-sm rounded-md font-semibold shadow transition"
            :class="darkMode
              ? 'bg-[#00BFFF]/80 hover:bg-[#00BFFF] text-gray-900'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'"
          >
            {{ showEduForm ? 'Cancel' : '➕ Add Education' }}
          </button>
        </div>

        <transition name="fade">
          <form
            v-if="showEduForm"
            @submit.prevent="addEducation"
            class="space-y-3 p-5 rounded-lg border transition-all duration-300"
            :class="darkMode
              ? 'bg-[#09202c] border-[#00BFFF]/30'
              : 'bg-indigo-50 border-indigo-200'"
          >
            <div class="grid md:grid-cols-2 gap-4">
              <input v-model="newEdu.degree" type="text" placeholder="Degree" class="input-field" :class="inputClass" required />
              <input v-model="newEdu.school" type="text" placeholder="School / University" class="input-field" :class="inputClass" required />
            </div>

            <input v-model="newEdu.year" type="text" placeholder="Graduation Year" class="input-field w-full" :class="inputClass" required />

            <button type="submit" class="btn-save" :class="btnClass">✅ Add Education</button>
          </form>
        </transition>

        <ul class="space-y-3 mt-4">
          <li
            v-for="edu in education"
            :key="edu.id"
            class="flex justify-between border-b pb-2"
            :class="darkMode ? 'border-gray-700' : 'border-gray-200'"
          >
            <div>
              <p class="font-semibold" :class="darkMode ? 'text-gray-100' : 'text-gray-800'">{{ edu.degree }}</p>
              <p :class="darkMode ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'">{{ edu.school }}</p>
            </div>
            <span :class="darkMode ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'">{{ edu.year }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, inject, computed, watch } from "vue"

interface Experience {
  id: number
  title: string
  company: string
  year: string
  description: string
}

interface Education {
  id: number
  degree: string
  school: string
  year: string
}

const darkMode = inject("darkMode", false)

const titleClass = computed(() => (darkMode ? "text-[#00BFFF]" : "text-indigo-700"))
const inputClass = computed(() =>
  darkMode
    ? "bg-[#0a2431] border-[#00BFFF]/30 text-gray-100 focus:border-[#00BFFF]"
    : "bg-white border-gray-300 text-gray-800 focus:border-indigo-500"
)
const btnClass = computed(() =>
  darkMode
    ? "bg-[#00BFFF]/90 hover:bg-[#00BFFF] text-gray-900"
    : "bg-indigo-600 hover:bg-indigo-700 text-white"
)

// 👤 ABOUT ME
const aboutText = ref(localStorage.getItem("aboutText") || 
  "Passionate Web3 developer specialized in smart contract development and decentralized applications. Experienced in Solidity, TypeScript, and blockchain integrations across Ethereum and Polygon networks."
)
const editingAbout = ref(false)
const toggleAboutEdit = () => {
  editingAbout.value = !editingAbout.value
  if (!editingAbout.value) localStorage.setItem("aboutText", aboutText.value)
}

// 💼 EXPERIENCES
const experiences = ref<Experience[]>(JSON.parse(localStorage.getItem("experiences") || "[]"))
if (!experiences.value.length) {
  experiences.value = [
    {
      id: 1,
      title: "Smart Contract Developer",
      company: "Polygon Labs",
      year: "2024 - Present",
      description: "Developed ERC-721/1155 contracts and optimized gas usage for NFT minting systems."
    },
    {
      id: 2,
      title: "Web3 Frontend Engineer",
      company: "DAO Collective",
      year: "2023 - 2024",
      description: "Built decentralized dashboards and integrated MetaMask, WalletConnect, and ENS features."
    }
  ]
}

const showForm = ref(false)
const editId = ref<number | null>(null)
const form = ref<Omit<Experience, "id">>({ title: "", company: "", year: "", description: "" })

const toggleForm = () => {
  showForm.value = !showForm.value
  if (!showForm.value) {
    form.value = { title: "", company: "", year: "", description: "" }
    editId.value = null
  }
}

const saveExperience = () => {
  if (!form.value.title || !form.value.company || !form.value.year) return

  if (editId.value) {
    const index = experiences.value.findIndex((e: Experience) => e.id === editId.value)
    if (index !== -1) experiences.value[index] = { id: editId.value, ...form.value }
  } else {
    experiences.value.push({ id: Date.now(), ...form.value })
  }

  localStorage.setItem("experiences", JSON.stringify(experiences.value))
  toggleForm()
}

const editExperience = (exp: Experience) => {
  form.value = { ...exp }
  editId.value = exp.id
  showForm.value = true
}

const deleteExperience = (id: number) => {
  experiences.value = experiences.value.filter((e: Experience) => e.id !== id)
  localStorage.setItem("experiences", JSON.stringify(experiences.value))
}

watch(experiences, (val) => localStorage.setItem("experiences", JSON.stringify(val)), { deep: true })

// 🎓 EDUCATION
const education = ref<Education[]>(JSON.parse(localStorage.getItem("education") || "[]"))
if (!education.value.length) {
  education.value = [
    { id: 1, degree: "Master’s in Computer Science", school: "Université de Paris", year: "2022" },
    { id: 2, degree: "Blockchain Development Certificate", school: "Alchemy Academy", year: "2023" }
  ]
}

const showEduForm = ref(false)
const newEdu = ref<Omit<Education, "id">>({ degree: "", school: "", year: "" })

const toggleEduForm = () => (showEduForm.value = !showEduForm.value)

const addEducation = () => {
  if (!newEdu.value.degree || !newEdu.value.school || !newEdu.value.year) return
  education.value.push({ id: Date.now(), ...newEdu.value })
  localStorage.setItem("education", JSON.stringify(education.value))
  newEdu.value = { degree: "", school: "", year: "" }
  showEduForm.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
