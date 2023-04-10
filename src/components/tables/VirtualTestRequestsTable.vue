<template>
  <div class="mx-2" :class="{ dark: darkMode }">
    <p
      class="tablinks py-1 rounded text-white bg-blue-900 text-sm md:text-xl text-center"
    >
      {{ $t("virtualTestRequests.sectionTitle") }}
    </p>

    <div v-if="virtualTestRequests.length == 0" class="text-center">
      <p>{{ $t("virtualTestRequests.empty") }}</p>
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
              <th scope="col" class="py-1 w-1/6">
                {{ $t("virtualTestRequests.semester") }}
              </th>
              <th scope="col" class="py-1 w-2/6">
                {{ $t("virtualTestRequests.subject") }}
              </th>
              <th scope="col" class="py-1 w-1/6 hidden md:table-cell">
                {{ $t("virtualTestRequests.subjectCode") }}
              </th>
              <th scope="col" class="py-1 w-1/6">
                {{ $t("virtualTestRequests.testType") }}
              </th>
              <th scope="col" class="py-1 w-1/6">
                {{ $t("virtualTestRequests.status") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="request in virtualTestRequests"
              :key="request"
              class="border-b dark:bg-gray-900 hover:text-white hover:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700 text-center"
            >
              <td>{{ request.descAnyAcademic }}</td>
              <td>{{ request.descAssignatura }}</td>
              <td class="hidden md:table-cell">{{ request.codAssignatura }}</td>
              <td>{{ request.tipusProva }}</td>
              <td>{{ request.descEstat }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VitualTestRequestsTable",
};
</script>

<script setup>
defineProps({
  virtualTestRequests: Object,
  darkMode: Boolean,
});
</script>
