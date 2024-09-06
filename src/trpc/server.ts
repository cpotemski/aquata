import "server-only" // <-- ensure this file cannot be imported from the client
import { createHydrationHelpers } from "@trpc/react-query/rsc"
import { cache } from "react"
import { makeQueryClient } from "./query-client"
import { appRouter, createCallerFactory } from "@/trpc/appRouter"
import { createContext } from "@/trpc/context"

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(async (params: Parameters<typeof createContext>) => await createContext(params));

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);
