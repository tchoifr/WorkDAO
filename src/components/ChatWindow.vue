<template>
  <div
    class="fixed bottom-5 right-5 w-96 rounded-lg shadow-lg overflow-hidden flex flex-col z-50"
    :class="darkMode
      ? 'bg-[#0a2431] border border-[#00BFFF]/30'
      : 'bg-white border border-gray-200'"
  >
    <!-- 🧭 En-tête -->
    <div
      class="flex justify-between items-center px-4 py-3 font-semibold border-b"
      :class="darkMode ? 'border-gray-700 text-[#00BFFF]' : 'border-gray-200 text-gray-800'"
    >
      💬 {{ conversation.freelancer || conversation.company }}
      <button @click="emit('close')" class="text-sm hover:opacity-70">✖</button>
    </div>

    <!-- 💬 Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
      <div
        v-for="(msg, index) in conversation.messages"
        :key="index"
        :class="msg.from === 'employer' ? 'text-right' : 'text-left'"
      >
        <div
          class="inline-block px-3 py-2 rounded-lg text-sm"
          :class="msg.from === 'employer'
            ? (darkMode ? 'bg-[#00BFFF]/30 text-white' : 'bg-indigo-500 text-white')
            : (darkMode ? 'bg-[#09202c] text-gray-100' : 'bg-gray-100 text-gray-800')"
        >
          {{ msg.text }}
        </div>
        <p class="text-xs mt-1 text-gray-400">{{ msg.time }}</p>
      </div>
    </div>

    <!-- 📝 Zone de saisie -->
    <div class="p-3 border-t" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Écrire un message..."
        class="w-full px-3 py-2 rounded-md text-sm outline-none transition"
        :class="darkMode
          ? 'bg-[#091d2a] text-gray-100 border border-[#00BFFF]/30 focus:border-[#00BFFF]/60'
          : 'bg-gray-50 border border-gray-300 text-gray-700 focus:border-indigo-500'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue"
import type { Conversation } from "../store/conversationStore"
import { addMessage } from "../store/conversationStore"

const props = defineProps<{
  conversation: Conversation
}>()

// ✅ On émet un événement "close" vers MessagesEmployer
const emit = defineEmits(["close"])

const darkMode = inject<boolean>("darkMode", false)
const newMessage = ref("")

// ✅ Envoi d’un message côté employeur
const sendMessage = (): void => {
  if (!newMessage.value.trim()) return
  addMessage(props.conversation.id, "employer", newMessage.value)
  newMessage.value = ""
}
</script>

<style scoped>
/* ✅ Légère animation de la fenêtre */
div.fixed {
  animation: slideUp 0.25s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(15px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
