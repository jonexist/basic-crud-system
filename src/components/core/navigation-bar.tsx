import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/action"
import { cn, quicksand } from "@/lib/utils"
import { FileText, LogOut } from "lucide-react"
import Link from "next/link"
import React from "react"
import { auth } from "../../../auth"

const NavigationBar = async () => {
  const session = await auth()
  return (
    <header className="top-0 z-40 w-full border-b flex justify-center">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link
            href="/member/dashboard"
            className="flex items-center space-x-2"
          >
            <span
              className={cn(
                "inline-block font-bold text-xl",
                quicksand.className
              )}
            >
              Postbook
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="font-bold">{`${session?.firstName
                      .charAt(0)
                      .toUpperCase()}${session?.lastName
                      .charAt(0)
                      .toUpperCase()}`}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">
                      {`${session?.firstName} ${session?.lastName}`}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.username}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/member/posts" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>My Posts</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" asChild>
                  <form action={logout}>
                    <button type="submit" className="flex items-center gap-4">
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default NavigationBar
