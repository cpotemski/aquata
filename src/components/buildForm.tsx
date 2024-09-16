"use client"

import { ShipType } from "@prisma/client"
import { trpc } from "@/trpc/client"
import { FormEvent, useRef } from "react"

export default function BuildForm() {
  const utils = trpc.useUtils()
  const mutation = trpc.ship.buildShips.useMutation({
    onSuccess: async () => {
      await utils.ship.getShipBuildJobs.invalidate()
    }
  })
  const formRef = useRef<HTMLFormElement>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    for (const pair of formData.entries()) {
      if (Object.keys(ShipType).includes(pair[0]) && pair[1] !== "") {
        mutation.mutate({
          what: pair[0] as ShipType,
          amount: parseInt(pair[1] as string)
        })
      }
    }
    
    formRef.current?.reset()
  }


  return <form onSubmit={onSubmit} ref={formRef}>
    {Object.keys(ShipType).map((shipType) => {
      return (
        <label key={shipType}>
          {shipType}: <input type="number" name={shipType} />
        </label>
      )
    })}
    <button type="submit">Bauen</button>
  </form>
}


