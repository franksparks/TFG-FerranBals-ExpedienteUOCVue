<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
        >
          <!--Aplicar título en dos columnas-->
          <tr>
            <th scope="col" class="px-6 py-3 text-center">
              {{ subjectOriginal.ultAnyMatricula }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="pl-3">Asignatura</td>
            <td>{{ subjectOriginal.descripcio }}</td>
          </tr>
          <tr
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            v-if="subjectOriginal.codi != null"
          >
            <td class="pl-3">Código</td>
            <td>{{ subjectOriginal.codi }}</td>
          </tr>
          <tr
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="pl-3">Créditos</td>
            <td>{{ subjectOriginal.numCredits }}</td>
          </tr>
          <tr
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="pl-3">Tipo asignatura</td>
            <td>{{ subjectOriginal.descripcioClasseCredits }}</td>
          </tr>

          <tr
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
          >
            <td class="pl-3">Calificación final de la asignatura</td>
            <td>
              {{
                subjectOriginal.descripcioQualificacioQualitativaFinal == null
                  ? "En curso"
                  : subjectOriginal.descripcioQualificacioQualitativaFinal !=
                    "Reconocido"
                  ? `${subjectOriginal.P.descCalifFA} (${subjectOriginal.P.numCalifFA})`
                  : subjectOriginal.descripcioQualificacioQualitativaFinal
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
  name: "SubjectRecognized",
};
</script>
<script setup>
defineProps({
  subjectOriginal: Object,
});
</script>
