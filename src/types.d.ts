import { User } from "@prisma/client"

declare module "next-auth" {
  interface Session extends User {
    user: User
  }
}
