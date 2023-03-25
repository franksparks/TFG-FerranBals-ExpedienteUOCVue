<template>
  <div>
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        class="flex flex-wrap -mb-px text-sm font-medium text-center"
        role="tablist"
      >
        <li class="mr-2" v-for="(convo, index) in subjectConvo" :key="index">
          <button
            class="inline-block p-4 border-b-2 rounded-t-lg"
            type="button"
            @click="currentIndex = index"
          >
            {{ convo.descAnyAcademico }}
          </button>
        </li>
      </ul>
    </div>
    <div
      v-for="(convo, index) in subjectConvo"
      :key="convo.numConvocatoriaActual"
    >
      <div
        v-if="index === currentIndex"
        class="relative overflow-x-auto shadow-md sm:rounded-lg"
      >
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <!--Aplicar título en dos columnas-->
            <tr>
              <th scope="col" class="px-6 py-1 text-center">
                {{ convo.descAnyAcademico }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">Asignatura</td>
              <td>{{ subjectInformation.descripcio }}</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="subjectInformation.codi != null"
            >
              <td class="pl-3">Código</td>
              <td>{{ subjectInformation.codi }}</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">Créditos</td>
              <td>{{ subjectInformation.numCredits }}</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">Tipo asignatura</td>
              <td>{{ subjectInformation.descripcioClasseCredits }}</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.numConvocatoriaActual != null"
            >
              <td class="pl-3">Convocatoria</td>
              <td>{{ convo.numConvocatoriaActual }}</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.nomConsultor != null"
            >
              <td class="pl-3">Consultor</td>
              <td>{{ convo.nomConsultor }}</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.codCalifFC != null"
            >
              <td class="pl-3">Calificación de Evaluación Contínua</td>
              <td>{{ convo.codCalifC }} ({{ convo.numCalifC }})</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.codCalifP != null"
            >
              <td class="pl-3">Calificación final de actividades prácticas</td>
              <td>{{ convo.codCalifP }}({{ convo.numCalifP }})</td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.codCalifFC != null"
            >
              <td class="pl-3">Calificación final de Evaluación Contínua</td>
              <td>{{ convo.codCalifFC }} ({{ convo.numCalifFC }})</td>
            </tr>
            <tr
              v-if="convo.numCalifPS != null"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">Calificación final de Prueba de Síntesis</td>
              <td>{{ convo.numCalifPS }}</td>
            </tr>
            <tr
              v-if="convo.numCalifEX != null"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">Calificación final de Examen</td>
              <td>{{ convo.numCalifEX }}</td>
            </tr>

            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">Calificación final de la asignatura</td>
              <td
                v-if="
                  props.subjectInformation
                    .descripcioQualificacioQualitativaFinal == null
                "
              >
                En curso
              </td>
              <td
                v-else-if="
                  props.subjectInformation
                    .descripcioQualificacioQualitativaFinal != 'Reconocido'
                "
              >
                {{ convo.descCalifFA }} ({{ convo.numCalifFA }})
              </td>
              <td v-else>
                {{
                  props.subjectInformation
                    .descripcioQualificacioQualitativaFinal
                }}
              </td>
            </tr>
            <tr
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.numConvocatoriaActual != 0"
            >
              <td class="pl-3">Año superación</td>
              <td>{{ subjectInformation.ultAnyMatricula }}</td>
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
import { ref } from "vue";
let currentIndex = ref(0);
const props = defineProps({
  subjectInformation: Object,
  subjectConvo: Object,
});
</script>
