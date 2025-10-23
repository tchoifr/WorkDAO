<template>
  <section
    class="bg-[#031d28] text-white min-h-screen flex flex-col items-center justify-center px-6 py-12"
  >
    <div
      class="bg-[#0a2431] border border-[#00BFFF]/30 shadow-[0_0_25px_#00BFFF80] 
             rounded-3xl p-10 w-full max-w-[35rem] text-center"
    >
      <!-- HEADER -->
      <h2
        class="text-3xl font-bold mb-6 text-[#38BDF8] drop-shadow-[0_0_8px_#38BDF8]"
      >
        💳 Wallet Manager
      </h2>

      <!-- WALLET CONNECTION -->
      <button
        v-if="!walletAddress"
        @click="connectWallet"
        class="w-full py-3 rounded-lg border border-[#00BFFF]/50 text-[#00BFFF] 
               hover:bg-[#00BFFF]/20 transition font-semibold"
      >
        🔗 Connect Wallet
      </button>

      <div v-else>
        <p class="text-[#00BFFF] font-semibold mb-2">
          Connected: {{ formatAddress(walletAddress) }}
        </p>
        <button
          @click="disconnectWallet"
          class="text-sm text-red-400 hover:text-red-300 underline mb-6"
        >
          Disconnect
        </button>

        <!-- BALANCES -->
        <div class="bg-[#02141d] border border-[#00BFFF]/30 rounded-xl p-4 mb-6">
          <h3 class="text-lg font-semibold mb-3 text-[#00BFFF]">Your Balances</h3>
          <div class="flex justify-between text-sm text-gray-300 mb-1">
            <span>$WORK:</span>
            <span>{{ workBalance }} WORK</span>
          </div>
          <div class="flex justify-between text-sm text-gray-300">
            <span>USDC:</span>
            <span>{{ usdcBalance }} USDC</span>
          </div>
        </div>

        <!-- TRANSFER FORM -->
        <form @submit.prevent="sendTokens" class="space-y-4">
          <div class="text-left">
            <label class="block text-sm mb-1 text-[#00BFFF]">Recipient Address</label>
            <input
              v-model="recipient"
              type="text"
              required
              placeholder="0xRecipient..."
              class="w-full bg-transparent border border-[#00BFFF]/30 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00BFFF]"
            />
          </div>

          <div class="text-left">
            <label class="block text-sm mb-1 text-[#00BFFF]">Amount</label>
            <input
              v-model="amount"
              type="number"
              min="0"
              step="0.01"
              required
              placeholder="Amount to send"
              class="w-full bg-transparent border border-[#00BFFF]/30 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00BFFF]"
            />
          </div>

          <div class="text-left">
            <label class="block text-sm mb-1 text-[#00BFFF]">Token</label>
            <select
              v-model="selectedToken"
              class="w-full bg-[#02141d] border border-[#00BFFF]/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00BFFF]"
            >
              <option value="WORK">$WORK</option>
              <option value="USDC">USDC</option>
            </select>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-lg border border-[#00BFFF]/50 text-[#00BFFF] font-semibold hover:bg-[#00BFFF]/20 transition"
          >
            {{ loading ? "⏳ Processing..." : "📤 Send Tokens" }}
          </button>
        </form>
      </div>

      <!-- STATUS MESSAGE -->
      <p v-if="status" class="text-sm mt-4 text-gray-300">
        {{ status }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ethers } from "ethers"

// ✅ Fake contract addresses for example
const WORK_CONTRACT = "0x000000000000000000000000000000000000WORK"
const USDC_CONTRACT = "0x000000000000000000000000000000000000USDC"

const walletAddress = ref<string | null>(null)
const workBalance = ref("0.00")
const usdcBalance = ref("0.00")
const recipient = ref("")
const amount = ref("")
const selectedToken = ref("WORK")
const loading = ref(false)
const status = ref("")

let provider: ethers.BrowserProvider | null = null
let signer: ethers.Signer | null = null

// 🔹 Connect Wallet
const connectWallet = async () => {
  if (!window.ethereum) {
    status.value = "❌ MetaMask not found."
    return
  }

  try {
    provider = new ethers.BrowserProvider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", [])
    walletAddress.value = accounts[0]
    signer = await provider.getSigner()
    status.value = "✅ Wallet connected successfully."

    // Fake balance values for demo
    workBalance.value = (Math.random() * 1000).toFixed(2)
    usdcBalance.value = (Math.random() * 500).toFixed(2)
  } catch (error) {
    console.error(error)
    status.value = "❌ Connection failed."
  }
}

// 🔹 Disconnect Wallet
const disconnectWallet = () => {
  walletAddress.value = null
  status.value = ""
  workBalance.value = "0.00"
  usdcBalance.value = "0.00"
}

// 🔹 Send Tokens (simulation)
const sendTokens = async () => {
  if (!walletAddress.value || !signer) {
    status.value = "⚠️ Connect your wallet first."
    return
  }

  loading.value = true
  status.value = "⏳ Sending transaction..."

  try {
    // ⚠️ In production: call ERC20 transfer()
    await new Promise((r) => setTimeout(r, 1500))

    status.value = `✅ Sent ${amount.value} ${selectedToken.value} to ${recipient.value}`
    amount.value = ""
    recipient.value = ""
  } catch (error) {
    console.error(error)
    status.value = "❌ Transaction failed."
  } finally {
    loading.value = false
  }
}

const formatAddress = (addr: string) =>
  addr.slice(0, 6) + "..." + addr.slice(-4)
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
section {
  animation: fadeIn 0.8s ease-out;
}
</style>
