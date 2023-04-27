<template>
  <div>
    <div class="relative overflow-x-auto sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
        >
          <tr>
            <th scope="col" class="px-6 py-1 text-center">
              {{ subjectInformation.ultAnyMatricula }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="pl-3">{{ $t("accreditedSubject.subject") }}</td>
            <td>{{ subjectInformation.descripcio }}</td>
          </tr>
          <tr
            class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            v-if="subjectInformation.codi != null"
          >
            <td class="pl-3">{{ $t("accreditedSubject.code") }}</td>
            <td>{{ subjectInformation.codi }}</td>
          </tr>
          <tr
            class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="pl-3">{{ $t("accreditedSubject.credits") }}</td>
            <td>{{ subjectInformation.numCredits }}</td>
          </tr>
          <tr
            class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="pl-3">{{ $t("accreditedSubject.type") }}</td>
            <td>{{ subjectInformation.descripcioClasseCredits }}</td>
          </tr>

          <tr
            class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="pl-3">{{ $t("accreditedSubject.grade") }}</td>
            <td>
              {{
                subjectInformation.descripcioQualificacioQualitativaFinal ==
                null
                  ? "En curso"
                  : subjectInformation.descripcioQualificacioQualitativaFinal !=
                    "Reconocido"
                  ? `${subjectInformation.P.descCalifFA} (${subjectInformation.P.numCalifFA})`
                  : subjectInformation.descripcioQualificacioQualitativaFinal
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubjectAccredited",
};
</script>
<script setup>
defineProps({
  subjectInformation: Object,
});
</script>
