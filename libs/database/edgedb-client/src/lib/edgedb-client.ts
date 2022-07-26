import e, { $infer } from './codegen'
import * as edgedb from 'edgedb'

export const client = edgedb.createClient({
  logging: true,
})

export async function upsertUser({
  uid,
  email,
}: {
  uid: string
  email?: string
}) {
  const upsertQuery = e
    .insert(e.User, {
      uid,
      email,
    })
    .unlessConflict((user) => ({
      on: user.uid,
      else: e.update(user, () => ({
        set: {
          email: email ?? null,
        },
      })),
    }))

  return upsertQuery.run(client)
}

export async function createWatchlistItem(data: {
  movieId: string
  userId: string
}) {
  const insertQuery = e.insert(e.WatchListItem, {
    movieId: data.movieId,
  })

  const updateQuery = e.update(e.User, (user) => ({
    filter: e.op(user.uid, '=', data.userId),
    set: {
      watchList: { '+=': insertQuery },
    },
  }))

  const result = await updateQuery.run(client)

  return result
}

export async function deleteWatchlistItem(data: {
  movieId: string
  userId: string
}) {
  const item = e.select(e.WatchListItem, (watchListItem) => ({
    filter: e.op(watchListItem.movieId, '=', data.movieId),
  }))

  const updateQuery = e.update(e.User, (user) => ({
    filter: e.op(user.uid, '=', e.select(data.userId)),
    set: {
      watchList: { '-=': item },
    },
  }))

  const result = await updateQuery.run(client)

  return result
}

// get watchlist
export async function getWatchlist(userId: string) {
  const query = e.select(e.User, (user) => ({
    filter: e.op(user.uid, '=', userId),
    watchList: {
      movieId: true,
    },
  }))

  const result = await query.run(client)

  return result
}
