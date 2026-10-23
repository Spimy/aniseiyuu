<template>
  <div class="search">
    <input
      v-model="query"
      type="text"
      placeholder="Enter Anime Title..."
      aria-label="Enter Anime Title..."
      @keyup="search"
      @blur="show = false"
      @focus="show = true"
    />
    <transition name="fade">
      <Throbber v-if="loading" />
    </transition>
    <transition name="fade">
      <ResultsBox v-if="results.length > 0 && show" :results="results" @select-anime="selectAnime" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import ResultsBox from "@/components/ResultsBox.vue";
import Throbber from "@/components/Throbber.vue";
import { anilist } from "@/libs/anilist";
import type { IAnime } from "@/libs/interfaces/Anime";
import { animeSearchQuery } from "@/libs/queries/AnimeSearch";
import { onBeforeUnmount, ref } from "vue";

const emit = defineEmits<{
  "select-anime": [anime: IAnime];
}>();

const loading = ref(false);
const query = ref("");
const results = ref<Array<IAnime>>([]);
const show = ref(false);

let timeoutRef: ReturnType<typeof setTimeout> | null = null;
let latest = 0;

const search = () => {
  if (timeoutRef !== null) clearTimeout(timeoutRef);

  timeoutRef = setTimeout(async () => {
    const term = query.value.trim();
    if (term.length < 2) {
      latest++;
      results.value = [];
      loading.value = false;
      return;
    }

    const requestId = ++latest;
    loading.value = true;
    try {
      const data = await anilist<{ Page: { media: Array<IAnime> } }>(animeSearchQuery, { search: term });
      if (requestId === latest) results.value = data.Page.media;
    } catch (e) {
      if (requestId === latest) results.value = [];
      console.error(e);
    } finally {
      if (requestId === latest) loading.value = false;
    }
  }, 500);
};

const selectAnime = (anime: IAnime) => {
  emit("select-anime", anime);
  query.value = anime.title.english || anime.title.romaji;
  show.value = false;
};

onBeforeUnmount(() => {
  if (timeoutRef !== null) clearTimeout(timeoutRef);
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
