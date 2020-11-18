<template>
  <main>
    <div class="search-container">
      <Search />
      <button><CompareArrow /><br />Seiyuu</button>
      <Search />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Search from "@/components/Search.vue";
import CompareArrow from "@/assets/icons/CompareArrow.vue";

export default defineComponent({
  name: "Home",
  components: {
    Search,
    CompareArrow
  }
});
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem 2rem;

  .search {
    flex: 1;
  }

  button {
    border: none;
    background-color: var(--btn-color);
    color: #ffffff;
    font-family: "Berlin Sans FB Regular", sans-serif;
    font-size: 1rem;
    padding: 0.25em 2.5em;
    cursor: pointer;
    transition: box-shadow 0.3s var(--fade-transition);

    &:hover,
    &:focus {
      box-shadow: 0 0 0.8em 0.2em rgba(147, 59, 197, 0.2);
    }
  }

  @media (max-width: 860px) {
    button {
      width: 100%;
    }
  }
}
</style>
