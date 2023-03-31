<template>
  <div>
    <div class="text-center py-2">
      <!-- TODO: Add a way to collapse this section-->
      <p class="tablinks py-1 rounded text-white bg-blue-900 text-xl">
        {{ $t("mainFileInfo.main") }}
      </p>
    </div>

    <p>
      <span class="font-bold">{{ $t("mainFileInfo.student") }}: </span>
      {{ studentFullName }}
    </p>
  </div>
  <div v-if="tutorData.nom != null">
    <p>
      <span class="font-bold">{{ $t("mainFileInfo.teacher") }}: </span>
      {{ tutorFullName }}
    </p>

    <!-- TODO: ALINEAR ICONO CON TEXTO DE TUTOR -->
    <p>
      <span class="font-bold">{{ $t("mainFileInfo.contact") }}:</span>
      <a
        :href="
          'mailto:' + tutorMail + '?Subject=Expediente de: ' + studentFullName
        "
        target="_blank"
      >
        <img class="rounded" src="/mail.png" title="" alt="" />
      </a>
    </p>
  </div>

  <p>
    <span class="font-bold">{{ $t("mainFileInfo.fileNumber") }}: </span
    >{{ fileInfo.numExpedient }}
  </p>
  <p>
    <span class="font-bold">{{ $t("mainFileInfo.averageGrade") }}:</span>
    {{ fileInfo.notaMitjana }}
  </p>
  <p>
    <span class="font-bold">{{ $t("mainFileInfo.access") }}: </span
    >{{ accessType }}
  </p>
  <p>
    <span class="font-bold">{{ $t("mainFileInfo.status") }}:</span>
    {{ fileInfo.descEstatExpedient }}
  </p>
</template>

<script>
export default {
  name: "MainFileInformation",
};
</script>
<script setup>
import { computed } from "vue";

const props = defineProps({
  studentData: Object,
  tutorData: Object,
  fileInfo: Object,
  accessType: String,
});

const studentFullName = computed(() => {
  return `${props.studentData.nom} ${props.studentData.primerCognom} ${props.studentData.segonCognom}`;
});

const tutorFullName = computed(() => {
  return `${props.tutorData.nom} ${props.tutorData.primerCognom} ${props.tutorData.segonCognom}`;
});

const tutorMail = computed(() => {
  return `${props.tutorData.userLogin}@uoc.edu`;
});
</script>
