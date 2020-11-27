export const staffQuery = `
  query ($id: Int, $page: Int = 1) {
    Staff(id: $id) {
      name {
        full
      }
      image {
        large
      }
      siteUrl
      characterMedia(page: $page, perPage: 25) {
        pageInfo {
          currentPage
          hasNextPage
        }
        nodes {
          id
          title {
            english
            romaji
          }
          characters {
            nodes {
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
  }
`;
