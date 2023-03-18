<template>
  <div class="container mx-auto px-50">
    <div class="px-9 pt-9 pr-9">
      <AppHeader />
      <br />
      <DataParent
        :expedienteFerran="expedienteFerran"
        :expedienteCarlos="expedienteCarlos"
      />
      <br />
      <TableParent />
      <br />
      <ListParent />
    </div>
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import DataParent from "./components/DataParent.vue";
import ListParent from "./components/ListParent.vue";
import TableParent from "./components/TableParent.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

//import { cookies } from "@/response";

let expedienteFerran = ref({});
let expedienteCarlos = ref({});

onMounted(() => {
  console.log("onMounted requests");
  axios
    //Recuperamos el listado completo de contactos  públicos con una petición GET
    .get("http://localhost:3000/expediente/fb")
    //Imprimimos mensaje por consola y almacenamos el listado de contactos públicos
    .then(
      (response) => (
        console.log("Obtaining public contact list..."),
        (expedienteFerran.value = response.data.data)
      )
    );

  axios
    //Recuperamos el listado completo de contactos  públicos con una petición GET
    .get("http://localhost:3000/expediente/cr")
    //Imprimimos mensaje por consola y almacenamos el listado de contactos públicos
    .then(
      (response) => (
        console.log("Obtaining public contact list..."),
        (expedienteCarlos.value = response.data.data)
      )
    );
});
</script>

<style>
body {
  background-color: lightgray;
}
</style>
