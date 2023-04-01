<template>
  <div class="md:grid grid-cols-2">
    <div class="text-center py-2 mx-2">
      <p
        class="tablinks py-1 rounded text-white bg-blue-900 text-sm md:text-xl"
      >
        {{ $t("credits.mainTitle") }}
      </p>
      <table class="text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
        >
          <tr>
            <th class="text-center bg-gray-300 px-10"></th>
            <th class="text-center pt-1 px-10">{{ $t("credits.basic") }}</th>
            <th class="text-center pt-1 px-10">
              {{ $t("credits.optative") }}
            </th>
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
            <td class="text-center">
              {{ credits.numCreditsOptatiuSuperat }}
            </td>
            <td class="text-center">
              {{ credits.numCreditsTroncalSuperat }}
            </td>
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

    <div id="col2" class="text-center py-2 mx-2">
      <p
        class="tablinks py-1 rounded text-white bg-blue-900 text-sm md:text-xl"
      >
        {{ $t("credits.pieTitle") }}
      </p>

      <DoughnutChart :chart-data="data" :options="options" />
    </div>
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

const filteredLabels = computed(() => {
  return [
    { label: t("credits.mainPassed"), value: dataValues.value[0] },
    { label: t("credits.mainPending"), value: dataValues.value[1] },
    { label: t("credits.basicPassed"), value: dataValues.value[2] },
    { label: t("credits.basicPending"), value: dataValues.value[3] },
    { label: t("credits.optativePassed"), value: dataValues.value[4] },
    { label: t("credits.optativePending"), value: dataValues.value[5] },
  ]
    .filter((item) => item.value !== 0)
    .map((item) => item.label);
});

const filteredDataValues = computed(() => {
  return dataValues.value.filter((value) => value !== 0);
});

const data = computed(() => ({
  labels: filteredLabels.value,
  datasets: [
    {
      data: filteredDataValues.value,
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
