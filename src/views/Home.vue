<template>
  <main>
    <div class="search-container">
      <Search @select-anime="animeOne = $event" />
      <button @click="compare"><CompareArrow /><br />Seiyuu</button>
      <Search @select-anime="animeTwo = $event" />
    </div>
    <div class="result-container">
      <transition name="bounceIn" mode="out-in">
        <AnimeBox
          v-if="Object.keys(animeOne).length > 0"
          :key="animeOne"
          :anime="animeOne"
        />
      </transition>
      <transition name="bounceIn" mode="out-in">
        <AnimeBox
          v-if="Object.keys(animeTwo).length > 0"
          :key="animeTwo"
          :anime="animeTwo"
        />
      </transition>
    </div>
    <transition name="bounceIn" mode="out-in">
      <ComparisonBox
        v-if="
          Object.keys(animeOne).length > 0 &&
            Object.keys(animeTwo).length > 0 &&
            matchingVAs.length > 0 &&
            !loading
        "
        :key="matchingVAs"
        :seiyuuList="matchingVAs"
      />
      <div style="text-align:center" v-else>
        <transition name="fade">
          <h3 v-if="!firstLoad && !loading">No match found.</h3>
        </transition>
      </div>
    </transition>
    <transition name="fade">
      <Throbber v-if="loading" />
    </transition>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Search from "@/components/Search.vue";
import AnimeBox from "@/components/AnimeBox.vue";
import CompareArrow from "@/assets/icons/CompareArrow.vue";
import ComparisonBox from "@/components/ComparisonBox.vue";
import { IAnime, IAnimeNode } from "@/libs/interfaces/Anime";
import { ISeiyuu, ISeiyuuFound, ISeiyuuShort } from "@/libs/interfaces/Seiyuu";
import { staffQuery } from "../libs/queries/Staff";
import { IStaffCharacter } from "@/libs/interfaces/Character";
import Throbber from "@/components/Throbber.vue";

export default defineComponent({
  name: "Home",
  components: {
    Search,
    CompareArrow,
    AnimeBox,
    ComparisonBox,
    Throbber
  },
  setup() {
    const animeOne = ref({} as IAnime);
    const animeTwo = ref({} as IAnime);
    const matchingVAs = ref([] as Array<ISeiyuuFound>);
    const loading = ref(false);
    const firstLoad = ref(true);

    const checkLocalStorage = () => {
      const test = "test";
      try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    };

    const getVAData = async (
      vaId: number,
      animeIds: Array<number>,
      page = 1,
      foundCharacters: Array<IStaffCharacter> = [],
      foundAnime: Array<IAnimeNode> = []
    ): Promise<ISeiyuuFound> => {
      const data: ISeiyuu = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: staffQuery,
          variables: {
            id: vaId,
            page: page
          }
        })
      })
        .then(res => res.json().then(json => json.data.Staff))
        .catch(() =>
          // I was lazy to handle this shhh
          alert("too many requests being sent, please try again later.")
        );

      for (const character of data.characters.nodes) {
        for (const anime of character.media.nodes) {
          if (animeIds.includes(anime.id)) {
            foundCharacters.push(character);
            if (!foundAnime.some(found => found.id === anime.id)) {
              foundAnime.push({ ...anime, characters: [] });
            }
            if (foundAnime.length === animeIds.length) break;
          }
        }
      }

      if (
        foundAnime.length < animeIds.length &&
        data.characters.pageInfo.hasNextPage
      ) {
        return getVAData(
          vaId,
          animeIds,
          data.characters.pageInfo.currentPage + 1,
          foundCharacters,
          foundAnime
        );
      }

      for (const anime of foundAnime) {
        for (const character of foundCharacters) {
          if (character.media.nodes.some(media => media.id === anime.id)) {
            anime["characters"].push(character);
          }
        }
      }

      const seiyuu: ISeiyuuFound = {
        ...data,
        characterMedia: foundAnime.reverse()
      };

      return seiyuu;
    };

    const compare = async () => {
      loading.value = true;
      if (
        Object.keys(animeOne.value).length === 0 &&
        Object.keys(animeTwo.value).length === 0
      )
        return;

      const charactersOne = animeOne.value.characters.edges;
      const charactersTwo = animeTwo.value.characters.edges;

      const vaOne: Array<ISeiyuuShort[]> = [];
      const vaTwo: Array<ISeiyuuShort[]> = [];

      charactersOne.forEach(character => vaOne.push(character.voiceActors));
      charactersTwo.forEach(character => vaTwo.push(character.voiceActors));

      const matchingVAIds: Array<ISeiyuuShort> = [];
      vaOne.forEach(va1 => {
        vaTwo.forEach(va2 => {
          const match = va1.filter(va11 =>
            va2.some(va22 => va11.id === va22.id)
          );
          if (match.length > 0) {
            const found = matchingVAIds.some(va => va.id === match[0].id);
            if (!found) matchingVAIds.push(match[0]);
          }
        });
      });

      const vaData = await Promise.all(
        matchingVAIds.map(async va => {
          const idList =
            animeOne.value.id == animeTwo.value.id
              ? [animeOne.value.id]
              : [animeOne.value.id, animeTwo.value.id];
          return await getVAData(va.id, idList);
        })
      );

      matchingVAs.value = vaData;
      loading.value = false;
      firstLoad.value = false;

      if (checkLocalStorage()) {
        localStorage.setItem("animeOne", JSON.stringify(animeOne.value));
        localStorage.setItem("animeTwo", JSON.stringify(animeTwo.value));
        localStorage.setItem("matchingVAs", JSON.stringify(vaData));
      }
    };

    const onLoad = () => {
      if (checkLocalStorage()) {
        animeOne.value = JSON.parse(localStorage.getItem("animeOne") || "{}");
        animeTwo.value = JSON.parse(localStorage.getItem("animeTwo") || "{}");
        matchingVAs.value = JSON.parse(
          localStorage.getItem("matchingVAs") || "{}"
        );
      }
    };

    onLoad();
    console.log(animeOne.value);
    return { animeOne, animeTwo, matchingVAs, compare, loading, firstLoad };
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
