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
        // User is logged in
        if (path === "/member") {
          // If user tries to access /member, redirect to /member/dashboard
          return Response.redirect(new URL("/member/dashboard", nextUrl))
        }
        if (isMember) {
          // If user is a member, allow access
          return true
        }
        // If user is logged in but not a member, redirect to /member/dashboard
        return Response.redirect(new URL("/member/dashboard", nextUrl))
      } else {
        // User is not logged in
        if (isMember) {
          // If user is a member, redirect to login page
          return Response.redirect(new URL("/auth/login", nextUrl))
        }
        if (path === "/") {
          // If user tries to access the home page, redirect to login page
          return Response.redirect(new URL("/auth/login", nextUrl))
        }
        // Allow access to other paths
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
