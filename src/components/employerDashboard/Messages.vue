<template>
  <section class="p-6 transition-colors duration-500">
    <h2
      class="text-xl font-semibold mb-6"
      :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
    >
      💬 Conversations
    </h2>

    <!-- 🗂️ Liste des conversations -->
    <div
      v-for="conv in conversations"
      :key="conv.id"
      class="relative rounded-lg shadow p-5 mb-4 transition border-l-4 cursor-pointer"
      @click="openAndMarkAsRead(conv.id)"
      :class="[
        darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60 hover:bg-[#0d3144]'
          : 'bg-white border-gray-200 hover:bg-gray-50',
        hasUnreadFor(conv, 'employer') ? 'border-l-[#00BFFF]' : 'border-l-gray-400'
      ]"
    >
      <!-- 🔵 Bulle bleue = messages non lus -->
      <div
        v-if="countUnreadFor(conv, 'employer') > 0"
        class="absolute -top-2 -right-2 bg-[#00BFFF] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow"
      >
        {{ countUnreadFor(conv, 'employer') }}
      </div>

      <div class="flex justify-between items-center">
        <div>
          <h3
            class="font-semibold mb-1"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
          >
            {{ conv.freelancer }}
          </h3>
          <p class="text-sm" :class="darkMode ? 'text-gray-300' : 'text-gray-600'">
            Projet : <b>{{ conv.project }}</b>
          </p>
        </div>
      </div>
    </div>

    <!-- 💬 Fenêtre de chat -->
    <ChatWindow
      v-if="activeConversation"
      :conversation="activeConversation"
      @close="closeConversation"
    />
  </section>
</template>

<script setup lang="ts">
import { inject, computed, ref } from "vue"
import ChatWindow from "../ChatWindow.vue"
import { hasUnreadFor } from "../../utlis/messageHelpers"

type UserRole = "freelancer" | "employer"

interface Message {
  from: UserRole
  text: string
  time: string
  readByEmployer: boolean
  readByFreelancer: boolean
}

interface Conversation {
  id: number
  freelancer: string
  company: string
  project: string
  active: boolean
  messages: Message[]
}

const darkMode = inject<boolean>("darkMode", false)
const activeConversationId = ref<number | null>(null)

// ✅ Conversations d’exemple
const conversations = ref<Conversation[]>([
  {
    id: 1,
    freelancer: "Emma Laurent",
    company: "DevCorp",
    project: "Smart Contract Marketplace",
    active: true,
    messages: [
      {
        from: "freelancer",
        text: "Bonjour, j’ai terminé la première version du contrat ✅",
        time: "2025-10-21 10:30",
        readByEmployer: false,
        readByFreelancer: true,
      },
      {
        from: "employer",
        text: "Super, je regarde ça !",
        time: "2025-10-21 11:00",
        readByEmployer: true,
        readByFreelancer: true,
      },
    ],
  },
  {
    id: 2,
    freelancer: "Noah Dupuis",
    company: "Polygon Team",
    project: "Audit Web3",
    active: true,
    messages: [
      {
        from: "freelancer",
        text: "Avez-vous pu consulter le rapport d’audit ?",
        time: "2025-10-22 09:00",
        readByEmployer: false,
        readByFreelancer: true,
      },
    ],
  },
])

// ✅ Conversation active
const activeConversation = computed(() =>
  conversations.value.find((c) => c.id === activeConversationId.value) || null
)

// ✅ Ouvrir conversation + marquer messages du freelance comme lus
const openAndMarkAsRead = (id: number): void => {
  const conv = conversations.value.find((c) => c.id === id)
  if (!conv) return

  conv.messages.forEach((m) => {
    if (m.from === "freelancer") m.readByEmployer = true
  })
  activeConversationId.value = id
}

// ✅ Fermer conversation
const closeConversation = (): void => {
  activeConversationId.value = null
}

// ✅ Compte les messages non lus côté employeur
const countUnreadFor = (conv: Conversation, role: UserRole): number => {
  return conv.messages.filter(
    (m) => m.from !== role && !m[`readBy${role === "employer" ? "Employer" : "Freelancer"}`]
  ).length
}
</script>

<style scoped>
.cursor-pointer {
  transition: transform 0.2s ease, background-color 0.3s ease;
}
.cursor-pointer:hover {
  transform: translateY(-2px);
}
</style>
