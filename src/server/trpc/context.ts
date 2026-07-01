export type TRPCContext = {
  authorization: string | null
  requestId: string
  userAgent: string | null
}

export async function createTRPCContext(request: Request): Promise<TRPCContext> {
  return {
    authorization: request.headers.get("authorization"),
    requestId: request.headers.get("x-request-id") ?? crypto.randomUUID(),
    userAgent: request.headers.get("user-agent"),
  }
}
