<template>
  <div
    class="mt-6 rounded-lg shadow p-6 border transition"
    :class="darkMode
      ? 'bg-[#0a2431] border border-[#00BFFF]/30'
      : 'bg-white border-gray-200'"
  >
    <h3
      class="text-lg font-semibold mb-4"
      :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-700'"
    >
      🧾 New Contract Details
    </h3>

    <form @submit.prevent="submitContract" class="space-y-4">
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold mb-1">Title</label>
          <input v-model="form.title" type="text" placeholder="Ex: Smart Contract Development"
            class="w-full px-3 py-2 rounded border"
            :class="inputStyle" required />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1">Freelancer Name</label>
          <input v-model="form.freelancer" type="text" placeholder="Freelancer Name"
            class="w-full px-3 py-2 rounded border"
            :class="inputStyle" required />
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Description</label>
        <textarea v-model="form.description" rows="4"
          placeholder="Describe tasks, goals, and expectations..."
          class="w-full px-3 py-2 rounded border resize-none"
          :class="inputStyle" required></textarea>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-semibold mb-1">Estimated Duration</label>
          <input v-model="form.duration" type="text" placeholder="e.g. 2 weeks"
            class="w-full px-3 py-2 rounded border"
            :class="inputStyle" required />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1">Total Hours</label>
          <input v-model.number="form.hours" type="number" placeholder="e.g. 40"
            class="w-full px-3 py-2 rounded border"
            :class="inputStyle" />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-1">Amount ($WORK)</label>
          <input v-model.number="form.amount" type="number" placeholder="e.g. 500"
            class="w-full px-3 py-2 rounded border"
            :class="inputStyle" required />
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Mission Points</label>
        <div v-for="(task, i) in form.missions" :key="i" class="flex gap-2 mb-2">
          <input v-model="form.missions[i]" type="text" placeholder="Describe mission step..."
            class="flex-1 px-3 py-2 rounded border"
            :class="inputStyle" />
          <button type="button" @click="removeMission(i)"
            class="px-2 py-1 text-red-500 text-sm hover:text-red-700">✖</button>
        </div>
        <button type="button" @click="addMission"
          class="text-sm text-[#00BFFF] hover:text-[#33cfff] mt-1">
          + Add Mission Point
        </button>
      </div>

      <div class="flex justify-end gap-3 pt-4">
        <button type="button" @click="$emit('cancel')"
          class="px-4 py-2 rounded-md font-semibold transition"
          :class="darkMode
            ? 'bg-[#091d2a] text-gray-300 hover:bg-[#00BFFF]/20'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
          Cancel
        </button>

        <button type="submit"
          class="px-5 py-2 rounded-md font-semibold transition"
          :class="darkMode
            ? 'bg-[#00BFFF] text-black hover:bg-[#33cfff]'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'">
          Save Contract
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue"

const darkMode = inject("darkMode", false)

interface Contract {
  id: number
  title: string
  freelancer: string
  description: string
  duration: string
  hours: number
  amount: number
  missions: string[]
  status: "Active" | "Pending" | "Completed" | "Dispute"
}

const form = ref<Contract>({
  id: Date.now(),
  title: "",
  freelancer: "",
  description: "",
  duration: "",
  hours: 0,
  amount: 0,
  missions: [],
  status: "Pending",
})

// Style
const inputStyle = computed(() =>
  darkMode
    ? "bg-[#0d2f42] border-[#00BFFF]/30 text-gray-100 placeholder-gray-400 focus:border-[#00BFFF]/60"
    : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500"
)

// Missions
const addMission = () => form.value.missions.push("")
const removeMission = (index: number) => form.value.missions.splice(index, 1)

// Soumission
const submitContract = () => {
  const newContract = { ...form.value, id: Date.now() }
  emit("save", newContract)
  form.value = {
    id: Date.now(),
    title: "",
    freelancer: "",
    description: "",
    duration: "",
    hours: 0,
    amount: 0,
    missions: [],
    status: "Pending",
  }
}

const emit = defineEmits(["save", "cancel"])
</script>
