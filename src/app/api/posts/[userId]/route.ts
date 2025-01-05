import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const posts = await db.post.findMany({
      where: { userId },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    })
    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
