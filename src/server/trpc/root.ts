import { z } from "zod";
import {
  getExternalHealth,
  listExternalTickets,
} from "@/server/external/client";
import { createTRPCRouter, publicProcedure } from "@/server/trpc/base";
import { prisma } from "@/lib/prisma";
import { updateTodo } from "../actions/todos";

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
  dona: createTRPCRouter({
    getTodos: publicProcedure
      .input(
        z.object({
          categorySlug: z.string(),
        }),
      )
      .query(async function (props) {
        const { input, ctx } = props;
        return [];
      }),
    updateTodo: publicProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          note: z.string().optional(),
          isCompleted: z.boolean().optional(),
          dueDate: z.date().optional().nullable(),
          categoryId: z.number().optional(),
        }),
      )
      .mutation(async function (props) {
        const { input, ctx } = props;
        return await updateTodo(ctx, input);
      }),
    deleteTodo: publicProcedure.input(
      z
        .object({
          id: z.number(),
        })
        .mutation(async function (props) {
          const { input, ctx } = props;
          const task = await prisma.todo.delete({
            where: {
              id: input.id,
            },
          });
          return {
            success: true,
            task,
          };
        }),
    ),
  }),
});
export type AppRouter = typeof appRouter;
