<template>
  <div>
    <button
      type="button"
      @click.prevent="displayList = !displayList"
      class="py-1.5 px-3 rounded text-white bg-green-600"
    >
      Listado elementos -> {{ elements.length }}
    </button>
    <ul v-if="displayList" class="list-disc list-outside">
      <li v-for="elem in elements" :key="elem">
        {{ JSON.stringify(elem) }}
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ElemList",
};
</script>
<script setup>
import { elements } from "@/response";
import { ref } from "vue";
const displayList = ref(false);
</script>
