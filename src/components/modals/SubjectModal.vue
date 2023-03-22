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
              {{ subjectOriginal.descripcio }}
            </p>
            <!-- Modal Close Button -->
            <div
              class="modal-close cursor-pointer z-50"
              @click.prevent="closeModal"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- Añadir bucle for -->

          <SubjectStudied
            :subjectOriginal="subjectOriginal"
            :subjectConvo="subjectConvo"
            v-if="
              props.subjectOriginal.descripcioQualificacioQualitativaFinal !=
              'Reconocido'
            "
          >
          </SubjectStudied>
          <SubjectStudiedTabs
            :subjectOriginal="subjectOriginal"
            :subjectConvo="subjectConvo"
            v-if="
              props.subjectOriginal.descripcioQualificacioQualitativaFinal !=
              'Reconocido'
            "
          >
          </SubjectStudiedTabs>

          <SubjectRecognized
            :subjectOriginal="subjectOriginal"
            v-else
          ></SubjectRecognized>
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
import SubjectRecognized from "@/components/tables/SubjectRecognized.vue";
import SubjectStudied from "@/components/tables/SubjectStudied.vue";
import SubjectStudiedTabs from "../tables/SubjectStudiedTabs.vue";
const props = defineProps({
  subjectOriginal: Object,
});

let subjectConvo = ref({});

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
          (subjectConvo.value = response.data.asignatura)
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
