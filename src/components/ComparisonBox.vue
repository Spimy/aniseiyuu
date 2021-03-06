<template>
  <div class="comparison-box">
    <div class="header">
      <h3 id="comparison">Comparison</h3>
    </div>
    <div class="comparison">
      <div v-for="seiyuu in seiyuuList" :key="seiyuu" class="container">
        <div class="seiyuu">
          <Poster :imageLink="seiyuu.image.large" :imageAlt="`${seiyuu.name.full}'s image`" />
          <div class="name">
            <a target="_blank" :href="seiyuu.siteUrl">
              {{ seiyuu.name.full }}
            </a>
          </div>
        </div>
        <div v-for="anime in seiyuu.characterMedia" :key="anime" class="anime">
          <div class="characters">
            <a
              v-for="character in anime.characters"
              :key="character"
              :title="character.name.full"
              :href="character.siteUrl"
              target="_blank"
            >
              <Poster :imageLink="character.image.large" :imageAlt="`${character.name.full}'s image`" />
            </a>
          </div>
          <h3>{{ anime.title.english || anime.title.romaji }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ISeiyuuFound } from "@/libs/interfaces/Seiyuu";
import Poster from "@/components/Poster.vue";

export default defineComponent({
  name: "ComparisonBox",
  props: {
    seiyuuList: Object as PropType<Array<ISeiyuuFound>>
  },
  components: { Poster }
});
</script>

<style lang="scss" scoped>
@mixin imageBlock($width, $height: $width) {
  display: block;
  width: $width;
  height: $height;
  object-fit: cover;
  object-position: center;
}

.comparison-box {
  font-size: 1rem;

  .header {
    background-color: #534682;
    text-align: center;
    padding: 0.5em 0;
  }

  .comparison {
    background-color: var(--faded-purple);
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;

    .container {
      width: 100%;
      background-color: #534682;
      display: flex;

      @media (max-width: 820px) {
        flex-direction: column;
        align-items: center;
      }

      .seiyuu {
        position: relative;
        width: fit-content;

        @media (max-width: 820px) {
          background-color: var(--faded-purple);
          margin: 1em;
          margin-bottom: 0;
          display: flex;
          width: 90%;
        }

        img {
          @include imageBlock(11em, 15em);

          @media (max-width: 820px) {
            @include imageBlock(3em, 3.2em);
          }
        }

        .noImage {
          background-color: var(--btn-color);
          width: 11em;
          height: 15em;

          @media (max-width: 820px) {
            width: 3em;
            height: 3.2em;
          }
        }

        .name {
          position: absolute;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.65);
          width: 100%;
          text-align: center;
          padding: 1em;

          @media (max-width: 820px) {
            position: initial;
            background-color: transparent;
            top: 0;
            text-align: left;
          }
        }
      }

      .anime {
        background-color: var(--faded-purple);
        padding: 1em;
        margin: 1em;
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        overflow: hidden;

        @media (max-width: 820px) {
          gap: 1em;
        }

        .characters {
          display: flex;
          gap: 0.5em;
          width: 100%;
          overflow: auto;

          a {
            margin: 0 auto;
          }

          .poster,
          .noImage {
            width: 11.45em;
            height: 8em;
          }
        }

        h3 {
          text-align: center;
        }
      }
    }
  }
}
</style>
