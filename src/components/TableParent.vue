<template>
  <div>
    <div class="tab py-2 mx-2">
      <button
        class="tablinks py-1.5 px-3 rounded text-white"
        @click.prevent="tab = 'subject'"
        :class="{
          'bg-blue-600': tab === 'subject',
          'bg-green-600': tab !== 'subject',
        }"
      >
        {{ $t("table.academic") }}
      </button>
      <button
        class="tablinks py-1.5 px-3 rounded text-white"
        @click.prevent="tab = 'payments'"
        :class="{
          'bg-blue-600': tab === 'payments',
          'bg-green-600': tab !== 'payments',
        }"
      >
        {{ $t("table.enrollment") }}
      </button>
      <button
        class="tablinks py-1.5 px-3 rounded text-white"
        @click.prevent="tab = 'requests'"
        :class="{
          'bg-blue-600': tab === 'requests',
          'bg-green-600': tab !== 'requests',
        }"
      >
        {{ $t("table.requests") }}
      </button>
    </div>
    <div class="3">
      <!-- FIRST TAB -->
      <!-- Credits Table -->
      <CreditsTable
        v-if="tab === 'subject' && credits.numCreditsObligatoriSuperat != null"
        :credits="credits"
      />
      <!-- Subject Table -->
      <SubjectTable v-if="tab === 'subject'" :subjects="subjects" />
      <!-- FIRST TAB END -->

      <!-- SECOND TAB -->

      <!-- Enrollments Table -->
      <EnrollmentTable v-if="tab === 'payments'" :enrollments="enrollments" />
      <!-- SECOND TAB END -->

      <!-- THIRD TAB -->

      <div
        v-if="tab === 'requests'"
        class="dropdown"
        data-control="checkbox-dropdown"
      >
        <div class="dropdown-list">
          <label class="dropdown-option">
            <input type="checkbox" v-model="aep" checked />
            {{ $t("AEPRequests.sectionTitle") }}
          </label>

          <label class="dropdown-option">
            <input type="checkbox" v-model="certs" checked />
            {{ $t("certificates.sectionTitle") }}
          </label>

          <label class="dropdown-option">
            <input type="checkbox" v-model="virtualTestRequest" checked />
            {{ $t("virtualTestRequests.sectionTitle") }}
          </label>

          <label class="dropdown-option">
            <input type="checkbox" v-model="itineraryRequest" checked />
            {{ $t("itineraryRequests.sectionTitle") }}
          </label>
        </div>
      </div>
      <!-- AEP Requests Table -->
      <AEPRequestsTable
        v-if="tab === 'requests' && aep"
        :AEPRequests="AEPRequests"
      />

      <!-- Certificates Table -->
      <CertificatesTable
        v-if="tab === 'requests' && certs"
        :certificates="certificates"
      />

      <!-- Virtual test requests Table -->
      <VirtualTestRequestTable
        v-if="tab === 'requests' && virtualTestRequest"
        :virtualTestRequests="virtualTestRequests"
      />
      <!-- Itineary Table -->
      <ItineraryRequestsTable
        v-if="tab === 'requests' && itineraryRequest"
        :itineraryRequests="itineraryRequests"
      />
      <!-- THIRD TAB END -->
    </div>
  </div>
</template>

<script>
export default {
  name: "TableParent",
};
</script>

<script setup>
import { ref } from "vue";
import SubjectTable from "./tables/SubjectTable.vue";
import CreditsTable from "./tables/CreditsTable.vue";
import EnrollmentTable from "./tables/EnrollmentTable.vue";
import AEPRequestsTable from "./tables/AEPRequestsTable.vue";
import CertificatesTable from "./tables/CertificatesTable.vue";
import VirtualTestRequestTable from "./tables/VirtualTestRequestsTable.vue";
import ItineraryRequestsTable from "./tables/ItineraryRequestsTable.vue";

const tab = ref("subject");

const aep = ref(true);
const certs = ref(true);
const virtualTestRequest = ref(true);
const itineraryRequest = ref(true);

defineProps({
  itineraryRequests: Object,
  credits: Object,
  subjects: Object,
  virtualTestRequests: Object,
  certificates: Object,
  AEPRequests: Object,
  enrollments: Object,
});
</script>
