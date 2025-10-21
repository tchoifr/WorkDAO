<template>
  <section class="p-6 transition-colors duration-500">
    <div
      class="rounded-lg shadow overflow-hidden border transition"
      :class="darkMode
        ? 'bg-[#0a2431] border-[#00BFFF]/30 hover:border-[#00BFFF]/60'
        : 'bg-white border-gray-200 hover:border-indigo-200'"
    >
      <table class="w-full text-sm">
        <thead
          class="uppercase text-xs font-semibold"
          :class="darkMode
            ? 'bg-[#09202c] text-[#00BFFF]'
            : 'bg-indigo-100 text-gray-700'"
        >
          <tr>
            <th class="p-3 text-left">Date</th>
            <th class="p-3 text-left">Mission</th>
            <th class="p-3 text-left">Amount</th>
            <th class="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="p in payments"
            :key="p.id"
            class="transition"
            :class="darkMode
              ? 'border-t border-[#00BFFF]/20 hover:bg-[#09202c]'
              : 'border-t hover:bg-gray-50'"
          >
            <td class="p-3" :class="darkMode ? 'text-gray-300' : 'text-gray-800'">
              {{ p.date }}
            </td>
            <td class="p-3" :class="darkMode ? 'text-gray-200' : 'text-gray-800'">
              {{ p.mission }}
            </td>
            <td
              class="p-3 font-semibold"
              :class="darkMode ? 'text-[#00BFFF]' : 'text-indigo-600'"
            >
              {{ p.amount }} $WORK
            </td>
            <td class="p-3 font-semibold">
              <span
                :class="{
                  'text-green-400': p.status === 'Completed' && darkMode,
                  'text-green-600': p.status === 'Completed' && !darkMode,
                  'text-yellow-400': p.status === 'Pending' && darkMode,
                  'text-yellow-600': p.status === 'Pending' && !darkMode,
                }"
              >
                {{ p.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject } from "vue"

const darkMode = inject("darkMode", false)

const payments = [
  { id: 1, date: "2025-10-01", mission: "Smart Contract ERC-721", amount: 320, status: "Completed" },
  { id: 2, date: "2025-10-07", mission: "MetaMask Integration", amount: 180, status: "Pending" },
]
</script>
