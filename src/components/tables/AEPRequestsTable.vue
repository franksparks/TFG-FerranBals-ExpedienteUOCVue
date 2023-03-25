<template>
  <div class="pt-3 px-60">
    <p class="tablinks py-1.5 px-3 rounded text-white bg-blue-600 text-center">
      Evaluación de estudios previos
    </p>

    <div v-for="request in AEPRequests" :key="request" class="py-2 px-20">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th scope="col" class="px-6 py-1 text-center" colspan="2">
                Datos básicos de la solicitud de EEP
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3 w-1/4">Número de solicitud</td>
              <td>{{ request.secSolicitud }}</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">Fecha de solicitud</td>
              <td>
                {{ formatDate(request.fechaSolicitud) }}
              </td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">Tipo Certificado</td>
              <td>{{ request.descEstado }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AEPRequestsTable",
};
</script>
<script setup>
defineProps({
  AEPRequests: Object,
});

function formatDate(unixDate) {
  const date = new Date(+unixDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
</script>
