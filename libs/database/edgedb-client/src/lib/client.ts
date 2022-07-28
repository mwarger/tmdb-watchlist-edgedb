import * as edgedb from 'edgedb'

export const client = edgedb.createClient({
  logging: true,
})
