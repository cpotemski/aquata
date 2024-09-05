"use client"

export default function ResourceIncrementButton({
                                                  incrementResourceAction
                                                }: {
  incrementResourceAction: () => void
}) {
  return <form action={incrementResourceAction}>
    <button type="submit">Increment Resources</button>
  </form>
}

