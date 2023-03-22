<template>
  <div>
    <div v-for="subj in subject" :key="subj">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <!--Aplicar título en dos columnas-->
            <tr>
              <th scope="col" class="px-6 py-3 text-center">
                {{ subj.P.descAnyAcademico }}
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
              v-if="subj.numConvocatoriaActual != null"
            >
              <td class="pl-3">Convocatoria</td>
              <td>{{ subj.numConvocatoriaActual }}</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="subj.P.nomConsultor != null"
            >
              <td class="pl-3">Consultor</td>
              <td>{{ subj.P.nomConsultor }}</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="subj.P.codCalifFC != null"
            >
              <td class="pl-3">Calificación de Evaluación Contínua</td>
              <td>{{ subj.P.codCalifC }} ({{ subj.P.numCalifC }})</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="subj.P.codCalifP != null"
            >
              <td class="pl-3">Calificación final de actividades prácticas</td>
              <td>{{ subj.P.codCalifP }}({{ subj.P.numCalifP }})</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="subj.P.codCalifFC != null"
            >
              <td class="pl-3">Calificación final de Evaluación Contínua</td>
              <td>{{ subj.P.codCalifFC }} ({{ subj.P.numCalifFC }})</td>
            </tr>
            <tr
              v-if="subj.P.numCalifPS != null"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">Calificación final de Prueba de Síntesis</td>
              <td>{{ subj.P.numCalifPS }}</td>
            </tr>
            <tr
              v-if="subj.P.numCalifEX != null"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">Calificación final de Examen</td>
              <td>{{ subj.P.numCalifEX }}</td>
            </tr>

            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">Calificación final de la asignatura</td>
              <td
                v-if="
                  props.subjectOriginal
                    .descripcioQualificacioQualitativaFinal == null
                "
              >
                En curso
              </td>
              <td
                v-else-if="
                  props.subjectOriginal
                    .descripcioQualificacioQualitativaFinal != 'Reconocido'
                "
              >
                {{ subj.P.descCalifFA }} ({{ subj.P.numCalifFA }})
              </td>
              <td v-else>
                {{
                  props.subjectOriginal.descripcioQualificacioQualitativaFinal
                }}
              </td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="subj.P.numConvocatoriaActual != 0"
            >
              <td class="pl-3">Año superación</td>
              <td>{{ subjectOriginal.ultAnyMatricula }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubjectStudied",
};
</script>

<script setup>
const props = defineProps({
  subjectOriginal: Object,
  subject: Object,
});
</script>
