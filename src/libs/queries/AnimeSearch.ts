export const animeSearchQuery = `
  query ($search: String, $id: Int) {
    Page(page: 1, perPage: 10) {
      media(search: $search, id: $id, type: ANIME) {
        id
        title {
          romaji
          english
        }
        description
        coverImage {
          extraLarge
        }
        bannerImage
        siteUrl
      }
    }
  }
`;
