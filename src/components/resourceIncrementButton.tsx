"use client"

import { trpc } from "@/trpc/client"

export default function ResourceIncrementButton() {
  const utils = trpc.useUtils()
  const mutation = trpc.incrementResources.useMutation({
    onSuccess: async () => {
      await utils.getResources.invalidate()
    }
  })

  return <button onClick={() => mutation.mutate()}>Increment Resources</button>
}

