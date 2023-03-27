<template>
  <div class="pt-2">
    <p>
      <span class="font-bold">{{ $t("student.name") }}:</span> {{ fullName }}
    </p>
    <p>
      <span class="font-bold">{{ $t("student.user") }}:</span>
      {{ studentData.userLogin }}
    </p>
    <p>
      <span class="font-bold">{{ $t("student.id") }}:</span>
      {{ studentData.dni }}
    </p>
  </div>
</template>

<script>
export default {
  name: "StudentData",
};
</script>
<script setup>
import { computed } from "vue";
const props = defineProps({
  studentData: Object,
});

const fullName = computed(() => {
  return `${props.studentData.nom} ${props.studentData.primerCognom} ${props.studentData.segonCognom}`;
});
</script>
