import { ISeiyuuShort } from "./Seiyuu";
import { IPageInfo } from "./PageInfo";
import { IAnimeNode } from "./Anime";

export interface ICharacterShort {
  voiceActors: Array<ISeiyuuShort>;
}

export interface ICharacter {
  name: {
    full: string;
  };
  image: {
    large: string;
  };
  siteUrl: string;
}

export interface IStaffCharacter extends ICharacter {
  media: {
    nodes: Array<IAnimeNode>;
  };
}

export interface ICharacters {
  pageInfo: IPageInfo;
  nodes: Array<IStaffCharacter>;
}
