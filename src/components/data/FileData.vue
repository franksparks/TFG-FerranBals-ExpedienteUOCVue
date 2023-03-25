<template>
  <div class="pt-2">
    <p>
      <span class="font-bold">Número expediente: </span
      >{{ fileInfo.numExpedient }}
    </p>
    <p>
      <span class="font-bold">Nota media actual:</span>
      {{ fileInfo.notaMitjana }}
    </p>
    <p><span class="font-bold">Opción de acceso: </span>{{ accessType }}</p>
    <p>
      <span class="font-bold">Estado expediente:</span>
      {{ fileInfo.descEstatExpedient }}
    </p>
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
  accessType: String,
});
</script>
