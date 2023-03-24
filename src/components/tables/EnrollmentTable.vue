<template>
  <div class="px-80 pt-5">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
        >
          <tr>
            <th>Semestre</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody class="justify-center">
          <tr
            v-for="matricula in matriculas"
            :key="matricula"
            class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="text-center">{{ matricula.P.descAnyAcademic }}</td>

            <td class="text-center">{{ matricula.P.importMatricula }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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

const matriculas = ref([]);

onMounted(() => {
  console.log("Petición matrículas alumno");
  axios
    .get("http://localhost:3000/matricula")
    .then((response) => (matriculas.value = response.data.data.O))
    .catch((error) => console.error(error));
});
</script>
