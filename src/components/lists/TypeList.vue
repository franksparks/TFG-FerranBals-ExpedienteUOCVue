<template>
  <div>
    <button
      type="button"
      @click.prevent="displayList = !displayList"
      class="py-1.5 px-3 rounded text-white bg-green-600"
    >
      Listado tipos -> {{ types.length }}
    </button>
    <ul v-if="displayList" class="list-disc list-inside">
      <li v-for="t in types" :key="t">{{ t }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TypeList",
};
</script>

<script setup>
import { types } from "@/response";
import { ref } from "vue";
const displayList = ref(false);
</script>
