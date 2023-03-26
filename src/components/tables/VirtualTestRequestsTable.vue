<template>
  <div class="pt-3 px-60 pb-2">
    <p class="tablinks py-1.5 px-3 rounded text-white bg-blue-300 text-center">
      Solicitud de prueba de evaluación final virtual
    </p>
  </div>

  <div v-if="virtualTestRequests.length == 0" class="mx-60">
    <p>No hay peticiones de pruebas virtuales que mostrar</p>
  </div>
  <div v-else>
    <div class="overflow-x-auto shadow-md sm:rounded-lg mx-80"></div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
      >
        <tr>
          <th scope="col" class="px-6 py-1">Semestre</th>
          <th scope="col" class="px-6 py-1">Asignatura</th>
          <th scope="col" class="px-6 py-1">Código</th>
          <th scope="col" class="px-6 py-1">Tipo prueba</th>
          <th scope="col" class="px-6 py-1">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="request in virtualTestRequests"
          :key="request"
          class="border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
        >
          <td class="text-center">{{ request.descAnyAcademic }}</td>
          <td class="text-center">{{ request.descAssignatura }}</td>
          <td class="text-center">{{ request.codAssignatura }}</td>
          <td class="text-center">{{ request.tipusProva }}</td>
          <td class="text-center">{{ request.descEstat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "VitualTestRequestTable",
};
</script>

<script setup>
defineProps({
  virtualTestRequests: Object,
});
</script>
