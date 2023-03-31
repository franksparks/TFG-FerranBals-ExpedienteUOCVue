<template>
  <div id="header">
    <!-- LOGO UOC -->
    <div>
      <!-- TODO: Link only on image, not on while a element-->
      <a href="https://www.uoc.edu/" target="_blank">
        <img
          class="rounded w-full md:w-1/3"
          src="/0FF0108D4D41E43CCF1FBA356ABC5156.cache.gif"
          title="Universitat Oberta de Catalunya"
          alt="Universitat Oberta de Catalunya"
        />
      </a>
    </div>

    <!-- CONSULTA DE EXPEDIENTE -->
    <p class="text-xl text-left font-bold md:text-3xl">
      {{ $t("header.main") }}
    </p>

    <!-- DROPDOWN EXPEDIENTES -->
    <select
      v-model="file"
      @change="refreshFile(file)"
      class="text-gray-800 rounded md:float-right"
    >
      <option value="alice">Alice</option>
      <option value="minor">Minor Alice</option>
      <option value="bob">Bob</option>
    </select>

    <!-- DROPDOWN IDIOMAS -->
    <select
      v-model="$i18n.locale"
      class="text-gray-800 rounded float-right"
      value="es"
    >
      <option value="en">English</option>
      <option value="es">Castellano</option>
      <option value="cat">Català</option>
    </select>
  </div>

  <!-- TIPO DE ESTUDIOS -->
  <div class="text-center pt-1 md:text-left">
    <p class="text-2xl text-blue-900">
      {{ degreeType }}
    </p>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<script setup>
import { toRefs, ref } from "vue";
const props = defineProps({
  degreeType: String,
  selectedFile: String,
});

const { selectedFile } = toRefs(props);

const file = ref(selectedFile.value);

const emit = defineEmits(["refresh-file"]);

function refreshFile(file) {
  emit("refresh-file", file);
}
</script>
