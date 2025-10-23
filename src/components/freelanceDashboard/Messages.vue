<template>
  <section class="p-6 transition-colors duration-500">
    <h2
      class="text-xl font-semibold mb-6"
      :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
    >
      📬 Vos conversations
    </h2>

    <div
      v-for="conv in conversations"
      :key="conv.id"
      class="relative rounded-lg shadow p-5 mb-4 border-l-4 transition"
      :class="[
        darkMode
          ? 'bg-[#0a2431] border border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
          : 'bg-white border-gray-200',
        conv.active ? 'border-l-green-500' : 'border-l-yellow-500'
      ]"
    >
      <!-- 🔵 Bulle visible si non lu par freelance -->
      <div
        v-if="hasUnreadFor(conv, 'freelancer')"
        class="absolute -top-2 -right-2 bg-[#00BFFF] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow"
      >
        1
      </div>

      <div class="flex justify-between items-center">
        <div>
          <h3
            class="font-semibold"
            :class="darkMode ? 'text-[#00BFFF]' : 'text-gray-800'"
          >
            {{ conv.company }}
          </h3>
          <p class="text-sm" :class="darkMode ? 'text-gray-300' : 'text-gray-600'">
            Projet : <b>{{ conv.project }}</b>
          </p>
        </div>

        <button
          @click="openConversation(conv.id, 'freelancer')"
          :disabled="!conv.active"
          class="px-3 py-2 rounded-md text-sm font-semibold transition"
          :class="conv.active
            ? darkMode
              ? 'bg-[#00BFFF]/20 text-[#00BFFF] hover:bg-[#00BFFF]/30'
              : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
        >
          {{ conv.active ? 'Ouvrir' : 'En attente' }}
        </button>
      </div>

      <div class="mt-3 text-sm" :class="darkMode ? 'text-gray-200' : 'text-gray-700'">
        <b>{{ conv.company }}</b> :
        {{ conv.messages[conv.messages.length - 1].text }}
      </div>
    </div>

    <ChatWindow v-if="activeConversation" :conversation="activeConversation" />
  </section>
</template>

<script setup lang="ts">
import { inject, computed } from "vue"
import ChatWindow from "../ChatWindow.vue"
import {
  conversations,
  activeConversationId,
  openConversation,
} from "../../store/conversationStore"
import { hasUnreadFor } from "../../utlis/messageHelpers"

const darkMode = inject<boolean>("darkMode", false)

const activeConversation = computed(() =>
  conversations.value.find((c) => c.id === activeConversationId.value) || null
)
</script>
