import { cacheExchange, createClient, fetchExchange } from '@urql/core'
import { registerUrql } from '@urql/next/rsc'

const isClient = typeof window !== 'undefined'

const makeClient = () => createClient({
  url: 'https://graphql.kevinmlee.com/',
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: isClient ? 'cache-first' : 'network-only',
  fetchOptions: {
    headers: {
      'x-api-key': process.env.GRAPHQL_API_KEY || '',
    },
  },
})

export const { getClient } = registerUrql(makeClient)