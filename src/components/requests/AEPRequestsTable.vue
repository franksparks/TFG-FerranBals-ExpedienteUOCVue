<template>
  <div class="mx-2 pb-10" :class="{ dark: darkMode }">
    <p
      class="tablinks py-1 rounded text-white bg-blue-900 text-sm md:text-xl text-center"
    >
      {{ $t("AEPRequests.sectionTitle") }}
    </p>

    <div v-if="AEPRequests.length == 0" class="text-center">
      <p class="dark:text-white">{{ $t("AEPRequests.empty") }}</p>
    </div>
    <div v-else class="py-2 md:py-5">
      <div class="relative overflow-x-auto rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th scope="col" class="py-1 w-1/4 text-center">
                {{ $t("AEPRequests.number") }}
              </th>
              <th scope="col" class="py-1 w-1/4">
                {{ $t("AEPRequests.data") }}
              </th>
              <th scope="col" class="py-1 w-2/4">
                {{ $t("AEPRequests.status") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="request in AEPRequests"
              :key="request"
              class="bg-white border-b hover:bg-gray-600 hover:text-white dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-200 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="text-center">{{ request.secSolicitud }}</td>
              <td class="text-center">
                {{ formatDate(request.fechaSolicitud) }}
              </td>
              <td class="text-center">{{ request.descEstado }}</td>
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
  darkMode: Boolean,
});

function formatDate(unixDate) {
  const date = new Date(+unixDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
</script>
