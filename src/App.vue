<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-gray-100 dark:bg-black min-h-screen">
      <div class="container mx-auto">
        <div class="text-center" v-if="isLoading">
          <div class="flex justify-center items-center h-screen">
            <div
              class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
            ></div>
          </div>
        </div>

        <div v-if="!isLoading">
          <div class="p-1 md:px-9">
            <AppHeader
              :degreeType="degreeType"
              :selectedFile="selectedFile"
              :daltonicMode="daltonicMode"
              :darkMode="darkMode"
              @toggle-colors="daltonicMode = !daltonicMode"
              @toggle-styles="darkMode = !darkMode"
              @refresh-file="getFile"
            />
            <hr class="border-gray-500 py-1 md:py-3 mx-2" />

            <FileMainInformation
              :studentData="studentData"
              :tutorData="tutorData"
              :fileInfo="fileInfo"
              :accessType="accessType"
              :darkMode="darkMode"
            />
            <hr class="border-gray-500 py-1 md:py-3 mt-2 mx-2" />

            <TableParent
              :itineraryRequests="itineraryRequests"
              :credits="credits"
              :subjects="subjects"
              :virtualTestRequests="virtualTestRequests"
              :certificates="certificates"
              :AEPRequests="AEPRequests"
              :enrollments="enrollments"
              :recal="recal"
              :daltonicMode="daltonicMode"
              :darkMode="darkMode"
            />

            <AppFooter />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from "./components/commonComponents/AppHeader.vue";
import FileMainInformation from "./components/commonComponents/FileMainInformation.vue";
import TableParent from "./components/commonComponents/TableParent.vue";
import AppFooter from "./components/commonComponents/AppFooter.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";

const BASE_URL = import.meta.env.VITE_VUE_APP_API_URL; // base URL for the GET requests

const completeFile = ref({});
// Variables that store only part of the file -- start
let elements = [];
const accessType = ref("");
const aep = ref([]);
const AEPRequests = ref([]);
const certificates = ref([]);
const credits = ref({});
const degreeType = ref("");
const eees = ref([]);
const fileInfo = ref({});
const itineraryRequests = ref([]);
const people = [];
const procedure = ref([]);
const studentData = ref({});
const subjects = ref([]);
const tutorData = ref({});
const virtualTestRequests = ref([]);
// Variables that store only part of the file -- end

const selectedFile = ref("alice");

// Element type constants --- start
const ASIGNATURAS = "997hN7iymHHoU8BGqmuM0QMNPxs=";
const AEP = "NN$jjZrm84w_8AovFmxnnHU6giw=";
const CERTIFICADOS_DOCUMENTOS_ACADEMICOS = "XGhl$81QmbUgS9EZJqobgd248iU=";
const ESPACIO_EUROPEO_EDUCACION_SUPERIOR = "eO2Chrn3K53ySuNj82jHgm9Qo_E=";
const EXPEDIENTE_COMPLETO = "RHcWxB19zK9mb9$lOHQm8SO7ofs=";
const INFORMACION_EXPEDIENTE = "sSIxO6pqzrwLhLd3PZFzpndhF1A=";
const INSTANCIA_AEP = "zgufyJB2ytYUEauhIrcVTwsXfLE=";
const ITINERARIO = "ua6oBq2$2vD_EV3hJJ2wzqrkrPQ=";
const PERSONAS = "p_ovO$a_rkE0DzW9ZSC8AMXg5VQ=";
const RESUMEN_CREDITOS = "1WNiS_NQH7GCRNTiIl2g1nIcgMM=";
const SOLICITUD_PRUEBA_VIRTUAL = "atiod4vkRiNDS651NTVpY77vWZo=";
const TRAMITE_ACADEMICO = "pHnAg5M_UV2eNft6JYjLM6wGvWM=";
// Element type constants --- end

const enrollments = ref([]);
const recal = ref([]);
const isLoading = ref(false);

// Reading and storing daltonicMode on browser
const daltonicMode = ref(false);
const storedDaltonicMode = localStorage.getItem("daltonicMode");
daltonicMode.value =
  storedDaltonicMode !== null ? JSON.parse(storedDaltonicMode) : false;

watch(daltonicMode, (newVal) => {
  localStorage.setItem("daltonicMode", JSON.stringify(newVal));
});

// Reading and storing darkMode on browser
const darkMode = ref(false);
const storedDarkMode = localStorage.getItem("darkMode");
darkMode.value = storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;

watch(darkMode, (newVal) => {
  localStorage.setItem("darkMode", JSON.stringify(newVal));
});

// Starting point
onMounted(async () => {
  getFile(selectedFile.value);
});

// resetParameters before getting a new file
function resetFile() {
  aep.value = [];
  AEPRequests.value = [];
  certificates.value = [];
  completeFile.value = {};
  credits.value = {};
  eees.value = [];
  enrollments.value = [];
  fileInfo.value = {};
  itineraryRequests.value = [];
  people.value = [];
  procedure.value = [];
  recal.value = [];
  subjects.value = [];
  virtualTestRequests.value = [];
}

// After getting a new file, process its content
function processFile() {
  console.log("Reiniciando variables");
  resetFile();
  console.log("Procesando el expediente");
  for (const elem of elements) {
    const elementType = elem.T;
    switch (elementType) {
      case ASIGNATURAS:
        subjects.value.push(elem.P);
        break;
      case AEP:
        aep.value.push(elem.P);
        break;
      case CERTIFICADOS_DOCUMENTOS_ACADEMICOS:
        procedure.value.push(elem.P);
        break;
      case ESPACIO_EUROPEO_EDUCACION_SUPERIOR:
        eees.value.push(elem.P);
        break;
      case EXPEDIENTE_COMPLETO:
        completeFile.value = elem.P;
        break;
      case INFORMACION_EXPEDIENTE:
        fileInfo.value = elem;
        break;
      case INSTANCIA_AEP:
        AEPRequests.value.push(elem.P);
        break;
      case ITINERARIO:
        itineraryRequests.value.push(elem.P);
        break;
      case PERSONAS:
        people.push(elem);
        break;
      case RESUMEN_CREDITOS:
        credits.value = elem.P;
        break;
      case SOLICITUD_PRUEBA_VIRTUAL:
        virtualTestRequests.value.push(elem.P);
        break;
      case TRAMITE_ACADEMICO:
        certificates.value.push(elem.P);
        break;
    }
  }

  // Student data
  for (const person of people) {
    if (person.Y == fileInfo.value.P.tercer.Y) {
      studentData.value = person.P;
    }
    // Tutor data
    if (person.Y == completeFile.value.tutor.Y) {
      tutorData.value = person.P;
    }
  }
  // Degree data
  degreeType.value = completeFile.value.descPlan;
  accessType.value = completeFile.value.descOpcioAcces;
  fileInfo.value = fileInfo.value.P;
}

// getEnrollments
async function getEnrollments(text) {
  console.log("GET ENROLLMENTS");
  console.log("GET Request de las matriculas de: " + text);
  await axios
    .get(`${BASE_URL}/enrollments/` + text)
    .then((response) => {
      let enrollmentsArray = [];
      let recalArray = [];
      for (let i = 0; i < response.data.data.O.length; i++) {
        if (response.data.data.O[i].P.indOperacio == "ALTA") {
          enrollmentsArray.push(response.data.data.O[i]);
        } else if (response.data.data.O[i].P.indOperacio == "RECAL") {
          recalArray.push(response.data.data.O[i]);
        }
      }
      // Ordenar las matrículas por la propiedad dataMatricula
      enrollmentsArray.sort(function (a, b) {
        return a.P.dataMatricula.localeCompare(b.P.dataMatricula);
      });
      recalArray.sort(function (a, b) {
        return a.P.dataMatricula.localeCompare(b.P.dataMatricula);
      });
      // Asignar las matrices ordenadas a las variables de resultado
      enrollments.value = enrollmentsArray;
      recal.value = recalArray;
    })
    .catch((error) => console.error(error));
}

// getFile
async function getFile(text) {
  console.log("GET file of: " + text);
  selectedFile.value = text;
  try {
    isLoading.value = true;
    const response = await axios.get(`${BASE_URL}/file/${text}`);
    elements = response.data.data.O;
    processFile(elements.value);
    getEnrollments(text);
    isLoading.value = false;
    console.log("APP - selectedFile: " + selectedFile.value);
  } catch (error) {
    console.error(error);
  }
}
</script>
