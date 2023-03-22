<template>
  <h1>Tabs</h1>

  <ul>
    <li
      v-for="(objeto, index) in subject"
      :key="index"
      @click="seleccionarObjeto(index)"
    >
      Test + {{ objeto.P.descAnyAcademico }}
    </li>
  </ul>
  <table>
    <tbody>
      <tr v-for="field in objetoSeleccionado" :key="field">
        <td>{{ field }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "SubjectStudiedTabs",
};
</script>

<script setup>
import { ref, watchEffect } from "vue";
const props = defineProps({
  subjectOriginal: Object,
  subject: Object,
});

const objetoSeleccionado = ref({});

watchEffect(() => (objetoSeleccionado.value = props.subject[0]));

function seleccionarObjeto(index) {
  objetoSeleccionado.value = props.subject[index];
  console.log(objetoSeleccionado.value.P);
}
</script>
