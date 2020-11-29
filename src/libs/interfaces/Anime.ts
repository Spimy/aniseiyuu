import { ICharacterShort, ICharacter } from "./Character";

export interface IAnime {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  description: string;
  coverImage: {
    extraLarge: string;
  };
  bannerImage: string;
  siteUrl: string;
  characters: {
    edges: Array<ICharacterShort>;
  };
}

export interface IAnimeNode {
  id: number;
  title: {
    english: string;
    romaji: string;
  };
  characters: Array<ICharacter>;
}
