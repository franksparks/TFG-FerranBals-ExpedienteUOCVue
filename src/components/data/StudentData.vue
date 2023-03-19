<template>
  <div class="pt-5">
    <p>
      Nombre y apellidos: {{ studentData.nom }} {{ studentData.primerCognom }}
      {{ studentData.segonCognom }}
    </p>

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
defineProps({
  studentData: Object,
});
</script>
