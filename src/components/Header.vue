<template>
  <header>
    <h1>AniSeiyuu</h1>
    <Nav />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nav from "@/components/Nav.vue";

export default defineComponent({
  name: "Header",
  components: { Nav }
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3em 7em;
  gap: 1em 0.5em;

  @media (max-width: 680px) {
    padding: 3em 2em;
    flex-direction: column;

    nav {
      width: 100%;
      justify-content: space-between;
    }
  }
}
</style>
