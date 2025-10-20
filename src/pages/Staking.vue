<template>
  <section class="container mx-auto px-4 py-20 text-center">
    <h1 class="text-4xl font-bold mb-6 text-indigo-600">💎 Staking WorkDAO</h1>
    <p class="text-gray-700 max-w-2xl mx-auto">
      Bienvenue sur la page de <b>staking</b> du token <span class="text-indigo-600">$WORK</span>.<br />
      Bloquez vos tokens pour recevoir des récompenses et participer à la gouvernance de la DAO.
    </p>

    <div class="mt-10">
      <!-- Bouton de connexion -->
      <div v-if="!walletConnected">
        <button
          @click="connectWallet"
          class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          🔗 Connecter mon wallet
        </button>
      </div>

      <!-- Interface de staking -->
      <div v-else class="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto">
        <p class="text-gray-800 mb-4">
          Wallet connecté :
          <b>{{ truncatedAddress }}</b>
        </p>
        <p class="text-gray-700 mb-6">
          Solde disponible : <b>{{ balance }} $WORK</b>
        </p>

        <div class="mb-6">
          <input
            v-model.number="stakeAmount"
            type="number"
            min="0"
            :max="balance"
            placeholder="Montant à staker"
            class="w-full border rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          @click="stakeTokens"
          :disabled="isLoading || stakeAmount <= 0 || stakeAmount > balance"
          class="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          <span v-if="isLoading">⏳ Transaction en cours...</span>
          <span v-else>💰 Staker {{ stakeAmount || '' }} $WORK</span>
        </button>

        <div v-if="txHash" class="mt-6 text-sm text-gray-600">
          ✅ Transaction envoyée :
          <a
            :href="`https://etherscan.io/tx/${txHash}`"
            target="_blank"
            class="text-indigo-600 underline"
          >
            Voir sur Etherscan
          </a>
        </div>

        <div class="mt-8">
          <button
            @click="disconnectWallet"
            class="text-red-500 text-sm underline hover:text-red-700"
          >
            🔒 Déconnecter
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ethers } from 'ethers'

// État principal
const walletConnected = ref(false)
const userAddress = ref('')
const balance = ref(0)
const stakeAmount = ref(0)
const isLoading = ref(false)
const txHash = ref('')

// --- Simule ton contrat de staking (à remplacer plus tard)
const stakingContractAddress = '0x1234567890abcdef1234567890abcdef12345678'

// Tronquer l'adresse du wallet pour l'affichage
const truncatedAddress = computed(() => {
  if (!userAddress.value) return ''
  return `${userAddress.value.slice(0, 6)}...${userAddress.value.slice(-4)}`
})

// Connexion au wallet MetaMask
async function connectWallet() {
  try {
    if (!(window as any).ethereum) {
      alert('Veuillez installer MetaMask pour continuer.')
      return
    }

    const provider = new ethers.BrowserProvider((window as any).ethereum)
    const accounts = await provider.send('eth_requestAccounts', [])
    userAddress.value = accounts[0]
    walletConnected.value = true

    // Simule un solde de tokens (ex : 120 WORK)
    balance.value = 120
  } catch (err) {
    console.error('Erreur connexion wallet:', err)
  }
}

// Déconnexion du wallet
function disconnectWallet() {
  walletConnected.value = false
  userAddress.value = ''
  balance.value = 0
  stakeAmount.value = 0
  txHash.value = ''
}

// Simulation de transaction de staking
async function stakeTokens() {
  try {
    isLoading.value = true

    // Ici tu appelleras ton vrai smart contract ERC-20 + staking
    // const provider = new ethers.BrowserProvider((window as any).ethereum)
    // const signer = await provider.getSigner()
    // const contract = new ethers.Contract(stakingContractAddress, stakingABI, signer)
    // const tx = await contract.stake(ethers.parseUnits(stakeAmount.value.toString(), 18))
    // const receipt = await tx.wait()

    // Simule une transaction réussie :
    await new Promise((resolve) => setTimeout(resolve, 3000))
    txHash.value = '0x' + Math.random().toString(16).substring(2, 66)

    balance.value -= stakeAmount.value
    stakeAmount.value = 0
  } catch (err) {
    console.error('Erreur staking:', err)
    alert("Erreur lors du staking. Vérifie ton wallet.")
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
section {
  background: linear-gradient(to bottom right, #f8fafc, #eef2ff);
  min-height: 100vh;
}
</style>
