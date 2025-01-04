import { RegistrationFormData } from "@/components/auth/schema"

export const registerUser = async (data: RegistrationFormData) => {
  const { firstName, middleName, lastName, username, password } = data
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        middleName,
        lastName,
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })
    if (!res.ok) {
      throw new Error(`Failed to register: ${res.statusText}`)
    }
    const responseData = await res.json()
    return { success: true, user: { username: responseData.username } }
  } catch (error) {
    console.error("Registration error:", error)
    throw new Error("Registration failed")
  }
}
