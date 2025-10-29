<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold mb-6 text-[#00BFFF]">💬 Conversations</h2>

    <!-- 🕓 Loading -->
    <div v-if="store.loading" class="text-gray-500 text-center">
      Chargement...
    </div>

    <!-- 📭 Aucune conversation -->
    <div
      v-else-if="store.conversations.length === 0"
      class="text-gray-400 text-center"
    >
      Aucune conversation pour le moment.
    </div>

    <!-- 📋 Liste des conversations -->
    <div v-else class="space-y-3 mb-6">
      <div
        v-for="conv in store.conversations"
        :key="conv.otherUserId"
        class="p-4 rounded-lg border cursor-pointer transition flex justify-between items-center"
        :class="[
          activeUserId === conv.otherUserId
            ? 'bg-[#00BFFF]/10 border-[#00BFFF]'
            : 'bg-[#0a2431] border border-[#00BFFF]/20 hover:bg-[#112d42]'
        ]"
        @click="openConversation(conv)"
      >
        <div>
          <p class="font-semibold text-[#00BFFF]">
            {{ conv.username || conv.otherUserId }}
          </p>
          <p class="text-sm text-gray-300 truncate w-64">
            {{ conv.lastMessage || '...' }}
          </p>
        </div>
        <button class="text-xs text-gray-400 hover:text-[#00BFFF]">Ouvrir 💬</button>
      </div>
    </div>

    <!-- 💬 Messages de la conversation sélectionnée -->
    <div v-if="store.messages.length > 0" class="space-y-4">
      <div
        v-for="msg in store.messages"
        :key="msg.id"
        class="p-3 rounded-lg border shadow-sm"
        :class="msg.senderId === currentUser?.id ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'"
      >
        <p class="text-sm">{{ msg.content }}</p>
        <span class="text-xs text-gray-500">
          {{ new Date(msg.createdAt).toLocaleTimeString() }}
        </span>
      </div>
    </div>

    <!-- ✍️ Saisie -->
    <div v-if="activeUserId" class="mt-6 flex">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Écrire un message..."
        class="flex-1 border rounded-l px-3 py-2"
      />
      <button
        @click="send"
        class="bg-[#00BFFF] text-white px-4 rounded-r hover:bg-[#0099cc]"
      >
        Envoyer
      </button>
    </div>

    <!-- 💬 Fenêtre flottante (facultative) -->
    <ChatWindow
      v-if="showChat"
      :conversation="store.messages"
      :otherUserId="activeUserId!"
      @close="showChat = false"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useConversationStore } from '../../store/conversationStore'
import { UsersStore } from '../../store/usersStore'
import ChatWindow from '../ChatWindow.vue'

const store = useConversationStore()
const usersStore = UsersStore()
usersStore.loadFromStorage()

const currentUser = computed(() => usersStore.currentUser)
const newMessage = ref('')
const activeUserId = ref<string | null>(null)
const showChat = ref(false)

onMounted(async () => {
  if (currentUser.value?.id) {
    await store.fetchInbox(currentUser.value.id)
  } else {
    console.warn('⚠️ Aucun utilisateur connecté — impossible de charger la boîte de réception')
  }
})

const openConversation = async (conv: any) => {
  activeUserId.value = conv.otherUserId
  await store.fetchConversation(conv.otherUserId)
}

const send = async () => {
  if (!newMessage.value.trim() || !currentUser.value || !activeUserId.value) return
  await store.sendMessage(activeUserId.value, newMessage.value)
  newMessage.value = ''
}
</script>
