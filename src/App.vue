<template>
  <div class="container mx-auto px-50">
    <div class="px-9 pt-9 pr-9">
      <AppHeader :gradeType="gradeType" @refresh-expediente="getExpediente" />
      <!-- "  Pending to receive the expediente received on the cusotm event -->

      <br />
      <DataParent
        :studentData="studentData"
        :tutorData="tutorData"
        :fileInfo="fileInfo"
        :fileNumber="fileNumber"
      />
      <br />
      <TableParent
        :itineraryReq="itineraryReq"
        :credit="credit"
        :subjects="subjects"
        :virtualTestReq="virtualTestReq"
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

//import { cookies } from "@/response";

let originalFile = ref({});
let processedFile = ref({});
var elements = [];
const types = [];
const procedure = ref([]);
const instanceAEP = ref([]);
const virtualTestReq = ref([]);
const subjects = ref([]);
const itineraryReq = ref([]);
const people = [];
const something = ref([]);
const aep = ref([]);
var credit = ref({});
const eees = ref([]);
var completeFile = ref({});
var gradeType = ref("");
var fileInfo = ref({});
var fileNumber = ref(0);
const certification = ref([]);
var studentData = ref({});
var tutorData = ref({});
const text = "ferran";

onMounted(() => {
  console.log("Petición expediente alumno");
  getExpediente(text);
});

function getExpediente(text) {
  console.log("get expediente");
  subjects.value = [];
  virtualTestReq.value = [];
  axios
    //Obtenemos el expediente original
    .get("http://localhost:3000/expediente/" + text)
    .then(
      (response) => (
        (originalFile.value = response.data.data),
        //Procesamos el expediente original
        processFile(originalFile.value)
      )
    );
}

function processFile(file) {
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
        virtualTestReq.value.push(elem.P);
        break;
      case "997hN7iymHHoU8BGqmuM0QMNPxs=": //Asignaturas
        subjects.value.push(elem.P);
        break;
      case "ua6oBq2$2vD_EV3hJJ2wzqrkrPQ=": //Itinerario
        itineraryReq.value.push(elem.P);
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
</script>

<style>
body {
  background-color: lightgray;
}
</style>
