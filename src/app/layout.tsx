import AuthProvider from "@/components/provider/auth-provider"
import { QueryProvider } from "@/components/provider/query-provider"
import ThemeProvider from "@/components/provider/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn, outfit } from "@/lib/utils"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Basic CRUD System",
  description: "Generated by create next app",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", outfit.className)}>
        <Toaster />
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
