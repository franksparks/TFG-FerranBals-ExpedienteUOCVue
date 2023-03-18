<template>
  <div>
    <TypeList />
    <ElemList />
  </div>
</template>

<script>
export default {
  name: "ListParent",
};
</script>
<script setup>
import TypeList from "./lists/TypeList.vue";
import ElemList from "./lists/ElemList.vue";
</script>
