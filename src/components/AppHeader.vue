<template>
  <div>
    <div class="header">
      <div class="columns-3">
        <a href="https://www.uoc.edu/">
          <img
            class="rounded"
            src="/0FF0108D4D41E43CCF1FBA356ABC5156.cache.gif"
            title="Universitat Oberta de Catalunya"
            alt="Universitat Oberta de Catalunya"
          />
        </a>
        <div>
          <p class="text-2xl text-center">Consulta del expediente</p>
          <select
            v-model="file"
            @change="refreshFile(file)"
            value="ferran"
            class="pr-4 float-right text-gray-800 border-4 border-red-300 rounded align-right"
          >
            <option value="ferran">Ferran</option>
            <option value="carlos">Carlos</option>
            <option value="minor">Minor Ferran</option>
          </select>
        </div>
      </div>
      <div></div>

      <p class="text-indigo-800 text-xl border-2 border-yellow-200">
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
import { ref } from "vue";
defineProps({
  degreeType: String,
});

const emit = defineEmits(["refresh-file"]);

const file = ref("ferran");

function refreshFile(file) {
  emit("refresh-file", file);
}
</script>
