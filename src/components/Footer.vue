<template>
  <footer>
    Copyright © 2020 - AniSeiyuu by Spimy
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer"
});
</script>

<style lang="scss" scoped>
footer {
  text-align: center;
  padding: 0.5em;
  position: fixed;
  bottom: 0;
  left: 7em;
  right: 7em;
  background-color: var(--faded-purple);

  @media (max-width: 680px) {
    left: 2em;
    right: 2em;
  }
}
</style>
