<template>
  <div class="px-80 pt-5">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
      >
        <tr>
          <th class="text-center bg-gray-300"></th>
          <th class="text-center">Básicas</th>
          <th class="text-center">Obligatorias</th>
          <th class="text-center">Optativas</th>
        </tr>
      </thead>
      <tbody class="justify-center">
        <tr
          class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600"
        >
          <th class="text-center">Objetivo</th>
          <td class="text-center">
            {{ credit.numCreditsObligatoriObjectiu }}
          </td>
          <td class="text-center">
            {{ credit.numCreditsOptatiuObjectiu }}
          </td>
          <td class="text-center">
            {{ credit.numCreditsTroncalObjectiu }}
          </td>
        </tr>
        <tr
          class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600"
        >
          <th class="text-center">Superado</th>
          <td class="text-center">
            {{ credit.numCreditsObligatoriSuperat }}
          </td>
          <td class="text-center">{{ credit.numCreditsOptatiuSuperat }}</td>
          <td class="text-center">{{ credit.numCreditsTroncalSuperat }}</td>
        </tr>
        <tr
          class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600"
        >
          <th class="text-center">Pendiente</th>
          <td class="text-center">
            {{
              credit.numCreditsObligatoriObjectiu -
              credit.numCreditsObligatoriSuperat
            }}
          </td>
          <td class="text-center">
            {{
              credit.numCreditsOptatiuObjectiu - credit.numCreditsOptatiuSuperat
            }}
          </td>
          <td class="text-center">
            {{
              credit.numCreditsTroncalSuperat - credit.numCreditsTroncalObjectiu
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ECTSTable",
};
</script>
<script setup>
defineProps({
  credit: Object,
});
</script>
