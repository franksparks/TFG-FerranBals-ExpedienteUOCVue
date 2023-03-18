<template>
  <div>
    <p>
      Nombre: {{ tutor.nom }} {{ tutor.primerCognom }}
      {{ tutor.segonCognom }}
    </p>

    <p>Usuario campus: {{ tutor.userLogin }}</p>
    <p>DNI: {{ tutor.dni }}</p>
  </div>
</template>

<script>
import { tutorData } from "@/response";

export default {
  name: "TutorData",
  data() {
    return {
      tutor: tutorData,
    };
  },
};
</script>
