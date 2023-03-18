<template>
  <div>
    <div class="fondoHeader">
      <div class="columns-2">
        <a href="https://www.uoc.edu/">
          <img
            src="/0FF0108D4D41E43CCF1FBA356ABC5156.cache.gif"
            title="Universitat Oberta de Catalunya"
            alt="Universitat Oberta de Catalunya"
          />
        </a>

        <p class="gwt-Label text-3xl text-right">Consulta del expediente</p>
      </div>

      <p class="text-indigo-700 text-xl pt-3">{{ grado }}</p>
    </div>
  </div>
</template>

<script>
import { gradeType } from "@/response";
export default {
  name: "AppHeader",
  data() {
    return {
      grado: gradeType,
    };
  },
};
</script>
