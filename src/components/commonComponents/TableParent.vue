<template>
  <div :class="{ dark: darkMode }">
    <div class="mx-2 md:flex">
      <div class="md:flex-1" :class="{ 'md:pb-2 ': tab !== 'requests' }">
        <button
          v-if="props.credits.numCreditsObligatoriSuperat != null"
          class="tablinks py-1.5 px-3 rounded text-blue-900 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
          @click.prevent="tab = 'summary'"
          :class="{
            'bg-cyan-400 font-bold cursor-default': tab === 'summary',
            'bg-neutral-300 border-2 hover:bg-neutral-400 ': tab !== 'summary',
          }"
        >
          {{ $t("table.academic") }}
        </button>
        <button
          class="tablinks py-1.5 px-3 rounded text-blue-900 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
          @click.prevent="tab = 'subjects'"
          :class="{
            'bg-cyan-400 font-bold cursor-default': tab === 'subjects',
            'bg-neutral-300 border-2 hover:bg-neutral-400': tab !== 'subjects',
          }"
        >
          {{ $t("table.subjects") }}
        </button>
        <button
          class="tablinks py-1.5 px-3 rounded text-blue-900 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
          @click.prevent="tab = 'enrollments'"
          :class="{
            'bg-cyan-400 font-bold cursor-default': tab === 'enrollments',
            'bg-neutral-300 border-2 hover:bg-neutral-400':
              tab !== 'enrollments',
          }"
        >
          {{ $t("table.enrollment") }}
        </button>
        <button
          class="tablinks py-1.5 px-3 rounded text-blue-900 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
          @click.prevent="tab = 'requests'"
          :class="{
            'bg-cyan-400 font-bold cursor-default': tab === 'requests',
            'bg-neutral-300 border-2 hover:bg-neutral-400': tab !== 'requests',
          }"
        >
          {{ $t("table.requests") }}
        </button>
      </div>

      <div>
        <div
          v-if="tab === 'requests'"
          class="text-black dark:text-white"
          data-control="checkbox-dropdown"
        >
          <div class="md:block hidden">
            <div>
              <label class="dropdown-option mx-2">
                <input type="checkbox" v-model="aep" checked />
                {{ $t("AEPRequests.sectionTitle") }}
              </label>

              <label class="dropdown-option mx-2">
                <input type="checkbox" v-model="certs" checked />
                {{ $t("certificates.sectionTitle") }}
              </label>
            </div>
            <div>
              <label class="dropdown-option mx-2">
                <input type="checkbox" v-model="virtualTestRequest" checked />
                {{ $t("virtualTestRequests.sectionTitle") }}
              </label>

              <label class="dropdown-option mx-2">
                <input type="checkbox" v-model="itineraryRequest" checked />
                {{ $t("itineraryRequests.sectionTitle") }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <!-- FIRST TAB -->
    <!-- Credits Table -->
    <CreditsTable
      v-if="tab === 'summary' && credits.numCreditsObligatoriSuperat != null"
      :credits="credits"
      :subjects="subjects"
      :daltonicMode="!!daltonicMode"
      :darkMode="darkMode"
    />

    <!-- Subject Table -->
    <SubjectsTable
      v-if="tab === 'subjects'"
      :subjects="subjects"
      :darkMode="darkMode"
    />
    <!-- FIRST TAB END -->

    <!-- SECOND TAB -->

    <!-- Enrollments Table -->
    <EnrollmentsTable
      v-if="tab === 'enrollments'"
      :enrollments="enrollments"
      :recal="recal"
      :darkMode="darkMode"
    />
    <!-- SECOND TAB END -->

    <!-- THIRD TAB -->

    <div v-if="tab === 'requests'">
      <div class="py-3 md:grid grid-cols-2">
        <!-- AEP Requests Table -->

        <AEPRequestsTable
          v-if="aep"
          :AEPRequests="AEPRequests"
          :darkMode="darkMode"
        />

        <!-- Certificates Table -->
        <CertificateRequestsTable
          v-if="certs"
          :certificates="certificates"
          :darkMode="darkMode"
        />

        <!-- Virtual test requests Table -->
        <VirtualTestRequestsTable
          v-if="virtualTestRequest"
          :virtualTestRequests="virtualTestRequests"
          :darkMode="darkMode"
        />
        <!-- Itinerary Table -->
        <ItineraryRequestsTable
          v-if="itineraryRequest"
          :itineraryRequests="itineraryRequests"
          :darkMode="darkMode"
        />
      </div>
      <div
        class="mx-2"
        v-if="!aep && !certs && !virtualTestRequest && !itineraryRequest"
      >
        <p>{{ $t("table.noContent") }}</p>
      </div>
    </div>
    <!-- THIRD TAB END -->
  </div>
</template>

<script>
export default {
  name: "TableParent",
};
</script>

<script setup>
import { onMounted, ref } from "vue";
import SubjectsTable from "../subjects/SubjectsTable.vue";
import CreditsTable from "../credits/CreditsTable.vue";
import EnrollmentsTable from "../enrollments/EnrollmentsTable.vue";
import AEPRequestsTable from "../requests/AEPRequestsTable.vue";
import CertificateRequestsTable from "../requests/CertificateRequestsTable.vue";
import VirtualTestRequestsTable from "../requests/VirtualTestRequestsTable.vue";
import ItineraryRequestsTable from "../requests/ItineraryRequestsTable.vue";

// Default tab
const tab = ref("summary");

onMounted(() => {
  if (props.credits.numCreditsObligatoriSuperat == null) tab.value = "subjects";
});

const aep = ref(true);
const certs = ref(true);
const virtualTestRequest = ref(true);
const itineraryRequest = ref(true);

const props = defineProps({
  itineraryRequests: Object,
  credits: Object,
  subjects: Object,
  virtualTestRequests: Object,
  certificates: Object,
  AEPRequests: Object,
  enrollments: Array,
  recal: Array,
  daltonicMode: Boolean,
  darkMode: Boolean,
});
</script>
