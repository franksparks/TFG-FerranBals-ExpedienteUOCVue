<template>
  <div>
    <p>
      Nombre: {{ tutorData.nom }} {{ tutorData.primerCognom }}
      {{ tutorData.segonCognom }}
    </p>

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
defineProps({
  tutorData: Object,
});
</script>
