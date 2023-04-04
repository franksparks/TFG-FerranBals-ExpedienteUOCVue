<template>
  <header class="mx-2">
    <div id="header">
      <!-- LOGO UOC -->
      <div class="md:cols-3">
        <div class="md:w-1/3">
          <a
            class="focus:ring focus:ring-cyan-500 focus:border-cyan-500"
            href="https://www.uoc.edu/"
            target="_blank"
          >
            <img
              class="rounded w-full"
              src="/0FF0108D4D41E43CCF1FBA356ABC5156.cache.gif"
              title="Universitat Oberta de Catalunya"
              :alt="$t('images.uocLogo')"
            />
          </a>
        </div>
      </div>

      <!-- CONSULTA DE EXPEDIENTE -->
      <p class="text-2xl font-bold md:text-3xl text-center md:text-left">
        {{ $t("header.main") }}
      </p>

      <div class="flex flex-col sm:flex-row">
        <div class="flex">
          <label for="language-select" class="mr-2">{{
            $t("header.language")
          }}</label>
          <select
            id="language-select"
            v-model="$i18n.locale"
            class="text-gray-800 rounded border-2 border-neutral-400 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="en">English</option>
            <option value="es">Castellano</option>
            <option value="cat">Català</option>
          </select>
        </div>
        <div class="flex mt-2 sm:mt-0 sm:ml-4">
          <label for="file-select" class="mr-2">{{ $t("header.file") }}</label>
          <select
            id="file-select"
            v-model="file"
            @change="refreshFile(file)"
            class="text-gray-800 rounded border-2 border-neutral-400 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="alice">Alice</option>
            <option value="minor">Minor Alice</option>
            <option value="bob">Bob</option>
          </select>
        </div>
      </div>
    </div>

    <!-- TIPO DE ESTUDIOS -->
    <div class="text-center pt-1 md:text-left">
      <p class="text-2xl text-blue-900">
        {{ degreeType }}
      </p>
    </div>
  </header>
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
