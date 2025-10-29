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
      💬 Chat
      <button @click="emit('close')" class="text-sm hover:opacity-70">✖</button>
    </div>

    <!-- 💬 Messages -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
      <div
        v-for="msg in conversation"
        :key="msg.id"
        :class="msg.senderId === currentUser?.id ? 'text-right' : 'text-left'"
      >
        <div
          class="inline-block px-3 py-2 rounded-lg text-sm"
          :class="msg.senderId === currentUser?.id
            ? (darkMode ? 'bg-[#00BFFF]/30 text-white' : 'bg-[#00BFFF] text-white')
            : (darkMode ? 'bg-[#09202c] text-gray-100' : 'bg-gray-200 text-gray-800')"
        >
          {{ msg.content }}
        </div>
        <p class="text-xs mt-1 text-gray-400">
          {{ new Date(msg.createdAt).toLocaleTimeString() }}
        </p>
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
          : 'bg-gray-50 border border-gray-300 text-gray-700 focus:border-[#00BFFF]'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, nextTick, watch } from 'vue'
import { useConversationStore } from '../store/conversationStore'
import { UsersStore } from '../store/usersStore'

const props = defineProps<{
  conversation: any[]
  otherUserId: string
}>()

const emit = defineEmits(['close'])
const darkMode = inject<boolean>('darkMode', false)
const newMessage = ref('')
const chatContainer = ref<HTMLDivElement | null>(null)

const store = useConversationStore()
const usersStore = UsersStore()
const currentUser = computed(() => usersStore.currentUser)

// 📨 Envoi
const sendMessage = async () => {
  if (!newMessage.value.trim() || !currentUser.value) return
  await store.sendMessage(props.otherUserId, newMessage.value)
  newMessage.value = ''
  await nextTick()
  chatContainer.value?.scrollTo({ top: chatContainer.value.scrollHeight, behavior: 'smooth' })
}

// 🔄 Scroll automatique quand les messages changent
watch(
  () => props.conversation.length,
  async () => {
    await nextTick()
    chatContainer.value?.scrollTo({ top: chatContainer.value.scrollHeight, behavior: 'smooth' })
  }
)
</script>
