<template>
  <div>
    <div class="fondoHeader">
      <div class="columns-3">
        <a href="https://www.uoc.edu/">
          <img
            src="/0FF0108D4D41E43CCF1FBA356ABC5156.cache.gif"
            title="Universitat Oberta de Catalunya"
            alt="Universitat Oberta de Catalunya"
          />
        </a>

        <p class="gwt-Label text-3xl text-center">Consulta del expediente</p>
        <select
          v-model="file"
          @change="refreshFile(file)"
          value="ferran"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="ferran">Ferran</option>
          <option value="carlos">Carlos</option>
          <option value="minor">Minor Ferran</option>
        </select>
      </div>
      <div></div>

      <p class="text-indigo-700 text-xl pt-3">{{ degreeType }}</p>
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
