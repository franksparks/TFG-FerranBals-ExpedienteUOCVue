<template>
  <div class="mx-2" :class="{ dark: !darkMode }">
    <p
      class="tablinks py-1 rounded text-white bg-blue-900 text-sm md:text-xl text-center"
    >
      {{ $t("certificates.sectionTitle") }}
    </p>

    <div v-if="certificates.length == 0" class="text-center">
      <p>{{ $t("certificates.empty") }}</p>
    </div>
    <div v-else class="py-3 md:py-5">
      <div class="relative overflow-x-auto rounded-lg content-center">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th scope="col" class="w-1/5">
                {{ $t("certificates.number") }}
              </th>
              <th class="w-1/5">{{ $t("certificates.date") }}</th>
              <th class="w-2/5">{{ $t("certificates.type") }}</th>
              <th class="w-1/5">{{ $t("certificates.status") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="certificate in certificates"
              :key="certificate"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700 text-center"
            >
              <td>{{ certificate.numSolicitud }}</td>
              <td>
                {{ formatDate(certificate.dataSolicitud) }}
              </td>
              <td>{{ certificate.descCertificat }}</td>
              <td>{{ certificate.descEstatSolicitud }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CertificateRequestsTable",
};
</script>

<script setup>
defineProps({
  certificates: Object,
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
