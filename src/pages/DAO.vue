<template>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 text-white overflow-hidden"
  >
    <!-- Image de fond -->
    <img
      src="../assets/dao.jpg"
      alt="Gouvernance WorkDAO"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <!-- Overlay bleu sombre + effet lumière -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/70 via-[#031d28]/80 to-[#0a2431]/90"
    ></div>

    <!-- Contenu principal -->
    <div class="relative z-10 max-w-5xl">
      <h1
        class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-[#38BDF8] drop-shadow-[0_0_10px_#38BDF8]"
      >
        🏛️ Gouvernance WorkDAO
      </h1>

      <p class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-16 leading-relaxed">
        La <b>WorkDAO</b> est un système de gouvernance décentralisé permettant de
        valider, réguler et sécuriser les contrats entre les membres de
        l’écosystème.  
        Chaque vote, chaque mission, et chaque jeton
        <span class="text-[#00BFFF] font-semibold">$WORK</span>
        participent à la confiance collective.
      </p>

      <!-- Conditions d'accès -->
      <div
        class="bg-white/10 backdrop-blur-xl border border-[#00BFFF]/30 rounded-2xl shadow-[0_0_20px_#00BFFF40] p-8 max-w-3xl mx-auto mb-20 text-gray-100"
      >
        <h2 class="text-2xl font-semibold mb-4 text-[#00BFFF]">
          ⚖️ Conditions d’accès à la gouvernance
        </h2>
        <ul class="text-left space-y-3 text-gray-200 leading-relaxed">
          <li>✅ L’accès à la gouvernance est ouvert uniquement après la <b>validation d’un contrat</b> entre deux parties.</li>
          <li>💎 Il est nécessaire d’avoir effectué <b>au moins un staking $WORK</b> pour pouvoir voter ou proposer.</li>
          <li>⚔️ En cas de litige, <b>15 % des tokens $WORK bloqués</b> sont redistribués aux gouverneurs votants.</li>
          <li>🚫 En cas de <b>vente de service illégale</b>, le <b>compte fautif est suspendu</b> et <b>les $WORK gelés</b>.</li>
        </ul>
      </div>

      <!-- Grille DAO -->
      <div class="grid md:grid-cols-2 gap-10">
        <!-- Bloc des propositions -->
        <div
          class="bg-white/10 backdrop-blur-lg border border-[#00BFFF]/30 rounded-2xl p-8 hover:shadow-[0_0_20px_#00BFFF60] transition"
        >
          <h2 class="text-2xl font-semibold text-[#00BFFF] mb-4">
            📜 Propositions en cours
          </h2>
          <ul class="text-left space-y-3 text-gray-200">
            <li>✅ Mettre à jour le taux de staking à 8 %</li>
            <li>🕒 Lancer le programme ambassadeur WorkDAO</li>
            <li>💡 Ajouter le support du réseau Polygon zkEVM</li>
          </ul>
          <button
            class="mt-6 px-6 py-3 bg-[#00BFFF] hover:bg-[#1ec6ff] text-black font-semibold rounded-full transition shadow-[0_0_10px_#00BFFF]"
          >
            ➕ Créer une proposition
          </button>
        </div>

        <!-- Bloc des votes -->
        <div
          class="bg-white/10 backdrop-blur-lg border border-[#00BFFF]/30 rounded-2xl p-8 hover:shadow-[0_0_20px_#00BFFF60] transition"
        >
          <h2 class="text-2xl font-semibold text-[#00BFFF] mb-4">
            🗳️ Historique de vos votes
          </h2>
          <p class="text-gray-300 mb-4">
            Suivez vos décisions et leur impact sur la DAO.
          </p>
          <ul class="text-left space-y-3 text-gray-200">
            <li>✔️ Proposition #24 : Acceptée</li>
            <li>❌ Proposition #22 : Rejetée</li>
            <li>🕒 Proposition #21 : En cours</li>
          </ul>
          <button
            class="mt-6 px-6 py-3 bg-[#00BFFF] hover:bg-[#1ec6ff] text-black font-semibold rounded-full transition shadow-[0_0_10px_#00BFFF]"
          >
            📊 Voir l’historique complet
          </button>
        </div>
      </div>
    </div>

    <!-- Dégradé bas de page -->
    <div
      class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#031d28] to-transparent"
    ></div>
  </section>
</template>

<script setup lang="ts">
// Future: intégration avec smart contract DAO + Snapshot vote tracking
</script>

<style scoped>
section {
  animation: fadeIn 1.2s ease-out;
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
