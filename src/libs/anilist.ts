import { ICharacter } from "./interfaces/Character";
import { animeCharactersQuery } from "./queries/AnimeCharacters";

const ENDPOINT = "https://graphql.anilist.co";
const MIN_GAP_MS = 800; // gap between requests to avoid rate limiting
const MAX_ATTEMPTS = 5;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let queue: Promise<unknown> = Promise.resolve();
let lastRequest = 0;

async function send<T>(query: string, variables: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const wait = lastRequest + MIN_GAP_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequest = Date.now();

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query, variables }),
      signal
    });

    if (res.status === 429) {
      // Retry-After may not be exposed by CORS, so fall back to backoff
      const retryAfter = Number(res.headers.get("Retry-After")) || Math.min(2 ** attempt * 2, 30);
      await sleep(retryAfter * 1000);
      continue;
    }

    const json = await res.json();
    if (!res.ok || json.errors) {
      throw new Error(json.errors?.[0]?.message || `AniList error ${res.status}`);
    }
    return json.data as T;
  }
  throw new Error("AniList is rate limiting requests. Try again in a minute.");
}

// All requests go through one queue, one at a time
export function anilist<T>(query: string, variables: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
  const result = queue.then(() => send<T>(query, variables, signal));
  queue = result.catch(() => undefined);
  return result;
}

export interface IVoiceActor {
  id: number;
  name: { full: string };
  image: { large: string };
  siteUrl: string;
}

export interface ICharacterEdge {
  node: ICharacter & { id: number };
  voiceActors: Array<IVoiceActor>;
}

interface ICharactersResponse {
  Media: {
    characters: {
      pageInfo: { hasNextPage: boolean };
      edges: Array<ICharacterEdge>;
    };
  };
}

async function loadAllCharacters(id: number): Promise<Array<ICharacterEdge>> {
  const edges: Array<ICharacterEdge> = [];
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const data = await anilist<ICharactersResponse>(animeCharactersQuery, { id, page });
    edges.push(...data.Media.characters.edges);
    hasNext = data.Media.characters.pageInfo.hasNextPage;
    page++;
  }
  return edges;
}

const cache = new Map<number, Promise<Array<ICharacterEdge>>>();

export function getAnimeCharacters(id: number): Promise<Array<ICharacterEdge>> {
  let cached = cache.get(id);
  if (!cached) {
    cached = loadAllCharacters(id).catch(e => {
      cache.delete(id); // don't cache failures
      throw e;
    });
    cache.set(id, cached);
  }
  return cached;
}
