<template>
  <div class="search">
    <input
      type="text"
      placeholder="Enter Anime Title..."
      aria-label="Enter Anime Title..."
      v-model="query"
      @keyup="search"
      @blur="show = false"
      @focus="show = true"
    />
    <transition name="fade">
      <ResultsBox v-if="results.length > 0 && show" :results="results" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ResultsBox from "@/components/ResultsBox.vue";

export default defineComponent({
  name: "Search",
  components: {
    ResultsBox
  },
  setup() {
    let timeoutRef: null | number = null;
    const query = ref("");
    const results = ref([] as Array<number>); // This is temporary for testing
    const show = ref(false);

    const search = () => {
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef);
      }

      timeoutRef = setTimeout(() => {
        if (query.value === "") {
          results.value = [];
          return;
        }
        if (results.value.length === 0) return results.value.push(0);
        return results.value.push(results.value[results.value.length - 1] + 1);
      }, 400);
    };

    return { query, results, show, search };
  }
});
</script>

<style lang="scss" scoped>
.search {
  position: relative;

  input {
    font-size: 1em;
    font-family: "Berlin Sans FB Regular", sans-serif;
    background-color: var(--faded-purple);
    border: none;
    padding: 1rem 1.5rem;
    color: #ffffff;
    width: 100%;

    &::placeholder {
      color: rgba(255, 255, 255, 0.31);
    }
  }

  .results-box {
    position: absolute;
    z-index: 1;
  }
}
</style>
