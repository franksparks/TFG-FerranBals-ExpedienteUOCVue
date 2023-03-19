<template>
  <div class="pt-5">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
        >
          <tr>
            <th>Semestre</th>
            <th>Itinerario</th>
            <th>Núm solicitud</th>
            <th>Fecha solicitud</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody class="justify-center">
          <tr
            v-for="i in itineraryReq"
            :key="i"
            class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="text-center">{{ i.descAnyAcademic }}</td>
            <td class="text-center">{{ i.descripcioCamiDesti }}</td>
            <td class="text-center">{{ i.numSolicitud }}</td>
            <td class="text-center">{{ i.dataSolicitud }}</td>
            <td class="text-center">{{ i.descEstatSolicitud }}</td>
          </tr>
        </tbody>
      </table>
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
  itineraryReq: Object,
});
</script>
