<template>
  <div class="pt-5">
    <p>Nombre y apellidos: {{ fullName }}</p>
    <p>Usuario campus: {{ studentData.userLogin }}</p>
    <p>DNI: {{ studentData.dni }}</p>
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
