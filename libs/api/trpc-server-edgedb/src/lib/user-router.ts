import { z } from 'zod'
import { createRouter } from './context'
import { TRPCError } from '@trpc/server'
import {
  upsertUser,
  createWatchlistItem,
  deleteWatchlistItem,
  getWatchlist,
} from '@conference-demos/edgedb-client'

export const userDataRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.uid) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next()
  })
  .mutation('syncAccount', {
    output: z.void(),
    input: z.void(),
    async resolve({ ctx }) {
      // upsert with edgedb
      await upsertUser({
        uid: ctx.uid,
        email: ctx.uid,
      }, ctx.client)
    },
  })
  .mutation('addToWatchlist', {
    output: z.void(),
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      createWatchlistItem(
        {
          movieId: input.id,
        },
        ctx.client
      )
    },
  })
  .mutation('removeFromWatchlist', {
    output: z.void(),
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      await deleteWatchlistItem({ id: input.id }, ctx.client)
    },
  })
  .query('watchlist', {
    input: z.void(),
    async resolve({ ctx }) {
      const watchlist = await getWatchlist(ctx.client)

      const watchList = watchlist ?? []

      // make movie promises for each movie in watchlist
      const moviePromises =
        watchList.map(({ movieId }) =>
          fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: {
              Authorization: ctx.TMDB_TOKEN,
            },
          })
        ) ?? []

      // wait for all movie promises to resolve
      const moviesResults = await Promise.all(moviePromises)

      // get movies from results
      const moviesJsonPromises = moviesResults.map((response) =>
        response.json()
      )

      // wait for all movies to resolve
      const moviesJson = await Promise.all(moviesJsonPromises)

      const movies = moviesJson ?? []

      return {
        movies: movies.map((movie) => {
          const watchListId =
            watchList.find(
              (watchlistItem) => watchlistItem.movieId === movie.id.toString()
            )?.id ?? ''

          return {
            ...movie,
            posterImage: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            backdropImage: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
            watchListId,
          }
        }),
      }
    },
  })
