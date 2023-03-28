<template>
  <div class="pt-10 px-80">
    <table class="w-full text-gray-500 dark:text-gray-400">
      <thead
        class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
      >
        <tr>
          <th class="py-1" @click="sortTable('descAnyAcademic')">
            {{ $t("enrollment.semester") }}
          </th>
          <th class="py-1" @click="sortTable('dataMatricula')">
            {{ $t("enrollment.date") }}
          </th>
          <th class="py-1" @click="sortTable('importMatricula')">
            {{ $t("enrollment.amount") }}
          </th>
        </tr>
      </thead>
      <tbody class="text-base justify-center">
        <tr
          v-for="enrollment in enrollments"
          :key="enrollment"
          class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
        >
          <td class="text-center">{{ enrollment.P.descAnyAcademic }}</td>
          <td class="text-center">
            {{ formatDate(enrollment.P.dataMatricula) }}
          </td>
          <td class="text-center">{{ enrollment.P.importMatricula }} €</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="py-3">
    <p class="text-center">
      <span class="font-bold">{{ $t("enrollment.amount") }}:</span>
      {{ total.toFixed(2) }} €
    </p>
    <p class="text-center">
      <span class="font-bold"> {{ $t("enrollment.averageAmount") }}: </span
      >{{ (total / enrollments.length).toFixed(2) }} €
    </p>
  </div>
</template>

<script>
export default {
  name: "EnrollmentTable",
};
</script>

<script setup>
import { computed } from "vue";

const total = computed(() => {
  let sum = 0;
  for (let i = 0; i < props.enrollments.length; i++) {
    sum += props.enrollments[i].P.importMatricula;
  }
  return sum;
});

const props = defineProps({
  enrollments: Object,
});
function formatDate(unixDate) {
  const date = new Date(+unixDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
</script>
