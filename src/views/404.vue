<template>
  <div>
    <h2>404 Page not Found</h2>
    <p>You have stumbled across an inexistent space.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NotFound"
});
</script>

<style lang="scss" scoped>
div {
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  height: 50vh;
  align-items: center;
  justify-content: center;
  gap: 1em;
  padding: 0 1em;
  text-align: center;

  h2 {
    line-height: 1em;
  }
}
</style>
