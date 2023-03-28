<template>
  <div>
    <div class="tab">
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
      <CreditsTable v-if="tab === 'subject'" :credits="credits" />
      <!-- Subject Table -->
      <SubjectTable v-if="tab === 'subject'" :subjects="subjects" />
      <!-- FIRST TAB END -->

      <!-- SECOND TAB -->
      <!-- Enrollments Table -->
      <EnrollmentTable v-if="tab === 'payments'" :text="text" />
      <!-- SECOND TAB END -->

      <!-- THIRD TAB -->
      <!-- AEP Requests Table -->
      <AEPRequestsTable v-if="tab === 'requests'" :AEPRequests="AEPRequests" />

      <!-- Certificates Table -->
      <CertificatesTable
        v-if="tab === 'requests'"
        :certificates="certificates"
      />

      <!-- Virtual test requests Table -->
      <VirtualTestRequestTable
        v-if="tab === 'requests'"
        :virtualTestRequests="virtualTestRequests"
      />
      <!-- Itineary Table -->
      <ItineraryRequestsTable
        v-if="tab === 'requests'"
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
import SubjectTable from "./tables/SubjectTable.vue";
import CreditsTable from "./tables/CreditsTable.vue";
import EnrollmentTable from "./tables/EnrollmentTable.vue";
import AEPRequestsTable from "./tables/AEPRequestsTable.vue";
import CertificatesTable from "./tables/CertificatesTable.vue";
import VirtualTestRequestTable from "./tables/VirtualTestRequestsTable.vue";
import ItineraryRequestsTable from "./tables/ItineraryRequestsTable.vue";
import { ref } from "vue";

const tab = ref("subject");

defineProps({
  itineraryRequests: Object,
  credits: Object,
  subjects: Object,
  virtualTestRequests: Object,
  certificates: Object,
  AEPRequests: Object,
  text: String,
});
</script>
