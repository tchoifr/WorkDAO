<template>
  <section class="py-16 px-6 md:px-12 max-w-7xl mx-auto">
    <h2
      class="text-3xl font-bold mb-8 text-[#38BDF8] drop-shadow-[0_0_8px_#38BDF8] text-center"
    >
      {{ title }}
    </h2>

    <div v-if="loading" class="text-center py-16">
      <p class="text-gray-400 text-lg">Chargement...</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-[#0a2431] rounded-xl border border-[#00BFFF]/30 hover:border-[#00BFFF]/60 shadow-lg overflow-hidden transition-all duration-300"
      >
        <img
          v-if="post.image"
          :src="post.image"
          alt="Post"
          class="w-full h-96 object-cover"
        />
        <div class="p-6">
          <h3
            class="text-xl font-bold mb-2 text-[#00BFFF] drop-shadow-[0_0_6px_#00BFFF]"
          >
            {{ post.author }}
          </h3>
          <p class="text-sm text-gray-300 mb-4 leading-relaxed">
            {{ post.content }}
          </p>
          <div
            class="flex justify-between text-sm text-gray-400 border-t border-[#00BFFF]/20 pt-3"
          >
            <span>👍 {{ post.likes }}</span>
            <span>💬 {{ post.comments }}</span>
            <span>↪️ {{ post.shares }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  posts: any[]
  loading: boolean
}>()
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
