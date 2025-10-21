<template>
  <div class="bg-white shadow-xl rounded-xl p-6 max-w-md mx-auto mt-10">
    <p class="text-gray-800 mb-2">
      Wallet connecté : <b>{{ walletType }}</b>
    </p>
    <p class="text-gray-700 mb-4">
      Adresse : <b>{{ truncatedAddress }}</b>
    </p>

    <p class="text-gray-600 text-sm mb-4">Solde :
      <span v-if="walletType === 'MetaMask'">{{ ethBalanceDisplay }} ETH</span>
      <span v-else>{{ solBalanceDisplay }} SOL</span>
    </p>

    <div class="border-t border-gray-200 my-4"></div>

    <div class="mb-4">
      <input
        v-model.number="transferAmount"
        type="number"
        placeholder="Montant à convertir"
        min="0"
        step="0.01"
        class="w-full border rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <button
      @click="convertTokens"
      :disabled="!transferAmount || isLoading"
      class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
    >
      <span v-if="isLoading">⏳ Conversion...</span>
      <span v-else>💱 Convertir {{ transferAmount || '' }}</span>
    </button>

    <div v-if="txHash" class="mt-4 text-sm text-gray-600">
      ✅ Transaction simulée :
      <a :href="explorerLink" target="_blank" class="text-indigo-600 underline">
        Voir sur {{ walletType === 'MetaMask' ? 'Etherscan' : 'Solscan' }}
      </a>
    </div>

    <button
      @click="$emit('disconnect')"
      class="text-red-500 text-sm underline mt-6 hover:text-red-700"
    >
      🔒 Déconnecter
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ethers } from 'ethers'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'

const props = defineProps<{
  walletType: string
  userAddress: string
}>()

const emit = defineEmits<{
  (e: 'disconnect'): void
}>()

const transferAmount = ref(0)
const isLoading = ref(false)
const txHash = ref('')
const ethBalance = ref<bigint | null>(null)
const solBalance = ref<number | null>(null)

const truncatedAddress = computed(() =>
  props.userAddress
    ? `${props.userAddress.slice(0, 6)}...${props.userAddress.slice(-4)}`
    : ''
)

const ethBalanceDisplay = computed(() =>
  ethBalance.value !== null ? ethers.formatEther(ethBalance.value) : '...'
)

const solBalanceDisplay = computed(() =>
  solBalance.value !== null ? (solBalance.value / 1_000_000_000).toFixed(3) : '...'
)

const explorerLink = computed(() => {
  if (!txHash.value) return ''
  return props.walletType === 'MetaMask'
    ? `https://etherscan.io/tx/${txHash.value}`
    : `https://solscan.io/tx/${txHash.value}`
})

// Lecture des soldes réels
onMounted(async () => {
  try {
    if (props.walletType === 'MetaMask') {
      const provider = new ethers.BrowserProvider((window as any).ethereum)
      ethBalance.value = await provider.getBalance(props.userAddress)
    } else if (props.walletType === 'Phantom') {
      const connection = new Connection(clusterApiUrl('mainnet-beta'))
      const balance = await connection.getBalance(new PublicKey(props.userAddress))
      solBalance.value = balance
    }
  } catch (e) {
    console.error('Erreur récupération solde:', e)
  }
})

async function convertTokens() {
  try {
    isLoading.value = true
    await new Promise((r) => setTimeout(r, 2000))
    txHash.value = '0x' + Math.random().toString(16).substring(2, 66)
    transferAmount.value = 0
  } finally {
    isLoading.value = false
  }
}
</script>
