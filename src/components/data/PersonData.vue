<template>
  <div>
    <ul class="list-disc list-outside">
      <li v-for="person in peopleList" :key="person">
        <p>
          Nombre: {{ person.P.nom }} {{ person.P.primerCognom }}
          {{ person.P.segonCognom }}
        </p>

        <p>Usuario campus: {{ person.P.userLogin }}</p>
        <p>DNI: {{ person.P.dni }}</p>
        <br />
      </li>
    </ul>
  </div>
</template>

<script>
import { people } from "@/response";

export default {
  name: "PersonData",
  data() {
    return {
      peopleList: people,
    };
  },
};
</script>
