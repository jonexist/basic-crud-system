import { CreateCommentType, CreatePostType, PostType } from "@/types/types"

export const getPostsByUserId = async (userId: string): Promise<PostType[]> => {
  if (!userId) return []
  const res = await fetch(`/api/posts/${userId}/user-posts`)
  return res.json()
}

export const getPosts = async (): Promise<PostType[]> => {
  const res = await fetch(`/api/posts`)
  return res.json()
}

export const createPost = async (data: CreatePostType) => {
  const { title, message, userId } = data
  try {
    const res = await fetch(`/api/posts/${userId}/create`, {
      method: "POST",
      body: JSON.stringify({
        title,
        message,
      }),
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) {
      throw new Error(`Failed to create post: ${res.statusText}`)
    }
    return { success: true }
  } catch {
    throw new Error(
      "An unexpected error occurred while creating the post. Please try again."
    )
  }
}

export const createComment = async (data: CreateCommentType) => {
  const { content, userId, postId } = data
  try {
    const res = await fetch(`/api/posts/comments/${postId}`, {
      method: "POST",
      body: JSON.stringify({
        content,
        userId,
      }),
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) {
      throw new Error(`Failed to create comment: ${res.statusText}`)
    }
    return { success: true }
  } catch {
    throw new Error(
      "An unexpected error occurred while creating the post. Please try again."
    )
  }
}
