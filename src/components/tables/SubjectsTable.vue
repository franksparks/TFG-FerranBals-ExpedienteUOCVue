<template>
  <div class="text-center py-2">
    <p
      class="tablinks rounded text-white bg-blue-900 text-center py-1 mx-2 text-sm md:text-xl"
    >
      {{ $t("subjectTable.mainTitle") }}
    </p>
    <div class="relative overflow-x-auto mx-2 pt-2 md:pt-5">
      <div
        class="md:flex sm:w-full justify-between md:px-6 bg-gray-100 dark:bg-gray-700 rounded-t-lg py-2"
      >
        <!-- FILTERS START -->
        <div class="md:w-1/3 relative mx-4">
          <input
            class="w-full py-2 px-3 rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 text-gray-300"
            type="text"
            v-model="searchTerm"
            :placeholder="$t('subjectTable.placeholder')"
            @input="currentPage = 1"
          />
        </div>

        <select
          v-model="selectedType"
          class="float-right text-gray-800 rounded align-right py-2 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 hidden md:block"
          @change="currentPage = 1"
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
          class="pr-4 float-right text-gray-800 rounded align-right py-2 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 hidden md:block"
          @change="currentPage = 1"
        >
          <option value="null" selected="true">
            {{ $t("subjectTable.all") }}
          </option>
          <option value="Aprobadas">{{ $t("subjectTable.passed") }}</option>
          <option value="Suspendidas">
            {{ $t("subjectTable.notPassed") }}
          </option>
          <option value="Cursando">{{ $t("subjectTable.ongoing") }}</option>
          <option value="Reconocidas">
            {{ $t("subjectTable.accredited") }}
          </option>
        </select>

        <select
          v-model="resultsPerPage"
          class="pr-4 float-right text-gray-800 rounded align-right py-2 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 hidden md:block"
          @change="currentPage = 1"
        >
          <option value="10" selected="true">
            10 {{ $t("subjectTable.results") }}
          </option>
          <option value="20">20 {{ $t("subjectTable.results") }}</option>
          <option value="40">40 {{ $t("subjectTable.results") }}</option>
        </select>

        <button
          @click.prevent="previousSubjectsPage()"
          class="tablinks py-1.5 px-3 rounded text-white bg-green-600 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 hidden md:block"
          :class="{
            'bg-yellow-600 cursor-not-allowed': currentPage - 1 == 0,
          }"
        >
          &lt;&lt;
        </button>

        <label
          class="tablinks py-1.5 px-3 rounded text-white bg-blue-600 hidden md:block"
        >
          {{ currentPage }}
        </label>

        <button
          @click="nextSubjectsPage()"
          class="tablinks py-1.5 px-3 rounded text-white bg-green-600 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 hidden md:block"
          :class="{
            'bg-yellow-600 cursor-not-allowed': currentPage + 1 > totalPages,
          }"
        >
          &gt;&gt;
        </button>

        <button
          class="tablinks py-1.5 px-3 rounded text-white bg-green-600 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500 hidden md:block"
          @click.prevent="resetFilters()"
        >
          {{ $t("subjectTable.reset") }}
        </button>
      </div>
    </div>
    <!-- FILTERS END -->
    <!-- SUBJECTS TABLE START-->
    <div class="mx-2 md:mb-14">
      <div class="relative overflow-x-auto rounded-b-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          v-if="filteredSubjects.length != 0"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th
                class="py-1 cursor-pointer"
                @click="sortSubjects('descripcio')"
              >
                {{ $t("subjectTable.description") }}
                <span class="ml-2">
                  <i class="fas fa-chevron-up"></i>
                  <i class="fas fa-chevron-down"></i>
                </span>
              </th>
              <th
                class="py-1 cursor-pointer hidden md:table-cell"
                @click="sortSubjects('codi')"
              >
                {{ $t("subjectTable.code") }}
                <span class="ml-2">
                  <i class="fas fa-chevron-up"></i>
                  <i class="fas fa-chevron-down"></i>
                </span>
              </th>
              <th
                class="py-1 cursor-pointer hidden md:table-cell"
                @click="sortSubjects('descripcioClasseCredits')"
              >
                {{ $t("subjectTable.type") }}
                <span class="ml-2">
                  <i class="fas fa-chevron-up"></i>
                  <i class="fas fa-chevron-down"></i>
                </span>
              </th>
              <th
                class="py-1 cursor-pointer hidden md:table-cell"
                @click="sortSubjects('numCredits')"
              >
                {{ $t("subjectTable.credits") }}
                <span class="ml-2">
                  <i class="fas fa-chevron-up"></i>
                  <i class="fas fa-chevron-down"></i>
                </span>
              </th>
              <th
                class="py-1 cursor-pointer hidden md:table-cell"
                @click="sortSubjects('ultAnyMatricula')"
              >
                {{ $t("subjectTable.semester") }}
                <span class="ml-2">
                  <i class="fas fa-chevron-up"></i>
                  <i class="fas fa-chevron-down"></i>
                </span>
              </th>
              <th
                class="py-1 cursor-pointer hidden md:table-cell"
                @click="sortSubjects('numConvocatoriesConsumides')"
              >
                {{ $t("subjectTable.convos") }}
                <span class="ml-2">
                  <i class="fas fa-chevron-up"></i>
                  <i class="fas fa-chevron-down"></i>
                </span>
              </th>
              <th
                class="py-1 cursor-pointer"
                @click="sortSubjects('descripcioQualificacioQualitativaFinal')"
              >
                {{ $t("subjectTable.grade") }}
                <span class="ml-2">
                  <i class="fas fa-chevron-up"></i>
                  <i class="fas fa-chevron-down"></i>
                </span>
              </th>
              <th
                class="py-1 cursor-pointer"
                @click="sortSubjects('qualificacioQuantitativaFinal')"
              >
                {{ $t("subjectTable.finalGrade") }}
                <span class="ml-2">
                  <i class="fas fa-chevron-up"></i>
                  <i class="fas fa-chevron-down"></i>
                </span>
              </th>
              <th scope="col" class="py-1 w-1/10 md:hidden sm:table-cell">
                {{ $t("subjectTable.info") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="subject in paginatedData"
              :key="subject"
              class="subjects bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700 cursor-pointer"
              @click.prevent="requestData(subject)"
            >
              <th
                class="px-2 md:px-6 py-3 md:font-medium text-gray-900 md:whitespace-nowrap dark:text-white"
              >
                {{ subject.descripcio }}
              </th>
              <td class="text-center hidden md:table-cell">
                {{ subject.codi }}
              </td>
              <td class="text-center hidden md:table-cell">
                {{ subject.descripcioClasseCredits }}
              </td>
              <td class="text-center hidden md:table-cell">
                {{ subject.numCredits }}
              </td>
              <td class="text-center hidden md:table-cell">
                {{ subject.ultAnyMatricula }}
              </td>
              <td class="text-center hidden md:table-cell">
                {{ subject.numConvocatoriesConsumides }}
              </td>
              <td
                class="text-center"
                v-if="subject.descripcioQualificacioQualitativaFinal"
              >
                {{ subject.descripcioQualificacioQualitativaFinal }}
              </td>
              <td class="text-center" v-else>
                {{ $t("subjectTable.ongoing") }}
              </td>
              <td
                class="text-center"
                v-if="subject.qualificacioQuantitativaFinal"
              >
                {{ subject.qualificacioQuantitativaFinal }}
              </td>
              <td class="text-center" v-else>NA</td>
              <td
                class="text-center px-6 py-4 cursor-pointer underline text-cyan-500 md:hidden table-cell"
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
  </div>

  <SubjectModal
    v-if="modalVisibility"
    @close-modal="modalVisibility = false"
    :subjectInformation="subjectInformation"
  />
</template>

<script>
export default {
  name: "SubjectsTable",
};
</script>

<script setup>
import { ref, computed, onMounted } from "vue";

import SubjectModal from "@/components/modals/SubjectModal.vue";

const modalVisibility = ref(false);
const subjectInformation = ref({});
const searchTerm = ref("");

const selectedType = ref(null);
const selectedGrade = ref(null);

const resultsPerPage = ref(10);
const currentPage = ref(1);

onMounted(() => {
  if (window.innerWidth <= 768) {
    resultsPerPage.value = 100;
  } else {
    resultsPerPage.value = 10;
  }
});

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
  resultsPerPage.value = 10;
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
