<template>
  <div class="pt-2">
    <p><span class="font-bold">Nombre:</span> {{ fullName }}</p>
    <p>
      <span class="font-bold">Usuario campus:</span> {{ tutorData.userLogin }}
    </p>
    <p><span class="font-bold">DNI:</span> {{ tutorData.dni }}</p>
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
