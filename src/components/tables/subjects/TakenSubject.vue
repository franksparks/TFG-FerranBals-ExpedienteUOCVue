<template>
  <div>
    <div class="mb-1 border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap text-sm font-medium text-center" role="tablist">
        <li class="mr-2" v-for="(convo, index) in subjectConvo" :key="index">
          <button
            class="tablinks py-1.5 px-3 rounded text-blue-900 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
            type="button"
            @click="currentIndex = index"
            :class="{
              'bg-cyan-400 font-bold cursor-default': currentIndex === index,
              'bg-neutral-300 border-2 hover:bg-neutral-400':
                currentIndex !== index,
            }"
          >
            {{ convo.descAnyAcademico }}
          </button>
        </li>
      </ul>
    </div>
    <hr class="border-gray-500 mb-2" />
    <div
      v-for="(convo, index) in subjectConvo"
      :key="convo.numConvocatoriaActual"
    >
      <div
        v-if="index === currentIndex"
        class="relative overflow-x-auto sm:rounded-lg"
      >
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th scope="col" class="px-6 py-1 text-center" colspan="2">
                {{ convo.descAnyAcademico }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">{{ $t("takenSubject.subject") }}</td>
              <td>{{ subjectInformation.descripcio }}</td>
            </tr>
            <tr
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="subjectInformation.codi != null"
            >
              <td class="pl-3">{{ $t("takenSubject.subjectCode") }}</td>
              <td>{{ subjectInformation.codi }}</td>
            </tr>
            <tr
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">{{ $t("takenSubject.credits") }}</td>
              <td>{{ subjectInformation.numCredits }}</td>
            </tr>
            <tr
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">{{ $t("takenSubject.type") }}</td>
              <td>{{ subjectInformation.descripcioClasseCredits }}</td>
            </tr>
            <tr
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.numConvocatoriaActual != null"
            >
              <td class="pl-3">{{ $t("takenSubject.convo") }}</td>
              <td>{{ convo.numConvocatoriaActual }}</td>
            </tr>
            <tr
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.nomConsultor != null"
            >
              <td class="pl-3">{{ $t("takenSubject.teacher") }}</td>
              <td>{{ convo.nomConsultor }}</td>
            </tr>
            <tr
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.codCalifFC != null"
            >
              <td class="pl-3">{{ $t("takenSubject.continuous") }}</td>
              <td>{{ convo.codCalifC }} ({{ convo.numCalifC }})</td>
            </tr>
            <tr
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.codCalifP != null"
            >
              <td class="pl-3">{{ $t("takenSubject.practical") }}</td>
              <td v-if="convo.numCalifP != null">
                {{ convo.codCalifP }}({{ convo.numCalifP }})
              </td>
              <td v-else>{{ convo.codCalifP }}</td>
            </tr>
            <tr
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.codCalifFC != null"
            >
              <td class="pl-3">{{ $t("takenSubject.continuousFinal") }}</td>
              <td>{{ convo.codCalifFC }} ({{ convo.numCalifFC }})</td>
            </tr>
            <tr
              v-if="convo.numCalifPS != null"
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">{{ $t("takenSubject.testFinal") }}</td>
              <td>{{ convo.codCalifPS }} ({{ convo.numCalifPS }})</td>
            </tr>
            <tr
              v-if="convo.numCalifEX != null"
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">{{ $t("takenSubject.exam") }}</td>
              <td>{{ convo.codCalifEX }} ({{ convo.numCalifEX }})</td>
            </tr>

            <tr
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <td class="pl-3">{{ $t("takenSubject.subjectGrade") }}</td>
              <td
                v-if="
                  props.subjectInformation
                    .descripcioQualificacioQualitativaFinal == null
                "
              >
                {{ $t("takenSubject.ongoing") }}
              </td>

              <td v-else-if="convo.numCalifFA != null">
                {{ convo.descCalifFA }} ({{ convo.numCalifFA }})
              </td>
              <td v-else>{{ convo.descCalifFA }}</td>
            </tr>

            <tr
              class="bg-white border-b hover:text-white hover:bg-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
              v-if="convo.numConvocatoriaActual != 0"
            >
              <td class="pl-3">{{ $t("takenSubject.year") }}</td>
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
  name: "SubjectTaken",
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
