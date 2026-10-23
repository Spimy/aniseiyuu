<template>
  <img v-if="imageLink" class="poster" :src="imageLink" :alt="imageAlt" loading="lazy" />
  <!-- Will use an icon when I finally design one -->
  <div v-else class="noImage">
    <Logo />
  </div>
</template>

<script lang="ts" setup>
import Logo from "@/assets/icons/Logo.vue";

const { imageLink, imageAlt = "Poster" } = defineProps<{
  imageLink: string;
  imageAlt?: string;
}>();
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
