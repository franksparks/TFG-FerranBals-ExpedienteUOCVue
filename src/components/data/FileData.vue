<template>
  <div>
    <p>Número expediente: {{ file }}</p>
    <p>Estado expediente: {{ fileInfo.P.descEstatExpedient }}</p>
    <p>Nota media actual: {{ fileInfo.P.notaMitjana }}</p>
  </div>
</template>
<script>
import { fileInfo, fileNumber } from "../../response";
export default {
  name: "FileData",
  data() {
    return {
      fileInfo: fileInfo,
      file: fileNumber,
    };
  },
};
</script>
