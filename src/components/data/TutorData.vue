<template>
  <div>
    <p>Nombre: {{ fullName }}</p>
    <p>Usuario campus: {{ tutorData.userLogin }}</p>
    <p>DNI: {{ tutorData.dni }}</p>
  </div>
</template>

<script>
export default {
  name: "TutorData",
};
</script>
<script setup>
import { computed } from "vue";
const props = defineProps({
  tutorData: Object,
});

const fullName = computed(() => {
  return `${props.tutorData.nom} ${props.tutorData.primerCognom} ${props.tutorData.segonCognom}`;
});
</script>
