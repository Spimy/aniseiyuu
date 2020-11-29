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
  background-color: var(--faded-purple);
  position: absolute;
  bottom: 0;
  left: 7em;
  right: 7em;

  @media (max-width: 680px) {
    left: 2em;
    right: 2em;
  }
}
</style>
