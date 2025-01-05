import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(
  request: Request,
  { params: { postId } }: { params: { postId: string } }
) {
  const { content, userId } = await request.json()
  try {
    const posts = await db.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    })
    return NextResponse.json(posts, { status: 201 })
  } catch (error) {
    console.error("Error creating posts:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
