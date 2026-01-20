import Hero from "../src/components/Hero/Hero"
import Cards from "../src/components/Cards/Cards"
import { GET_ALL_SPACE_DATA } from "./graphql/queries/space"
import { getClient } from "./graphql"

export const dynamic = "force-dynamic"

const getSpaceData = async () => {
  return getClient()
    .query(GET_ALL_SPACE_DATA)
    .then(result => {
      console.log('graphql response', result)
      return result?.error ? result.error : result?.data?.space
    })
    .catch(() => ({ error: 'Error fetching data' }))
}

export default async function Home() {
  const { launches, expeditions, events } = await getSpaceData();

  return (
    <>
      <Hero />
      <Cards launches={launches} expeditions={expeditions} events={events} />
    </>
  )
}
