import { ICharacterShort } from "./Character";

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
