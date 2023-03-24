<template>
  <div>
    <div class="tab">
      <button class="tablinks py-1.5 px-3 rounded text-white bg-blue-600">
        Alumno
      </button>
    </div>
    <StudentData :studentData="studentData" />
    <br />

    <div>
      <button
        class="tablinks py-1.5 px-3 rounded text-white"
        @click.prevent="tab = 'file'"
        :class="{
          'bg-blue-600': tab === 'file',
          'bg-green-600': tab !== 'file',
        }"
      >
        Expediente
      </button>
      <button
        class="tablinks py-1.5 px-3 rounded text-white"
        @click.prevent="tab = 'tutor'"
        :class="{
          'bg-blue-600': tab === 'tutor',
          'bg-green-600': tab !== 'tutor',
        }"
      >
        Tutor
      </button>
    </div>
    <div class="pt-5">
      <FileData v-if="tab === 'file'" :fileInfo="fileInfo" />
      <TutorData v-if="tab === 'tutor'" :tutorData="tutorData" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DataParent",
};
</script>
<script setup>
import FileData from "./data/FileData.vue";
import StudentData from "./data/StudentData.vue";
import TutorData from "./data/TutorData.vue";
import { ref } from "vue";

const tab = ref("file");

defineProps({
  studentData: Object,
  tutorData: Object,
  fileInfo: Object,
});
</script>
