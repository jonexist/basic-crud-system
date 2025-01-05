import { Prisma } from "@prisma/client"

export type PostType = Prisma.PostGetPayload<{
  include: {
    comments: {
      include: {
        user: true
      }
    }
    user: true
  }
}>

export type CreatePostType = {
  title: string
  message: string
  userId: string
}

export type CreateCommentType = {
  content: string
  userId: string
  postId: string
}
