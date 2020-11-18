<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Nav"
});
</script>

<style lang="scss" scoped>
nav {
  font-size: 1rem;
}

a {
  color: #f1f1f1;
  text-decoration: none;
  padding: 0.5em 1em;
  transition: background-color 0.3s var(--fade-transition);
  margin-left: 1em;

  &:hover,
  &:focus {
    background-color: var(--faded-purple);
  }

  &.router-link-active {
    background-color: var(--btn-color);
  }
}
</style>
