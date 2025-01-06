import db from "@/lib/db"
import { NextResponse } from "next/server"

export const revalidate = 0

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
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(posts, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
      status: 200,
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
