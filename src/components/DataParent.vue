<template>
  <div>
    <div class="tab">
      <button class="tablinks py-1.5 px-3 rounded text-white bg-blue-600">
        Alumno
      </button>
    </div>
    <StudentData />
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
      <button
        class="tablinks py-1.5 px-3 rounded text-white"
        @click.prevent="tab = 'people'"
        :class="{
          'bg-blue-600': tab === 'people',
          'bg-green-600': tab !== 'people',
        }"
      >
        Personas
      </button>
    </div>
    <div class="pt-5">
      <FileData v-if="tab === 'file'" />
      <TutorData v-if="tab === 'tutor'" />
      <PersonData v-if="tab === 'people'" />
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
import PersonData from "./data/PersonData.vue";
import StudentData from "./data/StudentData.vue";
import TutorData from "./data/TutorData.vue";
import { ref } from "vue";

const tab = ref("file");
</script>
