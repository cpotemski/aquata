import "server-only"
import { createHydrationHelpers } from "@trpc/react-query/rsc"
import { cache } from "react"
import { makeQueryClient } from "./query-client"
import { appRouter } from "@/trpc/app.router"
import { createContext } from "@/trpc/context"
import { createCallerFactory } from "@/trpc/index"

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createContext);

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);
