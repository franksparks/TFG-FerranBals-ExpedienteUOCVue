<template>
  <div class="container mx-auto px-50">
    <div class="px-9 pt-9 pr-9">
      <AppHeader :gradeType="gradeType" @refresh-expediente="getFile" />

      <br />
      <DataParent
        :studentData="studentData"
        :tutorData="tutorData"
        :fileInfo="fileInfo"
        :fileNumber="fileNumber"
      />
      <br />
      <TableParent
        :itineraryRequest="itineraryRequest"
        :credit="credit"
        :subjects="subjects"
        :virtualTestRequest="virtualTestRequest"
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

const BASE_URL = "http://localhost:3000"; // URL base para todas las solicitudes de API

// Variables reactivas

let elements = [];
const originalFile = ref({});
const processedFile = ref({ types: [] });
const types = [];
const procedure = ref([]);
const instanceAEP = ref([]);
const virtualTestRequest = ref([]);
const subjects = ref([]);
const itineraryRequest = ref([]);
const people = [];
const something = ref([]);
const aep = ref([]);
const credit = ref({});
const eees = ref([]);
const completeFile = ref({});
const gradeType = ref("");
const fileInfo = ref({});
const fileNumber = ref(0);
const certification = ref([]);
const studentData = ref({});
const tutorData = ref({});
const text = "ferran";

onMounted(async () => {
  console.log("Petición expediente alumno");
  await getFile(text);
});

function resetFile() {
  types.value = [];
  procedure.value = [];
  instanceAEP.value = [];
  virtualTestRequest.value = [];
  subjects.value = [];
  itineraryRequest.value = [];
  people.value = [];
  aep.value = [];
  credit.value = {};
  eees.value = [];
  completeFile.value = {};
  fileInfo.value = {};
  certification.value = [];
}

function processFile(file) {
  console.log("Reiniciando variables");
  resetFile();

  console.log("Procesando el expediente");
  elements = file.O;

  for (const elem of elements) {
    if (!types.includes(elem.T)) {
      types.push(elem.T);
    }
  }
  processedFile.value.types = types;

  for (const elem of elements) {
    const elementType = elem.T;

    switch (elementType) {
      case "pHnAg5M_UV2eNft6JYjLM6wGvWM=": //Trámite académico
        procedure.value.push(elem.P);
        break;
      case "zgufyJB2ytYUEauhIrcVTwsXfLE=": //Instancia AEP
        instanceAEP.value.push(elem.P);
        break;
      case "atiod4vkRiNDS651NTVpY77vWZo=": //Solicitud prueba virtual
        virtualTestRequest.value.push(elem.P);
        break;
      case "997hN7iymHHoU8BGqmuM0QMNPxs=": //Asignaturas
        subjects.value.push(elem.P);
        break;
      case "ua6oBq2$2vD_EV3hJJ2wzqrkrPQ=": //Itinerario
        itineraryRequest.value.push(elem.P);
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
        credit.value = elem.P;
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
        certification.value.push(elem.P);
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

  gradeType.value = completeFile.value.descPlan;
  fileNumber.value = fileInfo.value.P.numExpedient;
  fileInfo.value = fileInfo.value.P;
}

async function getFile(text) {
  try {
    // Hacer la solicitud a la API
    const response = await axios.get(`${BASE_URL}/file/${text}`);

    // Actualizar la variable originalFile
    originalFile.value = response.data.data;

    itineraryRequest.value = [];
    virtualTestRequest.value = [];

    // Procesar el expediente original
    processFile(originalFile.value);
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
