<template>
  <img class="poster" v-if="imageLink" :src="imageLink" :alt="imageAlt || 'Poster'" loading="lazy" />
  <!-- Will use an icon when I finally design one -->
  <div class="noImage" v-else>
    <Logo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Logo from "@/assets/icons/Logo.vue";

export default defineComponent({
  name: "Poster",
  props: {
    imageLink: String,
    imageAlt: String
  },
  components: { Logo }
});
</script>

<style lang="scss" scoped>
img.poster,
.noImage {
  width: 8em;
  height: 12em;
  object-fit: cover;
  object-position: center;
  transition: filter 0.2s ease-in-out;
}

.noImage {
  background-color: var(--faded-purple);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
</style>
