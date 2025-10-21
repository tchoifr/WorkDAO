<template>
  <section class="container mx-auto px-4 py-20 text-center">
    <h1 class="text-4xl font-bold mb-6 text-indigo-600">💎 Staking WorkDAO</h1>
    <p class="text-gray-700 max-w-2xl mx-auto mb-8">
      Connecte ton wallet pour participer au <b>staking</b> du token
      <span class="text-indigo-600">$WORK</span>.
    </p>

    <!-- Bouton principal -->
    <div v-if="!walletConnected">
      <button
        @click="showWalletModal = true"
        class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        🔗 Connecter mon wallet
      </button>
    </div>

    <!-- Interface staking / échange -->
    <ExchangePanel
      v-else
      :wallet-type="walletType"
      :user-address="userAddress"
      @disconnect="disconnectWallet"
    />

    <!-- Modale -->
    <WalletModal
      v-if="showWalletModal"
      @close="showWalletModal = false"
      @connected="handleWalletConnected"
    />
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
  background: linear-gradient(to bottom right, #f9fafc, #eef2ff);
  min-height: 100vh;
}
</style>
