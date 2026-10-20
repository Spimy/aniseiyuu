# AniSeiyuu

Compare the voice actors (seiyuu) of two anime and find the characters who share a voice.

**Live:** [aniseiyuu.spimy.dev](https://aniseiyuu.spimy.dev)

## How it works

Pick two anime and click **Seiyuu**. The app loads the full cast of each anime from the [AniList](https://anilist.co) GraphQL API, finds the Japanese voice actors who appear in both, and shows the characters each of them voices in each anime.

AniList limits how many requests a client can make per minute. The app sends its requests one at a time, waits between them, retries when it is rate limited, and caches each anime's cast during a session. If AniList is still refusing requests, it shows an error instead of loading forever.

## Tech stack

- [Vue 3](https://vuejs.org) with TypeScript
- [Vue Router](https://router.vuejs.org)
- [Vite](https://vite.dev)
- SCSS
- [pnpm](https://pnpm.io)
- [AniList GraphQL API](https://docs.anilist.co)

## Development

### With a dev container (recommended)

You need [Docker](https://www.docker.com) and [VS Code](https://code.visualstudio.com) with the Dev Containers extension.

1. Clone the repo and open it in VS Code.
2. Run **Dev Containers: Reopen in Container**. pnpm and the dependencies install automatically.
3. Run `pnpm dev` in the terminal.
4. Open <http://localhost:8080>.

### Without a dev container

You need a current Node.js release and [pnpm](https://pnpm.io/installation).

```bash
pnpm install
pnpm dev
```

### Scripts

| Command        | What it does                        |
| -------------- | ----------------------------------- |
| `pnpm dev`     | Starts the dev server on port 8080  |
| `pnpm build`   | Type-checks and builds to `dist/`   |
| `pnpm preview` | Serves the production build locally |
| `pnpm lint`    | Runs ESLint                         |

## Project structure

```
src/
  components/   Reusable UI (search, results, comparison)
  libs/         AniList client, GraphQL queries, TypeScript types
  router/       Routes
  views/        Pages (Home, About, Contact, 404)
public/         Static files and icons
```

## Notes

- The app calls AniList straight from the browser. There is no backend.
- Some state is saved in `localStorage` so your last comparison is restored when you come back.

## License

[MIT](LICENSE)
