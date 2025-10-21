<template>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 text-white overflow-hidden"
  >
    <!-- Image de fond -->
    <img
      src="../assets/staking.jpg"
      alt="Staking WorkDAO"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <!-- Overlay bleu foncé translucide -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/70 via-[#031d28]/80 to-[#0a2431]/90"
    ></div>

    <!-- Contenu principal -->
    <div class="relative z-10 max-w-4xl">
      <h1
        class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-[#38BDF8] drop-shadow-[0_0_10px_#38BDF8]"
      >
        💎 Staking WorkDAO
      </h1>

      <p class="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 leading-relaxed">
        Connecte ton wallet pour participer au
        <b>staking</b> du token
        <span class="text-[#00BFFF] font-semibold">$WORK</span> et gagner des
        récompenses.
      </p>

      <!-- Bouton principal (connexion) -->
      <div v-if="!walletConnected">
        <button
          @click="showWalletModal = true"
          class="px-8 py-3 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black font-semibold rounded-full text-lg transition shadow-[0_0_10px_#00BFFF]"
        >
          🔗 Connecter mon wallet
        </button>
      </div>

      <!-- Interface de staking -->
      <ExchangePanel
        v-else
        :wallet-type="walletType"
        :user-address="userAddress"
        @disconnect="disconnectWallet"
        class="mt-10"
      />

      <!-- Modale de connexion -->
      <WalletModal
        v-if="showWalletModal"
        @close="showWalletModal = false"
        @connected="handleWalletConnected"
      />
    </div>

    <!-- Effet de dégradé bas -->
    <div
      class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#031d28] to-transparent"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WalletModal from '../components/stackins/WalletModal.vue'
import ExchangePanel from '../components/stackins/ExchangePanel.vue'

const walletConnected = ref(false)
const showWalletModal = ref(false)
const walletType = ref('')
const userAddress = ref('')

function handleWalletConnected(payload: { type: string; address: string }) {
  walletConnected.value = true
  walletType.value = payload.type
  userAddress.value = payload.address
  showWalletModal.value = false
}

function disconnectWallet() {
  walletConnected.value = false
  walletType.value = ''
  userAddress.value = ''
}
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
