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
        Datos académicos
      </button>
      <button
        class="tablinks py-1.5 px-3 rounded text-white"
        @click.prevent="tab = 'payments'"
        :class="{
          'bg-blue-600': tab === 'payments',
          'bg-green-600': tab !== 'payments',
        }"
      >
        Datos de matrícula
      </button>
      <button
        class="tablinks py-1.5 px-3 rounded text-white"
        @click.prevent="tab = 'requests'"
        :class="{
          'bg-blue-600': tab === 'requests',
          'bg-green-600': tab !== 'requests',
        }"
      >
        Solicitudes realizadas
      </button>
    </div>
    <div class="pt-5">
      <!-- Subject Table -->
      <CreditsTable v-if="tab === 'subject'" :credits="credits" />
      <SubjectTable v-if="tab === 'subject'" :subjects="subjects" />

      <!-- Payments Table -->
      <EnrollmentTable v-if="tab === 'payments'" />

      <!-- Itineary Table -->
      <ItineraryRequestsTable
        v-if="tab === 'requests'"
        :itineraryRequests="itineraryRequests"
      />
      <!-- Virtual test requests Table -->
      <VirtualTestRequestTable
        v-if="tab === 'requests'"
        :virtualTestRequests="virtualTestRequests"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TableParent",
};
</script>

<script setup>
import SubjectTable from "../tables/SubjectTable.vue";
import CreditsTable from "../tables/CreditsTable.vue";
import EnrollmentTable from "../tables/EnrollmentTable.vue";
import VirtualTestRequestTable from "../tables/VirtualTestRequestsTable.vue";
import ItineraryRequestsTable from "../tables/ItineraryRequestsTable.vue";
import { ref } from "vue";

const tab = ref("subject");

defineProps({
  itineraryRequests: Object,
  credits: Object,
  subjects: Object,
  virtualTestRequests: Object,
});
</script>
