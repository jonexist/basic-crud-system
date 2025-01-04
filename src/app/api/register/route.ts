import { registrationSchema } from "@/components/auth/schema"
import db from "@/lib/db"
import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { firstName, middleName, lastName, username, password } =
    registrationSchema.parse(body)
  const saltRounds = 10

  try {
    const existingUser = await db.user.findUnique({
      where: { username },
    })
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      const newUser = await db.user.create({
        data: {
          firstName,
          middleName,
          lastName,
          username,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          firstName: true,
          middleName: true,
          lastName: true,
        },
      })

      return NextResponse.json(newUser, { status: 201 })
    } else {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 409 }
      )
    }
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
