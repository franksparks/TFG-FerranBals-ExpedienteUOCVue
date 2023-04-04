<template>
  <div class="md:grid grid-cols-2">
    <div id="col2" class="text-center py-2 mx-2">
      <p
        class="tablinks py-1 rounded text-white bg-blue-900 text-sm md:text-xl"
      >
        {{ $t("credits.pieTitle") }}
      </p>

      <DoughnutChart :chart-data="data" :options="options" />
    </div>
    <div class="text-center py-2 mx-2">
      <p
        class="tablinks py-1 rounded text-white bg-blue-900 text-sm md:text-xl"
      >
        {{ $t("credits.mainTitle") }}
      </p>
      <div class="py-2 md:flex md:justify-center">
        <table class="w-full text-sm text-gray-500 dark:text-gray-400">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th class="w-1/4">{{ $t("credits.tableHeader") }}</th>
              <th class="w-1/4 pt-1">{{ $t("credits.basic") }}</th>
              <th class="w-1/4 pt-1">
                {{ $t("credits.optative") }}
              </th>
              <th class="w-1/4 pt-1">{{ $t("credits.main") }}</th>
            </tr>
          </thead>
          <tbody class="justify-center">
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 text-center"
            >
              <th>{{ $t("credits.goal") }}</th>
              <td>
                {{ credits.numCreditsObligatoriObjectiu }}
              </td>
              <td>
                {{ credits.numCreditsOptatiuObjectiu }}
              </td>
              <td>
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
import pattern from "patternomaly";

const props = defineProps({
  credits: Object,
});
const { t } = useI18n();

Chart.register(DoughnutController, ArcElement);

const dataValues = ref([
  props.credits.numCreditsTroncalSuperat,
  props.credits.numCreditsObligatoriSuperat,
  props.credits.numCreditsOptatiuSuperat,
  props.credits.numCreditsTroncalSuperat -
    props.credits.numCreditsTroncalObjectiu,
  props.credits.numCreditsObligatoriObjectiu -
    props.credits.numCreditsObligatoriSuperat,
  props.credits.numCreditsOptatiuObjectiu -
    props.credits.numCreditsOptatiuSuperat,
]);

const filteredLabels = computed(() => {
  return [
    { label: t("credits.mainPassed"), value: dataValues.value[0] },
    { label: t("credits.basicPassed"), value: dataValues.value[1] },
    { label: t("credits.optativePassed"), value: dataValues.value[2] },
    { label: t("credits.mainPending"), value: dataValues.value[3] },
    { label: t("credits.basicPending"), value: dataValues.value[4] },
    { label: t("credits.optativePending"), value: dataValues.value[5] },
  ]
    .map((item) => item.label)
    .filter((item) => item.value !== 0);
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
        pattern.draw("dot", "#0000BB"),
        pattern.draw("dot", "#008a00"),
        pattern.draw("dot", "#800080"),
        pattern.draw("ring", "#ADD8E6"),
        pattern.draw("ring", "#90EE90"),
        pattern.draw("ring", "#CBC3E3"),
      ],
    },
  ],
}));

const options = ref({
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
  layout: {
    margin: {
      top: 0,
    },
    padding: {
      top: -50,
      bottom: 10,
    },
  },
});
</script>
