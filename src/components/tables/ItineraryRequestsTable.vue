<template>
  <div class="pb-10">
    <div class="pt-3 px-60 pb-2">
      <p
        class="tablinks py-1.5 px-3 rounded text-white bg-blue-600 text-center py-2"
      >
        Solicitudes relacionadas con el itinerario
      </p>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-80">
      <div v-if="itineraryRequests.length == 0">
        <p>No hay trámites de itinerario que mostrar</p>
      </div>
      <div v-else>
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th scope="col" class="px-6 py-1">Semestre</th>
              <th scope="col" class="px-6 py-1">Itinerario</th>
              <th scope="col" class="px-6 py-1">Núm solicitud</th>
              <th scope="col" class="px-6 py-1">Fecha solicitud</th>
              <th scope="col" class="px-6 py-1">Estado</th>
            </tr>
          </thead>
          <tbody class="justify-center">
            <tr
              v-for="request in itineraryRequests"
              :key="request"
              class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="text-center">{{ request.descAnyAcademic }}</td>
              <td class="text-center">{{ request.descripcioCamiDesti }}</td>
              <td class="text-center">{{ request.numSolicitud }}</td>
              <td class="text-center">
                {{ formatDate(request.dataSolicitud) }}
              </td>
              <td class="text-center">{{ request.descEstatSolicitud }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItineraryTable",
};
</script>

<script setup>
defineProps({
  itineraryRequests: Object,
});

function formatDate(unixDate) {
  const date = new Date(+unixDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
</script>
