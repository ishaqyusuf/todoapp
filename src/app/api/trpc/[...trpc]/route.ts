import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { createTRPCContext } from "@/server/trpc/context"
import { appRouter } from "@/server/trpc/root"

export const dynamic = "force-dynamic"

function handler(req: Request) {
  return fetchRequestHandler({
    createContext: () => createTRPCContext(req),
    endpoint: "/api/trpc",
    onError({ error, path }) {
      if (process.env.NODE_ENV === "development") {
        console.error(`tRPC failed on ${path ?? "unknown path"}`, error)
      }
    },
    req,
    router: appRouter,
  })
}

export { handler as GET, handler as POST }
