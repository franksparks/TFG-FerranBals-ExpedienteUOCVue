<template>
  <div class="mx-2" :class="{ dark: darkMode }">
    <div class="text-center py-2">
      <p
        class="tablinks py-1 rounded text-white bg-blue-900 text-xl sm:cursor-pointer md:cursor-default"
        @click.prevent="toggleSection"
      >
        <img
          v-if="collapse"
          src="/plusIconWhite.png"
          class="float-left m-1 rounded-full md:hidden"
          :alt="$t('images.plusIcon')"
        />
        <img
          v-if="!collapse"
          src="/minusIconWhite.png"
          class="float-left m-1 rounded-full md:hidden"
          :alt="$t('images.minusIcon')"
        />

        {{ $t("mainFileInfo.main") }}
      </p>
    </div>
    <div class="md:columns-2 text-black dark:text-white">
      <!--Info alumno-->
      <p>
        <span class="font-bold">{{ $t("mainFileInfo.student") }}: </span>
        {{ studentFullName }}
      </p>
      <!--Info tutor-->
      <div v-if="tutorData != null">
        <p>
          <span class="float-left font-bold mr-1"
            >{{ $t("mainFileInfo.teacher") }}: </span
          ><span class="float-left">{{ tutorFullName }}</span>
          <a
            class="m-1 focus:ring focus:ring-cyan-500 focus:border-cyan-500"
            :href="
              'mailto:' +
              tutorMail +
              '?Subject=Expediente de: ' +
              studentFullName
            "
            target="_blank"
          >
            <i v-if="darkMode" class="fas fa-envelope fa-lg" style="#fff"></i>
            <i v-else class="fas fa-envelope fa-lg"></i
          ></a>
        </p>
      </div>
    </div>
    <div v-if="!collapse" class="md:columns-2 text-black dark:text-white">
      <!--Núm expediente-->
      <p>
        <span class="font-bold">{{ $t("mainFileInfo.fileNumber") }}: </span
        >{{ fileInfo.numExpedient }}
      </p>
      <!--Nota media actual-->
      <p>
        <span class="font-bold">{{ $t("mainFileInfo.averageGrade") }}: </span>
        {{ fileInfo.notaMitjana }}
      </p>
      <!--Acceso-->
      <p>
        <span class="font-bold">{{ $t("mainFileInfo.access") }}: </span
        >{{ accessType }}
      </p>
      <!--Estado expediente-->
      <p>
        <span class="font-bold">{{ $t("mainFileInfo.status") }}: </span>
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
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  studentData: Object,
  tutorData: Object,
  fileInfo: Object,
  accessType: String,
  darkMode: Boolean,
});

const collapse = ref(false);

onMounted(() => {
  if (window.innerWidth <= 768) {
    collapse.value = true;
  }
});

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
