<template>
  <div class="anime-box">
    <Poster :imageLink="anime.coverImage.extraLarge" />
    <div
      class="anime-info"
      :style="{ backgroundImage: `url(${anime.bannerImage})` }"
    >
      <div class="overlay">
        <h2>{{ anime.title.english || anime.title.romaji }}</h2>
        <p v-html="anime.description" />
        <a target="_blank" :href="anime.siteUrl">
          More Information
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Poster from "@/components/Poster.vue";
import { IAnime } from "@/libs/interfaces/Anime";

export default defineComponent({
  name: "AnimeBox",
  components: {
    Poster
  },
  props: {
    anime: Object as PropType<IAnime>
  }
});
</script>

<style lang="scss" scoped>
.anime-box {
  font-size: 1rem;
  display: flex;
  align-items: center;
  height: 16.5em;
  width: 100%;
  position: relative;

  @media (max-width: 480px) {
    height: 12em;
  }

  .poster {
    z-index: 1;

    @media (max-width: 480px) {
      width: 6em;
      height: 8em;
    }
  }

  .anime-info {
    position: absolute;
    top: 0;
    left: 4em;
    height: 100%;
    background-size: cover;
    background-position: center;

    .overlay {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      padding: 2em;
      padding-left: 6em;
      background-color: rgba(58, 50, 85, 0.92);
      height: 100%;

      @media (max-width: 480px) {
        padding-left: 3em;
      }

      h2 {
        font-size: 1em;
      }

      p {
        color: #cccccc;
        overflow: hidden;
        height: 100%;
      }
    }
  }
}
</style>
