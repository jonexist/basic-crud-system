import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const posts = await db.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Request error", error)
    return NextResponse.json({ error: "Error fetching posts" }, { status: 500 })
  }
}
