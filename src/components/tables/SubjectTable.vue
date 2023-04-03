<template>
  <div class="text-center py-2">
    <p
      class="tablinks rounded text-white bg-blue-900 text-center py-1 mx-2 text-sm md:text-xl"
    >
      {{ $t("subjectTable.mainTitle") }}
    </p>
    <div class="relative overflow-x-auto sm:rounded-lg mx-2 py-2">
      <div
        class="flex items-center justify-between px-6 py-3 bg-gray-100 dark:bg-gray-700"
      >
        <div class="w-1/3 relative inline-block">
          <input
            class="block w-full max-w-lg py-2 px-3 rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 text-gray-300"
            type="text"
            v-model="searchTerm"
            :placeholder="$t('subjectTable.placeholder')"
          />
        </div>
        <!-- FILTERS START -->
        <select
          v-model="selectedType"
          class="pr-4 float-right text-gray-800 rounded align-right py-2"
        >
          <option value="null" selected="true">
            {{ $t("subjectTable.all") }}
          </option>
          <option value="Básica">{{ $t("subjectTable.basic") }}</option>
          <option value="Obligatoria">{{ $t("subjectTable.main") }}</option>
          <option value="Optativa">{{ $t("subjectTable.optative") }}</option>
        </select>

        <select
          v-model="selectedGrade"
          class="pr-4 float-right text-gray-800 rounded align-right py-2"
        >
          <option value="null" selected="true">
            {{ $t("subjectTable.all") }}
          </option>
          <option value="Aprobadas">{{ $t("subjectTable.passed") }}</option>
          <option value="Suspendidas">
            {{ $t("subjectTable.notPassed") }}
          </option>
          <option value="Cursando">{{ $t("subjectTable.onGoing") }}</option>
          <option value="Reconocidas">
            {{ $t("subjectTable.accredited") }}
          </option>
        </select>

        <select
          v-model="resultsPerPage"
          class="pr-4 float-right text-gray-800 rounded align-right py-2"
        >
          <option value="100" selected="true">
            {{ $t("subjectTable.allResults") }}
          </option>
          <option value="10">10 {{ $t("subjectTable.results") }}</option>
          <option value="10">20 {{ $t("subjectTable.results") }}</option>
          <option value="10">40 {{ $t("subjectTable.results") }}</option>
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
          {{ $t("subjectTable.reset") }}
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
            <th
              scope="col"
              class="px-6 py-1 w-2/10 cursor-pointer"
              @click="sortSubjects('descripcio')"
            >
              {{ $t("subjectTable.description") }}
            </th>
            <th
              scope="col"
              class="px-6 py-1 w-1/10 cursor-pointer"
              @click="sortSubjects('codi')"
            >
              {{ $t("subjectTable.code") }}
            </th>
            <th
              scope="col"
              class="px-6 py-1 w-1/10 cursor-pointer"
              @click="sortSubjects('descripcioClasseCredits')"
            >
              {{ $t("subjectTable.type") }}
            </th>
            <th
              scope="col"
              class="px-6 py-1 w-1/10 cursor-pointer"
              @click="sortSubjects('numCredits')"
            >
              {{ $t("subjectTable.credits") }}
            </th>
            <th
              scope="col"
              class="px-6 py-1 w-1/10 cursor-pointer"
              @click="sortSubjects('ultAnyMatricula')"
            >
              {{ $t("subjectTable.semester") }}
            </th>
            <th
              scope="col"
              class="px-6 py-1 w-1/10 cursor-pointer"
              @click="sortSubjects('numConvocatoriesConsumides')"
            >
              {{ $t("subjectTable.convos") }}
            </th>
            <th
              scope="col"
              class="px-6 py-1 w-1/10 cursor-pointer"
              @click="sortSubjects('descripcioQualificacioQualitativaFinal')"
            >
              {{ $t("subjectTable.grade") }}
            </th>
            <th
              scope="col"
              class="px-6 py-1 w-1/10 cursor-pointer"
              @click="sortSubjects('qualificacioQuantitativaFinal')"
            >
              {{ $t("subjectTable.finalGrade") }}
            </th>
            <th scope="col" class="px-6 py-1 w-1/10">
              {{ $t("subjectTable.info") }}
            </th>
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
        <p>{{ $t("subjectTable.empty") }}</p>
      </div>
    </div>
  </div>

  <SubjectModal
    v-if="modalVisibility"
    @close-modal="modalVisibility = false"
    :subjectInformation="subjectInformation"
  />
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

const sortDirection = ref("asc");
const sortBy = ref(null);

const sortSubjects = (column) => {
  let sub = props.subjects;
  if (column === sortBy.value) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortDirection.value = "asc";
  }
  sortBy.value = column;

  sub.sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];

    if (valueA < valueB) {
      return sortDirection.value === "asc" ? -1 : 1;
    } else if (valueA > valueB) {
      return sortDirection.value === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });
};

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
