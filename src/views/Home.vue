<template>
  <main>
    <div class="search-container">
      <Search />
      <button><fa icon="arrows-alt-h" /><br />Seiyuu</button>
      <Search />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Search from "@/components/Search.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Search
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
    background-color: #3d2c7a;
    color: #ffffff;
    font-family: "Berlin Sans FB Regular", sans-serif;
    font-size: 1rem;
    padding: 0.25em 2.5em;
    cursor: pointer;
    height: 25%;
  }

  @media (max-width: 860px) {
    button {
      flex: 1 0 100%;
    }
  }
}
</style>
