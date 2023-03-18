<template>
  <div>
    <button
      type="button"
      @click.prevent="displayList = !displayList"
      class="py-1.5 px-3 rounded text-white bg-green-600"
    >
      Listado tipos -> {{ typeList.length }}
    </button>
    <ul v-if="displayList" class="list-disc list-inside">
      <li v-for="t in typeList" :key="t">{{ t }}</li>
    </ul>
  </div>
</template>

<script>
import { types } from "@/response";

export default {
  name: "TypeList",
  data() {
    return {
      typeList: types,
      displayList: false,
    };
  },
};
</script>
