<template>
  <div class="pt-3 pb-10">
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div
          class="flex items-center justify-between px-6 py-3 bg-gray-100 dark:bg-gray-700"
        >
          <div class="w-1/3 relative inline-block">
            <input
              class="block w-full max-w-lg py-2 px-3 rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 text-gray-300"
              type="text"
              v-model="searchTerm"
              placeholder="Buscar asignatura"
            />
          </div>
          <!-- FILTERS START -->
          <select
            v-model="selectedType"
            class="block appearance-none w-1/10 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="null" selected="true">Tipo de asignatura</option>
            <option value="Básica">Básicas</option>
            <option value="Obligatoria">Obligatorias</option>
            <option value="Optativa">Optativas</option>
          </select>

          <select
            v-model="selectedGrade"
            class="block appearance-none w-1/10 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="null" selected="true">Todas las asignaturas</option>
            <option value="Aprobadas">Superadas</option>
            <option value="Suspendidas">No superadas</option>
            <option value="Cursando">En curso</option>
            <option value="Reconocidas">Reconocidas</option>
          </select>

          <select
            v-model="resultsPerPage"
            class="block appearance-none w-1/10 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline relative"
          >
            <option value="100" selected="true">Resultados por página</option>
            <option value="10">10 resultados</option>
            <option value="20">20 resultados</option>
            <option value="40">40 resultados</option>
          </select>
          <button
            @click.prevent="previousSubjectsPage()"
            class="tablinks py-1.5 px-3 rounded text-white bg-green-600"
            :class="{
              'bg-yellow-600 cursor-not-allowed': currentPage - 1 == 0,
            }"
          >
            &lt;&lt;
          </button>

          <label class="tablinks py-1.5 px-3 rounded text-white bg-blue-600">{{
            currentPage
          }}</label>
          <button
            @click="nextSubjectsPage()"
            class="tablinks py-1.5 px-3 rounded text-white bg-green-600"
            :class="{
              'bg-yellow-600 cursor-not-allowed': currentPage + 1 > totalPages,
            }"
          >
            &gt;&gt;
          </button>
          <button
            class="tablinks py-1.5 px-3 rounded text-white bg-green-600"
            @click.prevent="resetFilters()"
          >
            Reset filters
          </button>
        </div>
        <!-- FILTERS END -->
        <!-- SUBJECTS TABLE START-->
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          v-if="filteredSubjects.length != 0"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th scope="col" class="px-6 py-1 w-2/10">Descripción</th>
              <th scope="col" class="px-6 py-1 w-1/10">Código</th>
              <th scope="col" class="px-6 py-1 w-1/10">Tipo</th>
              <th scope="col" class="px-6 py-1 w-1/10">Créditos</th>
              <th scope="col" class="px-6 py-1 w-1/10">Semestre</th>
              <th scope="col" class="px-1 py-1 w-1/10">
                Convocatorias consumidas
              </th>
              <th scope="col" class="px-6 py-1 w-1/10">Nota</th>
              <th scope="col" class="px-6 py-1 w-1/10">Nota final</th>
              <th scope="col" class="px-6 py-1 w-1/10">Más info</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="subject in paginatedData"
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
                {{ subject.numConvocatoriesConsumides }}
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
        <div v-else>
          <p>No hay resultados para mostrar</p>
        </div>
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
import { ref, computed } from "vue";

import SubjectModal from "@/components/modals/SubjectModal.vue";

const modalVisibility = ref(false);
const subjectInformation = ref({});
const searchTerm = ref("");

const selectedType = ref(null);
const selectedGrade = ref(null);

const resultsPerPage = ref(100);
const currentPage = ref(1);

const filteredSubjects = computed(() => {
  let filtered = props.subjects;

  if (searchTerm.value) {
    filtered = filtered.filter((subject) =>
      subject.descripcio.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  if (selectedType.value && selectedType.value !== "null") {
    filtered = filtered.filter(
      (subject) => subject.descripcioClasseCredits === selectedType.value
    );
  }

  if (selectedGrade.value) {
    if (selectedGrade.value == "Aprobadas")
      filtered = filtered.filter(
        (subject) => subject.qualificacioQuantitativaFinal >= 5
      );
    if (selectedGrade.value == "Suspendidas")
      filtered = filtered.filter(
        (subject) => subject.qualificacioQuantitativaFinal < 5
      );
    if (selectedGrade.value == "Cursando")
      filtered = filtered.filter(
        (subject) => subject.descripcioQualificacioQualitativaFinal == null
      );
    if (selectedGrade.value == "Reconocidas")
      filtered = filtered.filter(
        (subject) =>
          subject.descripcioQualificacioQualitativaFinal == "Reconocido"
      );
  }
  return filtered;
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * resultsPerPage.value;
  const end = Number(start) + Number(resultsPerPage.value);
  return filteredSubjects.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredSubjects.value.length / resultsPerPage.value);
});

function nextSubjectsPage() {
  if (currentPage.value + 1 <= totalPages.value) {
    currentPage.value++;
  }
}

function previousSubjectsPage() {
  if (currentPage.value - 1 > 0) {
    currentPage.value--;
  }
}

function resetFilters() {
  searchTerm.value = "";
  selectedType.value = null;
  selectedGrade.value = null;
  resultsPerPage.value = 100;
  currentPage.value = 1;
}

function requestData(subject) {
  modalVisibility.value = true;
  subjectInformation.value = subject;
}

const props = defineProps({
  subjects: Object,
});
</script>
