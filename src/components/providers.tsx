"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { TRPCReactProvider } from "@/trpc/client"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TRPCReactProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TRPCReactProvider>
  )
}
