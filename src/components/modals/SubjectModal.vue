<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">
              {{ subject.descAsignatura }}
            </p>
            <!-- Modal Close Button -->
            <div
              class="modal-close cursor-pointer z-50"
              @click.prevent="closeModal"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center"
              >
                <!--Aplicar título en dos columnas-->
                <tr>
                  <th scope="col" class="px-6 py-3 text-center">
                    {{ subject.anySuperacion }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Asignatura</td>
                  <td>{{ subjectOriginal.descripcio }}</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                  v-if="subjectOriginal.codi != null"
                >
                  <td class="pl-3">Código</td>
                  <td>{{ subjectOriginal.codi }}</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Créditos</td>
                  <td>{{ subjectOriginal.numCredits }}</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Tipo asignatura</td>
                  <td>{{ subjectOriginal.descripcioClasseCredits }}</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                  v-if="subject.numConvocatoriaActual != null"
                >
                  <td class="pl-3">Convocatoria</td>
                  <td>{{ subject.numConvocatoriaActual }}</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                  v-if="subject.nomConsultor != null"
                >
                  <td class="pl-3">Consultor</td>
                  <td>{{ subject.nomConsultor }}</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                  v-if="subject.codCalifFC != null"
                >
                  <td class="pl-3">Calificación de Evaluación Contínua</td>
                  <td>{{ subject.codCalifC }} ({{ subject.numCalifC }})</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                  v-if="subject.codCalifP != null"
                >
                  <td class="pl-3">
                    Calificación final de actividades prácticas
                  </td>
                  <td>{{ subject.codCalifP }}({{ subject.numCalifP }})</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                  v-if="subject.codCalifFC != null"
                >
                  <td class="pl-3">
                    Calificación final de Evaluación Contínua
                  </td>
                  <td>{{ subject.codCalifFC }} ({{ subject.numCalifFC }})</td>
                </tr>
                <tr
                  v-if="subject.numCalifPS != null"
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Calificación final de Prueba de Síntesis</td>
                  <td>{{ subject.numCalifPS }}</td>
                </tr>
                <tr
                  v-if="subject.numCalifEX != null"
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Calificación final de Examen</td>
                  <td>{{ subject.numCalifEX }}</td>
                </tr>

                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Calificación final de la asignatura</td>
                  <td
                    v-if="
                      props.subjectOriginal
                        .descripcioQualificacioQualitativaFinal == null
                    "
                  >
                    En curso
                  </td>
                  <td
                    v-else-if="
                      props.subjectOriginal
                        .descripcioQualificacioQualitativaFinal != 'Reconocido'
                    "
                  >
                    {{ subject.descCalifFA }} ({{ subject.numCalifFA }})
                  </td>
                  <td v-else>
                    {{
                      props.subjectOriginal
                        .descripcioQualificacioQualitativaFinal
                    }}
                  </td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                  v-if="subject.numConvocatoriaActual != 0"
                >
                  <td class="pl-3">Año superación</td>
                  <td>{{ subjectOriginal.ultAnyMatricula }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubjectModal",
};
</script>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
const props = defineProps({
  subjectOriginal: Object,
});

let subject = ref({});

onMounted(() => {
  console.log("TEST REQUEST");
  if (
    props.subjectOriginal.descripcioQualificacioQualitativaFinal != "Reconocido"
  ) {
    axios
      //Recuperamos el listado completo de contactos  públicos con una petición GET
      .get("http://localhost:3000/asignatura/", {
        params: { codAsignatura: props.subjectOriginal.codi },
      })
      //Imprimimos mensaje por consola y almacenamos el listado de contactos públicos
      .then(
        (response) => (
          console.log(JSON.stringify(response.data.asignatura)),
          (subject.value = response.data.asignatura)
        )
      );
  }
});

const emit = defineEmits(["close-modal"]);
function closeModal() {
  console.log("close modal");
  emit("close-modal");
}
</script>
