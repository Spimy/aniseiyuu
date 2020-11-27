import { ISeiyuuShort } from "./Seiyuu";

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
