import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query"
import superjson from "superjson"

function isUnauthorizedError(error: unknown) {
  if (typeof error !== "object" || error === null || !("data" in error)) {
    return false
  }

  const data = (error as { data?: { code?: unknown } }).data

  return data?.code === "UNAUTHORIZED"
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
      queries: {
        gcTime: 10 * 60 * 1000,
        retry: isServer
          ? false
          : (failureCount, error) => {
              if (isUnauthorizedError(error)) return false
              return failureCount < 2
            },
        staleTime: 2 * 60 * 1000,
      },
    },
    queryCache: isServer
      ? undefined
      : new QueryCache({
          onError: (error) => {
            if (isUnauthorizedError(error)) {
              window.location.href = "/login"
            }
          },
        }),
  })
}
