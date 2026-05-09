import { unstable_cache } from "next/cache"

/**
 * CacheLayer handles data caching logic. 
 * Currently uses Next.js unstable_cache, which is easily swappable 
 * for a Redis client (like Upstash) for external scalable architecture.
 */
export class CacheLayer {
  static async fetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    revalidateSeconds: number = 60 // Default 1 min cache for analytics
  ): Promise<T> {
    const cachedData = unstable_cache(
      async () => {
        return await fetcher()
      },
      [key],
      {
        revalidate: revalidateSeconds,
        tags: ['analytics', key]
      }
    )

    return await cachedData()
  }
}
