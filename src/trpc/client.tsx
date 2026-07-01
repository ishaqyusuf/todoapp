"use client"

import type { QueryClient } from "@tanstack/react-query"
import { isServer, QueryClientProvider } from "@tanstack/react-query"
import {
  createTRPCClient,
  httpBatchStreamLink,
  loggerLink,
} from "@trpc/client"
import { createTRPCContext } from "@trpc/tanstack-react-query"
import { useState, type ReactNode } from "react"
import superjson from "superjson"
import type { AppRouter } from "@/server/trpc/root"
import { makeQueryClient } from "@/trpc/query-client"

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }

  return browserQueryClient
}

export function TRPCReactProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: superjson,
          url: "/api/trpc",
        }),
      ],
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
