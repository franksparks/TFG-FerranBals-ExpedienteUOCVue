<template>
  <div class="absolute top-0 right-0 md:pt-7">
    <div class="bg-white rounded-lg border-2 border-black">
      <div class="text-left px-6">
        <div class="flex justify-between items-center pb-4">
          <p class="text-2xl font-bold">{{ $t("settings.main") }}</p>
          <!-- Modal Close Button -->
          <div
            class="modal-close cursor-pointer z-50"
            @click.prevent="closeModal"
          >
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div id="languageSelector">
          <label for="language-select" class="mr-2">{{
            $t("header.language")
          }}</label>
          <!-- SELECTOR IDIOMA -->
          <select
            id="language-select"
            v-model="$i18n.locale"
            class="text-gray-800 rounded border-2 border-neutral-400 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="en">English</option>
            <option value="es">Castellano</option>
            <option value="cat">Català</option>
          </select>
        </div>

        <div id="daltonicMode" class="py-2">
          <label for="daltonic-select" class="mr-2"
            >{{ $t("settings.daltonicLabel") }}:</label
          >

          <select
            id="daltonic-select"
            v-model="daltonicMode"
            @change="toggleColors"
            class="text-gray-800 rounded border-2 border-neutral-400 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="false">{{ $t("settings.disable") }}</option>
            <option value="true">{{ $t("settings.enable") }}</option>
          </select>
        </div>

        <div id="DayNight" class="py-2">
          <i class="fas fa-sun"></i>
          <!-- Rounded switch -->
          <label class="relative inline-flex items-center mb-5 cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              @change="toggleStyles"
            />
            <div
              class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
          </label>
          <i class="fas fa-moon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsModal",
};
</script>

<script setup>
import { onMounted, onUnmounted, toRefs } from "vue";
const props = defineProps({
  daltonicMode: Boolean,
});

onMounted(() => {
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      emit("close-settings-modal");
    }
  };
  window.addEventListener("keyup", handleEscape);

  onUnmounted(() => {
    window.removeEventListener("keyup", handleEscape);
  });
});

const { daltonicMode } = toRefs(props);

const emit = defineEmits([
  "close-settings-modal",
  "toggle-colors",
  "toggle-styles",
]);

function closeModal() {
  console.log("close settings modal");
  emit("close-settings-modal");
}

function toggleColors() {
  console.log("toggle colors");
  emit("toggle-colors");
}

function toggleStyles() {
  console.log("toggle  styles");
  emit("toggle-styles");
}
</script>
