<template>
  <div class="pt-10">
    <table class="text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
      >
        <tr>
          <th class="text-center bg-gray-300 px-10"></th>
          <th class="text-center pt-1 px-10">{{ $t("credits.basic") }}</th>
          <th class="text-center pt-1 px-10">{{ $t("credits.main") }}</th>
          <th class="text-center pt-1 px-10">{{ $t("credits.optative") }}</th>
        </tr>
      </thead>
      <tbody class="justify-center">
        <tr
          class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600"
        >
          <th class="text-center">{{ $t("credits.goal") }}</th>
          <td class="text-center">
            {{ credits.numCreditsObligatoriObjectiu }}
          </td>
          <td class="text-center">
            {{ credits.numCreditsOptatiuObjectiu }}
          </td>
          <td class="text-center">
            {{ credits.numCreditsTroncalObjectiu }}
          </td>
        </tr>
        <tr
          class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600"
        >
          <th class="text-center">{{ $t("credits.passed") }}</th>
          <td class="text-center">
            {{ credits.numCreditsObligatoriSuperat }}
          </td>
          <td class="text-center">{{ credits.numCreditsOptatiuSuperat }}</td>
          <td class="text-center">{{ credits.numCreditsTroncalSuperat }}</td>
        </tr>
        <tr
          class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600"
        >
          <th class="text-center">{{ $t("credits.pending") }}</th>
          <td class="text-center">
            {{
              credits.numCreditsObligatoriObjectiu -
              credits.numCreditsObligatoriSuperat
            }}
          </td>
          <td class="text-center">
            {{
              credits.numCreditsOptatiuObjectiu -
              credits.numCreditsOptatiuSuperat
            }}
          </td>
          <td class="text-center">
            {{
              credits.numCreditsTroncalSuperat -
              credits.numCreditsTroncalObjectiu
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CreditsTable",
};
</script>
<script setup>
defineProps({
  credits: Object,
});
</script>
