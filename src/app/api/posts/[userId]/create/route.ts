import db from "@/lib/db"
import { CreatePostSchema } from "@/utils/schema"
import { NextResponse } from "next/server"

export async function POST(
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  const body = await request.json()
  const { title, message } = CreatePostSchema.parse(body)
  try {
    const posts = await db.post.create({
      data: {
        title,
        message,
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
