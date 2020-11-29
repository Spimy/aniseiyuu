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
      characters(page: $page, perPage: 25) {
        pageInfo {
          currentPage
          hasNextPage
        }
        nodes {
          id
          name {
            full
          }
          image {
            large
          }
          siteUrl
          media {
            nodes {
              id
              title {
                english
                romaji
              }
            }
          }
        }
      }
    }
  }
`;
