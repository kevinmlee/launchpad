import { cacheExchange, createClient, fetchExchange } from '@urql/core'
import { registerUrql } from '@urql/next/rsc'

const isClient = typeof window !== 'undefined'

const makeClient = () => {
  const apiKey = process.env.GRAPHQL_API_KEY || ''
  console.log('Creating GraphQL client - API Key present:', !!apiKey, 'Length:', apiKey.length)

  return createClient({
    url: 'https://graphql.kevinmlee.com/',
    exchanges: [cacheExchange, fetchExchange],
    requestPolicy: isClient ? 'cache-first' : 'network-only',
    fetchOptions: {
      headers: {
        'x-api-key': apiKey,
      },
    },
  })
}

export const { getClient } = registerUrql(makeClient)