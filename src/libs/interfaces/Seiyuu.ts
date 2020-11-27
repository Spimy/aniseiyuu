import { ICharacterMedia, ICharacterMediaNode } from "./CharacterMedia";

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
  characterMedia: ICharacterMedia;
}

export interface ISeiyuuFound {
  name: {
    full: string;
  };
  image: {
    large: string;
  };
  siteUrl: string;
  characterMedia: Array<ICharacterMediaNode>;
}
