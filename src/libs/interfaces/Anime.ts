export interface IAnime {
  id: string;
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
}
