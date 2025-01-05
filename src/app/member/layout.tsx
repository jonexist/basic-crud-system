import NavigationBar from "@/components/core/navigation-bar"
import React from "react"

const MemberLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="w-full flex items-center flex-col">
      <NavigationBar />
      <div className="container">{children}</div>
    </main>
  )
}

export default MemberLayout
