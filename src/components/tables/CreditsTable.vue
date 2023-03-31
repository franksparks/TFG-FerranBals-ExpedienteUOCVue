<template>
  <div class="pt-10 px-60">
    <p class="tablinks py-1.5 px-3 rounded text-white bg-blue-400">
      {{ $t("credits.mainTitle") }}
    </p>
    <table class="text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
      >
        <tr>
          <th class="text-center bg-gray-300 px-10"></th>
          <th class="text-center pt-1 px-10">{{ $t("credits.basic") }}</th>
          <th class="text-center pt-1 px-10">{{ $t("credits.optative") }}</th>
          <th class="text-center pt-1 px-10">{{ $t("credits.main") }}</th>
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
  <div class="pt-10 px-60">
    <p class="tablinks py-1.5 px-3 rounded text-white bg-blue-400">
      {{ $t("credits.pieTitle") }}
    </p>

    <DoughnutChart
      :chart-data="data"
      :options="options"
      css-classes="chart-container"
    />
  </div>
</template>

<script>
export default {
  name: "CreditsTable",
};
</script>

<script setup>
import { ref, computed } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, DoughnutController, ArcElement } from "chart.js";
import { useI18n } from "vue-i18n";

const props = defineProps({
  credits: Object,
});
const { t } = useI18n();

Chart.register(DoughnutController, ArcElement);

const dataValues = ref([
  props.credits.numCreditsTroncalSuperat,
  props.credits.numCreditsTroncalSuperat -
    props.credits.numCreditsTroncalObjectiu,
  props.credits.numCreditsObligatoriSuperat,
  props.credits.numCreditsObligatoriObjectiu -
    props.credits.numCreditsObligatoriSuperat,
  props.credits.numCreditsOptatiuSuperat,
  props.credits.numCreditsOptatiuObjectiu -
    props.credits.numCreditsOptatiuSuperat,
]);

const data = computed(() => ({
  labels: [
    t("credits.mainPassed"),
    t("credits.mainPending"),
    t("credits.basicPassed"),
    t("credits.basicPending"),
    t("credits.optativePassed"),
    t("credits.optativePending"),
  ],
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: [
        "#0000BB",
        "#ADD8E6",
        "#008a00",
        "#00dc00",
        "#800080",
        "#d3c2ed",
      ],
    },
  ],
}));

const options = ref({
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
});
</script>
