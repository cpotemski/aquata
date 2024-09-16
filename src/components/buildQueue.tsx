"use client"

import { trpc } from "@/trpc/client"

export default function BuildQueue() {
  const {data, isLoading} = trpc.ship.getShipBuildJobs.useQuery()

  if(isLoading) {
    return <p>Loading...</p>
  }

  if(!data) {
    throw new Error(`Could not load build queue`);
  }

  return <div>
    {data.map((job) => <p key={job.id}>{job.amount}x {job.what}</p>)}
  </div>
}


