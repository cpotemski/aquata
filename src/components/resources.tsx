"use client"

import { trpc } from "@/trpc/client"

export default function ResourceIncrementButton() {
  const {data, isLoading} = trpc.getResources.useQuery();

  if(isLoading) {
    return <p>Loading...</p>
  }

  return <div>
    <p>Aluminium: {data?.aluminium}</p>
    <p>Stahl: {data?.steel}</p>
    <p>Plutonium: {data?.plutonium}</p>
  </div>
}


