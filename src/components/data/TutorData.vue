<template>
  <div class="pt-2">
    <p>
      <span class="font-bold">{{ $t("tutor.name") }}:</span> {{ fullName }}
    </p>
    <p>
      <span class="font-bold">{{ $t("tutor.user") }}:</span>
      {{ tutorData.userLogin }}
    </p>
    <p>
      <span class="font-bold">{{ $t("tutor.id") }}:</span> {{ tutorData.dni }}
    </p>
  </div>
</template>

<script>
export default {
  name: "TutorData",
};
</script>
<script setup>
import { computed } from "vue";
const props = defineProps({
  tutorData: Object,
});

const fullName = computed(() => {
  return `${props.tutorData.nom} ${props.tutorData.primerCognom} ${props.tutorData.segonCognom}`;
});
</script>
