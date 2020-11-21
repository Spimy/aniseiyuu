<template>
  <main>
    <div class="search-container">
      <Search @select-anime="setAnime($event, 0)" />
      <button><CompareArrow /><br />Seiyuu</button>
      <Search @select-anime="setAnime($event, 1)" />
    </div>
    <div class="result-container">
      <transition name="bounceIn" mode="out-in">
        <AnimeBox
          v-if="animeList[0]"
          :key="animeList[0]"
          :anime="animeList[0]"
        />
      </transition>
      <transition name="bounceIn" mode="out-in">
        <AnimeBox
          v-if="animeList[1]"
          :key="animeList[1]"
          :anime="animeList[1]"
        />
      </transition>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Search from "@/components/Search.vue";
import AnimeBox from "@/components/AnimeBox.vue";
import CompareArrow from "@/assets/icons/CompareArrow.vue";
import { IAnime } from "@/libs/interfaces/Anime";

export default defineComponent({
  name: "Home",
  components: {
    Search,
    CompareArrow,
    AnimeBox
  },
  setup() {
    const animeList = ref([] as Array<IAnime>);
    const setAnime = (anime: IAnime, index: 0 | 1) => {
      animeList.value[index] = anime;
    };
    return { animeList, setAnime };
  }
});
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem 2rem;

  .search {
    flex: 1;
  }

  button {
    border: none;
    background-color: var(--btn-color);
    color: #ffffff;
    font-family: "Berlin Sans FB Regular", sans-serif;
    font-size: 1rem;
    padding: 0.25em 2.5em;
    cursor: pointer;
    transition: box-shadow 0.3s var(--fade-transition);

    &:hover,
    &:focus {
      box-shadow: 0 0 0.8em 0.2em rgba(147, 59, 197, 0.2);
    }
  }

  @media (max-width: 860px) {
    button {
      width: 100%;
    }
  }
}

.result-container {
  margin: 3em 0;
  display: flex;
  gap: 1em;

  @media (max-width: 960px) {
    flex-direction: column;
  }
}
</style>
