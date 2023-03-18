<template>
  <div>
    <button
      type="button"
      @click.prevent="displayList = !displayList"
      class="py-1.5 px-3 rounded text-white bg-green-600"
    >
      Listado elementos -> {{ elemList.length }}
    </button>
    <ul v-if="displayList" class="list-disc list-outside">
      <li v-for="elem in elemList" :key="elem">
        {{ JSON.stringify(elem) }}
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
import { elements } from "@/response";

export default {
  name: "ElemList",
  data() {
    return {
      elemList: elements,
      displayList: false,
    };
  },
};
</script>
