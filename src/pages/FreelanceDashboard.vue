<template>
  <section class="container mx-auto px-4 py-20">
    <h1 class="text-4xl font-bold mb-6 text-indigo-600 text-center">
      💼 Tableau de bord Freelance
    </h1>

    <p class="text-gray-700 text-center max-w-2xl mx-auto mb-12">
      Bienvenue sur votre espace <b>freelance</b>.  
      Ici, vous pouvez consulter les missions disponibles, suivre vos projets en cours  
      et gérer vos paiements directement sur la blockchain via WorkDAO.
    </p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Bloc 1 -->
      <div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition">
        <h2 class="text-lg font-semibold mb-2 text-indigo-600">🔍 Trouver une mission</h2>
        <p class="text-gray-600 mb-4">Explorez les offres actives et postulez en quelques clics.</p>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Voir les missions
        </button>
      </div>

      <!-- Bloc 2 -->
      <div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition">
        <h2 class="text-lg font-semibold mb-2 text-indigo-600">💰 Paiements sécurisés</h2>
        <p class="text-gray-600 mb-4">Suivez vos paiements sur la blockchain et débloquez vos fonds en escrow.</p>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Voir mes paiements
        </button>
      </div>

      <!-- Bloc 3 -->
      <div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition">
        <h2 class="text-lg font-semibold mb-2 text-indigo-600">🏅 Mes badges NFT</h2>
        <p class="text-gray-600 mb-4">Visualisez vos certificats NFT de missions terminées.</p>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Voir mes NFT
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Logique future : récupération des missions + connexion wallet
</script>

<style scoped>
/* Style optionnel local */
</style>
