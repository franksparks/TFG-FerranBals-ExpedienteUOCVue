<template>
  <h1>Tabs</h1>

  <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul
      class="flex flex-wrap -mb-px text-sm font-medium text-center"
      id="myTab"
      data-tabs-toggle="#myTabContent"
      role="tablist"
    >
      <li
        class="mr-2"
        role="presentation"
        v-for="(convo, index) in subjectConvo"
        :key="index"
      >
        <button
          class="inline-block p-4 border-b-2 rounded-t-lg"
          id="profile-tab"
          data-tabs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
          @click="selectConvo(index)"
        >
          {{ convo.descAnyAcademico }}
        </button>
      </li>
    </ul>
    <p>{{ currentConvoIndex }}</p>
    <p>{{ subjectConvo[currentConvoIndex] }}</p>
  </div>
</template>

<script>
export default {
  name: "SubjectStudiedTabs",
};
</script>

<script setup>
import { ref } from "vue";
const props = defineProps({
  subjectOriginal: Object,
  subjectConvo: Object,
});

const currentConvoIndex = ref(0);

const convo = ref({});

function selectConvo(index) {
  currentConvoIndex.value = index;
  convo.value = props.subjectConvo[index];
}
</script>
