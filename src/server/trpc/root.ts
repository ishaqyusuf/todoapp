import { z } from "zod";
import {
  getExternalHealth,
  listExternalTickets,
} from "@/server/external/client";
import { createTRPCRouter, publicProcedure } from "@/server/trpc/base";

const ticketStatusSchema = z.enum(["open", "waiting", "closed"]);

export const appRouter = createTRPCRouter({
  external: createTRPCRouter({
    health: publicProcedure.query(() => getExternalHealth()),
    tickets: publicProcedure
      .input(z.object({ status: ticketStatusSchema.optional() }).optional())
      .query(({ input }) => listExternalTickets(input)),
  }),
  status: createTRPCRouter({
    health: publicProcedure.query(({ ctx }) => ({
      checkedAt: new Date().toISOString(),
      ok: true,
      requestId: ctx.requestId,
      source: "next-route-handler",
      userAgent: ctx.userAgent,
    })),
  }),
});

export type AppRouter = typeof appRouter;
