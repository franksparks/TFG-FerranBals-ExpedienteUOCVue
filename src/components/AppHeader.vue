<template>
  <div>
    <div class="header">
      <div class="columns-3">
        <a href="https://www.uoc.edu/" target="_blank">
          <img
            class="rounded"
            src="/0FF0108D4D41E43CCF1FBA356ABC5156.cache.gif"
            title="Universitat Oberta de Catalunya"
            alt="Universitat Oberta de Catalunya"
          />
        </a>
        <div>
          <p class="text-2xl text-center">
            {{ $t("header.main") }}
          </p>
          <select
            v-model="file"
            @change="print"
            class="pr-4 float-right text-gray-800 rounded align-right"
          >
            <option value="alice">Alice</option>
            <option value="minor">Minor Alice</option>
            <option value="bob">Bob</option>
          </select>

          <select
            v-model="$i18n.locale"
            class="pr-4 float-right text-gray-800 rounded align-right"
            value="es"
          >
            <option value="en">English</option>
            <option value="es">Castellano</option>
            <option value="cat">Català</option>
          </select>
        </div>
      </div>
      <div></div>

      <p class="text-indigo-800 text-xl">
        {{ degreeType }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<script setup>
import { onMounted, toRefs } from "vue";
const props = defineProps({
  degreeType: String,
  selectedFile: String,
});

onMounted(() => {
  console.log("APPHEADER - selectedFile: " + selectedFile.value);
});

const { degreeType, selectedFile } = toRefs(props);

const file = selectedFile.value;

const emit = defineEmits(["refresh-file"]);

function print(text) {
  console.log("FILE SELECTED: " + text);
}
function refreshFile(file) {
  console.log("FILE SELECTED: " + file);
  emit("refresh-file", file);
}
</script>
