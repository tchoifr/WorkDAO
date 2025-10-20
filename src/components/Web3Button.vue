<template>
  <button
    @click="connect"
    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
  >
    {{ wallet.state.connected ? truncate(wallet.state.address) : "Connect Wallet" }}
  </button>
</template>

<script setup lang="ts">
import { useWalletStore } from '../store/walletStore'

const wallet = useWalletStore()

const connect = async () => {
  await wallet.connectWallet()
}

const truncate = (addr: string) =>
  addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : ''
</script>
