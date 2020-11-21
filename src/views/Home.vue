<template>
  <main>
    <div class="search-container">
      <Search />
      <button><CompareArrow /><br />Seiyuu</button>
      <Search />
    </div>
    <div class="result-container">
      <AnimeBox :anime="anime" />
      <AnimeBox :anime="anime" />
    </div>
  </main>
  <!-- <Modal /> -->
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Search from "@/components/Search.vue";
import AnimeBox from "@/components/AnimeBox.vue";
import CompareArrow from "@/assets/icons/CompareArrow.vue";

export default defineComponent({
  name: "Home",
  components: {
    Search,
    CompareArrow,
    AnimeBox
  },
  setup() {
    const anime = reactive({
      id: 9253,
      title: {
        romaji: "Steins;Gate",
        english: "Steins;Gate",
        native: "シュタインズ・ゲート"
      },
      description:
        'Self-proclaimed mad scientist Okabe Rintarou lives in a small room in Akihabara, where he invents "future gadgets" with fellow lab members Shiina Mayuri, his air-headed childhood friend, and Hashida Itaru, an otaku hacker. The three pass the time by tinkering with their latest creation, a "Phone Microwave" that can be controlled through text messages. \n<br><br>\nThe lab members soon face a string of mysterious incidents that lead to a game-changing discovery: the Phone Microwave can send emails to the past and thus alter history. Adapted from the critically acclaimed visual novel by 5pb. and Nitroplus, Steins;Gate takes Okabe to the depths of scientific theory and human despair as he faces the dire consequences of changing the past.\n<br><br>\n(Summary by Edo)',
      coverImage: {
        extraLarge:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-7pdcVzQSkKxT.jpg"
      },
      bannerImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/n9253-JIhmKgBKsWUN.jpg",
      siteUrl: "https://anilist.co/anime/9253"
    });
    return { anime };
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
