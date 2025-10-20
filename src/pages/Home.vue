<template>
  <section class="bg-white text-gray-800">
    <div class="container mx-auto px-4 py-20 flex flex-col items-center text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        Rejoignez la révolution du travail Web3
      </h1>
      <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
        WorkDAO connecte freelances et entreprises dans un écosystème décentralisé, 
        transparent et sans intermédiaires. Gagnez, collaborez et gouvernez avec la blockchain.
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink
          to="/freelance"
          class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          Je suis Freelance
        </RouterLink>
        <RouterLink
          to="/employer"
          class="px-6 py-3 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
        >
          Trouvez un talent
        </RouterLink>
      </div>

     <img
  src="/public/illustration-workdar.svg"
  alt="Illustration Web3"
  class="mt-16 w-full max-w-3xl"
/>

    </div>

    <div class="bg-indigo-50 py-16 mt-10">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-semibold mb-8">Pourquoi choisir WorkDAO ?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-2 text-indigo-700">🌍 Décentralisé</h3>
            <p>Plus d’intermédiaires : vos paiements sont sécurisés via smart contracts.</p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2 text-indigo-700">💰 Transparent</h3>
            <p>Chaque mission, chaque transaction est vérifiable sur la blockchain.</p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2 text-indigo-700">🪙 Récompensé</h3>
            <p>Gagnez des tokens $WORK pour chaque mission ou contribution à la DAO.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
