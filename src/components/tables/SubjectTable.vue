<template>
  <div class="pt-3 pb-10">
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th scope="col" class="px-6 py-1 w-3/10">Descripción</th>
              <th scope="col" class="px-6 py-1 w-1/10">Código</th>
              <th scope="col" class="px-6 py-1 w-1/10">Tipo</th>
              <th scope="col" class="px-6 py-1 w-1/10">Créditos</th>
              <th scope="col" class="px-6 py-1 w-1/10">Semestre</th>
              <th scope="col" class="px-6 py-1 w-1/10">Nota</th>
              <th scope="col" class="px-6 py-1 w-1/10">Nota final</th>
              <th scope="col" class="px-6 py-1 w-1/10">Más info</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="subject in subjects"
              :key="subject"
              class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ subject.descripcio }}
              </th>
              <td class="text-center px-6 py-4">
                {{ subject.codi }}
              </td>
              <td class="text-center px-6 py-4">
                {{ subject.descripcioClasseCredits }}
              </td>
              <td class="text-center px-6 py-4">{{ subject.numCredits }}</td>
              <td class="text-center px-6 py-4">
                {{ subject.ultAnyMatricula }}
              </td>
              <td class="text-center px-6 py-4">
                {{ subject.descripcioQualificacioQualitativaFinal }}
              </td>
              <td class="text-center px-6 py-4">
                {{ subject.qualificacioQuantitativaFinal }}
              </td>
              <td
                class="text-center px-6 py-4 cursor-pointer underline text-cyan-500"
                @click.prevent="requestData(subject)"
              >
                Link
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <SubjectModal
      v-if="modalVisibility"
      @close-modal="modalVisibility = false"
      :subjectInformation="subjectInformation"
    />
  </div>
</template>

<script>
export default {
  name: "SubjectTable",
};
</script>

<script setup>
import { ref } from "vue";

import SubjectModal from "@/components/modals/SubjectModal.vue";

const modalVisibility = ref(false);
const subjectInformation = ref({});

function requestData(subject) {
  //Request per subject
  modalVisibility.value = true;
  subjectInformation.value = subject;
}

defineProps({
  subjects: Object,
});
</script>
