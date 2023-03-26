<template>
  <div v-if="fileLoaded">
    <div class="container mx-auto px-50">
      <div class="px-9 pt-3">
        <AppHeader :degreeType="degreeType" @refresh-file="getFile" />

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
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import DataParent from "./components/DataParent.vue";
import TableParent from "./components/TableParent.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const BASE_URL = "http://localhost:3000"; // base URL for the GET requests

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

const text = "ferran";
const fileLoaded = ref(false);

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

async function getFile(text) {
  try {
    console.log("GET Request del expediente de: " + text);
    const response = await axios.get(`${BASE_URL}/file/${text}`);

    elements = response.data.data.O;

    resetFile();

    processFile(elements.value);
    fileLoaded.value = true;
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
