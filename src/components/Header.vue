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
  name: "header",
  components: { Nav }
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
}
</style>
