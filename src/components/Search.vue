<template>
  <div class="search">
    <input
      type="text"
      placeholder="Enter Anime Title..."
      aria-label="Enter Anime Title..."
      v-model="query"
      @keyup="search"
      @blur="show = false"
      @focus="show = true"
    />
    <transition name="fade">
      <Throbber v-if="loading" />
    </transition>
    <transition name="fade">
      <ResultsBox
        v-if="results.length > 0 && show"
        :results="results"
        @select-anime="selectAnime"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ResultsBox from "@/components/ResultsBox.vue";
import { IAnime } from "@/libs/interfaces/Anime";
import Throbber from "@/components/Throbber.vue";

export default defineComponent({
  name: "Search",
  components: {
    ResultsBox,
    Throbber
  },
  emits: ["select-anime"],
  setup(props, { emit }) {
    let timeoutRef: null | number = null;

    const loading = ref(false);
    const query = ref("");
    const results = ref([] as Array<IAnime>);
    const show = ref(false);

    const graphqlQuery = `
      query ($search: String, $id: Int) {
        Page(page: 1, perPage: 10) {
          media(search: $search, id: $id, type: ANIME) {
            id
            title {
              romaji
              english
            }
            description
            coverImage {
              extraLarge
            }
            bannerImage
            siteUrl
          }
        }
      }
    `;

    const search = async () => {
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef);
      }

      timeoutRef = setTimeout(async () => {
        if (query.value === "") {
          results.value = [];
          return;
        }

        loading.value = true;
        const data = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            query: graphqlQuery,
            variables: {
              search: query.value
            }
          })
        }).then(res => res.json());
        results.value = data.data.Page.media;
        loading.value = false;
      }, 400);
    };

    const selectAnime = (anime: IAnime) => {
      emit("select-anime", anime);
      query.value = anime.title.english || anime.title.romaji;
    };

    return { loading, query, results, show, search, selectAnime };
  }
});
</script>

<style lang="scss" scoped>
.search {
  position: relative;

  .throbber {
    position: absolute;
    top: -2.2em;
    right: 1em;
  }

  input {
    font-size: 1em;
    font-family: "Berlin Sans FB Regular", sans-serif;
    background-color: var(--faded-purple);
    border: none;
    padding: 1rem 1.5rem;
    color: #ffffff;
    width: 100%;

    &::placeholder {
      color: rgba(255, 255, 255, 0.31);
    }
  }

  .results-box {
    position: absolute;
    z-index: 2;
  }
}
</style>
