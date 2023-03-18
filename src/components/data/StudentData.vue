<template>
  <div class="pt-5">
    <p>
      Nombre y apellidos: {{ student.nom }} {{ student.primerCognom }}
      {{ student.segonCognom }}
    </p>

    <p>Usuario campus: {{ student.userLogin }}</p>
    <p>DNI: {{ student.dni }}</p>
  </div>
</template>

<script>
import { studentData } from "@/response";

export default {
  name: "StudentData",
  data() {
    return {
      student: studentData,
    };
  },
};
</script>
