<template>
  <main>
    <div class="search-container">
      <Search @select-anime="animeOne = $event" />
      <button @click="compare"><CompareArrow /><br />Seiyuu</button>
      <Search @select-anime="animeTwo = $event" />
    </div>
    <div class="result-container">
      <transition name="bounceIn" mode="out-in">
        <AnimeBox v-if="Object.keys(animeOne).length > 0" :key="animeOne.id" :anime="animeOne" />
      </transition>
      <transition name="bounceIn" mode="out-in">
        <AnimeBox v-if="Object.keys(animeTwo).length > 0" :key="animeTwo.id" :anime="animeTwo" />
      </transition>
    </div>
    <transition name="bounceIn" mode="out-in">
      <ComparisonBox
        v-if="
          Object.keys(animeOne).length > 0 && Object.keys(animeTwo).length > 0 && matchingVAs.length > 0 && !loading
        "
        :key="matchingVAs.map((va) => va.siteUrl).join()"
        :seiyuu-list="matchingVAs"
      />
      <div v-else style="text-align: center">
        <transition name="fade">
          <h3 v-if="error">{{ error }}</h3>
          <h3 v-else-if="!firstLoad && !loading">No match found.</h3>
        </transition>
      </div>
    </transition>
    <transition name="fade">
      <Throbber v-if="loading" />
    </transition>
  </main>
</template>

<script lang="ts" setup>
import CompareArrow from "@/assets/icons/CompareArrow.vue";
import AnimeBox from "@/components/AnimeBox.vue";
import ComparisonBox from "@/components/ComparisonBox.vue";
import Search from "@/components/Search.vue";
import Throbber from "@/components/Throbber.vue";
import { getAnimeCharacters, type ICharacterEdge, type IVoiceActor } from "@/libs/anilist";
import type { IAnime, IAnimeNode } from "@/libs/interfaces/Anime";
import type { ICharacter } from "@/libs/interfaces/Character";
import type { ISeiyuuFound } from "@/libs/interfaces/Seiyuu";
import { ref } from "vue";

const animeOne = ref<IAnime>({} as IAnime);
const animeTwo = ref<IAnime>({} as IAnime);
const matchingVAs = ref<Array<ISeiyuuFound>>([]);
const loading = ref(false);
const firstLoad = ref(true);
const error = ref("");

const checkLocalStorage = () => {
  const test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

type VAEntry = { va: IVoiceActor; chars: Array<ICharacter> };

const groupByVA = (edges: Array<ICharacterEdge>) => {
  const map = new Map<number, VAEntry>();
  for (const edge of edges) {
    for (const va of edge.voiceActors) {
      const entry = map.get(va.id) || { va, chars: [] };
      entry.chars.push(edge.node);
      map.set(va.id, entry);
    }
  }
  return map;
};

const nodeFor = (anime: IAnime, characters: Array<ICharacter>): IAnimeNode => ({
  id: anime.id,
  title: anime.title,
  characters
});

const compare = async () => {
  if (!animeOne.value.id || !animeTwo.value.id) return;

  loading.value = true;
  error.value = "";
  try {
    const sameAnime = animeOne.value.id === animeTwo.value.id;
    const edgesOne = await getAnimeCharacters(animeOne.value.id);
    const edgesTwo = sameAnime ? edgesOne : await getAnimeCharacters(animeTwo.value.id);

    const mapOne = groupByVA(edgesOne);
    const mapTwo = groupByVA(edgesTwo);

    const found: Array<ISeiyuuFound> = [];
    mapOne.forEach((one, id) => {
      const two = mapTwo.get(id);
      if (!two) return;
      found.push({
        name: one.va.name,
        image: one.va.image,
        siteUrl: one.va.siteUrl,
        characterMedia: sameAnime
          ? [nodeFor(animeOne.value, one.chars)]
          : [nodeFor(animeOne.value, one.chars), nodeFor(animeTwo.value, two.chars)]
      });
    });

    matchingVAs.value = found;
    firstLoad.value = false;

    if (checkLocalStorage()) {
      localStorage.setItem("animeOne", JSON.stringify(animeOne.value));
      localStorage.setItem("animeTwo", JSON.stringify(animeTwo.value));
      localStorage.setItem("matchingVAs", JSON.stringify(found));
    }
  } catch (e) {
    console.error(e);
    error.value = e instanceof Error ? e.message : "Something went wrong talking to AniList.";
  } finally {
    loading.value = false;
  }
};

const onLoad = () => {
  if (checkLocalStorage()) {
    animeOne.value = JSON.parse(localStorage.getItem("animeOne") || "{}");
    animeTwo.value = JSON.parse(localStorage.getItem("animeTwo") || "{}");
    matchingVAs.value = JSON.parse(localStorage.getItem("matchingVAs") || "[]");
  }
};

onLoad();
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

.comparison-box {
  margin-bottom: 5em;
}

.throbber {
  width: 3em;
  height: 3em;

  &:after {
    background-color: #1e1b29;
  }
}
</style>
