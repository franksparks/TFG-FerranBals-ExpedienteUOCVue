<template>
  <div class="pt-3 px-60 pb-2">
    <p class="tablinks py-1.5 px-3 rounded text-white bg-blue-400 text-center">
      {{ $t("virtualTestRequests.sectionTitle") }}
    </p>
  </div>

  <div v-if="virtualTestRequests.length == 0" class="mx-60">
    <p>{{ $t("virtualTestRequests.empty") }}</p>
  </div>
  <div v-else>
    <div class="overflow-x-auto shadow-md sm:rounded-lg mx-80"></div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
      >
        <tr>
          <th scope="col" class="px-6 py-1">
            {{ $t("virtualTestRequests.semester") }}
          </th>
          <th scope="col" class="px-6 py-1">
            {{ $t("virtualTestRequests.subject") }}
          </th>
          <th scope="col" class="px-6 py-1">
            {{ $t("virtualTestRequests.subjectCode") }}
          </th>
          <th scope="col" class="px-6 py-1">
            {{ $t("virtualTestRequests.testType") }}
          </th>
          <th scope="col" class="px-6 py-1">
            {{ $t("virtualTestRequests.status") }}
          </th>
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
