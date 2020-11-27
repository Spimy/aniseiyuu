<template>
  <main>
    <div class="search-container">
      <Search @select-anime="setAnime($event, 0)" />
      <button @click="compare"><CompareArrow /><br />Seiyuu</button>
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
    <transition name="bounceIn" mode="out-in">
      <ComparisonBox
        v-if="animeList && animeList.length === 2 && matchingVAs.length > 0"
        :key="matchingVAs"
        :seiyuuList="matchingVAs"
      />
    </transition>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Search from "@/components/Search.vue";
import AnimeBox from "@/components/AnimeBox.vue";
import CompareArrow from "@/assets/icons/CompareArrow.vue";
import ComparisonBox from "@/components/ComparisonBox.vue";
import { IAnime } from "@/libs/interfaces/Anime";
import { ICharacterMediaNode } from "@/libs/interfaces/CharacterMedia";
import { ISeiyuu, ISeiyuuFound, ISeiyuuShort } from "@/libs/interfaces/Seiyuu";
import { staffQuery } from "../libs/queries/Staff";

export default defineComponent({
  name: "Home",
  components: {
    Search,
    CompareArrow,
    AnimeBox,
    ComparisonBox
  },
  setup() {
    const animeList = ref([] as Array<IAnime>);
    const matchingVAs = ref([] as Array<ISeiyuuFound>);

    const setAnime = (anime: IAnime, index: 0 | 1) => {
      animeList.value[index] = anime;
    };

    const getVAData = async (
      vaId: number,
      animeIds: Array<number>,
      page = 1,
      foundNodes: Array<ICharacterMediaNode> = []
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
      }).then(res => res.json().then(json => json.data.Staff));

      for (const node of data.characterMedia.nodes) {
        if (animeIds.includes(node.id)) {
          foundNodes.push(node);
          if (foundNodes.length === 2) break;
        }
      }
      if (foundNodes.length < 2 && data.characterMedia.pageInfo.hasNextPage) {
        return getVAData(
          vaId,
          animeIds,
          data.characterMedia.pageInfo.currentPage + 1,
          foundNodes
        );
      }

      const seiyuu: ISeiyuuFound = {
        ...data,
        characterMedia: foundNodes
      };

      return seiyuu;
    };

    const compare = async () => {
      console.log("started");
      if (
        typeof animeList.value === "undefined" ||
        animeList.value.length !== 2
      ) {
        return;
      }

      const animeOne = animeList.value[0];
      const animeTwo = animeList.value[1];

      const charactersOne = animeOne.characters.edges;
      const charactersTwo = animeTwo.characters.edges;

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

      matchingVAs.value = await Promise.all(
        matchingVAIds.map(
          async va => await getVAData(va.id, [animeOne.id, animeTwo.id])
        )
      );
    };

    return { animeList, matchingVAs, setAnime, compare };
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
