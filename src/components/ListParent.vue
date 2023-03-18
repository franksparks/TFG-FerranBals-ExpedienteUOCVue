<template>
  <div>
    <TypeList />
    <ElemList />
  </div>
</template>

<script>
import TypeList from "./lists/TypeList.vue";
import ElemList from "./lists/ElemList.vue";

export default {
  name: "ListParent",
  components: {
    TypeList,
    ElemList,
  },
};
</script>
