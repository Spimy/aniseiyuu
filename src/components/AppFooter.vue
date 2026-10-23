<template>
  <footer>Copyright © 2020-{{ year }} - AniSeiyuu by Spimy</footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
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
