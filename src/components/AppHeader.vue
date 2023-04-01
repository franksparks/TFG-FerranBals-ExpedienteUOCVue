<template>
  <div id="header">
    <!-- LOGO UOC -->
    <div class="md:cols-3">
      <div class="md:w-1/3">
        <a href="https://www.uoc.edu/" target="_blank">
          <img
            class="rounded w-full"
            src="/0FF0108D4D41E43CCF1FBA356ABC5156.cache.gif"
            title="Universitat Oberta de Catalunya"
            alt="Universitat Oberta de Catalunya"
          />
        </a>
      </div>
    </div>

    <!-- CONSULTA DE EXPEDIENTE -->
    <p class="text-2xl font-bold md:text-3xl text-center md:text-left">
      {{ $t("header.main") }}
    </p>

    <div>
      <!-- DROPDOWN IDIOMAS -->
      <select
        v-model="$i18n.locale"
        class="text-gray-800 rounded float-right border-2 border-neutral-400"
        value="es"
      >
        <option value="en">English</option>
        <option value="es">Castellano</option>
        <option value="cat">Català</option>
      </select>

      <!-- DROPDOWN EXPEDIENTES -->
      <select
        v-model="file"
        @change="refreshFile(file)"
        class="text-gray-800 rounded md:float-right md:mx-5 border-2 border-neutral-400"
      >
        <option value="alice">Alice</option>
        <option value="minor">Minor Alice</option>
        <option value="bob">Bob</option>
      </select>
    </div>
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
