<template>
  <div class="text-center" v-if="isLoading">
    <div role="status">
      <svg
        aria-hidden="true"
        class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div class="container mx-auto px-50" v-if="!isLoading">
    <div class="px-9 pt-3">
      <AppHeader
        :degreeType="degreeType"
        @refresh-file="askFile"
        :text="text"
      />

      <br />
      <DataParent
        :studentData="studentData"
        :tutorData="tutorData"
        :fileInfo="fileInfo"
        :accessType="accessType"
      />
      <br />
      <TableParent
        :itineraryRequests="itineraryRequests"
        :credits="credits"
        :subjects="subjects"
        :virtualTestRequests="virtualTestRequests"
        :certificates="certificates"
        :AEPRequests="AEPRequests"
        :enrollments="enrollments"
        :text="text"
      />
    </div>
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import DataParent from "./components/DataParent.vue";
import TableParent from "./components/TableParent.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

//const port = 3000;

const BASE_URL = "https://tfg-ferran-bals-expediente-api.vercel.app"; // base URL for the GET requests

// Reactive variables

//Checked variables
let elements = [];

const credits = ref({});
const degreeType = ref("");
const accessType = ref("");
const fileInfo = ref({});
const itineraryRequests = ref([]);
const virtualTestRequests = ref([]);

const studentData = ref({});
const tutorData = ref({});

//Not checked variables
const procedure = ref([]);
const AEPRequests = ref([]);
const subjects = ref([]);
const people = [];
const something = ref([]);
const aep = ref([]);
const eees = ref([]);
const completeFile = ref({});
const certificates = ref([]);

var text = "alice";

// Element type constants
const TRAMITE_ACADEMICO = "pHnAg5M_UV2eNft6JYjLM6wGvWM=";
const INSTANCIA_AEP = "zgufyJB2ytYUEauhIrcVTwsXfLE=";
const SOLICITUD_PRUEBA_VIRTUAL = "atiod4vkRiNDS651NTVpY77vWZo=";
const ASIGNATURAS = "997hN7iymHHoU8BGqmuM0QMNPxs=";
const ITINERARIO = "ua6oBq2$2vD_EV3hJJ2wzqrkrPQ=";
const PERSONAS = "p_ovO$a_rkE0DzW9ZSC8AMXg5VQ=";
const AEP = "NN$jjZrm84w_8AovFmxnnHU6giw=";
const RESUMEN_CREDITOS = "1WNiS_NQH7GCRNTiIl2g1nIcgMM=";
const ESPACIO_EUROPEO_EDUCACION_SUPERIOR = "eO2Chrn3K53ySuNj82jHgm9Qo_E=";
const EXPEDIENTE_COMPLETO = "RHcWxB19zK9mb9$lOHQm8SO7ofs=";
const INFORMACION_EXPEDIENTE = "sSIxO6pqzrwLhLd3PZFzpndhF1A=";
const CERTIFICADOS_DOCUMENTOS_ACADEMICOS = "XGhl$81QmbUgS9EZJqobgd248iU=";

const enrollments = ref({});
const isLoading = ref(false);

onMounted(async () => {
  getFile(text);
});

function resetFile() {
  procedure.value = [];
  AEPRequests.value = [];
  virtualTestRequests.value = [];
  subjects.value = [];
  itineraryRequests.value = [];
  people.value = [];
  aep.value = [];
  credits.value = {};
  eees.value = [];
  completeFile.value = {};
  fileInfo.value = {};
  certificates.value = [];
}

function processFile() {
  console.log("Reiniciando variables");
  resetFile();

  console.log("Procesando el expediente");

  for (const elem of elements) {
    const elementType = elem.T;

    switch (elementType) {
      case TRAMITE_ACADEMICO: //Trámite académico
        certificates.value.push(elem.P);
        break;
      case INSTANCIA_AEP: //Instancia AEP
        AEPRequests.value.push(elem.P);
        break;
      case SOLICITUD_PRUEBA_VIRTUAL: //Solicitud prueba virtual
        virtualTestRequests.value.push(elem.P);
        break;
      case ASIGNATURAS: //Asignaturas
        subjects.value.push(elem.P);
        break;
      case ITINERARIO: //Itinerario
        itineraryRequests.value.push(elem.P);
        break;
      case PERSONAS: //Personas
        people.push(elem);
        break;
      case "fEsBQZocOtnSXQniJn0BbX9ILA0=": //???
        something.value.push(elem.P);
        break;
      case AEP: //AEP
        aep.value.push(elem.P);
        break;
      case RESUMEN_CREDITOS: //Resumen créditos
        credits.value = elem.P;
        break;
      case ESPACIO_EUROPEO_EDUCACION_SUPERIOR: //Espacio Europeo Educación Superior
        eees.value.push(elem.P);
        break;
      case EXPEDIENTE_COMPLETO: //Expediente completo
        completeFile.value = elem.P;
        break;
      case INFORMACION_EXPEDIENTE: //Información expediente
        fileInfo.value = elem;
        break;
      case CERTIFICADOS_DOCUMENTOS_ACADEMICOS: //Cerfificados y otros documentos académicos
        procedure.value.push(elem.P);
        break;
    }
  }

  //Student information
  for (const person of people) {
    if (person.Y == fileInfo.value.P.tercer.Y) {
      studentData.value = person.P;
    }
    //Tutor information
    if (person.Y == completeFile.value.tutor.Y) {
      tutorData.value = person.P;
    }
  }

  degreeType.value = completeFile.value.descPlan;
  accessType.value = completeFile.value.descOpcioAcces;
  fileInfo.value = fileInfo.value.P;
}

async function getEnrollments(text) {
  console.log("GET ENROLLMENTS");
  console.log("GET Request de las matriculas de: " + text);
  await axios
    .get(
      "https://tfg-ferran-bals-expediente-api.vercel.app/enrollments/" + text
    )
    .then((response) => {
      enrollments.value = response.data.data.O;
    })
    .catch((error) => console.error(error));
}
function askFile(file) {
  console.log("ASK file: " + file);
  console.log("Original text: " + text);
  text = file;
  console.log("Updated text: " + text);

  getFile(file);
}
async function getFile(text) {
  console.log("GET file of: " + text);
  try {
    isLoading.value = true;

    console.log("GET Request del expediente de: " + text);
    const response = await axios.get(`${BASE_URL}/file/${text}`);

    elements = response.data.data.O;

    resetFile();

    processFile(elements.value);
    getEnrollments(text);
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
}
</script>

<style>
body {
  background-color: lightgray;
}
</style>
