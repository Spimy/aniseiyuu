import { IPageInfo } from "./PageInfo";
import { ICharacter } from "./Character";

export interface ICharacterMediaNode {
  id: number;
  title: {
    english: string;
    romaji: string;
  };
  characters: ICharacter;
}

export interface ICharacterMedia {
  pageInfo: IPageInfo;
  nodes: Array<ICharacterMediaNode>;
}
