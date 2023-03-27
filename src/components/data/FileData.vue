<template>
  <div class="pt-2">
    <p>
      <span class="font-bold">{{ $t("file.number") }}: </span
      >{{ fileInfo.numExpedient }}
    </p>
    <p>
      <span class="font-bold">{{ $t("file.averageGrade") }}:</span>
      {{ fileInfo.notaMitjana }}
    </p>
    <p>
      <span class="font-bold">{{ $t("file.access") }}: </span>{{ accessType }}
    </p>
    <p>
      <span class="font-bold">{{ $t("file.status") }}:</span>
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
