<template>
  <div>
    <div class="mx-2 md:flex">
      <div class="md:flex-1" :class="{ 'md:pb-3 ': tab !== 'requests' }">
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

      <div class="border-2 border-green-500">
        <div
          v-if="tab === 'requests'"
          class=""
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
    />

    <!-- Subject Table -->
    <SubjectsTable v-if="tab === 'subjects'" :subjects="subjects" />
    <!-- FIRST TAB END -->

    <!-- SECOND TAB -->

    <!-- Enrollments Table -->
    <EnrollmentsTable v-if="tab === 'enrollments'" :enrollments="enrollments" />
    <!-- SECOND TAB END -->

    <!-- THIRD TAB -->

    <div v-if="tab === 'requests'">
      <div class="py-2 md:grid grid-cols-2">
        <!-- AEP Requests Table -->

        <AEPRequestsTable v-if="aep" :AEPRequests="AEPRequests" />

        <!-- Certificates Table -->
        <CertificatesTable v-if="certs" :certificates="certificates" />

        <!-- Virtual test requests Table -->
        <VirtualTestRequestTable
          v-if="virtualTestRequest"
          :virtualTestRequests="virtualTestRequests"
        />
        <!-- Itineary Table -->
        <ItineraryRequestsTable
          v-if="itineraryRequest"
          :itineraryRequests="itineraryRequests"
        />
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
import SubjectsTable from "./tables/SubjectsTable.vue";
import CreditsTable from "./tables/CreditsTable.vue";
import EnrollmentsTable from "./tables/EnrollmentsTable.vue";
import AEPRequestsTable from "./tables/AEPRequestsTable.vue";
import CertificatesTable from "./tables/CertificatesTable.vue";
import VirtualTestRequestTable from "./tables/VirtualTestRequestsTable.vue";
import ItineraryRequestsTable from "./tables/ItineraryRequestsTable.vue";

//Default tab
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
  enrollments: Object,
});
</script>
