<template>
  <div class="results-box">
    <div v-for="result in results" :key="result" class="result" @click="selectResult(result)">
      {{ result.title.english || result.title.romaji }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IAnime } from "@/libs/interfaces/Anime";

export default defineComponent({
  name: "ResultsBox",
  props: {
    results: Array as PropType<Array<IAnime>>
  },
  emits: ["select-anime"],
  setup(props, { emit }) {
    const selectResult = (result: IAnime) => emit("select-anime", result);
    return { selectResult };
  }
});
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
