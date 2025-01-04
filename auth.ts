import { getUser } from "@/lib/action"
import * as bcrypt from "bcrypt"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { authConfig } from "./auth.config"

const options = {
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({
              username: z.string().min(6),
              password: z.string().min(8),
            })
            .safeParse(credentials)

          if (parsedCredentials.success) {
            const { username, password } = parsedCredentials.data
            const user = await getUser(username)
            if (!user) return null
            const passwordsMatch = await bcrypt.compare(password, user.password)

            if (passwordsMatch) return user
          }

          console.error("Invalid credentials:", parsedCredentials.error)
          return null
        } catch (error) {
          console.error("Failed to authenticate user:", error)
          throw new Error("Failed to authenticate user")
        }
      },
    }),
  ],
}

const { handlers, auth, signIn, signOut } = NextAuth(options)

export { auth, handlers, signIn, signOut }
