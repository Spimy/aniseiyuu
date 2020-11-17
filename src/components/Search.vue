<template>
  <input
    class="search"
    type="text"
    placeholder="Enter Anime Title..."
    aria-label="Enter Anime Title..."
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Search"
});
</script>

<style lang="scss" scoped>
.search {
  font-size: 1em;
  font-family: "Berlin Sans FB Regular", sans-serif;
  background-color: #3a3255;
  border: none;
  padding: 1rem 1.5rem;
  color: #ffffff;

  &::placeholder {
    color: rgba(255, 255, 255, 0.31);
  }
}
</style>
