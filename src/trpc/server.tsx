import "server-only"

import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"
import { headers } from "next/headers"
import { cache, type ReactNode } from "react"
import { createTRPCContext } from "@/server/trpc/context"
import { appRouter, type AppRouter } from "@/server/trpc/root"
import { makeQueryClient } from "@/trpc/query-client"

export const getQueryClient = cache(makeQueryClient)

const getTRPCContext = cache(async () => {
  const requestHeaders = await headers()
  const request = new Request("http://localhost/api/trpc", {
    headers: requestHeaders,
  })

  return createTRPCContext(request)
})

export const trpc = createTRPCOptionsProxy<AppRouter>({
  ctx: getTRPCContext,
  queryClient: getQueryClient,
  router: appRouter,
})

export function HydrateClient({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
