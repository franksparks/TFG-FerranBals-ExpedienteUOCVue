<template>
  <div class="px-80 pt-5">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
        >
          <tr>
            <th>Semestre</th>
            <th>Fecha matrícula</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody class="justify-center">
          <tr
            v-for="enrollment in enrollments"
            :key="enrollment"
            class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="text-center">{{ enrollment.P.descAnyAcademic }}</td>
            <td class="text-center">
              {{ formatDate(enrollment.P.dataMatricula) }}
            </td>

            <td class="text-center">{{ enrollment.P.importMatricula }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-center">
      <span class="font-bold">Importe total:</span> {{ total }}
    </p>
    <p class="text-center">
      <span class="font-bold"> Importe medio semestre: </span
      >{{ (total / enrollments.length).toFixed(2) }}
    </p>
  </div>
</template>

<script>
export default {
  name: "EnrollmentTable",
};
</script>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const total = ref(0);
const enrollments = ref([]);

function formatDate(unixDate) {
  const date = new Date(+unixDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function calculateTotal(importMatricula) {
  total.value += importMatricula;
}

onMounted(() => {
  console.log("Request student enrollments - matriculas");
  axios
    .get("http://localhost:3000/enrollments")
    .then((response) => {
      enrollments.value = response.data.data.O;
      enrollments.value.forEach((enrollment) =>
        calculateTotal(enrollment.P.importMatricula)
      );
    })
    .catch((error) => console.error(error));
});
</script>
