import e from './codegen'
import * as edgedb from 'edgedb'

export async function upsertUser(
  {
    uid,
    email,
  }: {
    uid: string
    email?: string
  },
  client: edgedb.Client
) {
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

export async function createWatchlistItem(
  data: {
    movieId: string
  },
  client: edgedb.Client
) {
  const insertQuery = e.insert(e.WatchListItem, {
    movieId: data.movieId,
    user: e.select(e.User).assert_single(),
  })

  const result = await insertQuery.run(client)

  return result
}

export async function deleteWatchlistItem(
  data: { id: string },
  client: edgedb.Client
) {
  const deletion = e.delete(e.WatchListItem, (watchListItem) => ({
    filter: e.op(watchListItem.id, '=', e.uuid(data.id)),
  }))

  const result = await deletion.run(client)

  return result
}

// get watchlist
export async function getWatchlist(client: edgedb.Client) {
  const query = e.select(e.WatchListItem, () => ({
    id: true,
    movieId: true,
  }))

  const result = await query.run(client)

  return result
}
