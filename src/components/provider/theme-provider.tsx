"use client"

import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"

const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  return (
    <NextThemesProvider {...props}>
      <ProgressBar
        height="3px"
        color="#3399FF"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider
