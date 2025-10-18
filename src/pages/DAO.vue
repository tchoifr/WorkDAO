<template>
  <section class="container mx-auto px-4 py-20 text-center">
    <h1 class="text-4xl font-bold mb-6 text-indigo-600">🏛️ Gouvernance DAO</h1>
    <p class="text-gray-700 max-w-2xl mx-auto mb-8">
      Bienvenue dans la <b>DAO WorkDAO</b> !  
      Ici, les membres votent sur les propositions, la distribution des tokens
      et les évolutions du protocole.  
      La transparence et la décentralisation sont au cœur de notre écosystème.
    </p>

    <div class="grid md:grid-cols-2 gap-8 mt-12">
      <!-- Propositions -->
      <div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition">
        <h2 class="text-xl font-semibold text-indigo-600 mb-3">📜 Propositions en cours</h2>
        <ul class="text-left text-gray-600 space-y-3">
          <li>✅ Mettre à jour le taux de staking à 8%</li>
          <li>🕒 Lancer le programme ambassadeur WorkDAO</li>
          <li>💡 Ajouter le support pour Polygon zkEVM</li>
        </ul>
        <button class="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Créer une proposition
        </button>
      </div>

      <!-- Votes -->
      <div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition">
        <h2 class="text-xl font-semibold text-indigo-600 mb-3">🗳️ Vos votes récents</h2>
        <p class="text-gray-600 mb-4">Suivez votre activité de gouvernance.</p>
        <ul class="text-left text-gray-600 space-y-3">
          <li>✔️ Proposition #24 : Acceptée</li>
          <li>❌ Proposition #22 : Rejetée</li>
          <li>🕒 Proposition #21 : En cours</li>
        </ul>
        <button class="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Voir l’historique complet
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Logique future : intégration Snapshot / Smart Contract DAO
</script>

<style scoped>
/* Style optionnel local */
</style>
