<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal">
    <div class="fixed z-10 inset-0 overflow-y-auto" id="modal">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="py-4 text-left px-6">
            <div class="flex justify-between items-center pb-4">
              <p class="text-2xl font-bold">
                {{ subjectInformation.descripcio }}
              </p>
              <!-- Modal Close Button -->
              <div
                class="modal-close cursor-pointer z-50"
                @click.prevent="closeModal"
              >
                <i class="fas fa-times"></i>
              </div>
            </div>

            <TakenSubject
              :subjectInformation="subjectInformation"
              :subjectConvo="subjectConvo"
              v-if="
                props.subjectInformation
                  .descripcioQualificacioQualitativaFinal != 'Reconocido'
              "
            >
            </TakenSubject>

            <AccreditedSubject
              :subjectInformation="subjectInformation"
              v-else
            ></AccreditedSubject>
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
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import AccreditedSubject from "../subjects/AccreditedSubject.vue";
import TakenSubject from "../subjects/TakenSubject.vue";

const BASE_URL = import.meta.env.VITE_VUE_APP_API_URL; // base URL for the GET requests

onMounted(() => {
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      emit("close-modal");
    }
  };
  window.addEventListener("keyup", handleEscape);

  onUnmounted(() => {
    window.removeEventListener("keyup", handleEscape);
  });
});

const props = defineProps({
  subjectInformation: Object,
});

let subjectConvo = ref({});

watchEffect(() => {
  if (
    props.subjectInformation?.descripcioQualificacioQualitativaFinal !=
    "Reconocido"
  ) {
    console.log(
      "GET Request de la asignatura: " + props.subjectInformation.descripcio
    );
    axios
      //.get(`${BASE_URL}/grades`, {
      .get(`${BASE_URL}/subject`, {
        params: { codAsignatura: props.subjectInformation.codi },
      })
      .then((response) => {
        console.log(response.data.subject);

        subjectConvo.value = response.data.subject.O.map((item) => item.P);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const emit = defineEmits(["close-modal"]);
function closeModal() {
  console.log("close modal");
  emit("close-modal");
}
</script>
