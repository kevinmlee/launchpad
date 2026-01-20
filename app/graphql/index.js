import { cacheExchange, createClient, fetchExchange } from '@urql/core'
import { registerUrql } from '@urql/next/rsc'

const isClient = typeof window !== 'undefined'
const apiKey = process.env.GRAPHQL_API_KEY || ''

console.log('GraphQL API Key present:', !!apiKey, 'Length:', apiKey.length)

const makeClient = () => createClient({
  url: 'https://graphql.kevinmlee.com/',
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: isClient ? 'cache-first' : 'network-only',
  fetchOptions: {
    headers: {
      'x-api-key': apiKey,
    },
  },
})

export const { getClient } = registerUrql(makeClient)