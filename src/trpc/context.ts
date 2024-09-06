export const createContext = async () => {
  // const session = await getSession({ req: opts.req })
  // console.log("session", session)
  return {
    // session
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>;
