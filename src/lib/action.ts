"use server"

import { loginSchema } from "@/components/auth/schema"
import { User } from "@prisma/client"
import { AuthError } from "next-auth"
import { unstable_noStore as noStore } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { auth, signIn, signOut } from "../../auth"
import db from "./db"

const handleAuthError = (error: AuthError) => {
  switch (error.type) {
    case "CredentialsSignin":
      return "Invalid credentials."
    default:
      return "An error occurred. Please try again."
  }
}

// The `authenticate` function is used to authenticate a user with the provided credentials.
export const authenticate = async (values: z.infer<typeof loginSchema>) => {
  try {
    const result = await signIn("credentials", { ...values, redirect: false })
    if (result?.error) {
      throw new AuthError(result.error)
    }
    redirect("/member/dashboard")
  } catch (error) {
    if (error instanceof AuthError) {
      return handleAuthError(error)
    }
    throw error
  }
}

// The `logout` function is used to sign out the current user.
export const logout = async () => {
  await signOut({ redirectTo: "/auth/login" })
}

// The `getUser` function is used to fetch a user by their username.
export const getUser = async (username: string): Promise<User | undefined> => {
  noStore()
  try {
    const user = await db.user.findUnique({ where: { username } })
    return user || undefined
  } catch (error) {
    throw new Error("Failed to fetch user: " + error)
  }
}

// The `getUserSession` function is used to fetch the current user session.
export const getUserSession = async () => {
  noStore()
  try {
    const session = await auth()
    return session?.user
  } catch (error) {
    throw new Error("Failed to fetch user: " + error)
  }
}

// The `getCurrentUser` function is used to fetch the current user.
export const getCurrentUser = async () => {
  noStore()
  try {
    const session = await getUserSession()
    const currentUser = await db.user.findUnique({
      where: { username: session?.username || "" },
    })
    return currentUser
  } catch (error) {
    throw new Error("Failed to fetch user: " + error)
  }
}

export const updatelikes = async (postId: string, mode: "like" | "dislike") => {
  try {
    const incrementValue = mode === "like" ? 1 : -1

    const post = await db.post.update({
      where: { id: postId },
      data: {
        likes: {
          increment: incrementValue,
        },
      },
    })

    return post
  } catch (error) {
    console.error("Request error", error)
    throw new Error("Error liking posts")
  }
}
