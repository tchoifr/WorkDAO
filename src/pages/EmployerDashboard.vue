<template>
  <section class="container mx-auto px-4 py-20">
    <h1 class="text-4xl font-bold mb-6 text-indigo-600 text-center">
      🧑‍💼 Tableau de bord Employeur
    </h1>

    <p class="text-gray-700 text-center max-w-2xl mx-auto mb-12">
      Bienvenue sur votre espace <b>employeur</b>.  
      Ici, vous pourrez publier des missions, suivre leur avancement  
      et gérer les paiements de vos freelances en toute transparence via la blockchain.
    </p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition">
        <h2 class="text-lg font-semibold mb-2 text-indigo-600">Créer une mission</h2>
        <p class="text-gray-600 mb-4">Publiez une nouvelle mission et fixez un budget.</p>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Nouvelle mission
        </button>
      </div>

      <div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition">
        <h2 class="text-lg font-semibold mb-2 text-indigo-600">Suivre les projets</h2>
        <p class="text-gray-600 mb-4">Consultez la liste des missions en cours ou terminées.</p>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Voir mes missions
        </button>
      </div>

      <div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition">
        <h2 class="text-lg font-semibold mb-2 text-indigo-600">Paiements sécurisés</h2>
        <p class="text-gray-600 mb-4">
          Gérez vos dépôts de garantie (escrow) et validez les paiements finalisés.
        </p>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Gérer mes paiements
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Logique future : appel API ou intégration blockchain (escrow, DAO)
</script>

<style scoped>
/* Style optionnel local */
</style>
