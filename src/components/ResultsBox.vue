<template>
  <div class="results-box">
    <div v-for="result in results" :key="result" class="result">
      {{ result }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ResultsBox",
  props: {
    results: Array
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
    cursor: pointer;
    padding: 0.5em 1em;
    width: 100%;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
