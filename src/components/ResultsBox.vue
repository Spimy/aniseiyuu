<template>
  <div class="results-box">
    <div v-for="result in results" :key="result.id" class="result" @mousedown.prevent @click="selectResult(result)">
      {{ result.title.english || result.title.romaji }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IAnime } from "@/libs/interfaces/Anime";

const { results } = defineProps<{ results: Array<IAnime> }>();

const emit = defineEmits<{
  "select-anime": [result: IAnime];
}>();

const selectResult = (result: IAnime) => {
  emit("select-anime", result);
};
</script>

<style lang="scss" scoped>
.results-box {
  background-color: #292734;
  width: 100%;
  max-height: 10em;
  overflow-y: auto;

  .result {
    z-index: 999;
    cursor: pointer;
    padding: 0.5em 1em;
    width: 100%;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
