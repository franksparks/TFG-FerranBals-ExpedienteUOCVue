<template>
  <header class="mx-2">
    <div id="header">
      <!-- UOC logo -->
      <div class="md:cols-3 relative">
        <div class="md:w-1/3 md:pb-10">
          <a
            class="focus:ring focus:ring-cyan-500 focus:border-cyan-500"
            href="https://www.uoc.edu/"
            target="_blank"
          >
            <img
              class="rounded w-full"
              src="/dayLogo.png"
              title="Universitat Oberta de Catalunya"
              :alt="$t('images.uocLogo')"
            />
          </a>

          <!-- File selector -->
          <div class="md:absolute top-0 right-0 md:w-1/3">
            <div class="flex items-center">
              <p
                class="text-2xl font-bold md:text-3xl text-center md:text-left py-2 md:py-3"
              >
                {{ $t("header.main") }}
              </p>

              <i
                @click.prevent="settings = true"
                class="fas fa-cog ml-auto align-right cursor-pointer"
              ></i>
            </div>

            <label for="file-select" class="mr-2">{{
              $t("header.file")
            }}</label>
            <select
              id="file-select"
              v-model="file"
              @change="refreshFile(file)"
              class="text-gray-800 rounded border-2 border-neutral-400 focus:outline-none focus:ring focus:ring-cyan-500 focus:border-cyan-500"
            >
              <option value="alice">Alice</option>
              <option value="minor">Minor Alice</option>
              <option value="bob">Bob</option>
            </select>
            <!-- Degree type -->
            <div class="text-center pt-1 md:text-left">
              <p class="text-2xl text-blue-900">
                {{ degreeType }}
              </p>
            </div>
          </div>
          <SettingsModal
            v-if="settings"
            :daltonicMode="daltonicMode"
            @toggle-colors="toggleColors"
            @toggle-styles="toggleStyles"
            @close-settings-modal="settings = false"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<script setup>
import { toRefs, ref } from "vue";
import SettingsModal from "./modals/SettingsModal.vue";

const props = defineProps({
  degreeType: String,
  selectedFile: String,
  daltonicMode: Boolean,
});

const { selectedFile } = toRefs(props);

const settings = ref(false);

const file = ref(selectedFile.value);

const emit = defineEmits(["refresh-file", "toggle-colors", "toggle-styles"]);

function refreshFile(file) {
  emit("refresh-file", file);
}

function toggleColors() {
  emit("toggle-colors");
}

function toggleStyles() {
  emit("toggle-styles");
}
</script>
