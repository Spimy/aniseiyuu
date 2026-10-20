export const animeCharactersQuery = `
  query ($id: Int, $page: Int = 1) {
    Media(id: $id, type: ANIME) {
      characters(page: $page, perPage: 25) {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            id
            name {
              full
            }
            image {
              large
            }
            siteUrl
          }
          voiceActors(language: JAPANESE) {
            id
            name {
              full
            }
            image {
              large
            }
            siteUrl
          }
        }
      }
    }
  }
`;
