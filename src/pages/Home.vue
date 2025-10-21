<template>
  <section
    class="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
  >
    <!-- Image de fond -->
    <img
      src="../assets/header.jpg"
      alt="Fond WorkDAO"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <!-- Overlay dégradé bleu néon -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/70 via-[#031d28]/80 to-[#0a2431]/90"
    ></div>

    <!-- Contenu principal -->
    <div class="relative z-10 px-6 max-w-5xl">
      <h1
        class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-[#38BDF8] drop-shadow-[0_0_10px_#38BDF8]"
      >
        Rejoignez la révolution du travail Web3
      </h1>

      <p class="text-lg md:text-2xl text-gray-200 mb-10 leading-relaxed">
        WorkDAO connecte freelances et entreprises dans un écosystème décentralisé,  
        transparent et sans intermédiaires. <br />
        Gagnez, collaborez et gouvernez avec la blockchain.
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink
          to="/freelance"
          class="px-8 py-3 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-lg transition shadow-[0_0_10px_#00BFFF]"
        >
          🚀 Je suis Freelance
        </RouterLink>

        <RouterLink
          to="/employer"
          class="px-8 py-3 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-lg transition shadow-[0_0_10px_#00BFFF]"
        >
          👥 Trouvez un talent
        </RouterLink>
      </div>
    </div>

    <!-- Dégradé de bas de page -->
    <div
      class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#031d28] to-transparent"
    ></div>
  </section>

  <!-- Section suivante -->
  <section class="bg-[#031d28] text-white py-20">
    <div class="container mx-auto px-6 text-center">
      <h2
        class="text-3xl font-bold mb-12 text-[#38BDF8] drop-shadow-[0_0_6px_#38BDF8]"
      >
        Pourquoi choisir WorkDAO ?
      </h2>

      <div class="grid md:grid-cols-3 gap-10">
        <div
          class="bg-[#0a2431] p-6 rounded-xl shadow-lg border border-[#00BFFF]/30 hover:border-[#00BFFF]/60 transition"
        >
          <h3 class="text-xl font-bold mb-2 text-[#00BFFF]">🌍 Décentralisé</h3>
          <p>Plus d’intermédiaires : vos paiements sont sécurisés via smart contracts.</p>
        </div>

        <div
          class="bg-[#0a2431] p-6 rounded-xl shadow-lg border border-[#00BFFF]/30 hover:border-[#00BFFF]/60 transition"
        >
          <h3 class="text-xl font-bold mb-2 text-[#00BFFF]">💰 Transparent</h3>
          <p>Chaque mission et transaction est vérifiable sur la blockchain.</p>
        </div>

        <div
          class="bg-[#0a2431] p-6 rounded-xl shadow-lg border border-[#00BFFF]/30 hover:border-[#00BFFF]/60 transition"
        >
          <h3 class="text-xl font-bold mb-2 text-[#00BFFF]">🪙 Récompensé</h3>
          <p>Gagnez des tokens $WORK pour chaque mission ou contribution à la DAO.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
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

section:first-of-type {
  animation: fadeIn 1s ease-out;
}
</style>
