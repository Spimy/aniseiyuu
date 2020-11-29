import { ICharacters } from "./Character";
import { IAnimeNode } from "./Anime";

export interface ISeiyuuShort {
  id: number;
}

export interface ISeiyuu {
  name: {
    full: string;
  };
  image: {
    large: string;
  };
  siteUrl: string;
  characters: ICharacters;
}

export interface ISeiyuuFound {
  name: {
    full: string;
  };
  image: {
    large: string;
  };
  siteUrl: string;
  characterMedia: Array<IAnimeNode>;
}
