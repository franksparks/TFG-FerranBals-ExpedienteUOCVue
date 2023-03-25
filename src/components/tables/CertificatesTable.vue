<template>
  <div class="pt-3 px-60 pb-2">
    <p class="tablinks py-1.5 px-3 rounded text-white bg-blue-600 text-center">
      Certificados y otros documentos académicos
    </p>
  </div>

  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg content-center mx-80"
  >
    <table
      v-for="certificate in certificates"
      :key="certificate"
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
      >
        <tr>
          <th scope="col" class="px-6 py-1 text-center" colspan="2">
            Certificados
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
        >
          <td class="pl-3 w-1/4">Número de solicitud</td>
          <td>{{ certificate.numSolicitud }}</td>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
        >
          <td class="pl-3">Fecha de solicitud</td>
          <td>
            {{ formatDate(certificate.dataSolicitud) }}
          </td>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
        >
          <td class="pl-3">Tipo Certificado</td>
          <td>{{ certificate.descCertificat }}</td>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
        >
          <td class="pl-3">Estado solicitud Certificado</td>
          <td>{{ certificate.descEstatSolicitud }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CertificatesTable",
};
</script>

<script setup>
defineProps({
  certificates: Object,
});

function formatDate(unixDate) {
  const date = new Date(+unixDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
</script>
