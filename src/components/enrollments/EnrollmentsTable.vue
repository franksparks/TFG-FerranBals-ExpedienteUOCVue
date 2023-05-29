<template>
  <div class="md:flex md:justify-center" :class="{ dark: darkMode }">
    <div class="md:w-1/2 text-center py-3 mx-2">
      <p
        class="tablinks rounded text-white bg-blue-900 text-center py-1 text-sm md:text-xl"
      >
        {{ $t("enrollment.title") }}
      </p>
      <div class="py-2 md:py-5">
        <div class="relative overflow-x-auto rounded-lg content-center">
          <table class="w-full text-gray-500 dark:text-gray-400 rounded-lg">
            <thead
              class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
            >
              <tr>
                <th
                  class="w-1/3 cursor-pointer"
                  @click="sortTable('descAnyAcademic')"
                >
                  {{ $t("enrollment.semester") }}
                  <span class="ml-2">
                    <i class="fas fa-chevron-up"></i>
                    <i class="fas fa-chevron-down"></i>
                  </span>
                </th>
                <th
                  class="w-1/4 cursor-pointer"
                  @click="sortTable('dataMatricula')"
                >
                  {{ $t("enrollment.date") }}
                  <span class="ml-2">
                    <i class="fas fa-chevron-up"></i>
                    <i class="fas fa-chevron-down"></i>
                  </span>
                </th>
                <th
                  class="w-1/4 cursor-pointer"
                  @click="sortTable('importMatricula')"
                >
                  {{ $t("enrollment.amount") }}
                  <span class="ml-2">
                    <i class="fas fa-chevron-up"></i>
                    <i class="fas fa-chevron-down"></i>
                  </span>
                </th>
                <th class="w-1/4">
                  {{ $t("enrollment.file") }}
                  <span class="ml-2"> </span>
                </th>
              </tr>
            </thead>
            <tbody
              class="text-base justify-center bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 hover:text-white hover:bg-gray-600 odd:bg-gray-200 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-for="enrollment in sortedEnrollments"
              :key="enrollment"
            >
              <tr>
                <td class="text-center">{{ enrollment.P.descAnyAcademic }}</td>
                <td class="text-center">
                  {{ formatDate(enrollment.P.dataMatricula) }}
                </td>
                <td class="text-center">
                  {{ enrollment.P.importMatricula }} €
                </td>
                <td class="text-center">
                  <a
                    class="focus:ring focus:ring-cyan-500 focus:border-cyan-500"
                    href="https://www.uoc.edu/"
                    target="_blank"
                  >
                    <i v-if="darkMode" class="far fa-file-pdf"></i>
                    <i v-else class="far fa-file-pdf" style="ffffff"></i>
                  </a>
                </td>
              </tr>
              <tr
                v-for="recalItem in filteredRecal(enrollment)"
                :key="recalItem"
                class="border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 hover:text-white hover:bg-gray-600 bg-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <td>
                  {{ $t("enrollment.recal") }} - {{ recalItem.P.descMotiu }}
                </td>
                <td>
                  {{ formatDate(recalItem.P.dataMatricula) }}
                </td>
                <td>{{ recalItem.P.importMatricula }} €</td>
                <td class="text-center">
                  <a
                    class="focus:ring focus:ring-cyan-500 focus:border-cyan-500"
                    href="https://www.uoc.edu/"
                    target="_blank"
                  >
                    <i class="far fa-file-pdf"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p class="text-center dark:text-white">
          <span class="font-bold">{{ $t("enrollment.totalAmount") }}:</span>
          {{ total.toFixed(2) }} €
        </p>
        <p class="text-center dark:text-white">
          <span class="font-bold"> {{ $t("enrollment.averageAmount") }}: </span
          >{{ (total / enrollments.length).toFixed(2) }} €
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EnrollmentsTable",
};
</script>

<script setup>
import { computed, ref } from "vue";
const sortedEnrollments = ref(props.enrollments);

const props = defineProps({
  enrollments: Array,
  recal: Array,
  darkMode: Boolean,
});

const total = computed(() => {
  let sum = 0;
  for (let i = 0; i < props.enrollments.length; i++) {
    sum += props.enrollments[i].P.importMatricula;
  }

  for (let i = 0; i < props.recal.length; i++) {
    sum += props.recal[i].P.importMatricula;
  }

  for (let i = 0; i < props.enrollments.length; i++) {
    for (let j = 0; j < props.recal.length; j++) {
      if (
        props.enrollments[i].P.descAnyAcademic ==
        props.recal[j].P.descAnyAcademic
      ) {
        sum -= props.enrollments[i].P.importMatricula;
      }
    }
  }

  return sum;
});

let sortOrder = 1;

const filteredRecal = (enrollment) => {
  return props.recal.filter((item) => {
    return item.P.descAnyAcademic == enrollment.P.descAnyAcademic;
  });
};

function sortTable(column) {
  sortedEnrollments.value = [...sortedEnrollments.value].sort((a, b) => {
    if (a.P[column] < b.P[column]) return -1 * sortOrder;
    if (a.P[column] > b.P[column]) return 1 * sortOrder;
    return 0;
  });
  sortOrder *= -1;
}

function formatDate(unixDate) {
  const date = new Date(+unixDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
</script>
