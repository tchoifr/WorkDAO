<template>
  <section class="container mx-auto px-6 py-20 text-center">
    <h1 class="text-4xl font-bold mb-6 text-indigo-600">🏛️ Gouvernance WorkDAO</h1>
    <p class="text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed">
      La <b>WorkDAO</b> est un système de gouvernance décentralisé permettant de valider, réguler et sécuriser les
      contrats conclus entre les membres de l’écosystème.  
      Chaque vote, chaque mission, et chaque jeton $WORK participe à la confiance collective.
    </p>

    <!-- Conditions d'accès -->
    <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto mb-16 text-gray-100">
      <h2 class="text-2xl font-semibold mb-4 text-indigo-300">⚖️ Conditions d’accès à la gouvernance</h2>
      <ul class="text-left space-y-3">
        <li>✅ L’accès à la gouvernance est ouvert uniquement après la <b>validation d’un contrat</b> entre deux parties.</li>
        <li>💎 Il est nécessaire d’avoir effectué <b>au moins un staking $WORK</b> pour pouvoir voter ou proposer.</li>
        <li>⚔️ En cas de litige, <b>15 % des tokens $WORK bloqués</b> pour la mission sont automatiquement <b>redistribués aux gouverneurs votants</b>.</li>
        <li>🚫 En cas de <b>vente de service illégale</b> ou violation du protocole, le <b>compte fautif est suspendu</b>, <b>l’annonce supprimée</b> et <b>tous les $WORK gelés</b>.</li>
      </ul>
    </div>

    <div class="grid md:grid-cols-2 gap-10">
      <!-- Bloc des propositions -->
      <div class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:shadow-2xl transition">
        <h2 class="text-2xl font-semibold text-indigo-300 mb-4">📜 Propositions en cours</h2>
        <ul class="text-left space-y-3 text-gray-200">
          <li>✅ Mettre à jour le taux de staking à 8 %</li>
          <li>🕒 Lancer le programme ambassadeur WorkDAO</li>
          <li>💡 Ajouter le support du réseau Polygon zkEVM</li>
        </ul>
        <button class="mt-6 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition">
          ➕ Créer une proposition
        </button>
      </div>

      <!-- Bloc des votes -->
      <div class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:shadow-2xl transition">
        <h2 class="text-2xl font-semibold text-indigo-300 mb-4">🗳️ Historique de vos votes</h2>
        <p class="text-gray-300 mb-4">Suivez vos décisions et leur impact sur la DAO.</p>
        <ul class="text-left space-y-3 text-gray-200">
          <li>✔️ Proposition #24 : Acceptée</li>
          <li>❌ Proposition #22 : Rejetée</li>
          <li>🕒 Proposition #21 : En cours</li>
        </ul>
        <button class="mt-6 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition">
          📊 Voir l’historique complet
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Future: intégration avec smart contract DAO + Snapshot vote tracking
</script>

<style scoped>
section {
  min-height: 100vh;
  background: radial-gradient(circle at 30% 30%, #1e1b4b 0%, #0f172a 100%);
  color: #f1f5f9;
  position: relative;
  overflow: hidden;
}

/* Lumière d’ambiance DAO */
section::before {
  content: "";
  position: absolute;
  width: 600px;
  height: 600px;
  top: -100px;
  left: -100px;
  background: rgba(99, 102, 241, 0.25);
  filter: blur(160px);
  border-radius: 50%;
  animation: pulse 10s ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    opacity: 0.3;
    transform: scale(1);
  }
  to {
    opacity: 0.6;
    transform: scale(1.1);
  }
}
</style>
