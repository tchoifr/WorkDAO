<template>
  <section class="container mx-auto px-4 py-20 text-center">
    <h1 class="text-4xl font-bold mb-6 text-indigo-600">💎 WorkDAO Exchange</h1>

    <p class="text-gray-700 max-w-2xl mx-auto mb-10">
      Connecte ton wallet pour convertir tes tokens <b>ETH</b> ou <b>USDC</b> en
      <span class="text-indigo-600 font-semibold">$WORK</span>.
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

    <!-- Interface d'échange -->
    <div
      v-else
      class="bg-white shadow-xl rounded-xl p-6 max-w-md mx-auto transition-all"
    >
      <p class="text-gray-800 mb-3">
        Wallet connecté : <b>{{ walletType }}</b>
      </p>
      <p class="text-gray-700 mb-6">
        Adresse : <b>{{ truncatedAddress }}</b>
      </p>

      <div class="border-t border-gray-200 my-4"></div>

      <!-- Formulaire de conversion -->
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <label class="font-semibold text-gray-700">De :</label>
          <select
            v-model="fromToken"
            class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ETH">ETH</option>
            <option value="USDC">USDC</option>
          </select>
        </div>

        <div class="flex justify-between items-center">
          <label class="font-semibold text-gray-700">Vers :</label>
          <input
            type="text"
            disabled
            value="WORK"
            class="border rounded-lg px-3 py-2 text-gray-500 bg-gray-50"
          />
        </div>

        <div class="mt-2">
          <input
            v-model.number="transferAmount"
            type="number"
            min="0"
            step="0.01"
            placeholder="Montant à convertir"
            class="w-full border rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div class="text-gray-600 text-sm mb-3">
          ≈ {{ convertedAmount.toFixed(2) }} $WORK
        </div>

        <button
          @click="convertTokens"
          :disabled="!transferAmount || isLoading"
          class="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          <span v-if="isLoading">⏳ Conversion en cours...</span>
          <span v-else>💱 Convertir</span>
        </button>

        <div v-if="txHash" class="mt-4 text-sm text-gray-600">
          ✅ Transaction envoyée :
          <a
            :href="explorerLink"
            target="_blank"
            class="text-indigo-600 underline"
          >
            Voir sur {{ walletType === 'MetaMask' ? 'Etherscan' : 'Solscan' }}
          </a>
        </div>

        <button
          @click="disconnectWallet"
          class="text-red-500 text-sm underline mt-6 hover:text-red-700"
        >
          🔒 Déconnecter
        </button>
      </div>
    </div>

    <!-- Modale de sélection de wallet -->
    <div
      v-if="showWalletModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-xl shadow-2xl p-6 w-80 text-center relative">
        <h2 class="text-lg font-semibold mb-4">Choisir un wallet</h2>
        <button
          @click="connectMetaMask"
          class="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition mb-3"
        >
          🦊 MetaMask
        </button>
        <button
          @click="connectPhantom"
          class="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          👻 Phantom
        </button>
        <button
          @click="showWalletModal = false"
          class="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ethers } from 'ethers'
import { Connection, PublicKey } from '@solana/web3.js'

// État principal
const walletConnected = ref(false)
const showWalletModal = ref(false)
const walletType = ref('')
const userAddress = ref('')
const fromToken = ref<'ETH' | 'USDC'>('ETH')
const transferAmount = ref(0)
const isLoading = ref(false)
const txHash = ref('')
const rate = 20 // taux fictif : 1 ETH = 20 WORK
const workBalance = ref(0)

// Calcul dynamique
const convertedAmount = computed(() => transferAmount.value * rate)

const truncatedAddress = computed(() =>
  userAddress.value
    ? `${userAddress.value.slice(0, 6)}...${userAddress.value.slice(-4)}`
    : ''
)

const explorerLink = computed(() => {
  if (!txHash.value) return ''
  return walletType.value === 'MetaMask'
    ? `https://etherscan.io/tx/${txHash.value}`
    : `https://solscan.io/tx/${txHash.value}`
})

// Connexion MetaMask
async function connectMetaMask() {
  try {
    const w = window as any
    if (!w.ethereum) {
      alert('Installe MetaMask pour continuer.')
      return
    }
    const provider = new ethers.BrowserProvider(w.ethereum)
    const accounts: string[] = await provider.send('eth_requestAccounts', [])
    userAddress.value = accounts[0]
    walletType.value = 'MetaMask'
    walletConnected.value = true
    showWalletModal.value = false
  } catch (e) {
    console.error('Erreur MetaMask:', e)
  }
}

// Connexion Phantom
async function connectPhantom() {
  try {
    const w = window as any
    const provider = w.phantom?.solana
    if (!provider?.isPhantom) {
      alert('Installe Phantom Wallet pour continuer.')
      return
    }

    const res = await provider.connect()
    userAddress.value = res.publicKey.toString()
    walletType.value = 'Phantom'
    walletConnected.value = true
    showWalletModal.value = false
  } catch (err) {
    console.error('Erreur Phantom:', err)
  }
}

function disconnectWallet() {
  walletConnected.value = false
  userAddress.value = ''
  txHash.value = ''
  transferAmount.value = 0
  workBalance.value = 0
  walletType.value = ''
}

// Simulation conversion
async function convertTokens() {
  try {
    isLoading.value = true
    await new Promise((r) => setTimeout(r, 2000))
    txHash.value = '0x' + Math.random().toString(16).substring(2, 66)
    workBalance.value += convertedAmount.value
    transferAmount.value = 0
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
section {
  background: linear-gradient(to bottom right, #f9fafc, #eef2ff);
  min-height: 100vh;
}
</style>
