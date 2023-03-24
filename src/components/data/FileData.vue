<template>
  <div>
    <p>Número expediente: {{ fileInfo.numExpedient }}</p>

    <p>Nota media actual: {{ fileInfo.notaMitjana }}</p>

    <p>Opción de acceso: {{ accessType }}</p>

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
  accessType: Object,
});
</script>
