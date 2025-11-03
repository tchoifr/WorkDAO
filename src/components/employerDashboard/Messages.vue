<template>
  <section class="p-6 relative">
    <div class="flex justify-between items-center mb-6">
      <div class="relative flex items-center gap-2">
        <h2 class="text-xl font-semibold text-[#00BFFF]">
          💬 Conversations
        </h2>

        <!-- 🔵 Petite bulle de notifications -->
        <div
          v-if="store.unreadCount > 0"
          class="absolute -top-2 -right-3 bg-[#00BFFF] text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-[#0a2431] shadow-lg animate-pulse"
        >
          {{ store.unreadCount }}
        </div>
      </div>
    </div>

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

        <!-- 🔵 Badge par conversation (si tu veux le nombre de messages non lus par user plus tard) -->
        <button class="text-xs text-gray-400 hover:text-[#00BFFF]">
          Ouvrir 💬
        </button>
      </div>
    </div>

    <!-- 💬 Fenêtre flottante du chat -->
    <ChatWindow
      v-if="showChat && activeUserId"
      :conversation="store.messages"
      :otherUserId="activeUserId"
      @close="closeChat"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useConversationStore } from '../../store/conversationStore'
import { UsersStore } from '../../store/usersStore'
import ChatWindow from '../ChatWindow.vue'

/* 📦 Stores */
const store = useConversationStore()
const usersStore = UsersStore()
usersStore.loadFromStorage()

/* 👤 Utilisateur courant */
const currentUser = computed(() => usersStore.currentUser)

/* 💬 États du composant */
const activeUserId = ref<string | null>(null)
const showChat = ref(false)

/* 🚀 Chargement initial */
onMounted(async () => {
  if (currentUser.value?.id) {
    await store.fetchInbox(currentUser.value.id)
    await store.fetchUnreadCount(currentUser.value.id)
  } else {
    console.warn('⚠️ Aucun utilisateur connecté — impossible de charger la boîte de réception')
  }
})

/* 🟦 Ouvrir une conversation */
const openConversation = async (conv: any) => {
  activeUserId.value = conv.otherUserId
  await store.fetchConversation(conv.otherUserId)
  showChat.value = true

  // ✅ Met tous les messages comme lus (remet compteur à 0)
  if (currentUser.value?.id) {
    store.unreadCount = 0
  }
}

/* ❌ Fermer la fenêtre de chat */
const closeChat = () => {
  showChat.value = false
  activeUserId.value = null
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}
.animate-pulse {
  animation: pulse 1.5s infinite;
}
</style>
