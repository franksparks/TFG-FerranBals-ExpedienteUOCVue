<template>
  <div>
    <div class="pt-3 inline-grid grid-cols-3 text-center">
      <div class="px-10">
        <div class="tab">
          <p class="tablinks py-1.5 px-3 rounded text-white bg-blue-600">
            Datos del alumno
          </p>
        </div>
        <StudentData :studentData="studentData" class="text-left mx-20" />
      </div>
      <div class="px-10">
        <p class="tablinks py-1.5 px-3 rounded text-white bg-blue-600">
          Datos del tutor
        </p>
        <TutorData :tutorData="tutorData" class="text-left mx-20" />
      </div>
      <div class="px-10">
        <p class="tablinks py-1.5 px-3 rounded text-white bg-blue-600">
          Datos del expediente
        </p>
        <FileData
          :fileInfo="fileInfo"
          :accessType="accessType"
          class="text-left mx-20"
        />
      </div>
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

defineProps({
  studentData: Object,
  tutorData: Object,
  fileInfo: Object,
  accessType: String,
});
</script>
