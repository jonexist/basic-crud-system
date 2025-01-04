import RegisterForm from "@/components/auth/register-form"
import React from "react"

const Register = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center bg-muted bg-gradient-to-r from-primary/20 to-fuchsia-900/20 backdrop-blur-sm">
      <RegisterForm />
    </div>
  )
}

export default Register
