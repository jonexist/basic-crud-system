import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 86400, // 24 hours
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const path = nextUrl.pathname
      const isMember = path.startsWith("/member")

      if (isLoggedIn) {
        if (path === "/member") {
          // if user goes to /member or /dashboard, navigate back to member/dashboard
          return Response.redirect(new URL("/member/dashboard", nextUrl))
        }
        if (isMember) return true
        return Response.redirect(new URL("/member/dashboard", nextUrl))
      } else {
        if (isMember) {
          return Response.redirect(new URL("/auth/login", nextUrl))
        }
        if (path === "/") {
          return Response.redirect(new URL("/auth/login", nextUrl))
        }
        return true
      }
    },
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user }
      }
      return token
    },
    async session({ session, token }) {
      return { ...session, ...token }
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
