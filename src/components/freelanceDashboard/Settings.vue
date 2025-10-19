<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold mb-4 text-indigo-700">⚙️ Paramètres</h2>
    <div class="bg-white shadow rounded-lg p-6 space-y-4">
      <label class="block">
        <span class="text-gray-700 font-medium">Nom complet</span>
        <input type="text" placeholder="francois Giorgi" class="mt-1 block w-full border rounded px-3 py-2" />
      </label>

      <label class="block">
        <span class="text-gray-700 font-medium">Adresse email</span>
        <input type="email" placeholder="francois@workdao.io" class="mt-1 block w-full border rounded px-3 py-2" />
      </label>

      <label class="block">
        <span class="text-gray-700 font-medium">Portefeuille connecté</span>
        <input type="text" value="0x1234...ABCD" disabled class="mt-1 block w-full border rounded px-3 py-2 bg-gray-100 text-gray-600" />
      </label>

      <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
        Sauvegarder les changements
      </button>
    </div>
  </section>
</template>
