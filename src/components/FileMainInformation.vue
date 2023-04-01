<template>
  <div class="mx-2">
    <div class="text-center py-2">
      <p
        class="tablinks py-1 rounded text-white bg-blue-900 text-xl"
        @click.prevent="toggleSection"
      >
        <img
          v-if="collapse"
          src="/plusIconWhite.png"
          class="float-left m-1 rounded-full"
        />
        <img
          v-if="!collapse"
          src="/minusIconWhite.png"
          class="float-left m-1 rounded-full"
        />

        {{ $t("mainFileInfo.main") }}
      </p>
    </div>
    <div class="md:columns-2">
      <!--Info alumno-->
      <p>
        <span class="font-bold">{{ $t("mainFileInfo.student") }}: </span>
        {{ studentFullName }}
      </p>
      <!--Info tutor-->
      <div v-if="tutorData.nom != null">
        <p>
          <span class="float-left font-bold"
            >{{ $t("mainFileInfo.teacher") }}: </span
          ><span class="float-left">{{ tutorFullName }}</span>
          <a
            class="m-1"
            :href="
              'mailto:' +
              tutorMail +
              '?Subject=Expediente de: ' +
              studentFullName
            "
            target="_blank"
            ><img class="float-left m-1" src="/mail.png"
          /></a>
        </p>
      </div>
    </div>
    <div v-if="!collapse" class="md:columns-2">
      <!--Núm expediente-->
      <p>
        <span class="font-bold">{{ $t("mainFileInfo.fileNumber") }}: </span
        >{{ fileInfo.numExpedient }}
      </p>
      <!--Nota media actual-->
      <p>
        <span class="font-bold">{{ $t("mainFileInfo.averageGrade") }}:</span>
        {{ fileInfo.notaMitjana }}
      </p>
      <!--Acceso-->
      <p>
        <span class="font-bold">{{ $t("mainFileInfo.access") }}: </span
        >{{ accessType }}
      </p>
      <!--Estado expediente-->
      <p>
        <span class="font-bold">{{ $t("mainFileInfo.status") }}:</span>
        {{ fileInfo.descEstatExpedient }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileMainInformation",
};
</script>
<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  studentData: Object,
  tutorData: Object,
  fileInfo: Object,
  accessType: String,
});
const collapse = ref(true);

function toggleSection() {
  collapse.value = !collapse.value;
}

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
