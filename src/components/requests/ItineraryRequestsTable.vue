<template>
  <div class="mx-2 pb-10" :class="{ dark: darkMode }">
    <p
      class="tablinks py-1 rounded text-white bg-blue-900 text-sm md:text-xl text-center"
    >
      {{ $t("itineraryRequests.sectionTitle") }}
    </p>

    <div v-if="itineraryRequests.length == 0" class="text-center">
      <p class="dark:text-white">
        {{ $t("itineraryRequests.empty") }}
      </p>
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
              <th scope="col" class="w-1/6 py-1">
                {{ $t("itineraryRequests.semester") }}
              </th>
              <th scope="col" class="w-2/6 py-1">
                {{ $t("itineraryRequests.itinerary") }}
              </th>
              <th scope="col" class="w-1/6 py-1">
                {{ $t("itineraryRequests.number") }}
              </th>
              <th scope="col" class="w-1/6 py-1 hidden md:table-cell">
                {{ $t("itineraryRequests.date") }}
              </th>
              <th scope="col" class="w-1/6 py-1">
                {{ $t("itineraryRequests.status") }}
              </th>
            </tr>
          </thead>
          <tbody class="justify-center">
            <tr
              v-for="request in itineraryRequests"
              :key="request"
              class="subjects bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-200 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="text-center">{{ request.descAnyAcademic }}</td>
              <td class="text-center">{{ request.descripcioCamiDesti }}</td>
              <td class="text-center">{{ request.numSolicitud }}</td>
              <td class="text-center hidden md:table-cell">
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
  name: "ItineraryRequestsTable",
};
</script>

<script setup>
defineProps({
  itineraryRequests: Object,
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
