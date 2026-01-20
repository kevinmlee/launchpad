import { Suspense } from "react"
import Hero from "../src/components/Hero/Hero"
import Cards from "../src/components/Cards/Cards"
import { CardSkeletonList } from "../src/components/Cards/CardSkeleton"
import { GET_ALL_SPACE_DATA } from "./graphql/queries/space"
import { getClient } from "./graphql"

// Revalidate every 5 minutes (300 seconds)
export const revalidate = 300

const getSpaceData = async () => {
  return getClient()
    .query(GET_ALL_SPACE_DATA)
    .then(result => {
      return result?.error ? result.error : result?.data?.space
    })
    .catch(() => ({ error: 'Error fetching data' }))
}

export default async function Home() {
  const { launches, expeditions, events } = await getSpaceData();

  return (
    <>
      <Hero />
      <Suspense fallback={<CardSkeletonList count={5} />}>
        <Cards launches={launches} expeditions={expeditions} events={events} />
      </Suspense>
    </>
  )
}
