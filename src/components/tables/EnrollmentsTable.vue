<template>
  <div class="md:flex md:justify-center">
    <div class="md:w-1/2 text-center py-2 mx-2">
      <p
        class="tablinks rounded text-white bg-blue-900 text-center py-1 text-sm md:text-xl"
      >
        {{ $t("enrollment.title") }}
      </p>
      <div class="py-2">
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
                </th>
                <th
                  class="w-1/3 cursor-pointer"
                  @click="sortTable('dataMatricula')"
                >
                  {{ $t("enrollment.date") }}
                </th>
                <th
                  class="w-1/3 cursor-pointer"
                  @click="sortTable('importMatricula')"
                >
                  {{ $t("enrollment.amount") }}
                </th>
              </tr>
            </thead>
            <tbody class="text-base justify-center">
              <tr
                v-for="enrollment in sortedEnrollments"
                :key="enrollment"
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              >
                <td class="text-center">{{ enrollment.P.descAnyAcademic }}</td>
                <td class="text-center">
                  {{ formatDate(enrollment.P.dataMatricula) }}
                </td>
                <td class="text-center">
                  {{ enrollment.P.importMatricula }} €
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p class="text-center">
          <span class="font-bold">{{ $t("enrollment.totalAmount") }}:</span>
          {{ total.toFixed(2) }} €
        </p>
        <p class="text-center">
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
  enrollments: Object,
});

const total = computed(() => {
  let sum = 0;
  for (let i = 0; i < props.enrollments.length; i++) {
    sum += props.enrollments[i].P.importMatricula;
  }
  return sum;
});

let sortOrder = 1;

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
