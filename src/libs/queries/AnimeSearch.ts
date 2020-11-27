export const animeSearchQuery = `
  query ($search: String, $id: Int) {
    Page(page: 1, perPage: 10) {
      media(search: $search, id: $id, type: ANIME) {
        id
        title {
          romaji
        }
        description
        coverImage {
          extraLarge
        }
        bannerImage
        siteUrl
        characters {
          edges {
            node {
              id
            }
            voiceActors {
              id
            }
          }
        }
      }
    }
  }
`;
