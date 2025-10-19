<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold mb-4 text-indigo-700">💬 Messages récents</h2>

    <div class="bg-white rounded-lg shadow divide-y">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="flex items-start justify-between p-4 hover:bg-gray-50 transition"
      >
        <div class="flex space-x-3">
          <img
            :src="msg.avatar"
            alt="avatar"
            class="w-12 h-12 rounded-full border border-indigo-200"
          />
          <div>
            <h3 class="font-semibold text-gray-800">{{ msg.from }}</h3>
            <p class="text-gray-600 text-sm">{{ msg.text }}</p>
            <span class="text-xs text-gray-400">{{ msg.time }}</span>
          </div>
        </div>

        <button
          class="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition"
        >
          Répondre
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const messages = [
  {
    id: 1,
    from: "DevCorp Agency",
    text: "Bonjour Lisa, pouvez-vous livrer la mise à jour du smart contract avant mardi ?",
    time: "Il y a 2h",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    from: "Polygon Team",
    text: "Merci pour votre travail sur le déploiement — excellent rendu ! 🎉",
    time: "Hier",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    from: "DAO Collective",
    text: "Votre proposition de contrat DAO est validée. On passe au vote !",
    time: "Il y a 3 jours",
    avatar: "https://randomuser.me/api/portraits/men/57.jpg",
  },
]
</script>
