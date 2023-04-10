<template>
  <div id="col2" class="text-center sm:pt-2 md:pt-10">
    <p class="tablinks py-1 rounded text-white bg-blue-900 text-sm md:text-xl">
      {{ $t("current.main") }}
    </p>
    <div class="py-4">
      <div class="relative overflow-x-auto rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th class="py-1">
                {{ $t("subjectTable.description") }}
              </th>
              <th class="py-1 md:table-cell">
                {{ $t("subjectTable.code") }}
              </th>
              <th class="py-1 md:table-cell">
                {{ $t("subjectTable.type") }}
              </th>
              <th class="py-1 md:table-cell">
                {{ $t("subjectTable.credits") }}
              </th>
              <th class="py-1 hidden md:table-cell">
                {{ $t("subjectTable.convos") }}
              </th>
            </tr>
          </thead>
          <tbody class="justify-center">
            <tr
              v-for="subject in currentSubjects"
              :key="subject.id"
              class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="text-center">{{ subject.descripcio }}</td>
              <td class="text-center">{{ subject.codi }}</td>
              <td class="text-center">{{ subject.descripcioClasseCredits }}</td>
              <td class="text-center">{{ subject.numCredits }}</td>
              <td class="text-center hidden md:table-cell">
                {{ subject.numConvocatoriesConsumides }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrentSubjects",
};
</script>

<script setup>
const props = defineProps({
  subjects: Object,
});

const currentSubjects = props.subjects.filter(
  (subject) => !subject.descripcioQualificacioQualitativaFinal
);
</script>
