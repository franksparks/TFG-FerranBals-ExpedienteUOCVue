<template>
  <div>
    <p>Número expediente: {{ fileInfo.numExpedient }}</p>

    <p>Nota media actual: {{ fileInfo.notaMitjana }}</p>

    <p>Estado expediente: {{ fileInfo.descEstatExpedient }}</p>
  </div>
</template>

<script>
export default {
  name: "FileData",
};
</script>
<script setup>
defineProps({
  fileInfo: Object,
});
</script>
