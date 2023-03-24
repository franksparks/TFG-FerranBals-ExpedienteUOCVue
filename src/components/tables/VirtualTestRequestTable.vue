<template>
  <div class="pt-5">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
        >
          <tr>
            <th>Semestre</th>
            <th>Asignatura</th>
            <th>Código</th>
            <th>Tipo prueba</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody class="justify-center">
          <tr
            v-for="request in virtualTestRequest"
            :key="request"
            class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="text-center">{{ request.descAnyAcademic }}</td>
            <td>{{ request.descAssignatura }}</td>
            <td class="text-center">{{ request.codAssignatura }}</td>
            <td class="text-center">{{ request.tipusProva }}</td>
            <td class="text-center">{{ request.descEstat }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "VitualTestRequestTable",
};
</script>

<script setup>
defineProps({
  virtualTestRequest: Object,
});
</script>
