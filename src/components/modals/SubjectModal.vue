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
              {{ request[0].P.descAsignatura }}
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
                    {{ request[0].P.anySuperacion }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Asignatura</td>
                  <td>{{ request[0].P.descAsignatura }}</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Código</td>
                  <td>{{ request[0].P.codAsignatura }}</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Tipo asignatura</td>
                  <td>{{ request[0].P.descClaseCredit }}</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Convocatoria</td>
                  <td>{{ request[0].P.numConvocatoriaActual }}</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Consultor</td>
                  <td>{{ request[0].P.nomConsultor }}</td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Calificación de Evaluación Contínua</td>
                  <td>
                    {{ request[0].P.codCalifC }} ({{ request[0].P.numCalifC }})
                  </td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">
                    Calificación final de actividades prácticas
                  </td>
                  <td>
                    {{ request[0].P.codCalifP }}({{ request[0].P.numCalifP }})
                  </td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">
                    Calificación final de Evaluación Contínua
                  </td>
                  <td>
                    {{ request[0].P.codCalifFC }} ({{
                      request[0].P.numCalifFC
                    }})
                  </td>
                </tr>
                <tr
                  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-600 odd:bg-gray-50 odd:dark:bg-gray-800 odd:dark:border-gray-700"
                >
                  <td class="pl-3">Calificación final de la asignatura</td>
                  <td>
                    {{ request[0].P.descCalifFA }} ({{
                      request[0].P.numCalifFC
                    }})
                  </td>
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
import { asigRequest } from "@/response";
export default {
  name: "SubjectModal",
  data() {
    return {
      request: asigRequest,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
  emits: ["close-modal"],
};
</script>
