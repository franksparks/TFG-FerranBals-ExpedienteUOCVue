<template>
  <div class="pt-5">
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Descripción</th>
              <th scope="col" class="px-6 py-3">Código</th>
              <th scope="col" class="px-6 py-3">Tipo</th>
              <th scope="col" class="px-6 py-3">Créditos</th>
              <th scope="col" class="px-6 py-3">Semestre</th>
              <th scope="col" class="px-6 py-3">Nota</th>
              <th scope="col" class="px-6 py-3">Nota final</th>
              <th scope="col" class="px-6 py-3">Más info</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="subj in subjectList"
              :key="subj"
              class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ subj.descripcio }}
              </th>
              <td class="text-center px-6 py-4">
                {{ subj.codi }}
              </td>
              <td class="text-center px-6 py-4">
                {{ subj.descripcioClasseCredits }}
              </td>
              <td class="text-center px-6 py-4">{{ subj.numCredits }}</td>
              <td class="text-center px-6 py-4">{{ subj.ultAnyMatricula }}</td>
              <td class="text-center px-6 py-4">
                {{ subj.descripcioQualificacioQualitativaFinal }}
              </td>
              <td class="text-center px-6 py-4">
                {{ subj.qualificacioQuantitativaFinal }}
              </td>
              <td
                class="text-center px-6 py-4 cursor-pointer underline text-cyan-500"
                @click.prevent="requestData(subj.descripcio)"
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
      @close-modal="this.modalVisibility = false"
    />
  </div>
</template>

<script>
export default {
  name: "SubjectTable",
};
</script>

<script setup>
import { subjects as subjectList } from "@/response";
import { ref } from "vue";

import SubjectModal from "@/components/modals/SubjectModal.vue";

const modalVisibility = ref(false);

function requestData(asig) {
  console.log("Requesting data from: " + asig);
  //Request per subject
  this.modalVisibility = true;
}
</script>
