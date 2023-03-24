<template>
  <div v-if="fileLoaded">
    <div class="container mx-auto px-50">
      <div class="px-9 pt-9 pr-9">
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

onMounted(async () => {
  console.log("Petición expediente alumno");
  await getFile(text);
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
      case "pHnAg5M_UV2eNft6JYjLM6wGvWM=": //Trámite académico
        certificates.value.push(elem.P);
        break;
      case "zgufyJB2ytYUEauhIrcVTwsXfLE=": //Instancia AEP
        AEPRequests.value.push(elem.P);
        break;
      case "atiod4vkRiNDS651NTVpY77vWZo=": //Solicitud prueba virtual
        virtualTestRequests.value.push(elem.P);
        break;
      case "997hN7iymHHoU8BGqmuM0QMNPxs=": //Asignaturas
        subjects.value.push(elem.P);
        break;
      case "ua6oBq2$2vD_EV3hJJ2wzqrkrPQ=": //Itinerario
        itineraryRequests.value.push(elem.P);
        break;
      case "p_ovO$a_rkE0DzW9ZSC8AMXg5VQ=": //Personas
        people.push(elem);
        break;
      case "fEsBQZocOtnSXQniJn0BbX9ILA0=": //???
        something.value.push(elem.P);
        break;
      case "NN$jjZrm84w_8AovFmxnnHU6giw=": //AEP
        aep.value.push(elem.P);
        break;
      case "1WNiS_NQH7GCRNTiIl2g1nIcgMM=": //Resumen créditos
        credits.value = elem.P;
        break;
      case "eO2Chrn3K53ySuNj82jHgm9Qo_E=": //Espacio Europeo Educación Superior
        eees.value.push(elem.P);
        break;
      case "RHcWxB19zK9mb9$lOHQm8SO7ofs=": //Expediente completo
        completeFile.value = elem.P;
        break;
      case "sSIxO6pqzrwLhLd3PZFzpndhF1A=": //Información expediente
        fileInfo.value = elem;
        break;
      case "XGhl$81QmbUgS9EZJqobgd248iU=": //Cerfificados y otros documentos académicos
        procedure.value.push(elem.P);
        break;
    }
  }

  //Aquí obtenemos la persona estudiante
  for (const person of people) {
    if (person.Y == fileInfo.value.P.tercer.Y) {
      studentData.value = person.P;
    } //Aquí obtenemos la persona tutor
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
